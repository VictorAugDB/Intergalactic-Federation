import { ICreateContract } from '@/data/contracts/repositories/contracts/CreateContract'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IListContracts } from '@/data/contracts/repositories/contracts/ListContracts'
import {
  IUpdateContract,
  IUpdateContractInput,
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

  async update({
    id,
    acceptanceDate,
    description,
    destinationPlanet,
    originPlanet,
    payload,
    pilotCertificationDocument,
    settlementDate,
    value,
  }: IUpdateContractInput): Promise<IContract> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const result = await this.repository.update(
      { id },
      {
        acceptanceDate,
        description,
        destinationPlanet,
        originPlanet,
        payload,
        pilotCertificationDocument,
        settlementDate,
        value,
      },
    )

    return result as unknown as IContract
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
