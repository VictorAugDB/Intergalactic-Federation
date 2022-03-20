import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { AddPilotUseCase } from '@/data/usecases/AddPillot'
import { IPilot } from '@/domain/models/Pilot'
import { IShip } from '@/domain/models/Ship'
import { IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

type ISutTypes = {
  sut: AddPilotUseCase
  getPilotRepositoryStub: IGetPilot
  getShipRepositoryStub: IGetShip
}

const makeFakeRequest = (): IAddPilotInput => ({
  ...mockFakePilot(),
  shipId: 'any_id',
})

const makeGetPilotRepositoryStub = (): IGetPilot => {
  class GetPilotRepositoryUseCaseStub implements IGetPilot {
    async getByDocument(document: string): Promise<IPilot | undefined> {
      return undefined
    }
  }

  return new GetPilotRepositoryUseCaseStub()
}

const makeGetShipRepositoryStub = (): IGetShip => {
  class GetShipRepositoryUseCaseStub implements IGetShip {
    async getById(id: string): Promise<IShip> {
      return mockFakeShip()
    }
  }

  return new GetShipRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub()
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const sut = new AddPilotUseCase(getPilotRepositoryStub, getShipRepositoryStub)

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
  }
}

describe('AddPilot', () => {
  describe('GetPilotRepository', () => {
    test('Should call GetShipRepository with correct values', async () => {
      const { sut, getPilotRepositoryStub } = makeSut()
      const getPilotRepoSpy = jest.spyOn(
        getPilotRepositoryStub,
        'getByDocument',
      )

      const fakeRequest = makeFakeRequest()
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

      expect(getShipRepoSpy).toHaveBeenCalledWith(fakeRequest.shipId)
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

  test('Should throw an AppError if pilot already exists', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByDocument')
      .mockResolvedValueOnce(mockFakePilot())

    const fakeRequest = makeFakeRequest()
    const promise = sut.execute(fakeRequest)

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Pilot already exists!'),
    )
  })

  test('Should throw an AppError if ship not exists', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest
      .spyOn(getShipRepositoryStub, 'getById')
      .mockResolvedValueOnce(undefined)

    const fakeRequest = makeFakeRequest()
    const promise = sut.execute(fakeRequest)

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Ship does not exists!'),
    )
  })
})
