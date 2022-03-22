import { IAcceptTransportContractDTO } from '@/application/dtos/AcceptTransportContract'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IAcceptTransportContract } from '@/domain/usecases/AcceptTransportContract'

export class AcceptTransportContractController implements IController {
  constructor(
    private readonly travelBetweenPlanetstUseCase: IAcceptTransportContract,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<IAcceptTransportContractDTO>,
  ): Promise<IResponse<{ message: 'SUCCESS' } | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { contractId, certificationDocument } =
        req.body as IAcceptTransportContractDTO

      await this.travelBetweenPlanetstUseCase.execute({
        contractId,
        certificationDocument,
      })

      return success({ message: 'SUCCESS' })
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
