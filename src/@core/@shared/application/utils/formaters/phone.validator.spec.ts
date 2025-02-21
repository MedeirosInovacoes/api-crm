import { PhoneValidator } from '@/@core/@shared/application/utils/formaters/phone.validator'

describe('PhoneValidator unit tests', () => {
  it('Deve validar corretamente os telefones', () => {
    const phones = ['119123456', '2198276543', '86999999999']

    expect(PhoneValidator.formatNumber(phones[0])).toEqual('119123456')
    expect(PhoneValidator.formatNumber(phones[1])).toEqual('+55-21-9827-6543')
    expect(PhoneValidator.formatNumber(phones[2])).toEqual('+55-86-99999-9999')
  })

  it('Deve validar corretamente os telefones', () => {
    const phones = ['119123456', '86993325242', '2198276543']

    expect(PhoneValidator.validate(phones[0])).toBeFalsy()
    expect(PhoneValidator.validate(phones[1])).toBeTruthy()
    expect(PhoneValidator.validate(phones[2])).toBeFalsy()
  })
})
