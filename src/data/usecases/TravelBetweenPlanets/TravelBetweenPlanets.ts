import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import {
  ITravelBetweenPlanets,
  ITravelBetweenPlanetsInput,
} from '@/domain/usecases/TravelBetweenPlanets'
import travelInfo from '@/travelInfo.json'

export class TravelBetweenPlanetsUseCase implements ITravelBetweenPlanets {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
  ) {}

  async execute({
    certificationDocument,
    destinationPlanet,
  }: ITravelBetweenPlanetsInput): Promise<void> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) throw new AppError('Pilot not found!')

    const planetInfo = travelInfo.infos.find(
      (info) => info.planet === pilot.locationPlanet,
    )
    if (!planetInfo) throw new Error()

    const isTravelPossible = planetInfo.possibleRoutes.find(
      (route) => route.to === destinationPlanet,
    )
    if (!isTravelPossible) {
      throw new AppError(
        'Unable to travel to this planet from your current location',
      )
    }

    const ship = await this.getShipRepository.getById(pilot.shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }

    const routeInfo = isTravelPossible
    if (ship.fuelLevel < routeInfo.fuelCost) {
      throw new AppError(
        "Unable to travel to this planet with the ship's fuel level",
      )
    }
  }
}
