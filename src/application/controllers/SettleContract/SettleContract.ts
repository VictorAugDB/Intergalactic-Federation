import { ISettleContractDTO } from '@/application/dtos/SettleContractDTO'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { ISettleContract } from '@/domain/usecases/SettleContrac'

export class SettleContractController implements IController {
  constructor(
    private readonly travelBetweenPlanetsUseCase: ISettleContract,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<ISettleContractDTO>,
  ): Promise<IResponse<{ message: 'SUCCESS' } | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { contractId } = req.body as ISettleContractDTO

      await this.travelBetweenPlanetsUseCase.execute({
        contractId,
      })

      return success({ message: 'SUCCESS' })
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
