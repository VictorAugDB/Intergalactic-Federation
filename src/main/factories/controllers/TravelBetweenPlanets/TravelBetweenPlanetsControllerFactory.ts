import { TravelBetweenPlanetsController } from '@/application/controllers/TravelBetweenPlanets/TravelBetweenPlanets'
import { makeTravelBetweenPlanetsValidationFactory } from '@/main/factories/controllers/TravelBetweenPlanets/validations/TravelBetweenPlanetsValidationFactory'
import { makeTravelBetweenPlanetsUseCaseFactory } from '@/main/factories/usecases/TravelBetweenPlanetsUseCaseFactory'

export const makeTravelBetweenPlanetsControllerFactory =
  (): TravelBetweenPlanetsController => {
    return new TravelBetweenPlanetsController(
      makeTravelBetweenPlanetsUseCaseFactory(),
      makeTravelBetweenPlanetsValidationFactory(),
    )
  }
