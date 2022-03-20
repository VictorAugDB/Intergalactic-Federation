import { IContract } from '@/domain/models/Contract'

export interface IPublishContractInput extends Omit<IContract, 'id'> {}

export interface IPublishContract {
  execute: (data: IPublishContractInput) => Promise<IContract>
}
