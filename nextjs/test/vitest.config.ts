import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      exclude: [...(configDefaults.coverage.exclude ?? []), '**/*.tsx'],
      include: ['app', 'lib', 'middleware.ts'],
    },
    restoreMocks: true,
    setupFiles: './vitest.setup.tsx',
  },
});
