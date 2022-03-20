import { ICreateContract } from '@/data/contracts/repositories/contracts/CreateContract'
import { IContract } from '@/domain/models/Contract'
import {
  IPublishContract,
  IPublishContractInput,
} from '@/domain/usecases/PublishContract'
import { v4 as uuidV4 } from 'uuid'

export class PublishContractUseCase implements IPublishContract {
  constructor(private readonly createContractRepository: ICreateContract) {}

  async execute({
    description,
    destinationPlanet,
    originPlanet,
    payload,
    value,
  }: IPublishContractInput): Promise<IContract> {
    const id = uuidV4()
    const contract = await this.createContractRepository.create({
      id,
      description,
      destinationPlanet,
      originPlanet,
      payload,
      value,
    })

    return contract
  }
}
