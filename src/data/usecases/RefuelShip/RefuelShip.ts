import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  IRefuelShip,
  IRefuelShipInput,
  IRefuelShipResult,
} from '@/domain/usecases/RefuelShip'

export class RefuelShipUseCase implements IRefuelShip {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
    private readonly updateShipRepository: IUpdateShip,
  ) {}

  async execute({
    certificationDocument,
    amountOfFuel,
  }: IRefuelShipInput): Promise<IRefuelShipResult> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found')
    }
    const { shipId } = pilot

    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }

    const { fuelLevel } = await this.updateShipRepository.update({
      id: shipId,
      fuelLevel: ship.fuelLevel + amountOfFuel,
    })

    return { fuelLevel }
  }
}
