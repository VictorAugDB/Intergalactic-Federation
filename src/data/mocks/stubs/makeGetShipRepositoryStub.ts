import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IShip } from '@/domain/models/Ship'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

export const makeGetShipRepositoryStub = (): IGetShip => {
  class GetShipRepositoryUseCaseStub implements IGetShip {
    async getById(id: string): Promise<IShip> {
      return mockFakeShip()
    }
  }

  return new GetShipRepositoryUseCaseStub()
}
