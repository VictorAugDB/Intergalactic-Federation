import { IAcceptTransportContractDTO } from '@/application/dtos/AcceptTransportContract'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { randUuid } from '@ngneat/falso'

export function makeAcceptTransportContractDocReqSchema(): IAcceptTransportContractDTO {
  return {
    certificationDocument: mockFakePilot().certificationDocument,
    contractId: randUuid(),
  }
}
