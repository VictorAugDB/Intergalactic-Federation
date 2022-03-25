/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  IAddToPlanetResourcesReceiveReportInput,
  IAddToPlanetResourcesReport,
  IAddToPlanetResourcesSentReportInput,
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

  async addSent({
    planet,
    sent,
  }: IAddToPlanetResourcesSentReportInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const planetReports = (await this.repository.findOne({ planet })) as any

    if (!planetReports ?? !planetReports.sent) {
      const createResult = this.repository.create({
        planet,
        sent: {
          water: sent.water ? sent.water : 0,
          food: sent.food ? sent.food : 0,
          minerals: sent.minerals ? sent.minerals : 0,
        },
      })

      await this.repository.save(createResult)
      return
    }

    const updatePlanetReports = {
      water:
        planetReports.sent?.water === 0 || planetReports?.water === null
          ? 0
          : !planetReports.sent?.water
          ? 0
          : planetReports.sent.water,
      food:
        planetReports.sent?.food === 0 || planetReports.sent?.food === null
          ? 0
          : !planetReports.sent?.food
          ? 0
          : planetReports.sent.food,
      minerals:
        planetReports.sent?.minerals === 0 ||
        planetReports.sent?.minerals === null
          ? 0
          : !planetReports.sent?.minerals
          ? 0
          : planetReports.sent.minerals,
    }

    console.log(updatePlanetReports)
    await this.repository.update(
      { planet },
      {
        sent: {
          water: sent?.water
            ? updatePlanetReports.water + sent?.water
            : updatePlanetReports.water,
          food: sent?.food
            ? updatePlanetReports.food + sent?.food
            : updatePlanetReports.food,
          minerals: sent?.minerals
            ? updatePlanetReports.minerals + sent?.minerals
            : updatePlanetReports.minerals,
        },
      },
    )
  }

  async addReceive({
    planet,
    received,
  }: IAddToPlanetResourcesReceiveReportInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const planetReports = (await this.repository.findOne({ planet })) as any

    if (!planetReports ?? !planetReports.received) {
      const createResult = this.repository.create({
        planet,
        received: {
          water: received?.water ? Number(received?.water) : 0,
          food: received?.food ? Number(received?.food) : 0,
          minerals: received?.minerals ? Number(received?.minerals) : 0,
        },
      })

      await this.repository.save(createResult)
      return
    }

    const updatePlanetReports = {
      water:
        planetReports.received?.water === 0 || planetReports?.water === null
          ? 0
          : !planetReports.received?.water
          ? 0
          : planetReports.received.water,
      food:
        planetReports.received?.food === 0 ||
        planetReports.received?.food === null
          ? 0
          : !planetReports.received?.food
          ? 0
          : planetReports.received.food,
      minerals:
        planetReports.received?.minerals === 0 ||
        planetReports.received?.minerals === null
          ? 0
          : !planetReports.received?.minerals
          ? 0
          : planetReports.received.minerals,
    }

    console.log(planetReports)
    await this.repository.update(
      { planet },
      {
        received: {
          water: received?.water
            ? updatePlanetReports.water + received?.water
            : updatePlanetReports.water,
          food: received?.food
            ? updatePlanetReports.food + received?.food
            : updatePlanetReports.food,
          minerals: received?.minerals
            ? updatePlanetReports.minerals + received?.minerals
            : updatePlanetReports.minerals,
        },
      },
    )
  }
}
