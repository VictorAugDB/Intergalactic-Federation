import { AddShipUseCase } from '@/data/usecases/AddShip/AddShip'
import { ShipsRepository } from '@/infra/repositories/ShipsRepository'

export const makeAddShipUseCaseFactory = (): AddShipUseCase => {
  const shipsRepository = new ShipsRepository()
  return new AddShipUseCase(shipsRepository)
}
