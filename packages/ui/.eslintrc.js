/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./node_modules/@readfort/eslint/library.js"],
  env: {
    node: true,
    browser: true,
  },
};
