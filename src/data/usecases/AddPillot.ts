import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export class AddPilotUseCase implements IAddPilot {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
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

    return await Promise.resolve(mockFakePilot())
  }
}
