module.exports = {
  env: {
    "es2021": true,
    "node": true,
    "jest": true
  },
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-helpers',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': [
          'PascalCase'
        ],
        'custom': {
          'regex': '^I[A-Z]',
          'match': true
        }
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        'newlinesBetween': 'always',
        'groups': [
          'module',
          '/^@shared/',
          [
            'parent',
            'sibling',
            'index'
          ]
        ],
        'alphabetize': {
          'order': 'asc',
          'ignoreCase': true
        }
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.spec.js'
        ]
      }
    ],
    '@typescript-eslint/no-floating-promises': ['warn'],
    '@typescript-eslint/no-misused-promises': [
      'warn',
      {
        'checksVoidReturn': false
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'prettier/prettier': 'error'
  }
};
