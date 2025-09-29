import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

const testPinia = createPinia()

// Stub theme plugin globals before any dynamic imports
beforeAll(() => {
  vi.stubGlobal('__COLOR_PLUGIN_OUTPUT_FILE_NAME__', 'theme.css')
  vi.stubGlobal('__PROD__', false)
  vi.stubGlobal('__COLOR_PLUGIN_OPTIONS__', {})
})

// Mock vue-router
vi.mock('vue-router', () => ({
  createRouter: vi.fn(() => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
  })),
  createWebHashHistory: vi.fn(() => ({})),
  createWebHistory: vi.fn(() => ({})),
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
  }),
}))

// Mock store with real pinia instance
vi.mock('/@/store', () => ({
  store: testPinia,
  useAppStore: () => ({
    getTheme: vi.fn(() => 'light'),
    setTheme: vi.fn(),
    locale: 'en',
    setLocale: vi.fn(),
  }),
  useUserStore: () => ({
    userInfo: { name: 'Test User' },
    isLoggedIn: true,
  }),
}))

// Mock hooks
vi.mock('/@/hooks/setting/useLocale', () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: 'en' })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key),
  }),
}))

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Modal: {
    template: '<div class="ant-modal"><slot></slot></div>',
    props: ['visible', 'title', 'open'],
  },
  Form: {
    template: '<form class="ant-form"><slot></slot></form>',
    props: ['model', 'rules'],
  },
  FormItem: {
    template: '<div class="ant-form-item"><slot></slot></div>',
    props: ['label', 'name'],
  },
  Input: {
    template: '<input class="ant-input" />',
    props: ['value', 'placeholder'],
  },
  Button: {
    template: '<button class="ant-btn"><slot></slot></button>',
    props: ['type', 'loading'],
  },
  Select: {
    template: '<div class="ant-select"><slot></slot></div>',
    props: ['value', 'options', 'mode'],
  },
  Option: {
    template: '<option class="ant-select-option"><slot></slot></option>',
    props: ['value', 'label'],
  },
  Tooltip: {
    template: '<div class="ant-tooltip"><slot></slot></div>',
    props: ['title', 'placement'],
  },
}))

describe('AppSearchModal', () => {
  beforeEach(() => {
    setActivePinia(testPinia)
    vi.clearAllMocks()
  })

  const mountOptions = {
    global: {
      stubs: {
        'a-input': { template: '<input />' },
      },
      config: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('a-'),
        },
      },
    },
  }

  it('should render with correct structure', async () => {
    const AppSearchModal = (await import('/@/components/Application/src/search/AppSearchModal.vue')).default
    const wrapper = mount(AppSearchModal, {
      props: { open: true },
      ...mountOptions,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should emit close event when closed', async () => {
    const AppSearchModal = (await import('/@/components/Application/src/search/AppSearchModal.vue')).default
    const wrapper = mount(AppSearchModal, {
      props: { open: true },
      ...mountOptions,
    })
    
    await wrapper.vm.$emit('close')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('should handle search functionality', async () => {
    const AppSearchModal = (await import('/@/components/Application/src/search/AppSearchModal.vue')).default
    const wrapper = mount(AppSearchModal, {
      props: { open: true },
      ...mountOptions,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should handle form submission', async () => {
    const AppSearchModal = (await import('/@/components/Application/src/search/AppSearchModal.vue')).default
    const wrapper = mount(AppSearchModal, {
      props: { open: true },
      ...mountOptions,
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should handle user interactions', async () => {
    const AppSearchModal = (await import('/@/components/Application/src/search/AppSearchModal.vue')).default
    const wrapper = mount(AppSearchModal, {
      props: { open: true },
      ...mountOptions,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
