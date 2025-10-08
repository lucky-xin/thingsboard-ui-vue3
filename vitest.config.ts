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
    testTimeout: 30000,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 0,
        functions: 0,
      },
      include: [
        'src/components/**/*.{ts,vue}',
        'src/directives/**/*.{ts,vue}',
        'src/hooks/**/*.{ts,vue}',
        'src/logics/**/*.{ts,vue}',
        'src/router/**/*.{ts,vue}',
        'src/settings/**/*.{ts,vue}',
        'src/store/**/*.{ts,vue}',
        'src/utils/**/*.{ts,vue}',
        'src/api/**/*.{ts,vue}',
      ],
      exclude: ['src/views/**', '**/*.d.ts'],
      reportsDirectory: './coverage',
    },
    alias: {
      '/@/': new URL('./src/', import.meta.url).pathname,
      '/#/': new URL('./types/', import.meta.url).pathname,
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
