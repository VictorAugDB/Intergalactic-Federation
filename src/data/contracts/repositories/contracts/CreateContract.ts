import { IContract } from '@/domain/models/Contract'

export interface ICreateContract {
  create: (input: IContract) => Promise<IContract>
}
