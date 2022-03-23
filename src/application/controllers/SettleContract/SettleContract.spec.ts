import { SettleContractController } from '@/application/controllers/SettleContract/SettleContract'
import { ISettleContractDTO } from '@/application/dtos/SettleContractDTO'
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
  ISettleContract,
  ISettleContractInput,
} from '@/domain/usecases/SettleContrac'

type ISutTypes = {
  sut: SettleContractController
  publishContractUseCaseStub: ISettleContract
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<ISettleContractDTO> => ({
  body: {
    contractId: 'any_id',
  },
})

const makeSettleContractUseCaseStub = (): ISettleContract => {
  class SettleContractUseCaseUseCaseStub implements ISettleContract {
    async execute(input: ISettleContractInput): Promise<void> {}
  }

  return new SettleContractUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const publishContractUseCaseStub = makeSettleContractUseCaseStub()
  const validationStub = makeValidation()
  const sut = new SettleContractController(
    publishContractUseCaseStub,
    validationStub,
  )

  return {
    sut,
    publishContractUseCaseStub,
    validationStub,
  }
}

describe('SettleContractController', () => {
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

  describe('SettleContractUseCase', () => {
    test('Should be able to call SettleContractUseCase with correct values', async () => {
      const { sut, publishContractUseCaseStub } = makeSut()
      const settleContractSpy = jest.spyOn(
        publishContractUseCaseStub,
        'execute',
      )

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(settleContractSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if SettleContractUseCase throws', async () => {
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
