module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  testRegex: '(__tests__.*|(\\.))spec.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  clearMocks: true,
  coverageReporters: ['json-summary', ['text', { file: 'coverage.txt' }]],
};
