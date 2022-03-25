import { PlanetsResources } from '@/domain/entities/PlanetsResources'
import { PlanetsResourcesReportRepository } from '@/infra/repositories/PlanetsResourcesReportRepository'
import { getRepository, Repository } from 'typeorm'

export const makePlanetsResourcesReportRepositoryFactory =
  (): PlanetsResourcesReportRepository => {
    return new PlanetsResourcesReportRepository(getPlanetsResourcesRepository)
  }

const getPlanetsResourcesRepository = (): Repository<PlanetsResources> =>
  getRepository(PlanetsResources)
