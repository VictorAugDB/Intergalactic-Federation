import { AppError } from '@/application/errors/AppError'
import {
  ICheckShipAlreadyHasOwner,
  ICheckShipAlreadyHasOwnerInput,
} from '@/data/contracts/repositories/pilots/CheckShipAlreadyHasOwner'
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
  checkShipAlreadyHasOwnerRepositoryStub: ICheckShipAlreadyHasOwner
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

const makeCheckShipAlreadyHasOwnerRepositoryStub =
  (): ICheckShipAlreadyHasOwner => {
    class CheckShipAlreadyHasOwnerRepositoryUseCaseStub
      implements ICheckShipAlreadyHasOwner
    {
      async checkShipAlreadyHasOwner(
        input: ICheckShipAlreadyHasOwnerInput,
      ): Promise<boolean> {
        return false
      }
    }

    return new CheckShipAlreadyHasOwnerRepositoryUseCaseStub()
  }

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub()
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const checkShipAlreadyHasOwnerRepositoryStub =
    makeCheckShipAlreadyHasOwnerRepositoryStub()
  const sut = new AddPilotUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    checkShipAlreadyHasOwnerRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    checkShipAlreadyHasOwnerRepositoryStub,
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

  test("Should throw an AppError if pilot's locationPlanet is not the same as ship's location", async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest.spyOn(getShipRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeShip(),
      location: 'any_location',
    })

    const fakeRequest = makeFakeRequest()
    const promise = sut.execute(fakeRequest)

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError(
        "This pilot's locationPlanet must be the same as ship's location",
      ),
    )
  })

  test('Should throw an AppError if the ship is already has an owner', async () => {
    const { sut, checkShipAlreadyHasOwnerRepositoryStub } = makeSut()
    jest
      .spyOn(checkShipAlreadyHasOwnerRepositoryStub, 'checkShipAlreadyHasOwner')
      .mockResolvedValueOnce(true)

    const fakeRequest = makeFakeRequest()
    const promise = sut.execute(fakeRequest)

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('This ship already has an owner!'),
    )
  })
})
