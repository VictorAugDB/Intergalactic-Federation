import { AppError } from '@/application/errors/AppError'
import { appError, serverError } from '@/application/helpers/HttpHelper'
import { IResponse } from '@/application/protocols/Controller'

export const handleDefaultCatchedErrors = (
  error: unknown,
): IResponse<Error> => {
  console.error(error)
  if (error instanceof AppError) return appError(error)

  return serverError(error)
}
