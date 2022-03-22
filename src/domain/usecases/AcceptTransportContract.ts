export interface IAcceptTransportContractInput {
  id: string
  certificationDocument: string
}

export interface IAcceptTransportContract {
  execute: (data: IAcceptTransportContractInput) => Promise<void>
}
