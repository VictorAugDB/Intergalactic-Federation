import { PublishContractUseCase } from '@/data/usecases/PublishContract/PublishContract'
import { makeContractsRepositoryFactory } from '@/main/factories/repositories/ContratsRepositoryFactory'

export const makePublishContractUseCaseFactory = (): PublishContractUseCase => {
  return new PublishContractUseCase(makeContractsRepositoryFactory())
}
