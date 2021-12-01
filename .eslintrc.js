module.exports = {
  extends: [
    'airbnb',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@babel/eslint-parser',
  env: {
    jest: true,
  },
  globals: {
    setupWithTheme: true,
    window: true,
    document: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    semi: 0,
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'react/no-array-index-key': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['internal', 'index', 'parent'],
          ['sibling'],
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'func-names': 'off',
  },
}
