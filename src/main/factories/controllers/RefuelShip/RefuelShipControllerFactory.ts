import { RefuelShipController } from '@/application/controllers/RefuelShip/RefuelShip'
import { makeRefuelShipValidationFactory } from '@/main/factories/controllers/RefuelShip/validations/RefuelShipValidationFactory'
import { makeRefuelShipUseCaseFactory } from '@/main/factories/usecases/RefuelShipUseCaseFactory'

export const makeRefuelShipControllerFactory = (): RefuelShipController => {
  return new RefuelShipController(
    makeRefuelShipUseCaseFactory(),
    makeRefuelShipValidationFactory(),
  )
}
