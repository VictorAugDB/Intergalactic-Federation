import {
  IUpdatePilot,
  IUpdatePilotInput,
} from '@/data/contracts/repositories/pilots/UpdatePilot'

export const makeUpdatePilotRepositoryStub = (): IUpdatePilot => {
  class UpdatePilotRepositoryUseCaseStub implements IUpdatePilot {
    async update(data: IUpdatePilotInput): Promise<void> {}
  }

  return new UpdatePilotRepositoryUseCaseStub()
}
