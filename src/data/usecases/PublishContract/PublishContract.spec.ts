import { ICreateContract } from '@/data/contracts/repositories/contracts/CreateContract'
import { PublishContractUseCase } from '@/data/usecases/PublishContract/PublishContract'
import { IContract } from '@/domain/models/Contract'
import { IPublishContractInput } from '@/domain/usecases/PublishContract'
import { mockFakeContract } from '@/shared/mocks/fakeContract'

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}))

type ISutTypes = {
  sut: PublishContractUseCase
  createContractRepositoryStub: ICreateContract
}

const makeFakeRequest = (): IPublishContractInput => {
  const { id, ...rest } = mockFakeContract()
  return {
    ...rest,
  }
}

const makeCreateContractRepositoryStub = (): ICreateContract => {
  class CreateContractRepositoryUseCaseStub implements ICreateContract {
    async create(data: IContract): Promise<IContract> {
      return mockFakeContract()
    }
  }

  return new CreateContractRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const createContractRepositoryStub = makeCreateContractRepositoryStub()

  const sut = new PublishContractUseCase(createContractRepositoryStub)

  return {
    sut,
    createContractRepositoryStub,
  }
}

describe('PublishContractUseCase', () => {
  describe('CreateContractRepository', () => {
    test('Should call CreateContractRepository with correct values', async () => {
      const { sut, createContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getContractRepoSpy = jest.spyOn(
        createContractRepositoryStub,
        'create',
      )
      await sut.execute(fakeRequest)

      expect(getContractRepoSpy).toHaveBeenCalledWith({
        ...fakeRequest,
        id: 'any_id',
      })
    })

    test('Should throw if CreateContractRepository throws', async () => {
      const { sut, createContractRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(createContractRepositoryStub, 'create')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  test('Should return contract on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = await sut.execute(fakeRequest)

    expect(result).toEqual(mockFakeContract())
  })
})
