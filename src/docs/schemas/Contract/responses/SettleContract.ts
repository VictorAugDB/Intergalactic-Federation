export function makeSettleContractDocResSchema():
  | { message: 'SUCCESS' }
  | Error {
  return { message: 'SUCCESS' }
}
