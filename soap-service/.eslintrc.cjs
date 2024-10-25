/* eslint-disable quote-props */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 'off',
    'no-unused-vars': 'off',
    'indent': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-globals': 'off',
  },
};
