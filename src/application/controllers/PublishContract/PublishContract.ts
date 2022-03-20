import { IPublishContractDTO } from '@/application/dtos/PublishContract'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IContract } from '@/domain/models/Contract'
import { IPublishContract } from '@/domain/usecases/PublishContract'

export class PublishContractController implements IController {
  constructor(
    private readonly publishContractUseCase: IPublishContract,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<IPublishContractDTO>,
  ): Promise<IResponse<IContract | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { description, destinationPlanet, originPlanet, payload, value } =
        req.body as IPublishContractDTO

      const ship = await this.publishContractUseCase.execute({
        description,
        destinationPlanet,
        originPlanet,
        payload,
        value,
      })

      return success(ship)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
