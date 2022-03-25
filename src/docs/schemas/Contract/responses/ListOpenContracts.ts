import { IContract } from '@/domain/models/Contract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'
import { randUuid } from '@ngneat/falso'

export function makeListOpenContractsDocResSchema(): IContract[] | Error {
  return [
    {
      ...mockFakeContract(),
      id: randUuid(),
    },
    {
      ...mockFakeContract(),
      id: randUuid(),
    },
  ]
}
