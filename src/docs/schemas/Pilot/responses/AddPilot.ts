import { IPilot } from '@/domain/models/Pilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export function makeAddPilotDocResSchema(): IPilot | Error {
  return mockFakePilot()
}
