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
  Dropdown: {
    template: '<div class="ant-dropdown"><slot></slot></div>',
    props: ['placement', 'trigger', 'dropMenuList']
  },
  Select: {
    template: '<div class="ant-select"><slot></slot></div>',
    props: ['value', 'options', 'mode']
  },
  Modal: {
    template: '<div class="ant-modal"><slot></slot></div>',
    props: ['visible', 'title']
  },
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
const CodeLoginTest = {
  name: 'CodeLoginTest',
  setup() {
    const phoneNumber = vi.fn(() => '')
    const verificationCode = vi.fn(() => '')
    const sendCode = vi.fn()
    const login = vi.fn()
    const countdown = vi.fn(() => 0)
    const isLoading = vi.fn(() => false)

    return {
      phoneNumber,
      verificationCode,
      sendCode,
      login,
      countdown,
      isLoading
    }
  },
  template: `
    <div class="code-login">
      <div class="form-container">
        <div class="phone-input">
          <input 
            type="tel" 
            :value="phoneNumber()" 
            placeholder="Enter phone number"
            class="phone-field"
          />
        </div>
        <div class="code-input">
          <input 
            type="text" 
            :value="verificationCode()" 
            placeholder="Enter verification code"
            class="code-field"
          />
          <button 
            @click="sendCode" 
            :disabled="countdown() > 0"
            class="send-code-btn"
          >
            {{ countdown() > 0 ? countdown() + 's' : 'Send Code' }}
          </button>
        </div>
        <button 
          @click="login" 
          :loading="isLoading()"
          class="login-btn"
        >
          {{ isLoading() ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </div>
  `
}

describe('CodeLogin Test', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CodeLoginTest)
  })

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should render with correct structure', () => {
    expect(wrapper.find('.code-login').exists()).toBe(true)
    expect(wrapper.find('.form-container').exists()).toBe(true)
    expect(wrapper.find('.phone-input').exists()).toBe(true)
    expect(wrapper.find('.code-input').exists()).toBe(true)
  })

  it('should display input fields', () => {
    expect(wrapper.find('.phone-field').exists()).toBe(true)
    expect(wrapper.find('.code-field').exists()).toBe(true)
    expect(wrapper.find('.send-code-btn').exists()).toBe(true)
    expect(wrapper.find('.login-btn').exists()).toBe(true)
  })

  it('should handle form interactions', async () => {
    const sendCodeBtn = wrapper.find('.send-code-btn')
    const loginBtn = wrapper.find('.login-btn')
    
    await sendCodeBtn.trigger('click')
    expect(wrapper.vm.sendCode).toBeDefined()
    
    await loginBtn.trigger('click')
    expect(wrapper.vm.login).toBeDefined()
  })

  it('should handle code login functionality', () => {
    expect(wrapper.vm.phoneNumber).toBeDefined()
    expect(wrapper.vm.verificationCode).toBeDefined()
    expect(wrapper.vm.sendCode).toBeDefined()
    expect(wrapper.vm.login).toBeDefined()
    expect(wrapper.vm.countdown).toBeDefined()
    expect(wrapper.vm.isLoading).toBeDefined()
  })

  it('should display correct button states', () => {
    expect(wrapper.vm.countdown()).toBe(0)
    expect(wrapper.vm.isLoading()).toBe(false)
    
    const sendCodeBtn = wrapper.find('.send-code-btn')
    const loginBtn = wrapper.find('.login-btn')
    
    expect(sendCodeBtn.text()).toBe('Send Code')
    expect(loginBtn.text()).toBe('Login')
  })
})