import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue() as any, vueJsx() as any],
  test: {
    environment: 'jsdom',
    globals: true,
    globalSetup: ['./test/globalSetup.ts'],
    setupFiles: ['./test/setup.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 90,
        functions: 90,
      },
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '/@/': new URL('./src/', import.meta.url).pathname,
      '/#/': new URL('./types/', import.meta.url).pathname,
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
});
