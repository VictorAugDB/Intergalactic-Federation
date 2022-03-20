import { IAddShipDTO } from '@/application/dtos/AddShip'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IShip } from '@/domain/models/Ship'
import { IAddShip } from '@/domain/usecases/AddShip'

export class AddShip implements IController {
  constructor(
    private readonly addShipUseCase: IAddShip,
    private readonly validation: IValidation,
  ) {}

  async handle(req: IRequest<IAddShipDTO>): Promise<IResponse<IShip | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { fuelCapacity, fuelLevel, location, weightCapacity } =
        req.body as IAddShipDTO

      const ship = await this.addShipUseCase.execute({
        fuelCapacity,
        fuelLevel,
        location,
        weightCapacity,
      })

      return success(ship)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
