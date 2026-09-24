module.exports = {
  preset: 'jest-expo',
  // Only `*.test.*` files are suites, so shared helpers can live in __tests__.
  testMatch: ['**/*.test.[jt]s?(x)'],
  globalSetup: '<rootDir>/jest.globalSetup.js',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // jest-expo resolves the `react-native` export condition, which for
    // lucide is untranspiled .mjs; use its CommonJS build instead.
    '^lucide-react-native$':
      '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
    // @hebcal/core ships ESM only with no `require` export condition.
    '^@hebcal/core$': '<rootDir>/node_modules/@hebcal/core/dist/esm/index.js',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|@hebcal|quick-lru|temporal-[a-z-]+))',
  ],
}
