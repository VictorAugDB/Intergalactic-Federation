import { AddPilotUseCase } from '@/data/usecases/AddPilot/AddPillot'
import { makePilotsRepositoryFactory } from '@/main/factories/repositories/PilotsRepositoryFactory'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'

export const makeAddPilotUseCaseFactory = (): AddPilotUseCase => {
  const pilotsRepository = makePilotsRepositoryFactory()
  const shipsRepository = makeShipsRepositoryFactory()
  return new AddPilotUseCase(
    pilotsRepository,
    shipsRepository,
    pilotsRepository,
    pilotsRepository,
  )
}
