export type IUpdatePilotTransportedResourcesReportInput = {
  pilotName: string
  food?: number
  minerals?: number
  water?: number
}

export interface IUpdatePilotTransportedResourcesReport {
  update: (input: IUpdatePilotTransportedResourcesReportInput) => Promise<void>
}
