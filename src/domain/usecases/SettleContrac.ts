export interface ISettleContractInput {
  contractId: string
}

export interface ISettleContract {
  execute: (data: ISettleContractInput) => Promise<void>
}
