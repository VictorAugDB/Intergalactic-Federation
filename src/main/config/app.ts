import { getSwaggerFile } from '@/main/config/getSwaggerFile.ts/getSwaggerFile'
import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/router'
import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'

export const getApp = (): Express => {
  const app = express()
  const swaggerFile = getSwaggerFile()
  if (swaggerFile) {
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(JSON.parse(swaggerFile.toString())),
    )
  }

  setupMiddlewares(app)
  setupRoutes(app)

  return app
}
