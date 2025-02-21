import { Uuid } from '@/@core/@shared/domain/value-objects/uuid.vo'

export type BaseEntityProps<Props extends object> = {
  id?: string
  props: Props
  creadtedAt?: Date
  updatedAt?: Date
}

export class BaseEntity<Props extends object> {
  private readonly _id: string | Uuid
  private readonly _props: Props
  private readonly _createdAt: Date
  private readonly _updatedAt: Date

  constructor(props: BaseEntityProps<Props>) {
    this._id = props.id
    if ('id' in props.props) {
      delete props.props.id
    }
    this._props = props.props
    this._createdAt = props.creadtedAt ?? new Date()
    this._updatedAt = props.updatedAt ?? new Date()
  }

  get id(): string | Uuid {
    return this._id
  }

  get props(): Props {
    return this._props
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  toJson(): { id: string | Uuid } & Props {
    return {
      id: this.id,
      ...this._props,
    }
  }
}
