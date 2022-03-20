import { MissingParamError } from '@/application/errors/MissingParamError'
import { IValidation } from '@/application/protocols/Validation'

export class RequiredFieldValidation implements IValidation {
  constructor(readonly field: string) {}

  validate(input: any): Error | undefined {
    if (typeof input[this.field] === 'number')
      input[this.field] = input[this.field].toString()
    if (input[this.field] && !Object.keys(input[this.field]).length) {
      return new MissingParamError(this.field)
    }

    return input[this.field] ? undefined : new MissingParamError(this.field)
  }
}
