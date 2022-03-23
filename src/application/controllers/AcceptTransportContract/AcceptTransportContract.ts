import { IAcceptTransportContractDTO } from '@/application/dtos/AcceptTransportContract'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import {
  IAcceptTransportContract,
  IAcceptTransportContractResult,
} from '@/domain/usecases/AcceptTransportContract'

export class AcceptTransportContractController implements IController {
  constructor(
    private readonly acceptTransportContractUseCase: IAcceptTransportContract,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<IAcceptTransportContractDTO>,
  ): Promise<IResponse<IAcceptTransportContractResult | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { contractId, certificationDocument } =
        req.body as IAcceptTransportContractDTO

      const result = await this.acceptTransportContractUseCase.execute({
        contractId,
        certificationDocument,
      })

      return success(result)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
