import { ICreateShip } from '@/data/contracts/repositories/ships/CreateShip'
import { AddShipUseCase } from '@/data/usecases/AddShip/AddShip'
import { IShip } from '@/domain/models/Ship'
import { IAddShipInput } from '@/domain/usecases/AddShip'
import { mockFakeShip } from '@/shared/mocks/fakeShip'

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}))

type ISutTypes = {
  sut: AddShipUseCase
  createShipRepositoryStub: ICreateShip
}

const makeFakeRequest = (): IAddShipInput => {
  const { id, ...rest } = mockFakeShip()
  return {
    ...rest,
  }
}

const makeCreateShipRepositoryStub = (): ICreateShip => {
  class CreateShipRepositoryUseCaseStub implements ICreateShip {
    async create(data: IShip): Promise<IShip> {
      return mockFakeShip()
    }
  }

  return new CreateShipRepositoryUseCaseStub()
}

const makeSut = (): ISutTypes => {
  const createShipRepositoryStub = makeCreateShipRepositoryStub()

  const sut = new AddShipUseCase(createShipRepositoryStub)

  return {
    sut,
    createShipRepositoryStub,
  }
}

describe('AddShip', () => {
  describe('CreateShip', () => {
    test('Should call CreateShip with correct values', async () => {
      const { sut, createShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      const getShipRepoSpy = jest.spyOn(createShipRepositoryStub, 'create')
      await sut.execute(fakeRequest)

      expect(getShipRepoSpy).toHaveBeenCalledWith({
        ...fakeRequest,
        id: 'any_id',
      })
    })

    test('Should throw if CreateShip throws', async () => {
      const { sut, createShipRepositoryStub } = makeSut()
      const fakeRequest = makeFakeRequest()
      jest
        .spyOn(createShipRepositoryStub, 'create')
        .mockRejectedValueOnce(new Error())
      const promise = sut.execute(fakeRequest)

      await expect(promise).rejects.toThrowError()
    })
  })

  test('Should return ship on success', async () => {
    const { sut } = makeSut()
    const fakeRequest = makeFakeRequest()

    const result = await sut.execute(fakeRequest)

    expect(result).toEqual(mockFakeShip())
  })
})
