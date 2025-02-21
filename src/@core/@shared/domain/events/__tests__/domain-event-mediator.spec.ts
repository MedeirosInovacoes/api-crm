import EventEmitter2 from 'eventemitter2'
import { AggregateRoot } from '../../aggregate-root'
import { DomainEventMediator } from '../domain-event-mediator'
import { IDomainEvent, IIntegrationEvent } from '../domain-event.interface'

class StubEvent implements IDomainEvent {
  occurredOn: Date
  eventVersion: number

  constructor(
    public aggregateId: string,
    public name: string,
  ) {
    this.occurredOn = new Date()
    this.eventVersion = 1
  }

  getIntegrationEvent(): StubIntegrationEvent {
    return new StubIntegrationEvent(this)
  }
}

class StubIntegrationEvent implements IIntegrationEvent {
  occurredOn: Date
  eventVersion: number
  payload: any
  eventName: string
  constructor(event: StubEvent) {
    this.occurredOn = event.occurredOn
    this.eventVersion = event.eventVersion
    this.payload = event
    this.eventName = this.constructor.name
  }
}

class StubAggregate extends AggregateRoot {
  _id: string
  name: string

  get id(): string {
    return this._id
  }

  action(name) {
    this.name = name
    this.applyEvent(new StubEvent(this._id, this.name))
  }

  toJSON() {
    return {
      id: this.id.toString(),
      name: this.name,
    }
  }
}

describe('DomainEventMediator Unit Tests', () => {
  let mediator: DomainEventMediator

  beforeEach(() => {
    const eventEmitter = new EventEmitter2()
    mediator = new DomainEventMediator(eventEmitter)
  })

  it('should publish handler', async () => {
    expect.assertions(1)
    mediator.register(StubEvent.name, async (event: StubEvent) => {
      expect(event.name).toBe('test')
    })

    const aggregate = new StubAggregate()
    aggregate.action('test')
    await mediator.publish(aggregate)
    await mediator.publish(aggregate)
  })

  it('should not publish an integration event', () => {
    expect.assertions(1)
    const spyEmitAsync = jest.spyOn(mediator['eventEmitter'], 'emitAsync')

    const aggregate = new StubAggregate()
    aggregate.action('test')
    Array.from(aggregate.events)[0].getIntegrationEvent = undefined
    mediator.publishIntegrationEvents(aggregate)
    expect(spyEmitAsync).not.toHaveBeenCalled()
  })

  it('should publish integration event', async () => {
    expect.assertions(4)
    mediator.register(StubIntegrationEvent.name, async (event: StubIntegrationEvent) => {
      expect(event.eventName).toBe(StubIntegrationEvent.name)
      expect(event.eventVersion).toBe(1)
      expect(event.occurredOn).toBeInstanceOf(Date)
      expect(event.payload.name).toBe('test')
    })

    const aggregate = new StubAggregate()
    aggregate.action('test')
    await mediator.publishIntegrationEvents(aggregate)
  })
})
