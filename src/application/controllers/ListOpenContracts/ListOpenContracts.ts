import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { success } from '@/application/helpers/HttpHelper'
import {
  IController,
  IRequest,
  IResponse,
} from '@/application/protocols/Controller'
import { IContract } from '@/domain/models/Contract'
import { IListOpenContracts } from '@/domain/usecases/ListOpenContracts'

export class ListOpenContractsController implements IController {
  constructor(private readonly listOpenContractsUseCase: IListOpenContracts) {}

  async handle(req: IRequest): Promise<IResponse<IContract[] | Error>> {
    try {
      const ship = await this.listOpenContractsUseCase.execute()

      return success(ship)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
