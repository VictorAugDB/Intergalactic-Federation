import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IPilot } from '@/domain/models/Pilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export const makeGetPilotRepositoryStub = (): IGetPilot => {
  class GetPilotRepositoryUseCaseStub implements IGetPilot {
    async getByDocument(document: string): Promise<IPilot> {
      return mockFakePilot()
    }
  }

  return new GetPilotRepositoryUseCaseStub()
}
