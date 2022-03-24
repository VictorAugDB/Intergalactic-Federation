import { bodyParser, contentType } from '@/main/middlewares'
import cors from 'cors'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors())
}
