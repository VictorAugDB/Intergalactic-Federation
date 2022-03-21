import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  ITravelBetweenPlanets,
  ITravelBetweenPlanetsInput,
} from '@/domain/usecases/TravelBetweenPlanets'
import travelInfo from '@/travelInfo.json'

export class TravelBetweenPlanetsUseCase implements ITravelBetweenPlanets {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
    private readonly updatePilotRepository: IUpdatePilot,
    private readonly updateShipRepository: IUpdateShip,
  ) {}

  async execute({
    certificationDocument,
    destinationPlanet,
  }: ITravelBetweenPlanetsInput): Promise<void> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) throw new AppError('Pilot not found!')
    const { locationPlanet, shipId } = pilot

    const planetInfo = travelInfo.infos.find(
      (info) => info.planet === locationPlanet,
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

    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }

    const routeInfo = isTravelPossible
    if (ship.fuelLevel < routeInfo.fuelCost) {
      throw new AppError(
        "Unable to travel to this planet with the ship's fuel level",
      )
    }

    await this.updatePilotRepository.update({
      certificationDocument,
      locationPlanet: destinationPlanet,
    })

    await this.updateShipRepository.update({
      id: ship.id,
      fuelLevel: ship.fuelLevel - routeInfo.fuelCost,
    })
  }
}
