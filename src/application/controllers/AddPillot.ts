import { IAddPilotDTO } from '@/application/dtos/AddPilot'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'

export class AddPilot implements IController {
  constructor(private readonly validation: IValidation) {}

  async handle(req: IRequest<IAddPilotDTO>): Promise<IResponse<any>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)

      return success('success')
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
