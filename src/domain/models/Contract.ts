type IResource = {
  name: string
  weight: number
}

export type IContract = {
  id: string
  description: string
  payload: IResource[]
  originPlanet: string
  destinationPlanet: string
  acceptanceDate?: Date
  settlementDate?: Date
  pilotCerficiationDocument?: string
  value: number
}
