import {
  IAddToPilotTransportedResourcesReport,
  IAddToPilotTransportedResourcesReportInput,
} from '@/data/contracts/repositories/reports/AddToPilotTransportedResourcesReport'
import { PilotsResources } from '@/domain/entities/PilotResources'
import { Repository } from 'typeorm'

export class PilotsResourcesReportRepository
  implements IAddToPilotTransportedResourcesReport
{
  repository: Repository<PilotsResources> | undefined

  constructor(
    private readonly makeRepository: () => Repository<PilotsResources>,
  ) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async add({
    pilotName,
    food,
    minerals,
    water,
  }: IAddToPilotTransportedResourcesReportInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilotReports = await this.repository.findOne({
      name: pilotName,
    })

    if (!pilotReports) {
      const createResult = this.repository.create({
        name: pilotName,
        food,
        minerals,
        water,
      })

      await this.repository.save(createResult)
    }

    await this.repository.update(
      { name: pilotName },
      {
        food,
        minerals,
        water,
      },
    )
  }
}
