import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makeAddShipValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.fields([
      'fuelCapacity',
      'fuelLevel',
      'weightCapacity',
      'location',
    ])
      .required()
      .build(),
  ])
}
