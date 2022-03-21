import { TravelBetweenPlanetsController } from '@/application/controllers/TravelBetweenPlanets/TravelBetweenPlanets'
import { ITravelBetweenPlanetsDTO } from '@/application/dtos/TravelBetweenPlanets'
import { MissingParamError } from '@/application/errors/MissingParamError'
import {
  badRequest,
  serverError,
  success,
} from '@/application/helpers/HttpHelper'
import { makeValidation } from '@/application/mocks/stubs/makeValidation'
import { IRequest } from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import {
  ITravelBetweenPlanets,
  ITravelBetweenPlanetsInput,
} from '@/domain/usecases/TravelBetweenPlanets'

type ISutTypes = {
  sut: TravelBetweenPlanetsController
  publishContractUseCaseStub: ITravelBetweenPlanets
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<ITravelBetweenPlanetsDTO> => ({
  body: {
    certificationDocument: 'any_document',
    destinationPlanet: 'aqua',
  },
})

const makeTravelBetweenPlanetsUseCaseStub = (): ITravelBetweenPlanets => {
  class TravelBetweenPlanetsUseCaseUseCaseStub
    implements ITravelBetweenPlanets
  {
    async execute(input: ITravelBetweenPlanetsInput): Promise<void> {}
  }

  return new TravelBetweenPlanetsUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const publishContractUseCaseStub = makeTravelBetweenPlanetsUseCaseStub()
  const validationStub = makeValidation()
  const sut = new TravelBetweenPlanetsController(
    publishContractUseCaseStub,
    validationStub,
  )

  return {
    sut,
    publishContractUseCaseStub,
    validationStub,
  }
}

describe('TravelBetweenPlanetsController', () => {
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

  describe('TravelBetweenPlanetsUseCase', () => {
    test('Should be able to call TravelBetweenPlanetsUseCase with correct values', async () => {
      const { sut, publishContractUseCaseStub } = makeSut()
      const addContractSpy = jest.spyOn(publishContractUseCaseStub, 'execute')

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(addContractSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if TravelBetweenPlanetsUseCase throws', async () => {
      const { sut, publishContractUseCaseStub } = makeSut()
      const error = new Error()

      jest
        .spyOn(publishContractUseCaseStub, 'execute')
        .mockImplementationOnce(() => {
          throw error
        })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(error))
    })
  })

  test('Should be able to return 200 with a success message', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())

    expect(result).toEqual(success({ message: 'SUCCESS' }))
  })
})
