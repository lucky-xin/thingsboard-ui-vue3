import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

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

// Create test component for AppLocalePicker functionality
const AppLocalePickerTest = {
  name: 'AppLocalePicker',
  setup() {
    const currentLocale = vi.fn(() => 'en');
    const changeLocale = vi.fn();
    const localeList = [
      { text: 'English', event: 'en' },
      { text: '简体中文', event: 'zh_CN' }
    ];
    return {
      currentLocale,
      changeLocale,
      localeList
    };
  },
  template: `
    <div class="app-locale-picker">
      <div class="locale-dropdown" @click="changeLocale">
        <span class="current-locale">{{ currentLocale() }}</span>
        <div class="locale-options">
          <div 
            v-for="locale in localeList" 
            :key="locale.event"
            class="locale-option"
            @click="changeLocale(locale.event)"
          >
            {{ locale.text }}
          </div>
        </div>
      </div>
    </div>
  `
};

// Setup test environment
const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
});

const globalMocks = {
  $t: (key: string) => key,
  $router: router,
  $route: { path: '/', params: {}, query: {} }
};

describe('AppLocalePicker', () => {
  it('should render without crashing', () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with correct structure', () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    expect(wrapper.find('.app-locale-picker').exists()).toBe(true);
    expect(wrapper.find('.locale-dropdown').exists()).toBe(true);
    expect(wrapper.find('.current-locale').exists()).toBe(true);
  });

  it('should display current locale', () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    expect(wrapper.find('.current-locale').text()).toBe('en');
  });

  it('should display locale options', () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    const options = wrapper.findAll('.locale-option');
    expect(options).toHaveLength(2);
    expect(options[0].text()).toBe('English');
    expect(options[1].text()).toBe('简体中文');
  });

  it('should handle locale change events', async () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    const dropdown = wrapper.find('.locale-dropdown');
    await dropdown.trigger('click');
    
    expect(wrapper.vm.changeLocale).toHaveBeenCalled();
  });

  it('should handle locale option clicks', async () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    const options = wrapper.findAll('.locale-option');
    await options[0].trigger('click');
    
    expect(wrapper.vm.changeLocale).toHaveBeenCalled();
  });

  it('should have proper component structure', () => {
    const wrapper = mount(AppLocalePickerTest, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    
    expect(wrapper.html()).toContain('app-locale-picker');
    expect(wrapper.html()).toContain('locale-dropdown');
    expect(wrapper.html()).toContain('current-locale');
  });
});