import { RefuelShipController } from '@/application/controllers/RefuelShip/RefuelShip'
import { IRefuelShipDTO } from '@/application/dtos/RefuelShipDTO'
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
  IRefuelShip,
  IRefuelShipInput,
  IRefuelShipResult,
} from '@/domain/usecases/RefuelShip'

type ISutTypes = {
  sut: RefuelShipController
  refuelShipUseCaseStub: IRefuelShip
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IRefuelShipDTO> => ({
  body: {
    amountOfFuel: 50,
    certificationDocument: 'any_document',
  },
})

const makeRefuelShipUseCaseStub = (): IRefuelShip => {
  class RefuelShipUseCaseUseCaseStub implements IRefuelShip {
    async execute(input: IRefuelShipInput): Promise<IRefuelShipResult> {
      return {
        fuelLevel: 100,
      }
    }
  }

  return new RefuelShipUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const refuelShipUseCaseStub = makeRefuelShipUseCaseStub()
  const validationStub = makeValidation()
  const sut = new RefuelShipController(refuelShipUseCaseStub, validationStub)

  return {
    sut,
    refuelShipUseCaseStub,
    validationStub,
  }
}

describe('RefuelShipController', () => {
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

  describe('RefuelShipUseCase', () => {
    test('Should be able to call RefuelShipUseCase with correct values', async () => {
      const { sut, refuelShipUseCaseStub } = makeSut()
      const refuelShipSpy = jest.spyOn(refuelShipUseCaseStub, 'execute')

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(refuelShipSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if RefuelShipUseCase throws', async () => {
      const { sut, refuelShipUseCaseStub } = makeSut()
      const error = new Error()

      jest
        .spyOn(refuelShipUseCaseStub, 'execute')
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

    expect(result).toEqual(success({ fuelLevel: 100 }))
  })
})
