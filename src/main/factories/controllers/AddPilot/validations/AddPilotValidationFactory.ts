import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makeAddPilotValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.fields([
      'certificationDocument',
      'shipId',
      'name',
      'age',
      'credits',
      'locationPlanet',
    ])
      .required()
      .build(),
  ])
}
