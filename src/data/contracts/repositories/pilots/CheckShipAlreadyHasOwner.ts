export type ICheckShipAlreadyHasOwnerInput = {
  shipId: string
}

export interface ICheckShipAlreadyHasOwner {
  checkShipAlreadyHasOwner: (
    input: ICheckShipAlreadyHasOwnerInput,
  ) => Promise<boolean>
}
