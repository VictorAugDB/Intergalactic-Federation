import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IUpdatePilot } from '@/data/contracts/repositories/pilots/UpdatePilot'
import { ICreateTransactionReport } from '@/data/contracts/repositories/reports/CreateTransactionReport'
import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IUpdateShip } from '@/data/contracts/repositories/ships/UpdateShip'
import { makeGetPilotRepositoryStub } from '@/data/mocks/stubs/makeGetPilotRepositoryStub'
import { makeGetShipRepositoryStub } from '@/data/mocks/stubs/makeGetShipRepositoryStub'
import { makeUpdatePilotRepositoryStub } from '@/data/mocks/stubs/makeUpdatePilotRepositoryStub'
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
  updatePilotRepositoryStub: IUpdatePilot
  createTransactionReportStub: ICreateTransactionReport
}

const makeFakeRequest = (): IRefuelShipInput => ({
  certificationDocument: 'any_document',
  amountOfFuel: 10,
})

const makeCreateTransationReportRepositoryStub =
  (): ICreateTransactionReport => {
    class CreateTransationReportRepositoryUseCaseStub
      implements ICreateTransactionReport
    {
      async create(description: string): Promise<void> {}
    }

    return new CreateTransationReportRepositoryUseCaseStub()
  }

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub(mockFakePilot())
  const getShipRepositoryStub = makeGetShipRepositoryStub()
  const updateShipRepositoryStub = makeUpdateShipRepositoryStub({
    fuelCapacity: makeFakeRequest().amountOfFuel,
  })
  const updatePilotRepositoryStub = makeUpdatePilotRepositoryStub()
  const createTransactionReportStub = makeCreateTransationReportRepositoryStub()

  const sut = new RefuelShipUseCase(
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updateShipRepositoryStub,
    updatePilotRepositoryStub,
    createTransactionReportStub,
  )

  return {
    sut,
    getPilotRepositoryStub,
    getShipRepositoryStub,
    updateShipRepositoryStub,
    updatePilotRepositoryStub,
    createTransactionReportStub,
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

  describe('UpdatePilotRepository', () => {
    test('Should call UpdatePilotRepository with correct values', async () => {
      const { sut, updatePilotRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const updatePilotRepoSpy = jest.spyOn(updatePilotRepositoryStub, 'update')
      await sut.execute(fakeRequest)

      expect(updatePilotRepoSpy).toHaveBeenCalledWith({
        certificationDocument: 'any_document',
        credits: mockFakePilot().credits - fakeRequest.amountOfFuel * 7,
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
      const { sut, createTransactionReportStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const createTransactionRepoSpy = jest.spyOn(
        createTransactionReportStub,
        'create',
      )
      await sut.execute(fakeRequest)

      expect(createTransactionRepoSpy).toHaveBeenCalledWith(
        `${mockFakePilot().name} bought fuel: +₭${
          fakeRequest.amountOfFuel * 7
        }`,
      )
    })

    test('Should throw if CreateTransactionReport throws', async () => {
      const { sut, createTransactionReportStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(createTransactionReportStub, 'create')
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

  test('Should throw an AppError if ship not found', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest
      .spyOn(getShipRepositoryStub, 'getById')
      .mockResolvedValueOnce(undefined)

    const promise = sut.execute(makeFakeRequest())

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(new AppError('Ship not found!'))
  })

  test('Should throw if pilot not have credits to pay for requested amountOfFuel', async () => {
    const { sut, getPilotRepositoryStub } = makeSut()
    jest.spyOn(getPilotRepositoryStub, 'getByDocument').mockResolvedValueOnce({
      ...mockFakePilot(),
      credits: 20,
    })

    const fakeRequest = makeFakeRequest()
    const result = sut.execute(fakeRequest)

    await expect(result).rejects.toBeInstanceOf(AppError)
    await expect(result).rejects.toThrowError(
      new AppError('You do not pay for this amount of fuel!'),
    )
  })

  test('Should throw if the ship fuelCapacity is less than fuelLevel plus amountOfFuel', async () => {
    const { sut, getShipRepositoryStub } = makeSut()
    jest.spyOn(getShipRepositoryStub, 'getById').mockResolvedValueOnce({
      ...mockFakeShip(),
      fuelLevel: 95,
    })

    const fakeRequest = makeFakeRequest()
    const result = sut.execute(fakeRequest)

    await expect(result).rejects.toBeInstanceOf(AppError)
    await expect(result).rejects.toThrowError(
      new AppError(
        `The ship fuelCapacity is less than amountOfFuel that you want to refuel the max that you can refuel is ${
          mockFakeShip().fuelCapacity - 95
        }`,
      ),
    )
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
