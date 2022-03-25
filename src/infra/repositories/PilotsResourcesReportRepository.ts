/* eslint-disable @typescript-eslint/restrict-plus-operands */
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
        water: water ?? 0,
        food: food ?? 0,
        minerals: minerals ?? 0,
      })

      await this.repository.save(createResult)
    }
    const updatePilotReports = {
      water:
        pilotReports?.water === 0 || pilotReports?.water === null
          ? 0
          : !pilotReports?.water
          ? 0
          : pilotReports.water,
      food:
        pilotReports?.food === 0 || pilotReports?.food === null
          ? 0
          : !pilotReports?.food
          ? 0
          : pilotReports.food,
      minerals:
        pilotReports?.minerals === 0 || pilotReports?.minerals === null
          ? 0
          : !pilotReports?.minerals
          ? 0
          : pilotReports.minerals,
    }

    if (pilotReports) {
      await this.repository.update(
        { name: pilotName },
        {
          water: water
            ? updatePilotReports.water + water
            : updatePilotReports.water,
          food: food ? updatePilotReports.food + food : updatePilotReports.food,
          minerals: minerals
            ? updatePilotReports.minerals + minerals
            : updatePilotReports.minerals,
        },
      )
    }
  }
}
