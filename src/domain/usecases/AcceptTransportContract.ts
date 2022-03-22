export interface IAcceptTransportContractInput {
  contractId: string
  certificationDocument: string
}

export interface IAcceptTransportContract {
  execute: (data: IAcceptTransportContractInput) => Promise<void>
}
