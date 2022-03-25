import { IAcceptTransportContractResult } from '@/domain/usecases/AcceptTransportContract'
import { randUuid } from '@ngneat/falso'

export function makeAcceptTransportContractDocResSchema():
  | IAcceptTransportContractResult
  | Error {
  return {
    acceptanceDate: new Date(),
    contractId: randUuid(),
    shipWeightLevel: 20,
  }
}
