import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import {
  IUpdatePilot,
  IUpdatePilotInput,
} from '@/data/contracts/repositories/pilots/UpdatePilot'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import {
  IUpdateShip,
  IUpdateShipInput,
} from '@/data/contracts/repositories/ships/UpdateShip'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { TravelBetweenPlanetsUseCase } from '@/data/usecases/TravelBetweenPlanets/TravelBetweenPlanets'
import { ITravelBetweenPlanetsInput } from '@/domain/usecases/TravelBetweenPlanets'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

type ISutTypes = {
  sut: TravelBetweenPlanetsUseCase
  getPilotRepositoryStub: IGetPilot
  getShipRepositoryStub: IGetShip
  updatePilotRepositoryStub: IUpdatePilot
  updateShipRepositoryStub: IUpdateShip
}

const makeFakeRequest = (): ITravelBetweenPlanetsInput => ({
  certificationDocument: 'any_document',
  destinationPlanet: 'aqua',
})

const makeUpdatePilotRepositoryStub = (): IUpdatePilot => {
  class UpdatePilotRepositoryUseCaseStub implements IUpdatePilot {
    async update(data: IUpdatePilotInput): Promise<void> {}
  }

  return new UpdatePilotRepositoryUseCaseStub()
}

const makeUpdateShipRepositoryStub = (): IUpdateShip => {
  class UpdateShipRepositoryUseCaseStub implements IUpdateShip {
    async update(data: IUpdateShipInput): Promise<void> {}
  }

  return new UpdateShipRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(mockFakePilot())
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const updatePilotRepositoryStub = makeUpdatePilotRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub()

  const sut = new TravelBetweenPlanetsUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updatePilotRepositoryStub,
    updateShipRepositoryStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updatePilotRepositoryStub,
    updateShipRepositoryStub,
  }
}

describe('TravelBetweenPlanetsUseCase', () => {
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

  describe('UpdatePilotRepository', () => {
    test('Should call UpdatePilotRepository with correct values', async () => {
      const { sut, updatePilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updatePilotRepoSpy = jest.spyOn(updatePilotRepositoryStub, 'update')
      await sut.execute(fakeRequest)

      expect(updatePilotRepoSpy).toHaveBeenCalledWith({
        certificationDocument: 'any_document',
        locationPlanet: 'aqua',
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

  describe('UpdateShipRepository', () => {
    test('Should call UpdateShipRepository with correct values', async () => {
      const { sut, updateShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updateShipRepoSpy = jest.spyOn(updateShipRepositoryStub, 'update')
      await sut.execute(fakeRequest)

      expect(updateShipRepoSpy).toHaveBeenCalledWith({
        id: 'any_id',
        fuelLevel: 70 - 13,
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

  test('Should throw an AppError if pilot not found', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByDocument')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(new AppError('Pilot not found!'))
  })

  test('Should throw an AppError if destinationPlanet is not reachable from pilot locationPlanet', async () => {
    const { sut } = makeSut()

    const promise = sut.execute({
      ...makeFakeRequest(),
      destinationPlanet: 'demeter',
    })

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError(
        'Unable to travel to this planet from your current location',
      ),
    )
  })

  test("Should throw an AppError if ship's fuelLevel is less than travel fuelCost", async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest.spyOn(getShipRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeShip(),
      fuelLevel: 12,
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError(
        "Unable to travel to this planet with the ship's fuel level",
      ),
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

  test('Should throw an Error if planetInfo is not found', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest.spyOn(getPilotRepositoryStub, 'getByDocument').mockResolvedValueOnce({
      ...mockFakePilot(),
      locationPlanet: 'any_planet',
    })

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(Error)
    await expect(promise).rejects.toThrowError(new Error())
  })

  test('Should not throw on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = sut.execute(fakeRequest)

    await expect(result).resolves.not.toThrow()
  })
})
