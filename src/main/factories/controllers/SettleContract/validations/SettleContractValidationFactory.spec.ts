import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeSettleContractValidationFactory } from '@/main/factories/controllers/SettleContract/validations/SettleContractValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('SettleContractValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeSettleContractValidationFactory()
    const validations = Builder.fields(['contractId', 'certificationDocument'])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
