import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue() as any, vueJsx() as any],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 80,
        lines: 80,
        branches: 0,
        functions: 0,
      },
      include: [
        'src/utils/**/*.{ts,vue}',
        'src/hooks/**/*.{ts,vue}',
        'src/store/**/*.{ts,vue}',
        'src/router/**/*.{ts,vue}',
        'src/components/**/*.{ts,vue}',
      ],
      exclude: [
        'src/views/**',
        'src/api/**',
        '**/*.d.ts',
      ],
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
