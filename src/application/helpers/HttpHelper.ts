import { ServerError } from '@/application/errors/ServerError'
import { IResponse } from '@/application/protocols/Controller'

export const badRequest = (error: Error): IResponse<Error> => ({
  status: 400,
  body: error,
})

export const serverError = (error: unknown): IResponse<Error> => ({
  status: 500,
  body: new ServerError(error instanceof Error ? error : undefined),
})

export const success = <T = any>(data: T): IResponse<T> => ({
  status: 200,
  body: data,
})
