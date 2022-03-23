import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IUpdateContract } from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
import { IUpdatePilotTransportedResourcesReport } from '@/data/contracts/repositories/reports/UpdatePilotTransportedResourcesReport'
import { IUpdatePlanetResourcesReport } from '@/data/contracts/repositories/reports/UpdatePlanetResourcesReportReport'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import {
  ISettleContract,
  ISettleContractInput,
} from '@/domain/usecases/SettleContrac'

export class SettleContractUseCase implements ISettleContract {
  constructor(
    private readonly getPilotRepository: IGetPilot,
    private readonly getShipRepository: IGetShip,
    private readonly getContractRepository: IGetContract,
    private readonly updateShipRepository: IUpdateShip,
    private readonly updatePilotRepository: IUpdatePilot,
    private readonly updateContractRepository: IUpdateContract,
    private readonly createTransationRepository: ICreateTransactionReport,
    private readonly updatePlanetResourcesReportRepository: IUpdatePlanetResourcesReport,
    private readonly updatePilotTransportedResourcesReportRepository: IUpdatePilotTransportedResourcesReport,
  ) {}

  async execute({
    contractId,
    certificationDocument,
  }: ISettleContractInput): Promise<void> {
    const contract = await this.getContractRepository.getById(contractId)
    if (!contract) {
      throw new AppError('Contract not found!')
    }

    if (contract.settlementDate) {
      throw new AppError('This contract is already settled!')
    }

    if (!contract.pilotCerficiationDocument) {
      throw new AppError('This contract must be accepted on your originPlanet!')
    }
    const { pilotCerficiationDocument } = contract

    if (certificationDocument !== pilotCerficiationDocument) {
      throw new AppError('You not have authorization to settle this contract!')
    }

    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found!')
    }
    const { locationPlanet, shipId } = pilot
    const { originPlanet } = contract

    if (locationPlanet !== originPlanet) {
      throw new AppError(
        'You cannot accept the contract without being on the contract originPlanet!',
      )
    }
    const ship = await this.getShipRepository.getById(shipId)
    if (!ship) {
      throw new AppError('Ship not found!')
    }

    const { weightLevel } = ship
    const { payload } = contract
    const contractResourcesWeight = payload.reduce(
      (acc: number, resource) => (acc += resource.weight),
      0,
    )

    if (weightLevel - contractResourcesWeight < 0) {
      throw new AppError(
        'You cannot settle this contract because you do not have the resources!',
      )
    }

    await this.updateShipRepository.update({
      id: shipId,
      weightLevel: weightLevel - contractResourcesWeight,
    })

    await this.updateContractRepository.update({
      id: contractId,
      settlementDate: new Date(),
    })
  }
}
