import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/router'
import express, { Express } from 'express'

export const getApp = (): Express => {
  const app = express()

  setupMiddlewares(app)
  setupRoutes(app)

  return app
}
