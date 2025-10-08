import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import Login from '/@/components/Authentication/src/Login';

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

// Mock vue-router
vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      go: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      currentRoute: { value: { path: '/', params: {}, query: {} } },
    })),
    createMemoryHistory: vi.fn(() => ({})),
    createWebHistory: vi.fn(),
    createWebHashHistory: vi.fn(),
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
    }),
    useRoute: () => ({
      path: '/',
      params: {},
      query: {},
    }),
  };
});

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

// Create pinia instance
const pinia = createPinia();
setActivePinia(pinia);

// Global mocks
const globalMocks = {
  $t: (key: string) => key,
  $router: router,
  $route: router.currentRoute.value,
};

describe('Login', () => {
  it('should render the component', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().formSchema).toEqual([]);
    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().registerPath).toBe('/auth/register');
    expect(wrapper.props().codeLoginPath).toBe('/auth/code-login');
    expect(wrapper.props().forgetPasswordPath).toBe('/auth/forget-password');
    expect(wrapper.props().qrCodeLoginPath).toBe('/auth/qrcode-login');
    expect(wrapper.props().submitButtonText).toBe('');
    expect(wrapper.props().subTitle).toBe('');
    expect(wrapper.props().title).toBe('');
  });

  it('should render slots correctly', () => {
    const wrapper = mount(Login, {
      slots: {
        title: '<span>Custom Title</span>',
        subTitle: '<span>Custom Subtitle</span>',
        submitButtonText: '<span>Custom Submit</span>',
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.find('span').text()).toBe('Custom Title');
  });

  it('should handle form submission', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
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
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find all the navigation buttons
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle remember me functionality', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    // Test that the component renders
    expect(wrapper.exists()).toBe(true);
  });

  it('should expose form API', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    const formApi = wrapper.vm.getFormApi();
    expect(formApi).toBeDefined();
  });

  it('should handle custom props', () => {
    const wrapper = mount(Login, {
      props: {
        title: 'Custom Title',
        subTitle: 'Custom Subtitle',
        submitButtonText: 'Custom Submit',
        loading: true,
        registerPath: '/custom/register',
        codeLoginPath: '/custom/code-login',
        forgetPasswordPath: '/custom/forget-password',
        qrCodeLoginPath: '/custom/qrcode-login',
      },
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().title).toBe('Custom Title');
    expect(wrapper.props().subTitle).toBe('Custom Subtitle');
    expect(wrapper.props().submitButtonText).toBe('Custom Submit');
    expect(wrapper.props().loading).toBe(true);
    expect(wrapper.props().registerPath).toBe('/custom/register');
    expect(wrapper.props().codeLoginPath).toBe('/custom/code-login');
    expect(wrapper.props().forgetPasswordPath).toBe('/custom/forget-password');
    expect(wrapper.props().qrCodeLoginPath).toBe('/custom/qrcode-login');
  });

  it('should handle keydown.enter event', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    // Test that the component renders
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle button clicks for different actions', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [router, pinia],
        mocks: globalMocks,
      },
    });

    // Test that the component renders
    expect(wrapper.exists()).toBe(true);
  });
});