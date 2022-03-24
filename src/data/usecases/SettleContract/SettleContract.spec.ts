import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import {
  IUpdateContract,
  IUpdateContractInput,
} from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import {
  IAddToPilotTransportedResourcesReport,
  IAddToPilotTransportedResourcesReportInput,
} from '@/data/contracts/repositories/reports/AddToPilotTransportedResourcesReport'
import { IAddToPlanetResourcesReport } from '@/data/contracts/repositories/reports/AddToPlanetResourcesReportReport'
import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { mockFakeAcceptedContract } from '@/data/mocks/fakes/mockFakeAcceptContract'
import { mockFakeContractResourcesWeight } from '@/data/mocks/fakes/mockFakeContractResourcesWeight'
import { makeAddToPlanetResourcesReportRepositoryStub } from '@/data/mocks/stubs/makeAddToPlanetReportRepositoryStub'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdatePilotRepositoryStub } from '@/data/mocks/stubs/makeUpdatePilotRepositoryStub'
import { makeUpdateShipRepositoryStub } from '@/data/mocks/stubs/makeUpdateShipRepositoryStub'
import { SettleContractUseCase } from '@/data/usecases/SettleContract/SettleContract'
import { IContract } from '@/domain/models/Contract'
import { IShip } from '@/domain/models/Ship'
import { ISettleContractInput } from '@/domain/usecases/SettleContrac'
import { mockFakeContract } from '@/shared/mocks/fakeContract'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'
import MockDate from 'mockdate'

type ISutTypes = {
  sut: SettleContractUseCase
  getPilotRepositoryStub: IGetPilot
  getShipRepositoryStub: IGetShip
  getContractRepositoryStub: IGetContract
  updateShipRepositoryStub: IUpdateShip
  updatePilotRepositoryStub: IUpdatePilot
  updateContractRepositoryStub: IUpdateContract
  createTransactionReportRepositoryStub: ICreateTransactionReport
  addToPlanetResourcesReportRepositoryStub: IAddToPlanetResourcesReport
  addToPilotTransportedResourcesReportRepositoryStub: IAddToPilotTransportedResourcesReport
}

Date.now = jest.fn(() => 1487076708000)

MockDate.set(new Date(1487076708000))

const makeFakeRequest = (): ISettleContractInput => ({
  certificationDocument: 'any_document',
  contractId: 'any_id',
})

const mockFakeShipWithCustomWeightLevel = (): IShip => ({
  ...mockFakeShip(),
  weightLevel: 20,
})

export const mockFakeSettledContract = (): IContract => ({
  ...mockFakeAcceptedContract(),
  settlementDate: new Date(),
})

export const makeGetContractRepositoryStub = (): IGetContract => {
  class GetContractRepositoryUseCaseStub implements IGetContract {
    async getById(id: string): Promise<IContract | undefined> {
      return mockFakeAcceptedContract()
    }
  }

  return new GetContractRepositoryUseCaseStub()
}

export const makeUpdateContractRepositoryStub = (): IUpdateContract => {
  class UpdateContractRepositoryUseCaseStub implements IUpdateContract {
    async update(data: IUpdateContractInput): Promise<IContract> {
      return mockFakeSettledContract()
    }
  }

  return new UpdateContractRepositoryUseCaseStub()
}

const makeCreateTransationReportRepositoryStub =
  (): ICreateTransactionReport => {
    class CreateTransationReportRepositoryUseCaseStub
      implements ICreateTransactionReport
    {
      async create(description: string): Promise<void> {}
    }

    return new CreateTransationReportRepositoryUseCaseStub()
  }

