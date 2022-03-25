import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makeSettleContractValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.fields(['contractId', 'certificationDocument'])
      .required()
      .build(),
  ])
}
