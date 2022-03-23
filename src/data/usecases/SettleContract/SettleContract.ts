import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import { IUpdateContract } from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import { IAddToPilotTransportedResourcesReport } from '@/data/contracts/repositories/reports/AddToPilotTransportedResourcesReport'
import { IAddToPlanetResourcesReport } from '@/data/contracts/repositories/reports/AddToPlanetResourcesReportReport'
import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
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
    private readonly updateContractRepository: IUpdateContract,
    private readonly updatePilotRepository: IUpdatePilot,
    private readonly createTransationRepository: ICreateTransactionReport,
    private readonly addToPlanetResourcesReportRepository: IAddToPlanetResourcesReport,
    private readonly addToPilotTransportedResourcesReportRepository: IAddToPilotTransportedResourcesReport,
  ) {}

  async execute({
    contractId,
    certificationDocument,
  }: ISettleContractInput): Promise<void> {
    const contract = await this.getContractRepository.getById(contractId)
    if (!contract) {
      throw new AppError('Contract not found!')
    }
    const {
      settlementDate,
      pilotCerficiationDocument,
      value,
      destinationPlanet,
      payload,
    } = contract

    if (settlementDate) {
      throw new AppError('This contract is already settled!')
    }

    if (!pilotCerficiationDocument) {
      throw new AppError('This contract must be accepted on your originPlanet!')
    }

    if (certificationDocument !== pilotCerficiationDocument) {
      throw new AppError('You not have authorization to settle this contract!')
    }

    const pilot = await this.getPilotRepository.getByDocument(
      certificationDocument,
    )
    if (!pilot) {
      throw new AppError('Pilot not found!')
    }
    const { locationPlanet, shipId, credits, name } = pilot
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

    await this.updatePilotRepository.update({
      certificationDocument,
      credits: credits + value,
    })

    await this.createTransationRepository.create(
      `${contractId} Description paid -₭${value}`,
    )

    await this.addToPlanetResourcesReportRepository.add({
      planet: destinationPlanet,
      received: {
        water: payload.find((resource) => resource.name === 'water')?.weight,
        food: payload.find((resource) => resource.name === 'food')?.weight,
        minerals: payload.find((resource) => resource.name === 'minerals')
          ?.weight,
      },
    })

    await this.addToPilotTransportedResourcesReportRepository.add({
      pilotName: name,
      water: payload.find((resource) => resource.name === 'water')?.weight,
      food: payload.find((resource) => resource.name === 'food')?.weight,
      minerals: payload.find((resource) => resource.name === 'minerals')
        ?.weight,
    })
  }
}
