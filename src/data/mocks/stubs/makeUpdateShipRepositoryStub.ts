import {
  IUpdateShip,
  IUpdateShipInput,
} from '@/data/contracts/repositories/ships/UpdateShip'

export const makeUpdateShipRepositoryStub = (
  data?: Omit<IUpdateShipInput, 'id'>,
): IUpdateShip => {
  class UpdateShipRepositoryUseCaseStub implements IUpdateShip {
    async update(data: IUpdateShipInput): Promise<void> {}
  }

  return new UpdateShipRepositoryUseCaseStub()
}
