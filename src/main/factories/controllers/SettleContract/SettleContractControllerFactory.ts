import { SettleContractController } from '@/application/controllers/SettleContract/SettleContract'
import { makeSettleContractValidationFactory } from '@/main/factories/controllers/SettleContract/validations/SettleContractValidationFactory'
import { makeSettleContractUseCaseFactory } from '@/main/factories/usecases/SettleContractUseCaseFactory'

export const makeSettleContractControllerFactory =
  (): SettleContractController => {
    return new SettleContractController(
      makeSettleContractUseCaseFactory(),
      makeSettleContractValidationFactory(),
    )
  }
