import { IShip } from '@/domain/models/Ship'

export interface IAddShipInput extends Omit<IShip, 'id'> {}

export interface IAddShip {
  execute: (data: IAddShipInput) => Promise<IShip>
}
