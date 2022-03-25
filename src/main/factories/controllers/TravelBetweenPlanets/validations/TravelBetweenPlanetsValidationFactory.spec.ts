import {
  ValidationComposite,
  ValidationBuilder as Builder,
} from '@/application/helpers/validators'
import { makeTravelBetweenPlanetsValidationFactory } from '@/main/factories/controllers/TravelBetweenPlanets/validations/TravelBetweenPlanetsValidationFactory'

jest.mock(
  '@/application/helpers/validators/ValidationComposite/ValidationComposite',
)

describe('TravelBetweenPlanetsValidationFactory', () => {
  test('Should be able to call ValidationComposite with all validations', () => {
    makeTravelBetweenPlanetsValidationFactory()
    const validations = Builder.fields([
      'certificationDocument',
      'destinationPlanet',
    ])
      .required()
      .build()

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
