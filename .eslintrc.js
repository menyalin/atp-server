module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['jest', 'babel'],
  extends: [
    'standard', 'plugin:jest/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-extra-semi": "warn"
  }
}
