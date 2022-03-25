export function makeAppErrorDocSchema(): { message: any; name: 'AppError' } {
  return {
    message: 'any_error message',
    name: 'AppError',
  }
}
