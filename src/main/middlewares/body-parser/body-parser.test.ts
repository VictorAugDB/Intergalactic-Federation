import { getApp } from '@/main/config/app'
import { Request, Response, Express } from 'express'
import request from 'supertest'

let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(() => {
    app = getApp()
  })

  test('Should parse body as json', async () => {
    app.post('/test-body-parser', (req: Request, res: Response) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test-body-parser')
      .send({ test: 'any_test' })
      .expect({ test: 'any_test' })
  })
})
