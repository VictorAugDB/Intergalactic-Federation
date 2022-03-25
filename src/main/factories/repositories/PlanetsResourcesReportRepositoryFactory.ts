import { PilotsResources } from '@/domain/entities/PilotResources'
import { PilotsResourcesReportRepository } from '@/infra/repositories/PilotsResourcesReportRepository'
import { getRepository, Repository } from 'typeorm'

export const makePilotsResourcesReportRepositoryFactory =
  (): PilotsResourcesReportRepository => {
    return new PilotsResourcesReportRepository(getPilotsResourcesRepository)
  }

const getPilotsResourcesRepository = (): Repository<PilotsResources> =>
  getRepository(PilotsResources)
