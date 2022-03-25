import { ICreateContract } from '@/data/contracts/repositories/contracts/CreateContract'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IListContracts } from '@/data/contracts/repositories/contracts/ListContracts'
import {
  IUpdateContract,
  IUpdateContractInput,
  IUpdateContractResult,
} from '@/data/contracts/repositories/contracts/UpdateContract'
import { Contract } from '@/domain/entities/Contract'
import { IContract } from '@/domain/models/Contract'
import { Repository } from 'typeorm'

export class ContractsRepository
  implements ICreateContract, IGetContract, IUpdateContract, IListContracts
{
  repository: Repository<Contract> | undefined

  constructor(private readonly makeRepository: () => Repository<Contract>) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async create({
    description,
    destinationPlanet,
    id,
    originPlanet,
    payload,
    value,
  }: IContract): Promise<IContract> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const contract = this.repository.create({
      description,
      destinationPlanet,
      id,
      originPlanet,
      payload,
      value,
    })
    const createdContract = await this.repository.save(contract)
    return createdContract
  }

  async getById(id: string): Promise<IContract | undefined> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const contract = await this.repository.findOne({ id })
    return contract
  }

  async update(input: IUpdateContractInput): Promise<IUpdateContractResult> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const updateData = JSON.parse(JSON.stringify(input))

    await this.repository.update(
      { id: input.id },
      {
        ...updateData,
      },
    )

    return { acceptanceDate: input.acceptanceDate as Date }
  }

  async listOpenContracts(): Promise<IContract[]> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const contracts = await this.repository.find({
      where: { acceptanceDate: null },
    })
    return contracts
  }
}
