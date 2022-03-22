export type IAcceptTransportContractInput = {
  contractId: string
  certificationDocument: string
}

export type IAcceptTransportContractResult = {
  contractId: string
  acceptanceDate: Date
  shipWeightLevel: number
}

export interface IAcceptTransportContract {
  execute: (
    data: IAcceptTransportContractInput,
  ) => Promise<IAcceptTransportContractResult>
}
