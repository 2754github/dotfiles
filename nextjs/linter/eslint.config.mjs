import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import neostandard, { plugins, resolveIgnoresFromGitignore } from 'neostandard';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const base = [
  // https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs
  js.configs.all,
  // https://github.com/neostandard/neostandard#configuration-options
  ...neostandard({
    env: ['browser'],
    ignores: [
      ...resolveIgnoresFromGitignore(),
      '*.config.mjs',
      '*.config.ts',
      // ...
    ],
    noStyle: true,
    semi: true,
    ts: true,
  }),
  // https://github.com/azat-io/eslint-plugin-perfectionist#flat-config-eslintconfigjs-1
  perfectionist.configs['recommended-natural'],
  {
    rules: {
      'perfectionist/sort-imports': [
        'error',
        { order: 'asc', type: 'natural', newlinesBetween: 0 },
      ],
      'perfectionist/sort-modules': 'off',
    },
  },
  // https://github.com/sindresorhus/eslint-plugin-unicorn#all-config
  eslintPluginUnicorn.configs.all,
  {
    rules: {
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, pascalCase: true } },
      ],
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // https://github.com/un-ts/eslint-plugin-import-x#typescript-example
  {
    rules: {
      ...plugins['import-x'].flatConfigs.recommended.rules,
      ...plugins['import-x'].flatConfigs.typescript.rules,
      'import-x/newline-after-import': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-default-export': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-namespace': 'error',
    },
  },
  // https://github.com/eslint-community/eslint-plugin-n/tree/master#-configs
  plugins.n.configs['flat/recommended'],
  {
    rules: {
      'n/no-missing-import': 'off',
    },
  },
  // https://github.com/eslint-community/eslint-plugin-promise#usage
  plugins.promise.configs['flat/recommended'],
  // custom
  {
    rules: {
      'arrow-body-style': ['error', 'always'],
      'capitalized-comments': 'off',
      curly: ['error', 'all'],
      'id-length': 'off',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-magic-numbers': 'off',
      'no-restricted-syntax': [
        'error',
        'ExportNamedDeclaration[specifiers.length>0]',
        'ClassDeclaration',
        'ClassExpression',
        'FunctionDeclaration',
        'FunctionExpression',
        'TSAsExpression[typeAnnotation.typeName.name!="const"]',
      ],
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-warning-comments': 'warn',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'prefer-destructuring': [
        'error',
        { array: true, object: true },
        { enforceForRenamedProperties: true },
      ],
      'sort-imports': 'off',
    },
  },
];

const typescript = [
  // https://typescript-eslint.io/users/configs/#projects-with-type-checking
  ...plugins['typescript-eslint'].config(
    plugins['typescript-eslint'].configs.strictTypeChecked,
    plugins['typescript-eslint'].configs.stylisticTypeChecked,
  ),
  // https://typescript-eslint.io/packages/parser/#projectservice
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  // custom
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        { format: ['PascalCase'], selector: 'typeLike' },
      ],
      '@typescript-eslint/require-array-sort-compare': 'error',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        { allowNullableObject: false, allowNumber: false, allowString: false },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        { requireDefaultForNonUnion: true },
      ],
    },
  },
];

const nextjs = [
  // https://nextjs.org/docs/app/api-reference/config/eslint#additional-configurations
  ...compat.config({
    // https://github.com/vercel/next.js/blob/v15.5.0/packages/eslint-config-next/index.js#L56-L61
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@next/next/recommended',
      'plugin:jsx-a11y/recommended',
      // https://github.com/vercel/next.js/blob/v15.5.0/packages/eslint-config-next/core-web-vitals.js
      'plugin:@next/next/core-web-vitals',
    ],
    // https://github.com/vercel/next.js/blob/v15.5.0/packages/eslint-config-next/index.js#L103-L106
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
  // custom
  {
    rules: {
      'react/button-has-type': 'error',
      'react/checked-requires-onchange-or-readonly': 'error',
      'react/destructuring-assignment': 'error',
      'react/hook-use-state': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never', propElementValues: 'always' },
      ],
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-array-index-key': 'error',
      'react/no-unstable-nested-components': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },
  // https://nextjs.org/docs/app/api-reference/file-conventions
  {
    files: [
      'app/**/error.tsx',
      'app/**/layout.tsx',
      'app/**/loading.tsx',
      'app/**/page.tsx',
      'middleware.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];

// https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/parsers/tsx.md
const tailwindcss = [
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-unregistered-classes': [
        'error',
        { ignore: ['dark'] },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'app/[lang]/globals.css',
      },
    },
  },
];

const test = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'max-lines-per-function': 'off',
      'no-restricted-syntax': 'off',
      'perfectionist/sort-objects': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];

const eslintConfig = [
  ...base,
  ...typescript,
  ...nextjs,
  ...tailwindcss,
  ...test,
  // ...
];

export default eslintConfig;
