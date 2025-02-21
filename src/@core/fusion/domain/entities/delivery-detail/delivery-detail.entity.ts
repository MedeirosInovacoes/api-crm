import { BaseEntity } from '@/@core/@shared/domain/entities/base.entity'

export type DeliveryEntityProps = {
  id: string
  orderId: number
  date: Date
  createdAt?: Date
  updatedAt?: Date
}

export class DeliveryDetailEntity extends BaseEntity<DeliveryEntityProps> {
  private constructor(props: DeliveryEntityProps) {
    super({ props, id: props.id })

    this.validate()
  }

  static create(props: DeliveryEntityProps): DeliveryDetailEntity {
    return new DeliveryDetailEntity(props)
  }

  get orderId(): number {
    return this.props.orderId
  }

  get date(): Date {
    return this.props.date
  }

  validate(): boolean {
    if (!this.props.date) {
      throw new Error('Date is required')
    }
    if (!this.props.orderId) {
      throw new Error('Order id is required')
    }

    return true
  }
}
