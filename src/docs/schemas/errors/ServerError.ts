export function makeServerErrorDocSchema(): {
  message: any
  name: 'ServerError'
} {
  return {
    message: 'Server failed. Try again soon',
    name: 'ServerError',
  }
}
