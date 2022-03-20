import { AddShip } from '@/application/controllers/AddShip/AddShip'
import { IAddShipDTO } from '@/application/dtos/AddShip'
import { MissingParamError } from '@/application/errors/MissingParamError'
import {
  badRequest,
  serverError,
  success,
} from '@/application/helpers/HttpHelper'
import { makeValidation } from '@/application/mocks/stubs/makeValidation'
import { IRequest } from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IShip } from '@/domain/models/Ship'
import { IAddShip, IAddShipInput } from '@/domain/usecases/AddShip'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

type ISutTypes = {
  sut: AddShip
  addShipUseCase: IAddShip
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IAddShipDTO> => ({
  body: mockFakeShip(),
})

const makeAddShipUseCaseStub = (): IAddShip => {
  class AddShipUseCaseUseCaseStub implements IAddShip {
    async execute(input: IAddShipInput): Promise<IShip> {
      return mockFakeShip()
    }
  }

  return new AddShipUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const addShipUseCase = makeAddShipUseCaseStub()
  const validationStub = makeValidation()
  const sut = new AddShip(addShipUseCase, validationStub)

  return {
    sut,
    addShipUseCase,
    validationStub,
  }
}

describe('AddShips', () => {
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

  describe('AddShipUseCase', () => {
    test('Should be able to call AddShipUseCase with correct values', async () => {
      const { sut, addShipUseCase } = makeSut()
      const addShipSpy = jest.spyOn(addShipUseCase, 'execute')
      await sut.handle(makeFakeRequest())

      expect(addShipSpy).toHaveBeenCalledWith(mockFakeShip())
    })

    test('Should be able to return 500 if AddShipUseCase throws', async () => {
      const { sut, addShipUseCase } = makeSut()
      const error = new Error()

      jest.spyOn(addShipUseCase, 'execute').mockImplementationOnce(() => {
        throw error
      })

      const httpResponse = await sut.handle(makeFakeRequest())
      expect(httpResponse).toEqual(serverError(error))
    })
  })

  test('Should be able to return 200 with ship data on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())

    expect(result).toEqual(success(mockFakeShip()))
  })
})
