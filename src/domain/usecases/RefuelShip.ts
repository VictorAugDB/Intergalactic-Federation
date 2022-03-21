export interface IRefuelShipInput {
  shipId: string
  quantity: number
}

export interface IRefuelShipResult {
  fuelLevel: number
}

export interface IRefuelShip {
  execute: (data: IRefuelShipInput) => Promise<IRefuelShipResult>
}
