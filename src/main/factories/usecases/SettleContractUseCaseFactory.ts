import { SettleContractUseCase } from '@/data/usecases/SettleContract/SettleContract'
import { makeContractsRepositoryFactory } from '@/main/factories/repositories/ContratsRepositoryFactory'
import { makePilotsRepositoryFactory } from '@/main/factories/repositories/PilotsRepositoryFactory'
import { makePlanetsResourcesReportRepositoryFactory } from '@/main/factories/repositories/PilotsResourcesRepositoryFactory'
import { makePilotsResourcesReportRepositoryFactory } from '@/main/factories/repositories/PlanetsResourcesReportRepositoryFactory'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'
import { makeTransactionsReportRepositoryFactory } from '@/main/factories/repositories/TransactionsReportRepository'

export const makeSettleContractUseCaseFactory = (): SettleContractUseCase => {
  const pilotsRepository = makePilotsRepositoryFactory()
  const shipsRepository = makeShipsRepositoryFactory()
  const contractsRepository = makeContractsRepositoryFactory()

  return new SettleContractUseCase(
    pilotsRepository,
    shipsRepository,
    contractsRepository,
    shipsRepository,
    contractsRepository,
    pilotsRepository,
    makeTransactionsReportRepositoryFactory(),
    makePlanetsResourcesReportRepositoryFactory(),
    makePilotsResourcesReportRepositoryFactory(),
  )
}
