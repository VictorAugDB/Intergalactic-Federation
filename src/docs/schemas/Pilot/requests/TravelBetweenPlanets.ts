import { ITravelBetweenPlanetsDTO } from '@/application/dtos/TravelBetweenPlanets'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

export function makeTravelBetweenPlanetsDocReqSchema(): ITravelBetweenPlanetsDTO {
  return {
    certificationDocument: mockFakePilot().certificationDocument,
    destinationPlanet: 'calas',
  }
}
