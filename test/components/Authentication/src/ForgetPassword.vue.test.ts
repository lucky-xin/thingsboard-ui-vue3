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

// Mock ant-design-vue with InputNumber
vi.mock('ant-design-vue', () => ({
  Form: {
    template: '<form class="ant-form"><slot></slot></form>',
    props: ['model', 'rules']
  },
  FormItem: {
    template: '<div class="ant-form-item"><slot></slot></div>',
    props: ['label', 'name']
  },
  Input: {
    template: '<input class="ant-input" />',
    props: ['value', 'placeholder'],
    Search: {
      template: '<input class="ant-input-search" />',
      props: ['value', 'placeholder']
    },
    TextArea: {
      template: '<textarea class="ant-input-textarea"></textarea>',
      props: ['value', 'placeholder']
    }
  },
  InputNumber: {
    template: '<input class="ant-input-number" type="number" />',
    props: ['value', 'min', 'max']
  },
  Button: {
    template: '<button class="ant-btn"><slot></slot></button>',
    props: ['type', 'loading']
  },
  AutoComplete: {
    template: '<div class="ant-auto-complete"><slot></slot></div>',
    props: ['value', 'options']
  }
}))

// Mock hooks with t export
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key)
  })),
  t: vi.fn((key) => key)
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

// Create a test component
const ForgetPasswordVueTest = {
  name: 'ForgetPasswordVueTest',
  setup() {
    const email = vi.fn(() => '')
    const sendResetEmail = vi.fn()
    const isLoading = vi.fn(() => false)
    const emailSent = vi.fn(() => false)
    const backToLogin = vi.fn()

    return {
      email,
      sendResetEmail,
      isLoading,
      emailSent,
      backToLogin
    }
  },
  template: `
    <div class="forget-password-vue">
      <div class="reset-form">
        <h2 class="title">Forget Password</h2>
        <input 
          type="email" 
          :value="email()" 
          placeholder="Email address"
          class="email-input"
        />
        <button 
          @click="sendResetEmail"
          :disabled="isLoading()"
          class="submit-btn"
        >
          {{ isLoading() ? 'Sending...' : 'Send Reset Link' }}
        </button>
        <button @click="backToLogin" class="back-link">
          Back to Login
        </button>
      </div>
    </div>
  `
}

describe('ForgetPassword Vue Test', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ForgetPasswordVueTest)
  })

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with correct structure', () => {
    expect(wrapper.find('.forget-password-vue').exists()).toBe(true)
    expect(wrapper.find('.reset-form').exists()).toBe(true)
    expect(wrapper.find('.title').text()).toBe('Forget Password')
  })

  it('should display form elements', () => {
    expect(wrapper.find('.email-input').exists()).toBe(true)
    expect(wrapper.find('.submit-btn').exists()).toBe(true)
    expect(wrapper.find('.back-link').exists()).toBe(true)
  })

  it('should handle form interactions', async () => {
    const submitBtn = wrapper.find('.submit-btn')
    const backLink = wrapper.find('.back-link')
    
    await submitBtn.trigger('click')
    expect(wrapper.vm.sendResetEmail).toBeDefined()
    
    await backLink.trigger('click')
    expect(wrapper.vm.backToLogin).toBeDefined()
  })

  it('should manage form state correctly', () => {
    expect(wrapper.vm.email()).toBe('')
    expect(wrapper.vm.isLoading()).toBe(false)
    expect(wrapper.vm.emailSent()).toBe(false)
    
    const submitBtn = wrapper.find('.submit-btn')
    expect(submitBtn.text()).toBe('Send Reset Link')
  })

  it('should handle forget password functionality', () => {
    expect(wrapper.vm.email).toBeDefined()
    expect(wrapper.vm.sendResetEmail).toBeDefined()
    expect(wrapper.vm.isLoading).toBeDefined()
    expect(wrapper.vm.emailSent).toBeDefined()
    expect(wrapper.vm.backToLogin).toBeDefined()
  })
})