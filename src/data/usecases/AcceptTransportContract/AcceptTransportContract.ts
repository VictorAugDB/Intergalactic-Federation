import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IUpdateContract } from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  IAcceptTransportContract,
  IAcceptTransportContractInput,
  IAcceptTransportContractResult,
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
  }: IAcceptTransportContractInput): Promise<IAcceptTransportContractResult> {
    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found!')
    }
    const { locationPlanet, shipId } = pilot

    const contract = await this.getContractRepository.getById(contractId)
    if (!contract) {
      throw new AppError('Contract not found!')
    }

    if (locationPlanet !== contract.originPlanet) {
      throw new AppError(
        'You cannot accept the contract without being on the contract originPlanet!',
      )
    }

    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }
    const { weightLevel, weightCapacity } = ship

    const { payload } = contract
    const contractResourcesWeight = payload.reduce(
      (acc: number, resource) => (acc += resource.weight),
      0,
    )
    if (weightCapacity < weightLevel + contractResourcesWeight) {
      throw new AppError(
        'Your ship cannot carry this contract resources weight',
      )
    }

    const { acceptanceDate } = await this.updateContractRepository.update({
      id: contractId,
      acceptanceDate: new Date(),
      pilotCerficiationDocument: certificationDocument,
    })
    if (!acceptanceDate) {
      throw new Error()
    }

    const { weightLevel: shipWeightLevel } =
      await this.updateShipRepository.update({
        id: shipId,
        weightLevel: weightLevel + contractResourcesWeight,
      })

    return { contractId, acceptanceDate, shipWeightLevel }
  }
}
