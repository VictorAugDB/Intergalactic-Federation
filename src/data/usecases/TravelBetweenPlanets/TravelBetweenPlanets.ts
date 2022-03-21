import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import {
  ITravelBetweenPlanets,
  ITravelBetweenPlanetsInput,
} from '@/domain/usecases/TravelBetweenPlanets'

export class TravelBetweenPlanetsUseCase implements ITravelBetweenPlanets {
  constructor(private readonly getPilotRepository: IGetPilot) {}

  async execute({
    certificationDocument,
    destinationPlanet,
  }: ITravelBetweenPlanetsInput): Promise<void> {
    await this.getPilotRepository.getByDocument(certificationDocument)
  }
}
