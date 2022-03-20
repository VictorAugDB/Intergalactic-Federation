type IRequestBody<T> = T
type IRequestQuery<T> = T

export type IResponse<T> = {
  status: number
  body: T
}

export type IRequest<T = any, U = any> = {
  params?: any
  query?: IRequestQuery<U>
  body?: IRequestBody<T>
}

export interface IController<T = any> {
  handle: (request: IRequest) => Promise<IResponse<T>>
}
