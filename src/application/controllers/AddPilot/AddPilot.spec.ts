import { AddPilotController } from '@/application/controllers/AddPilot/AddPilot'
import { IAddPilotDTO } from '@/application/dtos/AddPilot'
import { MissingParamError } from '@/application/errors/MissingParamError'
import {
  badRequest,
  serverError,
  success,
} from '@/application/helpers/HttpHelper'
import { makeValidation } from '@/application/mocks/stubs/makeValidation'
import { IRequest } from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

type ISutTypes = {
  sut: AddPilotController
  addPilotUseCase: IAddPilot
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IAddPilotDTO> => ({
  body: mockFakePilot(),
})

const makeAddPilotUseCaseStub = (): IAddPilot => {
  class AddPilotUseCaseUseCaseStub implements IAddPilot {
    async execute(input: IAddPilotInput): Promise<IPilot> {
      return mockFakePilot()
    }
  }

  return new AddPilotUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const addPilotUseCase = makeAddPilotUseCaseStub()
  const validationStub = makeValidation()
  const sut = new AddPilotController(addPilotUseCase, validationStub)

  return {
    sut,
    addPilotUseCase,
    validationStub,
  }
}

describe('AddPilotsController', () => {
  describe('Validation', () => {
    test('Should be able to call Validation with correct values', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = makeFakeRequest()

      await sut.handle(httpRequest)

      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should be able to return 400 if Validation returns is an error', async () => {
      const { sut, validationStub } = makeSut()
      const error = new MissingParamError('any_field')

      jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        return error
      })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(badRequest(error))
    })

    test('Should be able to return 500 if Validation throws', async () => {
      const { sut, validationStub } = makeSut()
      const error = new Error()

      jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        throw error
      })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(error))
    })
  })

  describe('AddPilotUseCase', () => {
    test('Should be able to call AddPilotUseCase with correct values', async () => {
      const { sut, addPilotUseCase } = makeSut()
      const addPilotSpy = jest.spyOn(addPilotUseCase, 'execute')

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(addPilotSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if AddPilotUseCase throws', async () => {
      const { sut, addPilotUseCase } = makeSut()
      const error = new Error()

      jest.spyOn(addPilotUseCase, 'execute').mockImplementationOnce(() => {
        throw error
      })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(error))
    })
  })

  test('Should be able to return 200 with pilot data on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())

    expect(result).toEqual(success(mockFakePilot()))
  })
})
