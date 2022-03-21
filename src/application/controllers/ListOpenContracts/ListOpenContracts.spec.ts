import { ListOpenContractsController } from '@/application/controllers/ListOpenContracts/ListOpenContracts'
import {
  noContent,
  serverError,
  success,
} from '@/application/helpers/HttpHelper'
import { IContract } from '@/domain/models/Contract'
import { IListOpenContracts } from '@/domain/usecases/ListOpenContracts'
import { mockFakeListOpenContracts } from '@/shared/mocks/fakeListOpenContracts'

type ISutTypes = {
  sut: ListOpenContractsController
  listOpenContractsUseCaseStub: IListOpenContracts
}

const makeListOpenContractsUseCaseStub = (): IListOpenContracts => {
  class ListOpenContractsUseCaseUseCaseStub implements IListOpenContracts {
    async execute(): Promise<IContract[]> {
      return mockFakeListOpenContracts()
    }
  }

  return new ListOpenContractsUseCaseUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const listOpenContractsUseCaseStub = makeListOpenContractsUseCaseStub()
  const sut = new ListOpenContractsController(listOpenContractsUseCaseStub)

  return {
    sut,
    listOpenContractsUseCaseStub,
  }
}

describe('ListOpenContracts', () => {
  describe('AddContractUseCase', () => {
    test('Should be able to call AddContractUseCase', async () => {
      const { sut, listOpenContractsUseCaseStub } = makeSut()
      const addContractSpy = jest.spyOn(listOpenContractsUseCaseStub, 'execute')

      await sut.handle({})

      expect(addContractSpy).toHaveBeenCalled()
    })

    test('Should be able to return 500 if AddContractUseCase throws', async () => {
      const { sut, listOpenContractsUseCaseStub } = makeSut()
      const error = new Error()

      jest
        .spyOn(listOpenContractsUseCaseStub, 'execute')
        .mockImplementationOnce(() => {
          throw error
        })

      const httpResponse = await sut.handle({})
      expect(httpResponse).toEqual(serverError(error))
    })
  })

  test('Should be able to return 204 is contracts list is an empty array', async () => {
    const { sut, listOpenContractsUseCaseStub } = makeSut()
    jest
      .spyOn(listOpenContractsUseCaseStub, 'execute')
      .mockResolvedValueOnce([])

    const result = await sut.handle({})

    expect(result).toEqual(noContent())
  })

  test('Should be able to return 200 with a list of contracts on success', async () => {
    const { sut } = makeSut()
    const result = await sut.handle({})

    expect(result).toEqual(success(mockFakeListOpenContracts()))
  })
})
