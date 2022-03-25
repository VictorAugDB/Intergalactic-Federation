import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makeRefuelShipValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.fields(['certificationDocument', 'amountOfFuel'])
      .required()
      .build(),
  ])
}
