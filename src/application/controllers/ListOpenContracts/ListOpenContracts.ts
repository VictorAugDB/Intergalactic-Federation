import { handleDefaultCatchedErrors } from '@/application/helpers/HandleDefaultCatchedErrorsHelper'
import { noContent, success } from '@/application/helpers/HttpHelper'
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
      const contracts = await this.listOpenContractsUseCase.execute()

      if (!contracts.length) {
        return noContent()
      }

      return success(contracts)
    } catch (err) {
      return handleDefaultCatchedErrors(err)
    }
  }
}
