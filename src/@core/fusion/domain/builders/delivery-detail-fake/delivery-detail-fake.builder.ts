import { FakeBuilder, PropOrFactory } from '@/@core/@shared/domain/fake.builder'
import { DeliveryDetailEntity } from '@/@core/fusion/domain/entities/delivery-detail/delivery-detail.entity'

export class DeliveryDetailFakeBuilder<TBuild = any> extends FakeBuilder {
  private _id: PropOrFactory<string> = () => this.faker.string.uuid()
  private _orderId: PropOrFactory<number> = () => this.faker.number.int({ min: 10, max: 10 })
  private _date: PropOrFactory<Date> = () => this.faker.date.recent()
  private _createdAt: PropOrFactory<Date> = () => this.faker.date.recent()
  private _updatedAt: PropOrFactory<Date> = () => this.faker.date.recent()

  static aDeliveryDetail = () => new DeliveryDetailFakeBuilder()

  static theDeliveryDetail = (countObjs: number) => new DeliveryDetailFakeBuilder(countObjs)

  withId(id: PropOrFactory<string>): this {
    return this.setValue('id', id)
  }

  withOrderId(orderId: PropOrFactory<number>): this {
    return this.setValue('orderId', orderId)
  }

  withDate(date: PropOrFactory<Date>): this {
    return this.setValue('date', date)
  }

  withCreatedAt(createdAt: PropOrFactory<Date>): this {
    return this.setValue('createdAt', createdAt)
  }

  withUpdatedAt(updatedAt: PropOrFactory<Date>): this {
    return this.setValue('updatedAt', updatedAt)
  }

  build(): TBuild {
    const values = Array(this.countObjs)
      .fill(undefined)
      .map((_, i) =>
        DeliveryDetailEntity.create({
          id: this.callFactory(this._id, i),
          orderId: this.callFactory(this._orderId, i),
          date: this.callFactory(this._date, i),
          createdAt: this.callFactory(this._createdAt, i),
          updatedAt: this.callFactory(this._updatedAt, i),
        }),
      )

    return this.countObjs === 1 ? (values[0] as any) : values
  }

  get id() {
    return this.getValue('id')
  }

  get customerCode() {
    return this.getValue('customerCode')
  }

  get orderId() {
    return this.getValue('orderId')
  }

  get date() {
    return this.getValue('date')
  }

  get createdAt() {
    return this.getValue('createdAt')
  }

  get updatedAt() {
    return this.getValue('updatedAt')
  }
}
