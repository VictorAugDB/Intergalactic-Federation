import { ITravelBetweenPlanetsDTO } from '@/application/dtos/TravelBetweenPlanets'
import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { badRequest, success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { ITravelBetweenPlanets } from '@/domain/usecases/TravelBetweenPlanets'

export class TravelBetweenPlanetsController implements IController {
  constructor(
    private readonly travelBetweenPlanetsUseCase: ITravelBetweenPlanets,
    private readonly validation: IValidation,
  ) {}

  async handle(
    req: IRequest<ITravelBetweenPlanetsDTO>,
  ): Promise<IResponse<{ message: 'SUCCESS' } | Error>> {
    try {
      const error = this.validation.validate(req.body)
      if (error) return badRequest(error)
      const { certificationDocument, destinationPlanet } =
        req.body as ITravelBetweenPlanetsDTO

      await this.travelBetweenPlanetsUseCase.execute({
        certificationDocument,
        destinationPlanet,
      })

      return success({ message: 'SUCCESS' })
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
