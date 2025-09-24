import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
      include: ['src/**/*.{ts,vue}'],
      exclude: [
        'src/main.ts',
        'src/router/**',
        'src/enums/**',
        'src/types/**',
        '**/*.d.ts',
        '**/*.test.{ts,js}',
        '**/*.spec.{ts,js}'
      ],
      reportsDirectory: './coverage'
    }
  },
  resolve: {
    alias: {
      '/@/': new URL('./src/', import.meta.url).pathname,
      '/#/': new URL('./types/', import.meta.url).pathname
    }
  }
})