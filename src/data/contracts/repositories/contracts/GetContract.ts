import { IContract } from '@/domain/models/Contract'

export interface IGetContract {
  getById: (id: string) => Promise<IContract | undefined>
}
