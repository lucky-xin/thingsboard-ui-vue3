import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue() as any, vueJsx() as any],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        statements: 85,
        lines: 85,
        branches: 0,
        functions: 0,
      },
      include: [
        'src/hooks/{core,event}/**/*.{ts,vue}',
        'src/utils/**/*.{ts,vue}',
        'src/store/**/*.{ts,vue}',
        'src/components/{Basic,Button,Copyright,CountDown,CountTo,Description,Form,Icon,Modal,Page,Popover}/**/*.{ts,vue}',
        'src/router/routes/**/*.{ts,vue}',
      ],
      exclude: [
        'src/utils/http/**',
        'src/utils/file/**',
        'src/utils/index.ts',
        'src/utils/event/index.ts',
        'src/utils/cache/persistent.ts',
        'src/utils/domUtils.ts',
        'src/components/Table/**',
        'src/components/Qrcode/**',
        'src/components/Button/src/ConfirmButton.vue',
        'src/components/Form/src/helper.ts',
        'src/store/modules/app.ts',
        'src/store/modules/multipleTab.ts',
        'src/store/modules/websocket.ts',
        'src/components/**/src/**/!(Basic|Button|CountDown|CountTo|Form|Icon|Modal|Page|Popover|Qrcode|Table)/**',
        'src/components/**/typing.ts',
        'src/main.ts',
        'src/views/**',
        'src/api/**',
        'src/enums/**',
        'src/types/**',
        '**/*.d.ts',
        '**/*.test.{ts,js}',
        '**/*.spec.{ts,js}',
      ],
      reportsDirectory: './coverage',
    },
  },
  resolve: {
    alias: {
      '/@/': new URL('./src/', import.meta.url).pathname,
      '/#/': new URL('./types/', import.meta.url).pathname,
    },
  },
});
