import { MissingParamError } from '@/application/errors/MissingParamError'
import { RequiredFieldValidation } from '@/application/helpers/validators/RequiredField/RequiredFieldValidation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: '' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return a MissingParamError if validation fails receiving an empty array', () => {
    const sut = makeSut()
    const error = sut.validate({ field: [] })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return a MissingParamError if validation fails receiving an empty object', () => {
    const sut = makeSut()
    const error = sut.validate({ field: {} })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return a error if validation input[this.field] is an object', () => {
    const sut = makeSut()
    const error = sut.validate({ field: { field: 'any_value' } })
    expect(error).toBeFalsy()
  })

  test('Should not return an error if input[this.field] not exists', () => {
    const sut = makeSut()
    const error = sut.validate({ otherField: [] })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return an error if validation succeeds if receive a number', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 123 })
    expect(error).toBeFalsy()
  })

  test('Should not return an error if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
