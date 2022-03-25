import { RefuelShipUseCase } from '@/data/usecases/RefuelShip/RefuelShip'
import { makePilotsRepositoryFactory } from '@/main/factories/repositories/PilotsRepositoryFactory'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'
import { makeTransactionsReportRepositoryFactory } from '@/main/factories/repositories/TransactionsReportRepository'

export const makeRefuelShipUseCaseFactory = (): RefuelShipUseCase => {
  const pilotsRepository = makePilotsRepositoryFactory()
  const shipsRepository = makeShipsRepositoryFactory()
  return new RefuelShipUseCase(
    pilotsRepository,
    shipsRepository,
    shipsRepository,
    pilotsRepository,
    makeTransactionsReportRepositoryFactory(),
  )
}
