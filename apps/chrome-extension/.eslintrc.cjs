module.exports = {
  extends: [
    './node_modules/@readfort/eslint/library.js',
    'plugin:react-hooks/recommended',
  ],
  env: {
    browser: true,
    es2020: true,
    webextensions: true,
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}
