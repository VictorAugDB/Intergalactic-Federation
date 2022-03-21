import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { TravelBetweenPlanetsUseCase } from '@/data/usecases/TravelBetweenPlanets/TravelBetweenPlanets'
import { ITravelBetweenPlanetsInput } from '@/domain/usecases/TravelBetweenPlanets'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

type ISutTypes = {
  sut: TravelBetweenPlanetsUseCase
  getPilotRepositoryStub: IGetPilot
}

const makeFakeRequest = (): ITravelBetweenPlanetsInput => ({
  certificationDocument: 'any_document',
  destinationPlanet: 'aqua',
})

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub()

  const sut = new TravelBetweenPlanetsUseCase(getPilotRepositoryStub)

  return {
    sut,
    getPilotRepositoryStub,
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

  test('Should throw an AppError if pilot is not found', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest
      .spyOn(getPilotRepositoryStub, 'getByDocument')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Pilot was not found!'),
    )
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
