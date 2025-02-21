import { validate } from 'email-validator'
import * as fs from 'fs'

export function validateEmail(email: string) {
  if (email !== null) {
    const readFile = fs.readFileSync(__dirname + '/sufix-emails.txt', 'utf-8')
    const sufixs = readFile.split('\n').map((line) => line.trim())

    const [, domain] = email.split('@')

    if (validate(email) && sufixs.includes(domain.split('.').pop())) {
      return email
    }
  }

  return null
}
