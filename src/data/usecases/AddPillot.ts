import { AppError } from '@/application/errors/AppError'
import { ICheckShipAlreadyHasOwner } from '@/data/contracts/repositories/pilots/CheckShipAlreadyHasOwner'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export class AddPilotUseCase implements IAddPilot {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
    private readonly checkShipAlreadyHasOwnerRepository: ICheckShipAlreadyHasOwner,
  ) {}

  async execute({
    age,
    certificationDocument,
    credits,
    locationPlanet,
    name,
    shipId,
  }: IAddPilotInput): Promise<IPilot> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (pilot) throw new AppError('Pilot already exists!')

    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) throw new AppError('Ship does not exists!')

    if (ship.location !== locationPlanet)
      throw new AppError(
        "This pilot's locationPlanet must be the same as ship's location",
      )

    const shipAlreadyHasOwner =
      await this.checkShipAlreadyHasOwnerRepository.checkShipAlreadyHasOwner({
        shipId,
      })
    if (shipAlreadyHasOwner)
      throw new AppError('This ship already has an owner!')

    return await Promise.resolve(mockFakePilot())
  }
}
