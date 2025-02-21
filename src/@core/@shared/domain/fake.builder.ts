import { Faker } from '@faker-js/faker'
import { faker } from '@faker-js/faker/locale/pt_BR'
import { Chance } from 'chance'

export type PropOrFactory<T> = T | ((index: number) => T)

export class FakeBuilder {
  countObjs: number
  chance: Chance.Chance
  faker: Faker
  optional: string[] = []

  constructor(countObjs: number = 1) {
    this.chance = new Chance()
    this.faker = faker
    this.countObjs = countObjs
  }

  setValue(prop: string, valueOrFactory: PropOrFactory<any>) {
    this[`_${prop}`] = valueOrFactory
    return this
  }

  getValue(prop: any) {
    const privateProp = `_${prop}` as keyof this
    if (!this[privateProp] && this.optional.includes(prop)) {
      throw new Error(`Property ${prop} not have a factory, use 'with' methods`)
    }
    return this.callFactory(this[privateProp], 0)
  }

  callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function' ? factoryOrValue(index) : factoryOrValue
  }
}
