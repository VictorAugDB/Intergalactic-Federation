import { IContract } from '@/domain/models/Contract'

export interface IUpdateContractInput extends Partial<IContract> {
  id: string
}
export type IUpdateContractResult = {
  acceptanceDate: Date
}

export interface IUpdateContract {
  update: (input: IUpdateContractInput) => Promise<IUpdateContractResult>
}
