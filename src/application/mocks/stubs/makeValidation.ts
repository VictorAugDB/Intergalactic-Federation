import { IValidation } from '@/application/protocols/Validation'

export const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error | undefined {
      return null as unknown as Error
    }
  }

  return new ValidationStub()
}
