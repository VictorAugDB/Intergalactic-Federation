import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
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
    private readonly updatePilotRepository: IUpdatePilot,
    private readonly createTransactionReportRepository: ICreateTransactionReport,
  ) {}

  async execute({
    certificationDocument,
    amountOfFuel,
  }: IRefuelShipInput): Promise<IRefuelShipResult> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found!')
    }
    const { shipId, credits, name } = pilot
    const fuelPrice = amountOfFuel * 7

    if (credits < fuelPrice) {
      throw new AppError('You do not pay for this amount of fuel!')
    }

    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }
    const { fuelCapacity, fuelLevel } = ship
    const fuelLevelPlusAmountOfFuel = Number(fuelLevel) + Number(amountOfFuel)

    if (fuelCapacity < fuelLevelPlusAmountOfFuel) {
      throw new AppError(
        `The ship fuelCapacity is less than amountOfFuel that you want to refuel the max that you can refuel is ${
          fuelCapacity - fuelLevel
        }`,
      )
    }

    await this.updateShipRepository.update({
      id: shipId,
      fuelLevel: fuelLevelPlusAmountOfFuel,
    })

    await this.updatePilotRepository.update({
      certificationDocument,
      credits: credits - fuelPrice,
    })

    await this.createTransactionReportRepository.create(
      `${name} bought fuel: +₭${fuelPrice}`,
    )

    return { fuelLevel: fuelLevelPlusAmountOfFuel }
  }
}
