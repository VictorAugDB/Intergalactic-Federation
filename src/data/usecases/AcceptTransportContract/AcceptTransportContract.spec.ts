import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import {
  IUpdateContract,
  IUpdateContractInput,
} from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { mockFakeAcceptedContract } from '@/data/mocks/fakes/mockFakeAcceptContract'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdateShipRepositoryStub } from '@/data/mocks/stubs/makeUpdateShipRepositoryStub'
import { AcceptTransportContractUseCase } from '@/data/usecases/AcceptTransportContract/AcceptTransportContract'
import { IContract } from '@/domain/models/Contract'
import { IAcceptTransportContractInput } from '@/domain/usecases/AcceptTransportContract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'
import MockDate from 'mockdate'

type ISutTypes = {
  sut: AcceptTransportContractUseCase
  getPilotRepositoryStub: IGetPilot
  getShipRepositoryStub: IGetShip
  getContractRepositoryStub: IGetContract
  updateShipRepositoryStub: IUpdateShip
  updateContractRepositoryStub: IUpdateContract
}

Date.now = jest.fn(() => 1487076708000)

MockDate.set(new Date(1487076708000))

const makeFakeRequest = (): IAcceptTransportContractInput => ({
  certificationDocument: 'any_document',
  contractId: 'any_id',
})

const mockFakeContractResourcesWeight = (): number =>
  mockFakeContract().payload.reduce(
    (acc: number, resource) => (acc += resource.weight),
    0,
  )

export const makeGetContractRepositoryStub = (): IGetContract => {
  class GetContractRepositoryUseCaseStub implements IGetContract {
    async getById(id: string): Promise<IContract | undefined> {
      return mockFakeContract()
    }
  }

  return new GetContractRepositoryUseCaseStub()
}

export const makeUpdateContractRepositoryStub = (): IUpdateContract => {
  class UpdateContractRepositoryUseCaseStub implements IUpdateContract {
    async update(data: IUpdateContractInput): Promise<IContract> {
      return mockFakeAcceptedContract()
    }
  }

  return new UpdateContractRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(mockFakePilot())
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const getContractRepositoryStub = makeGetContractRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub()
  const updateContractRepositoryStub = makeUpdateContractRepositoryStub()

  const sut = new AcceptTransportContractUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    getContractRepositoryStub,
    updateShipRepositoryStub,
    updateContractRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updateShipRepositoryStub,
    getContractRepositoryStub,
    updateContractRepositoryStub,
  }
}

describe('AcceptTransportContractUseCase', () => {
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
          mockFakeShip().weightLevel + mockFakeContractResourcesWeight(),
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
        acceptanceDate: new Date(),
        pilotCerficiationDocument: mockFakePilot().certificationDocument,
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

    test('Should throw if UpdateContractRepository not return acceptanceDate', async () => {
      const { sut, updateContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest.spyOn(updateContractRepositoryStub, 'update').mockResolvedValueOnce({
        ...mockFakeContract(),
      })
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

  test("Should throw an AppError if pilot is not on the same planet as contract's originPlanet", async () => {
    const { sut, getContractRepositoryStub } = makeSut()
    jest.spyOn(getContractRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeContract(),
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

  test('Should throw an AppError if ship weightCapacity is less than your weightLevel plus contract resource weight', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest.spyOn(getShipRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeShip(),
      weightCapacity: 5,
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Your ship cannot carry this contract resources weight'),
    )
  })

  test('Should return correct data on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = await sut.execute(fakeRequest)

    expect(result).toEqual({
      acceptanceDate: new Date(),
      contractId: 'any_id',
      shipWeightLevel:
        mockFakeShip().weightLevel + mockFakeContractResourcesWeight(),
    })
  })
})
