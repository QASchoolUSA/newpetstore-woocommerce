// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)', // Include Jest tests
],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  testPathIgnorePatterns: [
    './tests' // Exclude anything in the tests folder
],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);