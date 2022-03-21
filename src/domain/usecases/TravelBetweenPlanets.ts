export interface ITravelBetweenPlanetsInput {
  certificationDocument: string
  destinationPlanet: string
}

export interface ITravelBetweenPlanets {
  execute: (data: ITravelBetweenPlanetsInput) => Promise<void>
}
