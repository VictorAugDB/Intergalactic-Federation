import { Pilot } from '@/domain/entities/Pilot'
import { PilotsRepository } from '@/infra/repositories/PilotsRepository'
import { getRepository, Repository } from 'typeorm'

export const makePilotsRepositoryFactory = (): PilotsRepository => {
  return new PilotsRepository(getPilotRepository)
}

const getPilotRepository = (): Repository<Pilot> => getRepository(Pilot)
