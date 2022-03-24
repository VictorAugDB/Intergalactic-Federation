import { AddShipController } from '@/application/controllers/AddShip/AddShip'
import { makeAddShipValidationFactory } from '@/main/factories/controllers/AddShip/validations/AddShipValidationFactory'
import { makeAddShipUseCaseFactory } from '@/main/factories/usecases/AddShipUseCaseFactory'

export const makeAddShipControllerFactory = (): AddShipController => {
  return new AddShipController(
    makeAddShipUseCaseFactory(),
    makeAddShipValidationFactory(),
  )
}
