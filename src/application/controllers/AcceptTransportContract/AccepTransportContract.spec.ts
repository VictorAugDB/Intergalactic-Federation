import { AcceptTransportContractController } from '@/application/controllers/AcceptTransportContract/AcceptTransportContract'
import { IAcceptTransportContractDTO } from '@/application/dtos/AcceptTransportContract'
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
  IAcceptTransportContract,
  IAcceptTransportContractInput,
} from '@/domain/usecases/AcceptTransportContract'

type ISutTypes = {
  sut: AcceptTransportContractController
  acceptTransportContractStub: IAcceptTransportContract
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IAcceptTransportContractDTO> => ({
  body: {
    contractId: 'any_id',
    certificationDocument: 'any_document',
  },
})

const makeAcceptTransportContractUseCaseStub = (): IAcceptTransportContract => {
  class AcceptTransportContractUseCaseUseCaseStub
    implements IAcceptTransportContract
  {
    async execute(input: IAcceptTransportContractInput): Promise<void> {}
  }

  return new AcceptTransportContractUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const acceptTransportContractStub = makeAcceptTransportContractUseCaseStub()
  const validationStub = makeValidation()
  const sut = new AcceptTransportContractController(
    acceptTransportContractStub,
    validationStub,
  )

  return {
    sut,
    acceptTransportContractStub,
    validationStub,
  }
}

describe('AcceptTransportContractController', () => {
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

  describe('AcceptTransportContractUseCase', () => {
    test('Should be able to call AcceptTransportContractUseCase with correct values', async () => {
      const { sut, acceptTransportContractStub } = makeSut()
      const acceptContractSpy = jest.spyOn(
        acceptTransportContractStub,
        'execute',
      )

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(acceptContractSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if AcceptTransportContractUseCase throws', async () => {
      const { sut, acceptTransportContractStub } = makeSut()
      const error = new Error()

      jest
        .spyOn(acceptTransportContractStub, 'execute')
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
