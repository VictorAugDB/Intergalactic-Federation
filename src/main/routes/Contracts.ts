import { adaptRoute } from '@/main/adapters/httpAdapter'
import { makeAcceptTransportContractControllerFactory } from '@/main/factories/controllers/AcceptTransportContract/AcceptTransportContractControllerFactory'
import { makeListOpenContractsControllerFactory } from '@/main/factories/controllers/ListOpenContracts/ListOpenContractsControllerFactory'
import { makePublishContractControllerFactory } from '@/main/factories/controllers/PublishContract/PublishContractControllerFactory'
import { makeSettleContractControllerFactory } from '@/main/factories/controllers/SettleContract/SettleContractControllerFactory'
import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post(
    '/contracts',
    adaptRoute(makePublishContractControllerFactory()),
    /*
      #swagger.tags = ['Contracts']
      #swagger.summary = 'Publish Contract'
      #swagger.description = 'This endpoint is to publish a new contract.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/PublishContractReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/PublishContractRes" }
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
  router.get(
    '/contracts',
    adaptRoute(makeListOpenContractsControllerFactory()),
    /*
      #swagger.tags = ['Contracts']
      #swagger.summary = 'List Open Contracts'
      #swagger.description = 'This endpoint is to list the open contracts.'
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/ListOpenContractsRes" }
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
    '/contracts/accept',
    adaptRoute(
      makeAcceptTransportContractControllerFactory(),
      /*
      #swagger.tags = ['Contracts']
      #swagger.summary = 'Accept a Transport Contract'
      #swagger.description = 'This endpoint is to accept a transport contract.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/AcceptTransportContractReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/AcceptTransportContractRes" }
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
    ),
  )
  router.post(
    '/contracts/settle',
    adaptRoute(
      makeSettleContractControllerFactory(),
      /*
      #swagger.tags = ['Contracts']
      #swagger.summary = 'Settle Contract'
      #swagger.description = 'This endpoint is to settle a contract.'
      #swagger.security = [{
        "bearerAuth": []
      }]
       #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/definitions/SettleContractReq" },
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
        schema: { $ref: "#/definitions/SettleContractRes" }
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
    ),
  )
}
