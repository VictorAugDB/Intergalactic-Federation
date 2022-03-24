import { AddShipUseCase } from '@/data/usecases/AddShip/AddShip'
import { Ship } from '@/domain/entities/Ship'
import { ShipsRepository } from '@/infra/repositories/ShipsRepository'
import { getRepository, Repository } from 'typeorm'

export const makeAddShipUseCaseFactory = (): AddShipUseCase => {
  const shipsRepository = new ShipsRepository(getShipRepository)
  return new AddShipUseCase(shipsRepository)
}

const getShipRepository = (): Repository<Ship> => getRepository(Ship)
