import { ISettleContractDTO } from '@/application/dtos/SettleContractDTO'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { randUuid } from '@ngneat/falso'

export function makeSettleContractDocReqSchema(): ISettleContractDTO {
  return {
    certificationDocument: mockFakePilot().certificationDocument,
    contractId: randUuid(),
  }
}
