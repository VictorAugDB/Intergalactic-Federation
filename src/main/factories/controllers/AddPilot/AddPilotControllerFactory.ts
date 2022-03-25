import { AddPilotController } from '@/application/controllers/AddPilot/AddPilot'
import { makeAddPilotValidationFactory } from '@/main/factories/controllers/AddPilot/validations/AddPilotValidationFactory'
import { makeAddPilotUseCaseFactory } from '@/main/factories/usecases/AddPilotUseCaseFactory'

export const makeAddPilotControllerFactory = (): AddPilotController => {
  return new AddPilotController(
    makeAddPilotUseCaseFactory(),
    makeAddPilotValidationFactory(),
  )
}
