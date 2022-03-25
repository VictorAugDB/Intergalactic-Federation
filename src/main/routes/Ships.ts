import { adaptRoute } from '@/main/adapters/httpAdapter'
import { makeAddShipControllerFactory } from '@/main/factories/controllers/AddShip/AddShipControllerFactory'
import { makeRefuelShipControllerFactory } from '@/main/factories/controllers/RefuelShip/RefuelShipControllerFactory'
import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/ships',
    adaptRoute(makeAddShipControllerFactory()),
    /*
      #swagger.tags = ['Ships']
      #swagger.summary = 'Add Ship'
      #swagger.description = 'This endpoint is to add a ship.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/AddShipReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/AddShipRes" }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          "application/json": {
            schema: {
              oneOf: [
                { $ref: "#/definitions/AppError" },
                { $ref: "#/definitions/MissingParamError" }
              ]
            },
            examples: {
              AppError: { $ref: '#/components/examples/AppError' },
              MissingParamError: { $ref: '#/components/examples/MissingParamError' }
            },
          }
        }
      }
      #swagger.responses[401] = {
        content: {
          "application/json": {
            schema: {
              oneOf: [
                { $ref: "#/definitions/UnauthorizedErrorMissingToken" },
                { $ref: "#/definitions/UnauthorizedErrorInvalidToken" }
              ]
            },
            examples: {
              MissingToken: { $ref: '#/components/examples/UnauthorizedErrorMissingToken' },
              InvalidToken: { $ref: '#/components/examples/UnauthorizedErrorInvalidToken' }
            },
          }
        }
      }
      #swagger.responses[500] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/ServerError" }
          }
        }
      }
    */
  )
  router.post(
    '/ships/refuel',
    adaptRoute(makeRefuelShipControllerFactory()),
    /*
      #swagger.tags = ['Ships']
      #swagger.summary = 'Refuel Ship'
      #swagger.description = 'This endpoint is to refuel a ship.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/RefuelShipReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/RefuelShipRes" }
          }
        }
      }
      #swagger.responses[400] = {
        content: {
          "application/json": {
            schema: {
              oneOf: [
                { $ref: "#/definitions/AppError" },
                { $ref: "#/definitions/MissingParamError" }
              ]
            },
            examples: {
              AppError: { $ref: '#/components/examples/AppError' },
              MissingParamError: { $ref: '#/components/examples/MissingParamError' }
            },
          }
        }
      }
      #swagger.responses[401] = {
        content: {
          "application/json": {
            schema: {
              oneOf: [
                { $ref: "#/definitions/UnauthorizedErrorMissingToken" },
                { $ref: "#/definitions/UnauthorizedErrorInvalidToken" }
              ]
            },
            examples: {
              MissingToken: { $ref: '#/components/examples/UnauthorizedErrorMissingToken' },
              InvalidToken: { $ref: '#/components/examples/UnauthorizedErrorInvalidToken' }
            },
          }
        }
      }
      #swagger.responses[500] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/ServerError" }
          }
        }
      }
    */
  )
}
