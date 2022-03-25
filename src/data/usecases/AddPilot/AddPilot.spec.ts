import { AppError } from '@/application/errors/AppError'
import {
  ICheckShipAlreadyHasOwner,
  ICheckShipAlreadyHasOwnerInput,
} from '@/data/contracts/repositories/pilots/CheckShipAlreadyHasOwner'
import { ICreatePilot } from '@/data/contracts/repositories/pilots/CreatePilot'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { AddPilotUseCase } from '@/data/usecases/AddPilot/AddPilot'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

type ISutTypes = {
  sut: AddPilotUseCase
  getPilotRepositoryStub: IGetPilot
  getShipRepositoryStub: IGetShip
  checkShipAlreadyHasOwnerRepositoryStub: ICheckShipAlreadyHasOwner
  createPilotRepositoryStub: ICreatePilot
}

const makeFakeRequest = (): IAddPilotInput => ({
  ...mockFakePilot(),
  shipId: 'any_id',
})

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

const makeCreatePilotRepositoryStub = (): ICreatePilot => {
  class CreatePilotRepositoryUseCaseStub implements ICreatePilot {
    async create(data: IPilot): Promise<IPilot> {
      return mockFakePilot()
    }
  }

  return new CreatePilotRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(undefined)
  const getShipRepositoryStub = makeGetShipRepositoryStub(mockFakeShip())
  const checkShipAlreadyHasOwnerRepositoryStub =
    makeCheckShipAlreadyHasOwnerRepositoryStub()
  const createPilotRepositoryStub = makeCreatePilotRepositoryStub()

  const sut = new AddPilotUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    checkShipAlreadyHasOwnerRepositoryStub,
    createPilotRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    checkShipAlreadyHasOwnerRepositoryStub,
    createPilotRepositoryStub,
  }
}

describe('AddPilotUseCase', () => {
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

  describe('CheckShipAlreadyHasOwner', () => {
    test('Should call CheckShipAlreadyHasOwner with correct values', async () => {
      const { sut, checkShipAlreadyHasOwnerRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getShipRepoSpy = jest.spyOn(
        checkShipAlreadyHasOwnerRepositoryStub,
        'checkShipAlreadyHasOwner',
      )
      await sut.execute(fakeRequest)

      expect(getShipRepoSpy).toHaveBeenCalledWith({
        shipId: fakeRequest.shipId,
      })
    })

    test('Should throw if CheckShipAlreadyHasOwner throws', async () => {
      const { sut, checkShipAlreadyHasOwnerRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(
          checkShipAlreadyHasOwnerRepositoryStub,
          'checkShipAlreadyHasOwner',
        )
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  describe('CreatePilotRepository', () => {
    test('Should call CreatePilotRepository with correct values', async () => {
      const { sut, createPilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getShipRepoSpy = jest.spyOn(createPilotRepositoryStub, 'create')
      await sut.execute(fakeRequest)

      expect(getShipRepoSpy).toHaveBeenCalledWith(fakeRequest)
    })

    test('Should throw if CreatePilotRepository throws', async () => {
      const { sut, createPilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(createPilotRepositoryStub, 'create')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  test('Should throw an AppError if already exists pilot with requested certificationDocument', async () => {
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

  test('Should throw an AppError if already exists pilot with requested name', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByName')
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

  test('Should return pilot on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = await sut.execute(fakeRequest)

    expect(result).toEqual(fakeRequest)
  })
})
