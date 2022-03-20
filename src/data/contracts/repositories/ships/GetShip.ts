import { IShip } from '@/domain/models/Ship'

export interface IGetShip {
  getById: (id: string) => Promise<IShip | undefined>
}
