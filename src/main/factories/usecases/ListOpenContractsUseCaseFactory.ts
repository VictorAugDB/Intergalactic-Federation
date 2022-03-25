import { ListOpenContractsUseCase } from '@/data/usecases/ListOpenContracts/ListOpenContracts'
import { makeContractsRepositoryFactory } from '@/main/factories/repositories/ContratsRepositoryFactory'

export const makeListOpenContractsUseCaseFactory =
  (): ListOpenContractsUseCase => {
    return new ListOpenContractsUseCase(makeContractsRepositoryFactory())
  }
