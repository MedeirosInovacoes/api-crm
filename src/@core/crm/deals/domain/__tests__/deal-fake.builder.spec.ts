import { DealFakeBuilder } from '@/@core/crm/deals/domain/deal-fake.builder'
import Chance from 'chance'

describe('DealFakeBuilder unit tests', () => {
  describe('companyId prop', () => {
    const faker = DealFakeBuilder.aDeal()

    it('Deve ser uma função', () => {
      expect(typeof faker['_companyId']).toBe('function')
    })

    it('should call the integer method', () => {
      const chance = Chance()
      const spyIntegerMethod = jest.spyOn(chance, 'integer')
      faker['chance'] = chance

      faker.build()

      expect(spyIntegerMethod).toHaveBeenCalled()
    })

    it('withCompanyId', () => {
      const $this = faker.withCompanyId('123')
      expect($this).toBeInstanceOf(DealFakeBuilder)
      expect(faker['_companyId']).toBe('123')

      faker.withCompanyId(() => '312')

      //@ts-expect-error name is callable
      expect(faker['_companyId']()).toBe('312')
      expect(faker.companyId).toBe('312')
    })

    test('should pass index to companyId factory', () => {
      faker.withCompanyId((index) => `312 ${index}`)
      const deal = faker.build()
      expect(deal.companyId).toBe(`312 0`)

      const fakerMany = DealFakeBuilder.theDeals(2)
      fakerMany.withName((index) => `312 ${index}`)
      const categories = fakerMany.build()

      expect(categories[0].name).toBe(`312 0`)
      expect(categories[1].name).toBe(`312 1`)
    })
  })
})
