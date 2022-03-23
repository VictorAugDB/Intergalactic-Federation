export type IAddToPlanetResourcesReportInput = {
  planet: string
  sent?: {
    food?: number
    minerals?: number
    water?: number
  }
  received?: {
    food?: number
    minerals?: number
    water?: number
  }
}

export interface IAddToPlanetResourcesReport {
  add: (input: IAddToPlanetResourcesReportInput) => Promise<void>
}
