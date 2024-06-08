const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: {
    project,
  },
  rules: {
    'arrow-body-style': ['error', 'always'],
    curly: ['error', 'all'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'throw' },
    ],
    'prefer-destructuring': [
      'error',
      { array: true, object: true },
      { enforceForRenamedProperties: true },
    ],
    'react/destructuring-assignment': ['error', 'always'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      { callbacksLast: true, reservedFirst: true, shorthandLast: true },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },

  // Next.js 13+
  overrides: [
    {
      // https://nextjs.org/docs/app/api-reference/file-conventions
      files: [
        'app/**/error.tsx',
        'app/**/global-error.tsx',
        'app/**/layout.tsx',
        'app/**/loading.tsx',
        'app/**/not-found.tsx',
        'app/**/page.tsx',
        'middleware.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
