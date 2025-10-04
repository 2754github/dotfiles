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
  js.configs.all,
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
  // eslint-plugin-import-x
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
  plugins.n.configs['flat/all'],
  {
    rules: {
      'n/file-extension-in-import': 'off',
      'n/no-missing-import': 'off',
      'n/no-process-env': 'off',
    },
  },
  plugins.promise.configs['flat/recommended'],
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
  eslintPluginUnicorn.configs.all,
  {
    rules: {
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, pascalCase: true } },
      ],
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  // custom
  {
    rules: {
      'arrow-body-style': ['error', 'always'],
      'capitalized-comments': 'off',
      curly: ['error', 'all'],
      'id-length': 'off',
      'max-lines-per-function': ['error', 80],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-magic-numbers': 'off',
      'no-restricted-syntax': [
        'error',
        'ClassDeclaration',
        'ClassExpression',
        'ExportNamedDeclaration[specifiers.length>0]',
        'FunctionDeclaration',
        'FunctionExpression',
        'TSAsExpression[typeAnnotation.typeName.name!="const"]',
      ],
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-warning-comments': 'warn',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'prefer-destructuring': [
        'error',
        { array: true, object: true },
        { enforceForRenamedProperties: true },
      ],
      'prefer-named-capture-group': 'off',
      'sort-imports': 'off',
      'sort-keys': 'off',
    },
  },
];

const typescript = [
  ...plugins['typescript-eslint'].config(
    plugins['typescript-eslint'].configs.strictTypeChecked,
    plugins['typescript-eslint'].configs.stylisticTypeChecked,
  ),
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
      '@typescript-eslint/no-unnecessary-type-assertion': [
        'error',
        { checkLiteralConstAssertions: true },
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
  ...compat.config({
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@next/next/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@next/next/core-web-vitals',
    ],
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
  {
    files: [
      'app/**/error.tsx',
      'app/**/layout.tsx',
      'app/**/page.tsx',
      'middleware.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];

const tailwindcss = [
  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-important-position': 'error',
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
      'better-tailwindcss/enforce-shorthand-classes': 'error',
      'better-tailwindcss/no-deprecated-classes': 'error',
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
      'perfectionist/sort-objects': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },
];

const eslintConfig = [
  ...base,
  ...typescript,
  ...nextjs,
  ...tailwindcss,
  ...test,
];

export default eslintConfig;
