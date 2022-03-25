module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/**/*-helpers.ts',
    '!**/protocols/**',
    '!**/contracts/**',
    '!**/test/**',
    '!**/mocks/**',
    '!<rootDir>/src/**/contracts/index.ts',
    '!<rootDir>/src/docs/**/*',
    '!<rootDir>/src/infra/database/**/*',
    '!<rootDir>/src/domain/entities/*.ts',
    '!<rootDir>/src/infra/repositories/*.ts',
    '!<rootDir>/src/application/helpers/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}