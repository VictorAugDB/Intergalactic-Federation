import {
  IAddToPlanetResourcesReport,
  IAddToPlanetResourcesReportInput,
} from '@/data/contracts/repositories/reports/AddToPlanetResourcesReportReport'
import { PlanetsResources } from '@/domain/entities/PlanetsResources'
import { Repository } from 'typeorm'

export class PlanetsResourcesReportRepository
  implements IAddToPlanetResourcesReport
{
  repository: Repository<PlanetsResources> | undefined

  constructor(
    private readonly makeRepository: () => Repository<PlanetsResources>,
  ) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async add({
    planet,
    received,
    sent,
  }: IAddToPlanetResourcesReportInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilotReports = await this.repository.findOne({ planet })

    if (!pilotReports) {
      const createResult = this.repository.create({
        planet,
        sent,
        received,
      })

      await this.repository.save(createResult)
    }

    await this.repository.update(
      { planet },
      {
        sent,
        received,
      },
    )
  }
}
