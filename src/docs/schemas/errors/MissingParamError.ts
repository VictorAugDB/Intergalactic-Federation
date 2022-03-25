export function makeMissingParamErrorDocSchema(): {
  message: any
  name: 'MissingParamError'
} {
  return {
    message: 'Missing param: field',
    name: 'MissingParamError',
  }
}
