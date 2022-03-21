import { PublishContractController } from '@/application/controllers/PublishContract/PublishContract'
import { IPublishContractDTO } from '@/application/dtos/PublishContract'
import { MissingParamError } from '@/application/errors/MissingParamError'
import {
  badRequest,
  serverError,
  success,
} from '@/application/helpers/HttpHelper'
import { makeValidation } from '@/application/mocks/stubs/makeValidation'
import { IRequest } from '@/application/protocols/Controller'
import { IValidation } from '@/application/protocols/Validation'
import { IContract } from '@/domain/models/Contract'
import {
  IPublishContract,
  IPublishContractInput,
} from '@/domain/usecases/PublishContract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'

type ISutTypes = {
  sut: PublishContractController
  publishContractUseCaseStub: IPublishContract
  validationStub: IValidation
}

const makeFakeRequest = (): IRequest<IPublishContractDTO> => {
  const { id, ...rest } = mockFakeContract()
  return { body: rest }
}

const makePublishContractUseCaseStub = (): IPublishContract => {
  class PublishContractUseCaseUseCaseStub implements IPublishContract {
    async execute(input: IPublishContractInput): Promise<IContract> {
      return mockFakeContract()
    }
  }

  return new PublishContractUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const publishContractUseCaseStub = makePublishContractUseCaseStub()
  const validationStub = makeValidation()
  const sut = new PublishContractController(
    publishContractUseCaseStub,
    validationStub,
  )

  return {
    sut,
    publishContractUseCaseStub,
    validationStub,
  }
}

describe('PublishContractController', () => {
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

  describe('PublishContractUseCase', () => {
    test('Should be able to call AddContractUseCase with correct values', async () => {
      const { sut, publishContractUseCaseStub } = makeSut()
      const addContractSpy = jest.spyOn(publishContractUseCaseStub, 'execute')

      const fakeRequest = makeFakeRequest()
      await sut.handle(fakeRequest)

      expect(addContractSpy).toHaveBeenCalledWith(fakeRequest.body)
    })

    test('Should be able to return 500 if AddContractUseCase throws', async () => {
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

  test('Should be able to return 200 with ship data on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())

    expect(result).toEqual(success(mockFakeContract()))
  })
})
