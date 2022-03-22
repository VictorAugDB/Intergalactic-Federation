import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdateShipRepositoryStub } from '@/data/mocks/stubs/makeUpdateShipRepositoryStub'
import { RefuelShipUseCase } from '@/data/usecases/RefuelShip/RefuelShip'
import { IRefuelShipInput } from '@/domain/usecases/RefuelShip'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}))

type ISutTypes = {
  sut: RefuelShipUseCase
  getShipRepositoryStub: IGetShip
  updateShipRepositoryStub: IUpdateShip
}

const makeFakeRequest = (): IRefuelShipInput => ({
  quantity: 10,
  shipId: 'any_id',
})

const makeSut = (): ISutTypes => {
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub({
    fuelCapacity: makeFakeRequest().quantity,
  })

  const sut = new RefuelShipUseCase(
    getShipRepositoryStub,
    updateShipRepositoryStub,
  )

  return {
    sut,
    getShipRepositoryStub,
    updateShipRepositoryStub,
  }
}

describe('PublishContractUseCase', () => {
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
        fuelLevel: mockFakeShip().fuelLevel + fakeRequest.quantity,
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
      fuelLevel: mockFakeShip().fuelLevel + fakeRequest.quantity,
    })
  })
})
