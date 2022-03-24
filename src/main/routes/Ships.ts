import { adaptRoute } from '@/main/adapters/httpAdapter'
import { makeAddShipControllerFactory } from '@/main/factories/controllers/AddShip/AddShipControllerFactory'
import { Router } from 'express'

export default async (router: Router): Promise<void> => {
  router.post('/ships', adaptRoute(makeAddShipControllerFactory()))
}
