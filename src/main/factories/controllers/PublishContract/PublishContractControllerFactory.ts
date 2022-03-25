import { PublishContractController } from '@/application/controllers/PublishContract/PublishContract'
import { makePublishContractValidationFactory } from '@/main/factories/controllers/PublishContract/validations/PublishContractValidationFactory'
import { makePublishContractUseCaseFactory } from '@/main/factories/usecases/PublishContractUseCaseFactory'

export const makePublishContractControllerFactory =
  (): PublishContractController => {
    return new PublishContractController(
      makePublishContractUseCaseFactory(),
      makePublishContractValidationFactory(),
    )
  }
