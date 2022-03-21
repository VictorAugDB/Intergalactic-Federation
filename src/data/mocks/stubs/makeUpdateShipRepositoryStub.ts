import {
  IUpdateShip,
  IUpdateShipInput,
} from '@/data/contracts/repositories/ships/UpdateShip'
import { IShip } from '@/domain/models/Ship'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

export const makeUpdateShipRepositoryStub = (
  data?: Omit<IUpdateShipInput, 'id'>,
): IUpdateShip => {
  class UpdateShipRepositoryUseCaseStub implements IUpdateShip {
    async update(data: IUpdateShipInput): Promise<IShip> {
      return {
        ...mockFakeShip(),
        ...data,
      }
    }
  }

  return new UpdateShipRepositoryUseCaseStub()
}
