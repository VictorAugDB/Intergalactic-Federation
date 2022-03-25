import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeAddPilotValidationFactory } from '@/main/factories/controllers/AddPilot/validations/AddPilotValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('AddPilotValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeAddPilotValidationFactory()
    const validations = Builder.fields([
      'certificationDocument',
      'shipId',
      'name',
      'age',
      'credits',
      'locationPlanet',
    ])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
