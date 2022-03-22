import { IContract } from '@/domain/models/Contract'

export function mockFakeContract(): IContract {
  return {
    id: 'any_id',
    description: 'any_description',
    destinationPlanet: 'aqua',
    originPlanet: 'andvari',
    payload: [
      {
        name: 'water',
        weight: 10,
      },
      {
        name: 'food',
        weight: 5,
      },
    ],
    value: 500,
  }
}
