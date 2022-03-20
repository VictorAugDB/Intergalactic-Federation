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
    test('Should be able to call GetPilotRepository with correct values', async () => {
      const { sut, getPilotRepositoryStub } = makeSut()

      const getPilotRepoSpy = jest.spyOn(
        getPilotRepositoryStub,
        'getByDocument',
      )

      const fakeRequest = makeFakeRequest()
      await sut.execute(fakeRequest)

      expect(getPilotRepoSpy).toHaveBeenCalledWith(
        makeFakeRequest().certificationDocument,
      )
    })
  })
})
