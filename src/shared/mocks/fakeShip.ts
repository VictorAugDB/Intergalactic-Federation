import { IShip } from '@/domain/models/Ship'

export function mockFakeShip(): IShip {
  return {
    fuelCapacity: 100,
    fuelLevel: 70,
    location: 'calas',
    weightCapacity: 5,
  }
}
