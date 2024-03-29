'use strict'

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/cypress/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: 'src/__tests__/tsconfig.json',
    },
  },
}
