import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeAcceptTransportContractValidationFactory } from '@/main/factories/controllers/AcceptTransportContract/validations/AcceptTransportContractValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('AcceptTransportContractValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeAcceptTransportContractValidationFactory()
    const validations = Builder.fields(['contractId', 'certificationDocument'])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
