import 'module-alias/register'
import { makeAcceptTransportContractDocReqSchema } from '@/docs/schemas/Contract/requests/AcceptTransportContract'
import { makePublishContractDocReqSchema } from '@/docs/schemas/Contract/requests/PublishContract'
import { makeSettleContractDocReqSchema } from '@/docs/schemas/Contract/requests/SettleContract'
import { makeAcceptTransportContractDocResSchema } from '@/docs/schemas/Contract/responses/AcceptTransportContract'
import { makeListOpenContractsDocResSchema } from '@/docs/schemas/Contract/responses/ListOpenContracts'
import { makePublishContractDocResSchema } from '@/docs/schemas/Contract/responses/PublishContract'
import { makeSettleContractDocResSchema } from '@/docs/schemas/Contract/responses/SettleContract'
import { makeAppErrorDocSchema } from '@/docs/schemas/errors/AppError'
import { makeMissingParamErrorDocSchema } from '@/docs/schemas/errors/MissingParamError'
import { makeServerErrorDocSchema } from '@/docs/schemas/errors/ServerError'
import { makeUnauthorizedErrorDocSchema } from '@/docs/schemas/errors/UnauthorizedError'
import { makeAddPilotDocReqSchema } from '@/docs/schemas/Pilot/requests/AddPilot'
import { makeTravelBetweenPlanetsDocReqSchema } from '@/docs/schemas/Pilot/requests/TravelBetweenPlanets'
import { makeAddPilotDocResSchema } from '@/docs/schemas/Pilot/responses/AddPilot'
import { makeTravelBetweenPlanetsDocResSchema } from '@/docs/schemas/Pilot/responses/TravelBetweenPlanets'
import { makeAddShipDocReqSchema } from '@/docs/schemas/Ship/requests/AddShip'
import { makeRefuelShipDocReqSchema } from '@/docs/schemas/Ship/requests/RefuelShip'
import { makeAddShipDocResSchema } from '@/docs/schemas/Ship/responses/AddShip'
import { makeRefuelShipDocResSchema } from '@/docs/schemas/Ship/responses/RefuelShip'
import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: '1.0.0',
    title: 'Smart Sign API',
    description: 'This is the Smart Sign 3.0.0 Documentation',
  },
  host: 'localhost:3333',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  definitions: {
    // Pilots
    // Requests
    AddPilotReq: makeAddPilotDocReqSchema(),
    TravelBetweenPlanetsReq: makeTravelBetweenPlanetsDocReqSchema(),
    // Responses
    AddPilotRes: makeAddPilotDocResSchema(),
    TravelBetweenPlanetsRes: makeTravelBetweenPlanetsDocResSchema(),

    // Ships
    // Requests
    AddShipReq: makeAddShipDocReqSchema(),
    RefuelShipReq: makeRefuelShipDocReqSchema(),
    // Responses
    AddShipRes: makeAddShipDocResSchema(),
    RefuelShipRes: makeRefuelShipDocResSchema(),

    // Contracts
    // Requests
    PublishContractReq: makePublishContractDocReqSchema(),
    AcceptTransportContractReq: makeAcceptTransportContractDocReqSchema(),
    SettleContractReq: makeSettleContractDocReqSchema(),
    // Responses
    PublishContractRes: makePublishContractDocResSchema(),
    ListOpenContractsRes: makeListOpenContractsDocResSchema(),
    AcceptTransportContractRes: makeAcceptTransportContractDocResSchema(),
    SettleContractRes: makeSettleContractDocResSchema(),

    // Errors
    MissingParamError: makeMissingParamErrorDocSchema(),
    ServerError: makeServerErrorDocSchema(),
    AppError: makeAppErrorDocSchema(),
    UnauthorizedErrorMissingToken: makeUnauthorizedErrorDocSchema(
      'JWT token is missing',
    ),
    UnauthorizedErrorInvalidToken:
      makeUnauthorizedErrorDocSchema('Invalid JWT Token'),
  },
  components: {
    examples: {
      // Errors
      AppError: makeAppErrorDocSchema(),
      MissingParamError: makeMissingParamErrorDocSchema(),
      UnauthorizedErrorMissingToken: makeUnauthorizedErrorDocSchema(
        'JWT token is missing',
      ),
      UnauthorizedErrorInvalidToken:
        makeUnauthorizedErrorDocSchema('Invalid JWT Token'),
    },
  },
}

const options = {
  openapi: '3.0.0',
}

const outputFile = 'swagger-output.json'
const endpointsFiles = ['./src/main/routes/*']

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
  await import('@/main/index')
})
