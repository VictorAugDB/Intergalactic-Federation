import { adaptRoute } from '@/main/adapters/httpAdapter'
import { makeAddPilotControllerFactory } from '@/main/factories/controllers/AddPilot/AddPilotControllerFactory'
import { makeTravelBetweenPlanetsControllerFactory } from '@/main/factories/controllers/TravelBetweenPlanets/TravelBetweenPlanetsControllerFactory'
import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/pilots',
    adaptRoute(makeAddPilotControllerFactory()),
    /*
      #swagger.tags = ['Pilots']
      #swagger.summary = 'Add Pilot'
      #swagger.description = 'This endpoint is to add a pilot.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/AddPilotReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/AddPilotRes" }
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
    '/pilots/travel',
    adaptRoute(makeTravelBetweenPlanetsControllerFactory()),
    /*
      #swagger.tags = ['Pilots']
      #swagger.summary = 'Travel Between Planets'
      #swagger.description = 'This endpoint is to travel between planets.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/TravelBetweenPlanetsReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/TravelBetweenPlanetsRes" }
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
