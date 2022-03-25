import { ListOpenContractsController } from '@/application/controllers/ListOpenContracts/ListOpenContracts'
import { makeListOpenContractsUseCaseFactory } from '@/main/factories/usecases/ListOpenContractsUseCaseFactory'

export const makeListOpenContractsControllerFactory =
  (): ListOpenContractsController => {
    return new ListOpenContractsController(
      makeListOpenContractsUseCaseFactory(),
    )
  }
