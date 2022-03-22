import { IShip } from '@/domain/models/Ship'

export function mockFakeShip(): IShip {
  return {
    id: 'any_id',
    fuelCapacity: 100,
    fuelLevel: 70,
    location: 'andvari',
    weightCapacity: 5,
    weightLevel: 0,
  }
}
