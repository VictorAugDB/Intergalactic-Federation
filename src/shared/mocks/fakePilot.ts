import { IPilot } from '@/domain/models/Pilot'

export function mockFakePilot(): IPilot {
  return {
    age: 18,
    shipId: 'any_id',
    certificationDocument: 'any_document',
    credits: 700,
    locationPlanet: 'andvari',
    name: 'John Doe',
  }
}