const makeAddToPilotTransportedResourcesReportRepositoryStub =
  (): IAddToPilotTransportedResourcesReport => {
    class AddToPilotTransportedResourcesReportRepositoryUseCaseStub
      implements IAddToPilotTransportedResourcesReport
    {
      async add(
        data: IAddToPilotTransportedResourcesReportInput,
      ): Promise<void> {}
    }

    return new AddToPilotTransportedResourcesReportRepositoryUseCaseStub()
  }

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(mockFakePilot())
  const getShipRepositoryStub = makeGetShipRepositoryStub(
    mockFakeShipWithCustomWeightLevel(),
  )
  const getContractRepositoryStub = makeGetContractRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub()
  const updateContractRepositoryStub = makeUpdateContractRepositoryStub()
  const updatePilotRepositoryStub = makeUpdatePilotRepositoryStub()
  const createTransactionReportRepositoryStub =
    makeCreateTransationReportRepositoryStub()
  const addToPlanetResourcesReportRepositoryStub =
    makeAddToPlanetResourcesReportRepositoryStub()
  const addToPilotTransportedResourcesReportRepositoryStub =
    makeAddToPilotTransportedResourcesReportRepositoryStub()

  const sut = new SettleContractUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    getContractRepositoryStub,
    updateShipRepositoryStub,
    updateContractRepositoryStub,
    updatePilotRepositoryStub,
    createTransactionReportRepositoryStub,
    addToPlanetResourcesReportRepositoryStub,
    addToPilotTransportedResourcesReportRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    getContractRepositoryStub,
    updateShipRepositoryStub,
    updatePilotRepositoryStub,
    updateContractRepositoryStub,
    createTransactionReportRepositoryStub,
    addToPlanetResourcesReportRepositoryStub,
    addToPilotTransportedResourcesReportRepositoryStub,
  }
}

