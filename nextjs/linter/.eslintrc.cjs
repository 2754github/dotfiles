const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/node'),
    /**
     * NOTE
     * @vercel/style-guide does not support @next/eslint-plugin-next@15.0.0.
     * https://github.com/vercel/style-guide/blob/v6.0.0/package.json#L73
     */
    // require.resolve('@vercel/style-guide/eslint/next'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    'arrow-body-style': ['error', 'always'],
    curly: ['error', 'all'],
    'eslint-comments/require-description': 'off',
    'no-restricted-syntax': [
      'warn',
      'FunctionDeclaration',
      'NewExpression[callee.name!=/(Date|Error|Promise|Set|URL|URLSearchParams)/][callee.object.name!=/(Intl)/]',
      'TSAsExpression[typeAnnotation.typeName.name!="const"]',
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: 'block-like', next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'export' },
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
    'unicorn/filename-case': 'off',
    'unicorn/prefer-switch': ['error', { minimumCases: 2 }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      { allowNullableObject: false, allowNumber: false, allowString: false },
    ],
    // https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/v3.17.5/lib/config/rules.js
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-arbitrary-value': 'warn',
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  },

  // For Next.js 13+
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
