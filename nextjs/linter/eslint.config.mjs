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
      // ...
    ],
    noStyle: true,
    semi: true,
    ts: true,
  }),
  // https://github.com/azat-io/eslint-plugin-perfectionist#flat-config-eslintconfigjs-1
  perfectionist.configs['recommended-natural'],
  // https://github.com/sindresorhus/eslint-plugin-unicorn#all-config
  eslintPluginUnicorn.configs.all,
  // https://github.com/un-ts/eslint-plugin-import-x#typescript-example
  {
    rules: {
      ...plugins['import-x'].flatConfigs.recommended.rules,
      ...plugins['import-x'].flatConfigs.typescript.rules,
      'import-x/no-default-export': 'error',
    },
  },
  // https://github.com/eslint-community/eslint-plugin-n/tree/master#-configs
  plugins.n.configs['flat/recommended'],
  // https://github.com/eslint-community/eslint-plugin-promise#usage
  plugins.promise.configs['flat/recommended'],
  // custom
  {
    rules: {
      // TODO
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
      // TODO
    },
  },
];

const nextjs = [
  // https://nextjs.org/docs/app/api-reference/config/eslint#additional-configurations
  ...compat.config({
    // https://github.com/vercel/next.js/blob/v15.4.1/packages/eslint-config-next/index.js#L56-L59
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@next/next/recommended',
      'plugin:jsx-a11y/recommended',
      // https://github.com/vercel/next.js/blob/v15.4.1/packages/eslint-config-next/core-web-vitals.js
      'plugin:@next/next/core-web-vitals',
    ],
    // https://github.com/vercel/next.js/blob/v15.4.1/packages/eslint-config-next/index.js#L103-L106
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
  // custom
  {
    rules: {
      // TODO
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
      // TODO
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
