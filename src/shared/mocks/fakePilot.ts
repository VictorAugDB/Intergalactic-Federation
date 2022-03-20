import { IPilot } from '@/domain/models/Pilot'

export function mockFakePilot(): IPilot {
  return {
    age: 18,
    certificationDocument: 'any_document',
    credits: 700,
    locationPlanet: 'calas',
    name: 'John Doe',
  }
}
