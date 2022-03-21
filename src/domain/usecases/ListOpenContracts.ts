import { IContract } from '@/domain/models/Contract'

export interface IListOpenContracts {
  execute: () => Promise<IContract[]>
}
