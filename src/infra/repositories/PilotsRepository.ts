import {
  ICheckShipAlreadyHasOwner,
  ICheckShipAlreadyHasOwnerInput,
} from '@/data/contracts/repositories/pilots/CheckShipAlreadyHasOwner'
import { ICreatePilot } from '@/data/contracts/repositories/pilots/CreatePilot'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import {
  IUpdatePilot,
  IUpdatePilotInput,
} from '@/data/contracts/repositories/pilots/UpdatePilot'
import { Pilot } from '@/domain/entities/Pilot'
import { IPilot } from '@/domain/models/Pilot'
import { Repository } from 'typeorm'

export class PilotsRepository
  implements ICreatePilot, IGetPilot, IUpdatePilot, ICheckShipAlreadyHasOwner
{
  repository: Repository<Pilot> | undefined

  constructor(private readonly makeRepository: () => Repository<Pilot>) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async create({
    age,
    certificationDocument,
    credits,
    locationPlanet,
    name,
    shipId,
  }: IPilot): Promise<IPilot> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilot = this.repository.create({
      age,
      certificationDocument,
      credits,
      locationPlanet,
      name,
      shipId,
    })
    const createdPilot = await this.repository.save(pilot)
    return createdPilot
  }

  async getByDocument(
    certificationDocument: string,
  ): Promise<IPilot | undefined> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilot = await this.repository.findOne({ certificationDocument })
    return pilot
  }

  async getByName(name: string): Promise<IPilot | undefined> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilot = await this.repository.findOne({ name })
    return pilot
  }

  async update(input: IUpdatePilotInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const updateData = JSON.parse(JSON.stringify(input))

    await this.repository.update(
      { certificationDocument: input.certificationDocument },
      {
        ...updateData,
      },
    )
  }

  async checkShipAlreadyHasOwner({
    shipId,
  }: ICheckShipAlreadyHasOwnerInput): Promise<boolean> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const pilot = await this.repository.findOne({ shipId })
    if (!pilot) {
      return false
    }

    return true
  }
}
