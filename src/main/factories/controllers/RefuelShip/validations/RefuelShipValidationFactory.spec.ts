import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeRefuelShipValidationFactory } from '@/main/factories/controllers/RefuelShip/validations/RefuelShipValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('RefuelShipValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeRefuelShipValidationFactory()
    const validations = Builder.fields([
      'certificationDocument',
      'amountOfFuel',
    ])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
