import { IAddPilotDTO } from '@/application/dtos/AddPilot'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IAddPilot } from '@/domain/usecases/AddPilot'

export class AddPilot implements IController {
  constructor(
    private readonly addPilotUseCase: IAddPilot,
    private readonly validation: IValidation,
  ) {}

  async handle(req: IRequest<IAddPilotDTO>): Promise<IResponse<any>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const {
        age,
        certificationDocument,
        credits,
        locationPlanet,
        name,
        shipId,
      } = req.body as IAddPilotDTO

      await this.addPilotUseCase.execute({
        age,
        certificationDocument,
        credits,
        locationPlanet,
        name,
        shipId,
      })

      return success('success')
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
