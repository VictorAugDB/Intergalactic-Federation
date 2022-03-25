import { TravelBetweenPlanetsUseCase } from '@/data/usecases/TravelBetweenPlanets/TravelBetweenPlanets'
import { makePilotsRepositoryFactory } from '@/main/factories/repositories/PilotsRepositoryFactory'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'

export const makeTravelBetweenPlanetsUseCaseFactory =
  (): TravelBetweenPlanetsUseCase => {
    const pilotsRepository = makePilotsRepositoryFactory()
    const shipsRepository = makeShipsRepositoryFactory()
    return new TravelBetweenPlanetsUseCase(
      pilotsRepository,
      shipsRepository,
      pilotsRepository,
      shipsRepository,
    )
  }
