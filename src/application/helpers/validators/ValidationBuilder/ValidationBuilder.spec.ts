import { ValidationBuilder } from '@/application/helpers/validators'
import { RequiredFieldValidation } from '@/application/helpers/validators/RequiredField/RequiredFieldValidation'

const makeSut = (): ValidationBuilder => {
  return ValidationBuilder.fields(['field'])
}

describe('RequiredFields Validation', () => {
  describe('required', () => {
    test('Should required return a ValidationBuilder instance', () => {
      const sut = makeSut()
      const result = sut.required()
      expect(result).toBeInstanceOf(ValidationBuilder)
      expect(result).toEqual({
        fields: ['field'],
        validations: [new RequiredFieldValidation('field')],
      })
    })

    test('Should build return an array with correct validations', () => {
      const sut = makeSut()
      const result = sut.required().build()
      expect(result).toEqual([new RequiredFieldValidation('field')])
    })

    test('Should build return an array with correct validations if has more than one field', () => {
      const sut = ValidationBuilder.fields(['field1', 'field2'])
      const result = sut.required().build()
      expect(result).toEqual([
        new RequiredFieldValidation('field1'),
        new RequiredFieldValidation('field2'),
      ])
    })
  })
})
