import { ICreateShip } from '@/data/contracts/repositories/ships/CreateShip'
import { Ship } from '@/domain/entities/Ship'
import { IShip } from '@/domain/models/Ship'
import { getRepository, Repository } from 'typeorm'

export class ShipsRepository implements ICreateShip {
  async create({
    fuelCapacity,
    fuelLevel,
    id,
    location,
    weightCapacity,
    weightLevel,
  }: IShip): Promise<IShip> {
    const shipRepository = getShipRepository()
    const ship = shipRepository.create({
      fuelCapacity,
      fuelLevel,
      id,
      location,
      weightCapacity,
      weightLevel,
    })
    const createdShip = await shipRepository.save(ship)
    return createdShip
  }
}

const getShipRepository = (): Repository<Ship> => getRepository(Ship)
