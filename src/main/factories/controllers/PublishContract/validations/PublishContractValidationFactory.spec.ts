import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makePublishContractValidationFactory } from '@/main/factories/controllers/PublishContract/validations/PublishContractValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('PublishContractValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makePublishContractValidationFactory()
    const validations = Builder.fields([
      'description',
      'payload',
      'originPlanet',
      'destinationPlanet',
      'value',
    ])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
