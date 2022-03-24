import { IGetPilot } from '@/data/contracts/repositories/pilots/GetPilot'
import { IPilot } from '@/domain/models/Pilot'

export const makeGetPilotRepositoryStub = (pilot?: IPilot): IGetPilot => {
  class GetPilotRepositoryUseCaseStub implements IGetPilot {
    async getByDocument(document: string): Promise<IPilot | undefined> {
      return pilot
    }

    async getByName(document: string): Promise<IPilot | undefined> {
      return pilot
    }
  }

  return new GetPilotRepositoryUseCaseStub()
}
