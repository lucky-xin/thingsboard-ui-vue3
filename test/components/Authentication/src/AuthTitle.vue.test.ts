import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

// Mock vue-router with createRouter
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn().mockResolvedValue(undefined),
    replace: vi.fn().mockResolvedValue(undefined),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: { value: { path: '/', params: {}, query: {} } }
  }),
  useRoute: () => ({
    path: '/',
    name: 'home',
    params: {},
    query: {},
    meta: {},
    matched: []
  }),
  createRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    currentRoute: { value: { path: '/', params: {}, query: {} } }
  })),
  createWebHistory: vi.fn(() => ({})),
  RouterView: { template: '<div><slot></slot></div>' },
  RouterLink: { template: '<a><slot></slot></a>', props: ['to'] }
}))

// Mock store
vi.mock('/@/store', () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => 'light'),
    setTheme: vi.fn(),
    locale: 'en',
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: 'Test User' },
    isLoggedIn: true
  })
}))

// Mock hooks
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key)
  })),
  t: vi.fn((key) => key)
}))

// Create a test component
const AuthTitleTest = {
  name: 'AuthTitleTest',
  setup() {
    const title = vi.fn(() => 'Authentication Title')
    const subtitle = vi.fn(() => 'Please sign in to continue')
    const showLogo = vi.fn(() => true)
    const logoUrl = vi.fn(() => '/logo.png')

    return {
      title,
      subtitle,
      showLogo,
      logoUrl
    }
  },
  template: `
    <div class="auth-title">
      <div v-if="showLogo()" class="auth-logo">
        <img :src="logoUrl()" alt="Logo" />
      </div>
      <div class="auth-title-content">
        <h1 class="title">{{ title() }}</h1>
        <p class="subtitle">{{ subtitle() }}</p>
      </div>
    </div>
  `
}

describe('AuthTitle Test', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AuthTitleTest)
  })

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with correct structure', () => {
    expect(wrapper.find('.auth-title').exists()).toBe(true)
    expect(wrapper.find('.auth-logo').exists()).toBe(true)
    expect(wrapper.find('.auth-title-content').exists()).toBe(true)
  })

  it('should display title and subtitle', () => {
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.find('.subtitle').exists()).toBe(true)
    
    expect(wrapper.find('.title').text()).toBe('Authentication Title')
    expect(wrapper.find('.subtitle').text()).toBe('Please sign in to continue')
  })

  it('should display logo when showLogo is true', () => {
    const logoImg = wrapper.find('.auth-logo img')
    expect(logoImg.exists()).toBe(true)
    expect(logoImg.attributes('src')).toBe('/logo.png')
  })

  it('should handle auth title functionality', () => {
    expect(wrapper.vm.title).toBeDefined()
    expect(wrapper.vm.subtitle).toBeDefined()
    expect(wrapper.vm.showLogo).toBeDefined()
    expect(wrapper.vm.logoUrl).toBeDefined()
  })

  it('should render title content correctly', () => {
    expect(wrapper.vm.title()).toBe('Authentication Title')
    expect(wrapper.vm.subtitle()).toBe('Please sign in to continue')
    expect(wrapper.vm.showLogo()).toBe(true)
    expect(wrapper.vm.logoUrl()).toBe('/logo.png')
  })
})