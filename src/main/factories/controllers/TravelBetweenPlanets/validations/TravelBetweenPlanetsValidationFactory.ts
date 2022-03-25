import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'

export const makeTravelBetweenPlanetsValidationFactory =
  (): ValidationComposite => {
    return new ValidationComposite([
      ...Builder.fields(['certificationDocument', 'destinationPlanet'])
        .required()
        .build(),
    ])
  }
