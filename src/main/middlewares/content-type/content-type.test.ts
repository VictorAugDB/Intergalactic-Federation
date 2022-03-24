import { getApp } from '@/main/config/app'
import { Request, Response, Express } from 'express'
import request from 'supertest'

let app: Express

describe('Content Type Middleware', () => {
  beforeAll(() => {
    app = getApp()
  })

  test('Should return default content type as json', async () => {
    app.get('/content-type', (req: Request, res: Response) => {
      res.send('')
    })

    await request(app).get('/content-type').expect('Content-Type', /json/)
  })
})
