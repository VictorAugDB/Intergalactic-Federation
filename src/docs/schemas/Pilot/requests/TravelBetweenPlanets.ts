import { ITravelBetweenPlanetsDTO } from '@/application/dtos/TravelBetweenPlanets'
import { randUuid } from '@ngneat/falso'

export function makeTravelBetweenPlanetsDocReqSchema(): ITravelBetweenPlanetsDTO {
  return {
    certificationDocument: randUuid(),
    destinationPlanet: 'calas',
  }
}
