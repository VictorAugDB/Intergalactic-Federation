import { AppError } from '@/application/errors/AppError'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  IRefuelShip,
  IRefuelShipInput,
  IRefuelShipResult,
} from '@/domain/usecases/RefuelShip'

export class RefuelShipUseCase implements IRefuelShip {
  constructor(
    private readonly getShipRepository: IGetShip,
    private readonly updateShipRepository: IUpdateShip,
  ) {}

  async execute({
    quantity,
    shipId,
  }: IRefuelShipInput): Promise<IRefuelShipResult> {
    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }
    const { fuelLevel } = await this.updateShipRepository.update({
      id: shipId,
      fuelLevel: ship.fuelLevel + quantity,
    })

    return { fuelLevel }
  }
}
