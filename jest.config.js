module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/*/RbGenerated*/*.{js,jsx}',
    '!src/app.js',
    '!src/assets/js/*.{js,jsx}',
    '!src/global-styles.js',
    '!src/*/*/Loadable.{js,jsx}',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/neurons/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/scripts/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/mocks/image.js',
    '@onyx/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/scripts/testing/test-bundler.js',
    '<rootDir>/jest.setup.js',
    'react-testing-library/cleanup-after-each',
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
};
