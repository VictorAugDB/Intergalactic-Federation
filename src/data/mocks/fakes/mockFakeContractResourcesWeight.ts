import { mockFakeContract } from '@/shared/mocks/fakeContract'

export const mockFakeContractResourcesWeight = (): number =>
  mockFakeContract().payload.reduce(
    (acc: number, resource) => (acc += resource.weight),
    0,
  )
