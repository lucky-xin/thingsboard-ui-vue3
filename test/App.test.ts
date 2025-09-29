// Mock build configuration for Vite plugins
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});

Object.defineProperty(globalThis, '__PROD__', {
  value: false,
  writable: true
});

Object.defineProperty(globalThis, '__COLOR_PLUGIN_OPTIONS__', {
  value: {},
  writable: true
});

// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import { StyleProvider, ConfigProvider, theme } from 'ant-design-vue';
import { ThemeEnum } from '/@/enums/appEnum';

// Create reactive mocks
const mockDarkMode = ref('light');
const mockThemeColor = ref('#1890ff');
const mockAntdLocale = ref({ locale: 'en-US' });

// Mock hooks with reactive values
vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: mockDarkMode,
    getThemeColor: mockThemeColor,
  }),
}));

vi.mock('/@/locales/useLocale', () => ({
  useLocale: () => ({
    getAntdLocale: mockAntdLocale,
  }),
}));

vi.mock('/@/hooks/web/useTitle', () => ({
  useTitle: vi.fn(),
}));

vi.mock('/@/enums/appEnum', () => ({
  ThemeEnum: {
    DARK: 'dark',
    LIGHT: 'light',
  },
}));

// Mock theme config
vi.mock('../../build/theme/themeConfig', () => ({
  darkPrimaryColor: '#2a50ec',
}));

// Mock dayjs
vi.mock('dayjs/locale/zh-cn', () => ({}));

// Mock Application component
vi.mock('/@/components/Application', () => ({
  AppProvider: {
    name: 'AppProvider',
    props: { prefixCls: { type: String, default: '' } },
    template: '<div class="app-provider" :data-prefix="prefixCls"><slot /></div>',
  },
}));

import App from '/@/App.vue';

describe('App', () => {
  beforeEach(() => {
    // Reset mock values before each test
    mockDarkMode.value = 'light';
    mockThemeColor.value = '#1890ff';
    mockAntdLocale.value = { locale: 'en-US' };
  });

  it('renders correctly', () => {
    const wrapper = shallowMount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: true,
          RouterView: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('uses correct prefixCls for AppProvider', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: true,
          AppProvider: false,
          RouterView: true,
        },
      },
    });
    const el = wrapper.find('.app-provider');
    expect(el.exists()).toBe(true);
    expect(el.attributes('data-prefix')).toBe('jeesite');
  });

  it('applies light theme correctly', async () => {
    mockDarkMode.value = 'light';
    mockThemeColor.value = '#1890ff';
    
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: false,
          AppProvider: true,
          RouterView: true,
        },
      },
    });
    
    await wrapper.vm.$nextTick();
    const configProvider = wrapper.findComponent(ConfigProvider);
    expect(configProvider.exists()).toBe(true);
    
    const themeProps = configProvider.props('theme');
    expect(themeProps.algorithm).toBe(theme.defaultAlgorithm);
    expect(themeProps.token.colorPrimary).toBe('#1890ff');
  });

  it('applies dark theme correctly', async () => {
    mockDarkMode.value = ThemeEnum.DARK;
    mockThemeColor.value = '#1890ff';
    
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: false,
          AppProvider: true,
          RouterView: true,
        },
      },
    });
    
    await wrapper.vm.$nextTick();
    const configProvider = wrapper.findComponent(ConfigProvider);
    expect(configProvider.exists()).toBe(true);
    
    const themeProps = configProvider.props('theme');
    expect(themeProps.algorithm).toBe(theme.darkAlgorithm);
    expect(themeProps.token.colorPrimary).toBe('#2a50ec');
  });

  it('reacts to theme color changes', async () => {
    mockDarkMode.value = 'light';
    mockThemeColor.value = '#ff6b6b';
    
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: false,
          AppProvider: true,
          RouterView: true,
        },
      },
    });
    
    await wrapper.vm.$nextTick();
    const configProvider = wrapper.findComponent(ConfigProvider);
    const themeProps = configProvider.props('theme');
    expect(themeProps.token.colorPrimary).toBe('#ff6b6b');
    expect(themeProps.token.colorLink).toBe('#ff6b6b');
    expect(themeProps.token.colorInfo).toBe('#ff6b6b');
  });

  it('passes correct locale to ConfigProvider', async () => {
    mockAntdLocale.value = { locale: 'zh-CN' };
    
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: true,
          ConfigProvider: false,
          AppProvider: true,
          RouterView: true,
        },
      },
    });
    
    await wrapper.vm.$nextTick();
    const configProvider = wrapper.findComponent(ConfigProvider);
    expect(configProvider.props('locale')).toEqual({ locale: 'zh-CN' });
  });

  it('has StyleProvider with correct props', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          StyleProvider: false,
          ConfigProvider: true,
          AppProvider: true,
          RouterView: true,
        },
      },
    });
    
    const styleProvider = wrapper.findComponent(StyleProvider);
    expect(styleProvider.exists()).toBe(true);
    expect(styleProvider.props('hashPriority')).toBe('high');
    expect(styleProvider.props('transformers')).toHaveLength(1);
  });
});
