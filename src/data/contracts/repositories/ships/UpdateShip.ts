import { IShip } from '@/domain/models/Ship'

export interface IUpdateShipInput extends Partial<IShip> {
  id: string
}

export interface IUpdateShip {
  update: (input: IUpdateShipInput) => Promise<void>
}
