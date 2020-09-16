// https://zenn.dev/kimromi/articles/b7cf98005f3193
// https://github.com/iamturns/eslint-config-airbnb-typescript/blob/91fd090f6fdd8d598a6ac6e9bb2c2ba33014e425/lib/shared.js
module.exports = {
  // https://maku.blog/p/j6iu7it/#env-実行環境の指示
  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  // 1. https://www.npmjs.com/package/eslint-config-airbnb
  // 2. https://www.npmjs.com/package/eslint-config-airbnb-typescript
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime', // https://github.com/jsx-eslint/eslint-plugin-react/blob/c8f2813758dea1759ba5ab8caf1920cae9417a43/docs/rules/react-in-jsx-scope.md#when-not-to-use-it
    'plugin:@next/next/recommended', // https://nextjs.org/docs/basic-features/eslint#recommended-plugin-ruleset
  ],

  // https://www.npmjs.com/package/eslint-config-airbnb-typescript
  parserOptions: {
    project: './tsconfig.eslint.json',
  },

  plugins: [
    'prefer-arrow', // https://www.npmjs.com/package/eslint-plugin-prefer-arrow
  ],

  // https://maku.blog/p/j6iu7it/#root-true
  root: true,

  rules: {
    'arrow-body-style': ['error', 'always'],
    'import/extensions': ['error', 'never', { json: 'always' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] }], // for Vitest
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'max-len': 'off', // delegate to Prettier
    'no-nested-ternary': 'warn', // prone to conflict with JSX
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { minProperties: 1, consistent: false },
        ObjectPattern: { minProperties: 100, consistent: false },
      },
    ],
    'operator-linebreak': 'off', // delegate to Prettier
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      { disallowPrototype: true, singleReturnOnly: false, classPropertiesAllowed: true },
    ],
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
    'react-hooks/exhaustive-deps': 'off',
    'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }], // allow <>{children}</>
    'react/jsx-one-expression-per-line': 'off', // delegate to Prettier
    'react/jsx-props-no-spreading': 'off', // conflict with React Hook Form
    'react/jsx-sort-props': ['error', { callbacksLast: true, reservedFirst: true }],
    'react/prop-types': 'off', // https://github.com/jsx-eslint/eslint-plugin-react/blob/c8f2813758dea1759ba5ab8caf1920cae9417a43/docs/rules/prop-types.md#about-component-detection
    'react/require-default-props': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/indent': 'off', // delegate to Prettier
    '@typescript-eslint/naming-convention': 'warn', // allow _
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }], // https://github.com/typescript-eslint/typescript-eslint/blob/722fd77ef6dcc8a21539972f44695d94286d5295/packages/eslint-plugin/docs/rules/no-floating-promises.md#ignoreiife
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }], // conflict with React Hook Form
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // allow _
    '@typescript-eslint/no-use-before-define': 'off', // allow postfix definition
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
        'import/prefer-default-export': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
};
