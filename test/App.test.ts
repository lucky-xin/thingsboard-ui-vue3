import { describe, it, expect, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { StyleProvider, ConfigProvider } from 'ant-design-vue';

// Mock the useLocale hook
vi.mock('/@/locales/useLocale', () => ({
  useLocale: () => ({
    getAntdLocale: { locale: 'en-us' },
  }),
}));

// Mock the useRootSetting hook
vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: 'light',
    getThemeColor: '#1890ff',
  }),
}));

// Mock the useTitle hook
vi.mock('/@/hooks/web/useTitle', () => ({
  useTitle: () => {},
}));

// Mock the getAppEnvConfig function
vi.mock('/@/utils/env', async () => {
  const actual = await vi.importActual('/@/utils/env');
  return {
    ...actual,
    getAppEnvConfig: () => ({
      VITE_GLOB_APP_TITLE: 'Test App',
      VITE_GLOB_API_URL: 'http://localhost:8080',
      VITE_GLOB_API_URL_WEBSOCKET: '/websocket',
      VITE_GLOB_APP_SHORT_NAME: 'test_app',
      VITE_GLOB_API_URL_PREFIX: '/api',
      VITE_PROXY: '[["/api","http://localhost:8080"]]',
    }),
  };
});

// 通过模块 mock 提供简化版 AppProvider，避免引入真实实现的外部依赖
vi.mock('/@/components/Application', () => ({
  AppProvider: {
    name: 'AppProvider',
    props: { prefixCls: { type: String, default: '' } },
    template: '<div class="app-provider" :data-prefix="prefixCls"><slot /></div>',
  },
}));

import App from '/@/App.vue';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: true,
          // 使用我们上面 mock 的真实组件，不再额外 stub
          RouterView: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  }, 15000);

  it('uses correct prefixCls for AppProvider', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: true,
          // 使用我们上面 mock 的真实组件，并显式取消 stub
          AppProvider: false,
          RouterView: true,
        },
      },
    });
    const el = wrapper.find('.app-provider');
    expect(el.exists()).toBe(true);
    expect(el.attributes('data-prefix')).toBe('jeesite');
  });
});
