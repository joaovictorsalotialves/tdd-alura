import validator from 'validator'
import type { DateValidator } from './interfaces/dateValidator'

export class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    return validator.isDate(date, { format: 'DD/MM/YYYY' })
  }
}
