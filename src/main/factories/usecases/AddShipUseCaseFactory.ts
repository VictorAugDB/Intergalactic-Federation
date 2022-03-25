import { AddShipUseCase } from '@/data/usecases/AddShip/AddShip'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'

export const makeAddShipUseCaseFactory = (): AddShipUseCase => {
  return new AddShipUseCase(makeShipsRepositoryFactory())
}
