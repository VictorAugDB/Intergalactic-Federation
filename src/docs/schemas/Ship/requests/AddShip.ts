import { IAddShipDTO } from '@/application/dtos/AddShip'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

export function makeAddShipDocReqSchema(): IAddShipDTO {
  const { fuelCapacity, fuelLevel, weightCapacity, location } = mockFakeShip()
  return {
    fuelCapacity,
    fuelLevel,
    location,
    weightCapacity,
  }
}
