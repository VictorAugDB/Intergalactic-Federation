export interface IRefuelShipInput {
  certificationDocument: string
  amountOfFuel: number
}

export interface IRefuelShipResult {
  fuelLevel: number
}

export interface IRefuelShip {
  execute: (data: IRefuelShipInput) => Promise<IRefuelShipResult>
}
