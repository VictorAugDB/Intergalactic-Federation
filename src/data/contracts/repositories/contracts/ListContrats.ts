import { IContract } from '@/domain/models/Contract'

export interface IListContracts {
  listOpenContracts: () => Promise<IContract[]>
}
