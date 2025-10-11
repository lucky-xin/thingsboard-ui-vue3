import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import UnoCSSConfig from './uno.config';

export default defineConfig({
  plugins: [vue() as any, vueJsx() as any, UnoCSS(UnoCSSConfig)],
  server: {
    deps: {
      inline: ['virtual:uno.css'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    globalSetup: ['./test/globalSetup.ts'],
    setupFiles: ['./test/setup.ts'],
    reporters: ['default'],
    testTimeout: 30000,
    css: {
      modules: {
        classNameStrategy: 'stable',
      },
    },
    cssPreprocessOptions: {
      less: {
        modifyVars: {
          '@header-light-bottom-border-color': '#e8e8e8',
          '@primary-color': '#1890ff',
        },
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 0,
        functions: 0,
      },
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      exclude: [
        '**/views/**',
        '**/layouts/**',
        '**/assets/**',
        '**/enums/**',
        '**/*.d.ts',
        '**/index.ts',
        '**/types.ts',
        '**/typing.ts',
      ],
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
