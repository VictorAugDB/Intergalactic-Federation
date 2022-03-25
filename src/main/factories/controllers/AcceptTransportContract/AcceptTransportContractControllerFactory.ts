import { AcceptTransportContractController } from '@/application/controllers/AcceptTransportContract/AcceptTransportContract'
import { makeAcceptTransportContractValidationFactory } from '@/main/factories/controllers/AcceptTransportContract/validations/AcceptTransportContractValidationFactory'
import { makeAcceptTransportContractUseCaseFactory } from '@/main/factories/usecases/AcceptTransportContractUseCaseFactory'

export const makeAcceptTransportContractControllerFactory =
  (): AcceptTransportContractController => {
    return new AcceptTransportContractController(
      makeAcceptTransportContractUseCaseFactory(),
      makeAcceptTransportContractValidationFactory(),
    )
  }
