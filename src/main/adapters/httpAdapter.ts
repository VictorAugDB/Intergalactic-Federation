import { IController } from '@/application/protocols/Controller'
import { adaptResponse } from '@/main/adapters/adaptResponse'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response) => {
    const req: any = {
      body: request.body,
      headers: request.headers,
      query: request.query,
      params: request.params,
    }

    const res = await controller.handle(req)
    adaptResponse(res, response)
  }
}
