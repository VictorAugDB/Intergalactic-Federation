import { IGetShip } from '@/data/contracts/repositories/ships/GetShip'
import { IShip } from '@/domain/models/Ship'

export const makeGetShipRepositoryStub = (
  ship?: IShip | undefined,
): IGetShip => {
  class GetShipRepositoryUseCaseStub implements IGetShip {
    async getById(id: string): Promise<IShip | undefined> {
      return ship
    }
  }

  return new GetShipRepositoryUseCaseStub()
}
