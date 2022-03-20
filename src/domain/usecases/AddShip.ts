import { IShip } from '@/domain/models/Ship'

export interface IAddShipInput extends IShip {}

export interface IAddShip {
  execute: (data: IAddShipInput) => Promise<IShip>
}
