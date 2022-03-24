import { IController, IResponse } from '@/application/protocols/Controller'
import { adaptRoute } from '@/main/adapters/httpAdapter'
import { getApp } from '@/main/config/app'
import { Router } from 'express'
import request from 'supertest'

export const makeMockController = (): IController => {
  class ControllerStub implements IController {
    async handle(httpRequest: any): Promise<IResponse<any>> {
      return await Promise.resolve({
        status: 200,
        body: 'SUCCESS',
      })
    }
  }

  return new ControllerStub()
}

describe('HttpAdapter', () => {
  test('Should be able return 200 on success', async () => {
    const app = getApp()
    const router = Router()

    app.use('/', router)

    router.post('/', adaptRoute(makeMockController()))

    await request(app)
      .post('/')
      .send({ any_parameter: 'any_value' })
      .expect(200)
      .expect(JSON.stringify('SUCCESS'))
  })

  test('Should be able return 400 on error', async () => {
    const app = getApp()
    const router = Router()

    app.use('/', router)

    const controllerStub = makeMockController()

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      Promise.resolve({
        status: 400,
        body: new Error('BAD_REQUEST'),
      }),
    )

    router.post('/', adaptRoute(controllerStub))

    await request(app)
      .post('/')
      .send({ any_parameter: 'any_value' })
      .expect(400)
      .expect(
        JSON.stringify({ error: { message: 'BAD_REQUEST', name: 'Error' } }),
      )
  })
})
