import { AppError } from '@/application/errors/AppError'
import { IGetContract } from '@/data/contracts/repositories/contracts/GetContract'
import {
  IUpdateContract,
  IUpdateContractInput,
} from '@/data/contracts/repositories/contracts/UpdateContract'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdateShipRepositoryStub } from '@/data/mocks/stubs/makeUpdateShipRepositoryStub'
import { AcceptTransportContractUseCase } from '@/data/usecases/AcceptTransportContract/AcceptTransportContract'
import { IContract } from '@/domain/models/Contract'
import { IAcceptTransportContractInput } from '@/domain/usecases/AcceptTransportContract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
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

const mockFakeAcceptedContract = (): IContract => ({
  ...mockFakeContract(),
  acceptanceDate: new Date(),
})

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

  // describe('GetShipRepository', () => {
  //   test('Should call GetShipRepository with correct values', async () => {
  //     const { sut, getShipRepositoryStub } = makeSut()
  //     const fakeRequest = makeFakeRequest()
  //     const getShipRepoSpy = jest.spyOn(getShipRepositoryStub, 'getById')
  //     await sut.execute(fakeRequest)

  //     expect(getShipRepoSpy).toHaveBeenCalledWith('any_id')
  //   })

  //   test('Should throw if GetShipRepository throws', async () => {
  //     const { sut, getShipRepositoryStub } = makeSut()
  //     const fakeRequest = makeFakeRequest()
  //     jest
  //       .spyOn(getShipRepositoryStub, 'getById')
  //       .mockRejectedValueOnce(new Error())
  //     const promise = sut.execute(fakeRequest)

  //     await expect(promise).rejects.toThrowError()
  //   })
  // })

  // describe('UpdateShipRepository', () => {
  //   test('Should call UpdateShipRepository with correct values', async () => {
  //     const { sut, updateShipRepositoryStub } = makeSut()
  //     const fakeRequest = makeFakeRequest()
  //     const updateShipRepoSpy = jest.spyOn(updateShipRepositoryStub, 'update')
  //     await sut.execute(fakeRequest)

  //     expect(updateShipRepoSpy).toHaveBeenCalledWith({
  //       id: 'any_id',
  //       fuelLevel: 70 - 13,
  //     })
  //   })

  //   test('Should throw if UpdateShipRepository throws', async () => {
  //     const { sut, updateShipRepositoryStub } = makeSut()
  //     const fakeRequest = makeFakeRequest()
  //     jest
  //       .spyOn(updateShipRepositoryStub, 'update')
  //       .mockRejectedValueOnce(new Error())
  //     const promise = sut.execute(fakeRequest)

  //     await expect(promise).rejects.toThrowError()
  //   })
  // })

  test('Should throw an AppError if pilot not found', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByDocument')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(new AppError('Pilot not found!'))
  })

  test('Should not throw on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = sut.execute(fakeRequest)

    await expect(result).resolves.not.toThrow()
  })
})
