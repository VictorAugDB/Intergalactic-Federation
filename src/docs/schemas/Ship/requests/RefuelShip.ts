import { IRefuelShipDTO } from '@/application/dtos/RefuelShipDTO'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export function makeRefuelShipDocReqSchema(): IRefuelShipDTO {
  return {
    amountOfFuel: 10,
    certificationDocument: mockFakePilot().certificationDocument,
  }
}
