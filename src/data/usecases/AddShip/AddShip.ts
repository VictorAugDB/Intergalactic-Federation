import { ICreateShip } from '@/data/contracts/repositories/ships/CreateShip'
import { IShip } from '@/domain/models/Ship'
import { IAddShip, IAddShipInput } from '@/domain/usecases/AddShip'
import { v4 as uuidV4 } from 'uuid'

export class AddShipUseCase implements IAddShip {
  constructor(private readonly createShipRepository: ICreateShip) {}

  async execute({
    fuelCapacity,
    fuelLevel,
    location,
    weightCapacity,
  }: IAddShipInput): Promise<IShip> {
    const id = uuidV4()
    const ship = await this.createShipRepository.create({
      id,
      fuelCapacity,
      fuelLevel,
      location,
      weightCapacity,
    })

    return ship
  }
}
