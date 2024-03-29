import { ICreateShip } from '@/data/contracts/repositories/ships/CreateShip'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import {
  IUpdateShip,
  IUpdateShipInput,
} from '@/data/contracts/repositories/ships/UpdateShip'
import { Ship } from '@/domain/entities/Ship'
import { IShip } from '@/domain/models/Ship'
import { Repository } from 'typeorm'

export class ShipsRepository implements ICreateShip, IGetShip, IUpdateShip {
  repository: Repository<Ship> | undefined

  constructor(private readonly makeRepository: () => Repository<Ship>) {
    this.repository = undefined
  }

  singletonRepository(): void {
    if (!this.repository) {
      this.repository = this.makeRepository()
    }
  }

  async create({
    fuelCapacity,
    fuelLevel,
    id,
    location,
    weightCapacity,
    weightLevel,
  }: IShip): Promise<IShip> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const ship = this.repository.create({
      fuelCapacity,
      fuelLevel,
      id,
      location,
      weightCapacity,
      weightLevel,
    })
    const createdShip = await this.repository.save(ship)
    return createdShip
  }

  async getById(id: string): Promise<IShip | undefined> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }

    const ship = await this.repository.findOne({ id })
    return ship
  }

  async update(input: IUpdateShipInput): Promise<void> {
    this.singletonRepository()
    if (!this.repository) {
      throw new Error()
    }
    const updateData = JSON.parse(JSON.stringify(input))

    await this.repository.update(
      { id: input.id },
      {
        ...updateData,
      },
    )
  }
}
