import { strip } from '@/@core/@shared/application/utils/strip'

export class PhoneValidator {
  static formatNumber(number: string): string {
    const clearNumber = strip(number)

    if (clearNumber.length < 10) {
      return number
    }

    const ddd = clearNumber.slice(0, 2)
    const part1 = clearNumber.length === 10 ? clearNumber.slice(2, 6) : clearNumber.slice(2, 7)
    const part2 = clearNumber.length === 10 ? clearNumber.slice(6, 10) : clearNumber.slice(7, 11)

    return `+55-${ddd}-${part1}-${part2}`
  }

  static validate(number: string) {
    const clearNumber = number.replace(/[^\d]/g, '')

    const regexCelular = /^[1-9]{2}9[0-9]{8}$/

    return regexCelular.test(clearNumber)
  }
}
