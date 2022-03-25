import { AcceptTransportContractUseCase } from '@/data/usecases/AcceptTransportContract/AcceptTransportContract'
import { makeContractsRepositoryFactory } from '@/main/factories/repositories/ContratsRepositoryFactory'
import { makePilotsRepositoryFactory } from '@/main/factories/repositories/PilotsRepositoryFactory'
import { makePlanetsResourcesReportRepositoryFactory } from '@/main/factories/repositories/PilotsResourcesRepositoryFactory'
import { makeShipsRepositoryFactory } from '@/main/factories/repositories/ShipsRepositoryFactory'

export const makeAcceptTransportContractUseCaseFactory =
  (): AcceptTransportContractUseCase => {
    const pilotsRepository = makePilotsRepositoryFactory()
    const shipsRepository = makeShipsRepositoryFactory()
    const contractsRepository = makeContractsRepositoryFactory()

    return new AcceptTransportContractUseCase(
      pilotsRepository,
      shipsRepository,
      contractsRepository,
      shipsRepository,
      contractsRepository,
      makePlanetsResourcesReportRepositoryFactory(),
    )
  }
