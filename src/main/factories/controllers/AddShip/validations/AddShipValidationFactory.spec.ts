import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeAddShipValidationFactory } from '@/main/factories/controllers/AddShip/validations/AddShipValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('AddShipValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeAddShipValidationFactory()
    const validations = Builder.fields([
      'fuelCapacity',
      'fuelLevel',
      'weightCapacity',
      'location',
    ])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
