/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['./node_modules/@readfort/eslint/library.js'],
  globals: {
    window: 'readable',
    RequestInit: 'readable',
    RequestCredentials: 'readable',
    RequestMode: 'readable',
    HeadersInit: 'readable',
  },
  env: {
    browser: true,
    es2021: true,
  },
}
