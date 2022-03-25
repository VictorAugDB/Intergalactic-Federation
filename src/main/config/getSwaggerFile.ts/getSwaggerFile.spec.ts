import { getSwaggerFile as sut } from '@/main/config/getSwaggerFile.ts/getSwaggerFile'

const mockExistsSync = jest.fn()
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  existsSync: () => mockExistsSync(),
  readFileSync: () => Buffer.alloc(1),
}))

describe('getSwaggerFile', () => {
  test('Should return file if exists', () => {
    mockExistsSync.mockReturnValueOnce(true)
    const result = sut()

    expect(result).toEqual(Buffer.alloc(1))
  })

  test('Should return undefined if file not exists', () => {
    mockExistsSync.mockReturnValueOnce(false)
    const result = sut()

    expect(result).toBe(undefined)
  })
})
