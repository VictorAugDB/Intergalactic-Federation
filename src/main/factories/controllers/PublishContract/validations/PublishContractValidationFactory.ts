import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makePublishContractValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.fields([
      'description',
      'payload',
      'originPlanet',
      'destinationPlanet',
      'value',
    ])
      .required()
      .build(),
  ])
}
