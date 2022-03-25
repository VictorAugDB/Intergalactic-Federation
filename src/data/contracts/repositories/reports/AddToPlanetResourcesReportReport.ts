export type IResources = {
  food?: number
  minerals?: number
  water?: number
}

export type IAddToPlanetResourcesSentReportInput = {
  planet: string
  sent: IResources
}
export type IAddToPlanetResourcesReceiveReportInput = {
  planet: string
  received: IResources
}

export interface IAddToPlanetResourcesReport {
  addSent: (input: IAddToPlanetResourcesSentReportInput) => Promise<void>
  addReceive: (input: IAddToPlanetResourcesReceiveReportInput) => Promise<void>
}
