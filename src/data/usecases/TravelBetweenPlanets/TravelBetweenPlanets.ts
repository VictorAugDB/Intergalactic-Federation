import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import {
  ITravelBetweenPlanets,
  ITravelBetweenPlanetsInput,
} from '@/domain/usecases/TravelBetweenPlanets'
import travelInfo from '@/travelInfo.json'

export class TravelBetweenPlanetsUseCase implements ITravelBetweenPlanets {
  constructor(private readonly getPilotRepository: IGetPilot) {}

  async execute({
    certificationDocument,
    destinationPlanet,
  }: ITravelBetweenPlanetsInput): Promise<void> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) throw new AppError('Pilot was not found!')

    const planetInfo = travelInfo.infos.find(
      (info) => info.planet === pilot.locationPlanet,
    )
    if (!planetInfo) throw new Error()
  }
}
