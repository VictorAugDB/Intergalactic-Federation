module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!**/contracts/**',
    '!**/test/**',
    '!**/mocks/**',
    '!<rootDir>/src/**/contracts/index.ts',
    '!<rootDir>/src/docs/**/*'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  watchPathIgnorePatterns: ['globalConfig'],
}