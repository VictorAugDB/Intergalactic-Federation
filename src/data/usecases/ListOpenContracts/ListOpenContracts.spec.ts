import { IListContracts } from '@/data/contracts/repositories/contracts/ListContrats'
import { ListOpenContractsUseCase } from '@/data/usecases/ListOpenContracts/ListOpenContracts'
import { IContract } from '@/domain/models/Contract'
import { mockFakeListOpenContracts } from '@/shared/mocks/fakeListOpenContracts'

type ISutTypes = {
  sut: ListOpenContractsUseCase
  listContractsRepositoryStub: IListContracts
}

const makeListContractsRepositoryStub = (): IListContracts => {
  class ListContractsRepositoryUseCaseStub implements IListContracts {
    async listOpenContracts(): Promise<IContract[]> {
      return mockFakeListOpenContracts()
    }
  }

  return new ListContractsRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const listContractsRepositoryStub = makeListContractsRepositoryStub()

  const sut = new ListOpenContractsUseCase(listContractsRepositoryStub)

  return {
    sut,
    listContractsRepositoryStub,
  }
}

describe('ListOpenContractsUseCase', () => {
  describe('ListContracts', () => {
    test('Should call ListContracts', async () => {
      const { sut, listContractsRepositoryStub } = makeSut()
      const getContractRepoSpy = jest.spyOn(
        listContractsRepositoryStub,
        'listOpenContracts',
      )
      await sut.execute()

      expect(getContractRepoSpy).toHaveBeenCalled()
    })

    test('Should throw if ListContracts throws', async () => {
      const { sut, listContractsRepositoryStub } = makeSut()
      jest
        .spyOn(listContractsRepositoryStub, 'listOpenContracts')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute()

      await expect(promise).rejects.toThrowError()
    })
  })

  test('Should return contract on success', async () => {
    const { sut } = makeSut()

    const result = await sut.execute()

    expect(result).toEqual(mockFakeListOpenContracts())
  })
})
