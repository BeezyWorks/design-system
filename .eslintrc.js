module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['node_modules/', 'storybook-static/'],
  rules: {
    'prettier/prettier': 0,
    semi: 0,
    'react-hooks/exhaustive-deps': 0,
    'no-debugger': 2,
    curly: 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    // Colors are SemanticColor tokens — never a hex/rgb literal. Add a named
    // color to colors/named.ts and map it in colors/themes.ts instead.
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/^#[0-9a-fA-F]{3,8}$/]',
        message:
          'Hex color literal — add a named color in colors/named.ts and use a SemanticColor.',
      },
      {
        selector: 'Literal[value=/^(rgb|hsl)a?\\(/]',
        message:
          'rgb()/hsl() color literal — add a named color in colors/named.ts and use a SemanticColor.',
      },
    ],
    // Relative imports only: the package never imports itself by name.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@beezyworks/design', '@beezyworks/design/**'],
            message: 'Use a relative path inside the design system.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      // The palette itself and this file's own rule messages.
      files: ['colors/**', '.eslintrc.js'],
      rules: {'no-restricted-syntax': 'off'},
    },
    {
      // Primitives map props to styles, which is inherently dynamic.
      files: ['components/**'],
      rules: {'react-native/no-inline-styles': 'off'},
    },
    {
      // Storybook stories render plain DOM (web-only), not React Native.
      files: ['**/*.stories.tsx', '.storybook/**'],
      rules: {'react-native/no-inline-styles': 'off'},
    },
  ],
}
