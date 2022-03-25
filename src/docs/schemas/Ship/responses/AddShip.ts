import { IShip } from '@/domain/models/Ship'
import { mockFakeShip } from '@/shared/mocks/fakeShip'
import { randUuid } from '@ngneat/falso'

export function makeAddShipDocResSchema(): IShip | Error {
  return {
    ...mockFakeShip(),
    id: randUuid(),
  }
}
