module.exports = {
  // Jest configuration compatible with CRACO
  jest: {
    configure: {
      // Automatically clear mock calls and instances between every test
      clearMocks: true,

      // Coverage configuration
      collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/reportWebVitals.js',
        '!src/**/*.test.{js,jsx}',
        '!src/redux/store.js',
        '!src/App.js'
      ],

      // Strict coverage thresholds
      coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },

      // Test environment
      testEnvironment: 'jsdom',

      // Module name mapping for CSS and other imports
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
      },

      // Setup files to run before each test
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

      // Test match patterns
      testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
      ],

      // Transform configuration
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
      },

      // Ignore patterns for test paths
      testPathIgnorePatterns: [
        '/node_modules/',
        '/build/'
      ],

      // Additional Jest configurations
      verbose: true,
      
      // Retry flaky tests
      testRetryAttempts: 2,

      // Coverage reporters
      coverageReporters: [
        'text',
        'lcov',
        'clover'
      ],

      // Collect coverage from these providers
      coverageProvider: 'v8',

      // Global setup and teardown
      globalSetup: '<rootDir>/jest.global.setup.js',
      globalTeardown: '<rootDir>/jest.global.teardown.js'
    }
  }
};