import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'cobertura'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'coverage/**',
        'test-results/**',
        '**/*.config.*',
        '**/*.d.ts',
      ],
    },
  },
});
