import {
  IUpdateShip,
  IUpdateShipInput,
} from '@/data/contracts/repositories/ships/UpdateShip'

export const makeUpdateShipRepositoryStub = (): IUpdateShip => {
  class UpdateShipRepositoryUseCaseStub implements IUpdateShip {
    async update(data: IUpdateShipInput): Promise<void> {}
  }

  return new UpdateShipRepositoryUseCaseStub()
}
