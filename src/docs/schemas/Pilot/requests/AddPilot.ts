import { IAddPilotDTO } from '@/application/dtos/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'
import { randUuid } from '@ngneat/falso'

export function makeAddPilotDocReqSchema(): IAddPilotDTO {
  return {
    ...mockFakePilot(),
    shipId: randUuid(),
  }
}
