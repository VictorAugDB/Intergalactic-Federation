import { Ship } from '@/domain/entities/Ship'
import { ShipsRepository } from '@/infra/repositories/ShipsRepository'
import { getRepository, Repository } from 'typeorm'

export const makeShipsRepositoryFactory = (): ShipsRepository => {
  return new ShipsRepository(getShipRepository)
}

const getShipRepository = (): Repository<Ship> => getRepository(Ship)
