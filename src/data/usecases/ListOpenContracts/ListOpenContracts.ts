import { IListContracts } from '@/data/contracts/repositories/contracts/ListContracts'
import { IContract } from '@/domain/models/Contract'
import { IListOpenContracts } from '@/domain/usecases/ListOpenContracts'

export class ListOpenContractsUseCase implements IListOpenContracts {
  constructor(private readonly listContractsRepository: IListContracts) {}

  async execute(): Promise<IContract[]> {
    const contracts = await this.listContractsRepository.listOpenContracts()
    return contracts
  }
}
