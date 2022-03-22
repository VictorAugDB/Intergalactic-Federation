import { IRefuelShipDTO } from '@/application/dtos/RefuelShipDTO'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IRefuelShip, IRefuelShipResult } from '@/domain/usecases/RefuelShip'

export class RefuelShipController implements IController {
  constructor(
    private readonly refuelShiptUseCase: IRefuelShip,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<IRefuelShipDTO>,
  ): Promise<IResponse<IRefuelShipResult | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { certificationDocument, amountOfFuel } = req.body as IRefuelShipDTO

      const result = await this.refuelShiptUseCase.execute({
        certificationDocument,
        amountOfFuel,
      })

      return success(result)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
