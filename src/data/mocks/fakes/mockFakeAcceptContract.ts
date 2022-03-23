import { IContract } from '@/domain/models/Contract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export const mockFakeAcceptedContract = (): IContract => ({
  ...mockFakeContract(),
  acceptanceDate: new Date(),
  pilotCerficiationDocument: mockFakePilot().certificationDocument,
})