describe('SettleContractUseCase', () => {
  describe('GetPilotRepository', () => {
    test('Should call GetPilotRepository with correct values', async () => {
      const { sut, getPilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getPilotRepoSpy = jest.spyOn(
        getPilotRepositoryStub,
        'getByDocument',
      )
      await sut.execute(fakeRequest)

      expect(getPilotRepoSpy).toHaveBeenCalledWith(
        fakeRequest.certificationDocument,
      )
    })

    test('Should throw if GetPilotRepository throws', async () => {
      const { sut, getPilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(getPilotRepositoryStub, 'getByDocument')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('GetContractRepository', () => {
    test('Should call GetContractRepository with correct values', async () => {
      const { sut, getContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getContractRepoSpy = jest.spyOn(
        getContractRepositoryStub,
        'getById',
      )
      await sut.execute(fakeRequest)

      expect(getContractRepoSpy).toHaveBeenCalledWith(fakeRequest.contractId)
    })

    test('Should throw if GetContractRepository throws', async () => {
      const { sut, getContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(getContractRepositoryStub, 'getById')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('GetShipRepository', () => {
    test('Should call GetShipRepository with correct values', async () => {
      const { sut, getShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getShipRepoSpy = jest.spyOn(getShipRepositoryStub, 'getById')
      await sut.execute(fakeRequest)

      expect(getShipRepoSpy).toHaveBeenCalledWith('any_id')
    })

    test('Should throw if GetShipRepository throws', async () => {
      const { sut, getShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(getShipRepositoryStub, 'getById')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('UpdateShipRepository', () => {
    test('Should call UpdateShipRepository with correct values', async () => {
      const { sut, updateShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updateShipRepoSpy = jest.spyOn(updateShipRepositoryStub, 'update')
      await sut.execute(fakeRequest)

      expect(updateShipRepoSpy).toHaveBeenCalledWith({
        id: 'any_id',
        weightLevel:
          mockFakeShipWithCustomWeightLevel().weightLevel -
          mockFakeContractResourcesWeight(),
      })
    })

    test('Should throw if UpdateShipRepository throws', async () => {
      const { sut, updateShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(updateShipRepositoryStub, 'update')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('UpdateContractRepository', () => {
    test('Should call UpdateContractRepository with correct values', async () => {
      const { sut, updateContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updateContractRepoSpy = jest.spyOn(
        updateContractRepositoryStub,
        'update',
      )
      await sut.execute(fakeRequest)

      expect(updateContractRepoSpy).toHaveBeenCalledWith({
        id: 'any_id',
        settlementDate: new Date(),
      })
    })

    test('Should throw if UpdateContractRepository throws', async () => {
      const { sut, updateContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(updateContractRepositoryStub, 'update')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('UpdatePilotRepository', () => {
    test('Should call UpdatePilotRepository with correct values', async () => {
      const { sut, updatePilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updatePilotRepoSpy = jest.spyOn(updatePilotRepositoryStub, 'update')
      await sut.execute(fakeRequest)

      expect(updatePilotRepoSpy).toHaveBeenCalledWith({
        certificationDocument: 'any_document',
        credits: mockFakePilot().credits + mockFakeSettledContract().value,
      })
    })

    test('Should throw if UpdatePilotRepository throws', async () => {
      const { sut, updatePilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(updatePilotRepositoryStub, 'update')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('CreateTransactionReport', () => {
    test('Should call CreateTransactionReport with correct values', async () => {
      const { sut, createTransactionReportRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const createTransactionRepoSpy = jest.spyOn(
        createTransactionReportRepositoryStub,
        'create',
      )
      await sut.execute(fakeRequest)
      const settledContract = mockFakeSettledContract()

      expect(createTransactionRepoSpy).toHaveBeenCalledWith(
        `${settledContract.id} Description paid -₭${settledContract.value}`,
      )
    })

    test('Should throw if CreateTransactionReport throws', async () => {
      const { sut, createTransactionReportRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(createTransactionReportRepositoryStub, 'create')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('AddToPlanetResourcesReport', () => {
    test('Should call AddToPlanetResourcesReport with correct values', async () => {
      const { sut, addToPlanetResourcesReportRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const addToPlanetResourcesRepoSpy = jest.spyOn(
        addToPlanetResourcesReportRepositoryStub,
        'add',
      )
      await sut.execute(fakeRequest)

      expect(addToPlanetResourcesRepoSpy).toHaveBeenCalledWith({
        planet: 'aqua',
        received: { food: 5, minerals: 1, water: 10 },
      })
    })

    test('Should throw if AddToPlanetResourcesReport throws', async () => {
      const { sut, addToPlanetResourcesReportRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(addToPlanetResourcesReportRepositoryStub, 'add')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('AddToPilotTransportedResourcesReport', () => {
    test('Should call AddToPilotTransportedResourcesReport with correct values', async () => {
      const { sut, addToPilotTransportedResourcesReportRepositoryStub } =
        makeSut()
      const fakeRequest = makeFakeRequest()
      const addToPlanetResourcesRepoSpy = jest.spyOn(
        addToPilotTransportedResourcesReportRepositoryStub,
        'add',
      )
      await sut.execute(fakeRequest)

      expect(addToPlanetResourcesRepoSpy).toHaveBeenCalledWith({
        pilotName: mockFakePilot().name,
        water: 10,
        food: 5,
        minerals: 1,
      })
    })

    test('Should throw if AddToPilotTransportedResourcesReport throws', async () => {
      const { sut, addToPilotTransportedResourcesReportRepositoryStub } =
        makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(addToPilotTransportedResourcesReportRepositoryStub, 'add')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  test('Should throw an AppError if pilot not found', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByDocument')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(new AppError('Pilot not found!'))
  })

  test('Should throw an AppError if contract not found', async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest
      .spyOn(getContractRepositoryStub, 'getById')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Contract not found!'),
    )
  })

  test('Should throw an AppError if ship not found', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest
      .spyOn(getShipRepositoryStub, 'getById')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(new AppError('Ship not found!'))
  })

  test('Should throw an AppError if contract is already settled', async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest.spyOn(getContractRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeAcceptedContract(),
      settlementDate: new Date(),
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('This contract is already settled!'),
    )
  })

  test('Should throw an AppError if contract not return pilotCertificationDocument', async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest
      .spyOn(getContractRepositoryStub, 'getById')
      .mockResolvedValueOnce(mockFakeContract())

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('This contract must be accepted on your originPlanet!'),
    )
  })

  test('Should throw an AppError if pilotCertificationDocument saved on the contract is not the same as certificationDocument passed on request', async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest.spyOn(getContractRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeAcceptedContract(),
      pilotCerficiationDocument: 'other_document',
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('You not have authorization to settle this contract!'),
    )
  })

  test("Should throw an AppError if pilot is not on the same planet as contract's originPlanet", async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest.spyOn(getContractRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeAcceptedContract(),
      originPlanet: 'calas',
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError(
        'You cannot accept the contract without being on the contract originPlanet!',
      ),
    )
  })

  test('Should throw an AppError if ship weightLevel minus contract resources weight is less than zero', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest.spyOn(getShipRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeShip(),
      weightLevel: 0,
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError(
        'You cannot settle this contract because you do not have the resources!',
      ),
    )
  })

  test('Should not throw on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const promise = sut.execute(fakeRequest)

    await expect(promise).resolves.not.toThrow()
  })
})
