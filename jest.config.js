// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['./jest.setup.js'], // or .ts
  testEnvironment: 'jest-environment-jsdom',
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Or your main tsconfig.json
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Adjust based on your path aliases in tsconfig.json
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
