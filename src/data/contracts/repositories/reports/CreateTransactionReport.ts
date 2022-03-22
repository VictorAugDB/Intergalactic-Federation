export interface ICreateTransactionReport {
  create: (description: string) => Promise<void>
}
