import { IShip } from '@/domain/models/Ship'

export interface ICreateShip {
  create: (input: IShip) => Promise<IShip>
}
