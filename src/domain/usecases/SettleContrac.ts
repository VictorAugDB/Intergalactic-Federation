export interface ISettleContractInput {
  contractId: string
  certificationDocument: string
}

export interface ISettleContract {
  execute: (data: ISettleContractInput) => Promise<void>
}
