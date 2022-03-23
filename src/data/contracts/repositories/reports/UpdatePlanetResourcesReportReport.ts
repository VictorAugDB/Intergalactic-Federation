export type IUpdatePlanetResourcesReportInput = {
  planet: string
  sent: {
    food?: number
    minerals?: number
    water?: number
  }
  received: {
    food?: number
    minerals?: number
    water?: number
  }
}

export interface IUpdatePlanetResourcesReport {
  update: (input: IUpdatePlanetResourcesReportInput) => Promise<void>
}
