import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/GetPilot'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export class AddPilotUseCase implements IAddPilot {
  constructor(private readonly getPilotRepository: IGetPilot) {}

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

    if (pilot) {
      throw new AppError('Pilot already exists!')
    }

    return await Promise.resolve(mockFakePilot())
  }
}
