import { AddPilot } from '@/application/controllers/AddPillot'
import { IAddPilotDTO } from '@/application/dtos/AddPilot'
import { MissingParamError } from '@/application/errors/MissingParamError'
import { badRequest, serverError } from '@/application/helpers/HttpHelper'
import { makeValidation } from '@/application/mocks/stubs/makeValidation'
import { IRequest } from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IPilot } from '@/domain/models/Pilot'
import { IAddPilot, IAddPilotInput } from '@/domain/usecases/AddPilot'
import { mockFakePilot } from '@/shared/mocks/fakePilot'

type ISutTypes = {
  sut: AddPilot
  addPilotUseCase: IAddPilot
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IAddPilotDTO> => ({
  body: {
    age: 18,
    certificationDocument: 'any_document',
    credits: 700,
    locationPlanet: 'calas',
    name: 'John Doe',
    shipId: 'any_id',
  },
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
  const sut = new AddPilot(addPilotUseCase, validationStub)

  return {
    sut,
    addPilotUseCase,
    validationStub,
  }
}

describe('AddPilots', () => {
  describe('Validation', () => {
    test('Should be able to call Validation with correct values', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const httpRequest = makeFakeRequest()

      await sut.handle(httpRequest)

      expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validation returns is an error', async () => {
      const { sut, validationStub } = makeSut()
      const error = new MissingParamError('any_field')

      jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => {
        return error
      })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(badRequest(error))
    })

    test('Should return 500 if Validation throws', async () => {
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
      await sut.handle(makeFakeRequest())

      expect(addPilotSpy).toHaveBeenCalledWith(mockFakePilot())
    })
  })
})
