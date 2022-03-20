import { IGetPilot } from '@/data/contracts/repositories/GetPilot'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'

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

    return 'a' as unknown as IPilot
  }
}
