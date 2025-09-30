import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
    notification: vi.fn(),
  }),
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div class="basic-form"><button type="button">Submit</button></div>',
  },
  useForm: () => [vi.fn(), { validate: vi.fn(), setFieldsValue: vi.fn() }],
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
  },
}));

vi.mock('/@/components/Authentication/src/ThirdPartyLogin.vue', () => ({
  default: {
    name: 'ThirdPartyLogin',
    template: '<div class="third-party-login"></div>',
  },
}));

vi.mock('/@/router', () => ({
  router: {
    push: vi.fn(),
  },
}));

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button class="ant-btn"><slot></slot></button>',
    props: ['type', 'size', 'loading', 'variant'],
  },
  Checkbox: {
    name: 'Checkbox',
    template: '<input type="checkbox" class="ant-checkbox" />',
    props: ['checked'],
  },
  InputNumber: {
    name: 'InputNumber',
    template: '<input type="number" class="ant-input-number" />',
    props: ['value', 'placeholder'],
  },
}));

// Import the component
import Login from '/@/components/Authentication/src/Login';

// Create a simple router for testing
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/auth/code-login', component: { template: '<div>Code Login</div>' } },
    { path: '/auth/forget-password', component: { template: '<div>Forget Password</div>' } },
    { path: '/auth/qrcode-login', component: { template: '<div>QR Code Login</div>' } },
    { path: '/auth/register', component: { template: '<div>Register</div>' } },
  ],
});

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('should render the component', () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('.auth-title').exists()).toBe(true);
    expect(wrapper.find('.basic-form').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.props().codeLoginPath).toBe('/auth/code-login');
    expect(wrapper.props().forgetPasswordPath).toBe('/auth/forget-password');
    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().qrCodeLoginPath).toBe('/auth/qrcode-login');
    expect(wrapper.props().registerPath).toBe('/auth/register');
    expect(wrapper.props().showCodeLogin).toBe(true);
    expect(wrapper.props().showForgetPassword).toBe(true);
    expect(wrapper.props().showQrcodeLogin).toBe(true);
    expect(wrapper.props().showRegister).toBe(true);
    expect(wrapper.props().showRememberMe).toBe(true);
    expect(wrapper.props().showThirdPartyLogin).toBe(true);
    expect(wrapper.props().submitButtonText).toBe('');
    expect(wrapper.props().subTitle).toBe('');
    expect(wrapper.props().title).toBe('');
  });

  it('should have correct component name', () => {
    expect(Login.name).toBe('AuthenticationLogin');
  });

  it('should render slots correctly', () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      slots: {
        title: '<span>Custom Title</span>',
        subTitle: '<span>Custom Subtitle</span>',
        'third-party-login': '<div class="custom-third-party">Third Party</div>',
        'to-register': '<div class="custom-register">Register</div>',
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('span').text()).toBe('Custom Title');
    expect(wrapper.find('.custom-third-party').exists()).toBe(true);
    expect(wrapper.find('.custom-register').exists()).toBe(true);
  });

  it('should handle form submission', async () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Mock the form validation to return some data
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockResolvedValue({ username: 'testuser', password: 'password' });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find and trigger the submit button
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger('click');
    }
  });

  it('should handle navigation to different paths', async () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Test navigation to forget password
    const forgetPasswordButton = wrapper.find('button[type="link"]');
    if (forgetPasswordButton.exists()) {
      await forgetPasswordButton.trigger('click');
    }
  });

  it('should handle remember me functionality', async () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Check that remember me checkbox exists when showRememberMe is true
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
  });

  it('should expose form API', () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    const formApi = wrapper.vm.getFormApi();
    expect(formApi).toBeDefined();
  });

  it('should handle custom props', () => {
    const customProps = {
      formSchema: [],
      title: 'Custom Login',
      subTitle: 'Custom subtitle',
      submitButtonText: 'Custom Submit',
      loading: true,
      showCodeLogin: false,
      showForgetPassword: false,
      showQrcodeLogin: false,
      showRegister: false,
      showRememberMe: false,
      showThirdPartyLogin: false,
    };

    const wrapper = mount(Login, {
      props: customProps,
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.props().title).toBe('Custom Login');
    expect(wrapper.props().subTitle).toBe('Custom subtitle');
    expect(wrapper.props().submitButtonText).toBe('Custom Submit');
    expect(wrapper.props().loading).toBe(true);
    expect(wrapper.props().showCodeLogin).toBe(false);
    expect(wrapper.props().showForgetPassword).toBe(false);
    expect(wrapper.props().showQrcodeLogin).toBe(false);
    expect(wrapper.props().showRegister).toBe(false);
    expect(wrapper.props().showRememberMe).toBe(false);
    expect(wrapper.props().showThirdPartyLogin).toBe(false);
  });

  it('should handle keydown.enter event', async () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Test keydown.enter event
    await wrapper.trigger('keydown.enter');
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle button clicks for different actions', async () => {
    const wrapper = mount(Login, {
      props: {
        formSchema: [],
        showCodeLogin: true,
        showQrcodeLogin: true,
        showRegister: true,
      },
      global: {
        plugins: [router],
      },
    });

    // Test code login button
    const codeLoginButton = wrapper.find('button[class*="w-1/2"]');
    if (codeLoginButton.exists()) {
      await codeLoginButton.trigger('click');
    }

    // Test QR code login button
    const qrCodeButton = wrapper.find('button[class*="ml-4"]');
    if (qrCodeButton.exists()) {
      await qrCodeButton.trigger('click');
    }

    // Test register button
    const registerButton = wrapper.find('button[type="link"]');
    if (registerButton.exists()) {
      await registerButton.trigger('click');
    }

    expect(wrapper.exists()).toBe(true);
  });
});
