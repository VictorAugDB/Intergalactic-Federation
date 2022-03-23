export type IAddToPilotTransportedResourcesReportInput = {
  pilotName: string
  food?: number
  minerals?: number
  water?: number
}

export interface IAddToPilotTransportedResourcesReport {
  add: (input: IAddToPilotTransportedResourcesReportInput) => Promise<void>
}
