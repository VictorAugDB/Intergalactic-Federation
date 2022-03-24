export type IResource = {
  name: string
  weight: number
}

export type IContract = {
  id: string
  pilotCertificationDocument?: string
  description: string
  payload: IResource[]
  originPlanet: string
  destinationPlanet: string
  acceptanceDate?: Date
  settlementDate?: Date
  value: number
}
