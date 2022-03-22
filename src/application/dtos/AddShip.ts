import { IAddShipInput } from '@/domain/usecases/AddShip'

export interface IAddShipDTO extends Omit<IAddShipInput, 'weightLevel'> {}
