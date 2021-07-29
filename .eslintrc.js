module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    strict: 0,
    'no-console': 'error',
    quotes: ['warn', 'single'],
    'prettier/prettier': 'warn',
    'no-unused-vars': 'error',
    'no-var': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'error',
    'no-undef': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['src', './src/']],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  globals: {
    module: true,
    window: true,
    process: true,
    navigator: true,
    console: true,
    URL: true,
    fetch: true,
    document: true,
    describe: true,
    it: true,
    expect: true,
    setTimeout: true,
    setInterval: true,
    Function: true,
    Promise: true,
    clearTimeout: true,
    FormData: true,
    Blob: true,
    Set: true,
    Intl: true,
  },
};
