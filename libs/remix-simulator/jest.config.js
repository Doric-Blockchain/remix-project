module.exports = {
    name: 'remix-simulator',
    preset: '../../jest.config.js',
    verbose: true,
    silent: false, // Silent console messages, specially the 'remix-simulator' ones
    transform: {
      '^.+\\.[tj]sx?$': 'ts-jest',
    },
    rootDir: "./",
    testTimeout: 40000,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html', 'json'],
    // Coverage
    collectCoverage: true,
    coverageReporters: ['text', 'text-summary'],
    collectCoverageFrom: [
      "**/*.ts",
      "!**/sol/**",
      "!src/types.ts",
      "!src/logger.ts"
    ],
    coverageDirectory: '../../coverage/libs/remix-simulator',
  };
  