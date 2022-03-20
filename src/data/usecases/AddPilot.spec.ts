import { AppError } from '@/application/errors/AppError'
import { IGetPilot } from '@/data/contracts/repositories/GetPilot'
import { AddPilotUseCase } from '@/data/usecases/AddPillot'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

type ISutTypes = {
  sut: AddPilotUseCase
  getPilotRepositoryStub: IGetPilot
}

const makeFakeRequest = (): IAddPilotInput => ({
  ...mockFakePilot(),
  shipId: 'any_id',
})

const makeGetPilotRepositoryStub = (): IGetPilot => {
  class GetPilotRepositoryUseCaseStub implements IGetPilot {
    async getByDocument(document: string): Promise<IPilot> {
      return mockFakePilot()
    }
  }

  return new GetPilotRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const getPilotRepositoryStub = makeGetPilotRepositoryStub()
  const sut = new AddPilotUseCase(getPilotRepositoryStub)

  return {
    sut,
    getPilotRepositoryStub,
  }
}

describe('AddPilot', () => {
  describe('GetPilotRepository', () => {
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

  test('Should throw an AppError if pilot already exists', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()
    const promise = sut.execute(fakeRequest)

    await expect(promise).rejects.toBeInstanceOf(AppError)
    await expect(promise).rejects.toThrowError(
      new AppError('Pilot already exists!'),
    )
  })
})
