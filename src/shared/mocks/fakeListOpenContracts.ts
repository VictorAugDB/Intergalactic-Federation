import { IContract } from '@/domain/models/Contract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'

export function mockFakeListOpenContracts(): IContract[] {
  return [
    {
      ...mockFakeContract(),
    },
    {
      ...mockFakeContract(),
      id: 'other_id',
    },
  ]
}
