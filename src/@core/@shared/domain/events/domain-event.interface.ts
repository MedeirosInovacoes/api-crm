export interface IDomainEvent {
  aggregateId: number | string
  occurredOn: Date
  eventVersion: number

  getIntegrationEvent?(): IIntegrationEvent
}

export interface IIntegrationEvent<T = any> {
  eventVersion: number
  occurredOn: Date
  payload: T
  eventName: string
}
