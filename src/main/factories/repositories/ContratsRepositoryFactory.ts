import { Contract } from '@/domain/entities/Contract'
import { ContractsRepository } from '@/infra/repositories/ContractsRepository'
import { getRepository, Repository } from 'typeorm'

export const makeContractsRepositoryFactory = (): ContractsRepository => {
  return new ContractsRepository(getContractRepository)
}

const getContractRepository = (): Repository<Contract> =>
  getRepository(Contract)
