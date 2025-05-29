import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      include: ['app', 'lib'],
    },
    restoreMocks: true,
    setupFiles: './vitest.setup.tsx',
  },
});
