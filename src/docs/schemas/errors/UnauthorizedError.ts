export function makeUnauthorizedErrorDocSchema(message: string): {
  message: any
  name: 'UnauthorizedError'
} {
  return {
    message,
    name: 'UnauthorizedError',
  }
}
