import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IUpdateContract } from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  IAcceptTransportContract,
  IAcceptTransportContractInput,
} from '@/domain/usecases/AcceptTransportContract'

export class AcceptTransportContractUseCase
  implements IAcceptTransportContract
{
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
    private readonly getContractRepository: IGetContract,
    private readonly updateShipRepository: IUpdateShip,
    private readonly updateContractRepository: IUpdateContract,
  ) {}

  async execute({
    contractId,
    certificationDocument,
  }: IAcceptTransportContractInput): Promise<void> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found!')
    }

    const contract = await this.getContractRepository.getById(contractId)
    if (!contract) {
      throw new AppError('Contract not found!')
    }
  }
}
