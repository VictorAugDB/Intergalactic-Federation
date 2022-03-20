import { MissingParamError } from '@/application/errors/MissingParamError'
import { ValidationComposite } from '@/application/helpers/validators'
import { IValidation } from '@/application/protocols/Validation'

interface ISutTypes {
  sut: ValidationComposite
  validationStubs: IValidation[]
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeSut = (): ISutTypes => {
  const validations: IValidation[] = []

  const validationStubs = [makeValidation(), makeValidation()]
  for (const validationStub of validationStubs) {
    validations.push(validationStub)
  }

  const sut = new ValidationComposite(validations)

  return {
    sut,
    validationStubs,
  }
}

describe('IValidation Composite', () => {
  test('Should return an error if any Ivalidation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more than one Ivalidation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new Error(''))
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should not return an error if validations fails succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({ field: 'any_value' })
    expect(error).toBeFalsy()
  })
})
