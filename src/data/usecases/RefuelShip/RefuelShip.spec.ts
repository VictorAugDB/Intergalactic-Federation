import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdateShipRepositoryStub } from '@/data/mocks/stubs/makeUpdateShipRepositoryStub'
import { RefuelShipUseCase } from '@/data/usecases/RefuelShip/RefuelShip'
import { IRefuelShipInput } from '@/domain/usecases/RefuelShip'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}))

type ISutTypes = {
  sut: RefuelShipUseCase
  getShipRepositoryStub: IGetShip
  updateShipRepositoryStub: IUpdateShip
  getPilotRepositoryStub: IGetPilot
}

const makeFakeRequest = (): IRefuelShipInput => ({
  certificationDocument: 'any_document',
  amountOfFuel: 10,
})

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(mockFakePilot())
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub({
    fuelCapacity: makeFakeRequest().amountOfFuel,
  })

  const sut = new RefuelShipUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updateShipRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updateShipRepositoryStub,
  }
}

describe('PublishContractUseCase', () => {
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
        fuelLevel: mockFakeShip().fuelLevel + fakeRequest.amountOfFuel,
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

  test('Should return fuelLevel on sucess', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = await sut.execute(fakeRequest)

    expect(result).toEqual({
      fuelLevel: mockFakeShip().fuelLevel + fakeRequest.amountOfFuel,
    })
  })
})
