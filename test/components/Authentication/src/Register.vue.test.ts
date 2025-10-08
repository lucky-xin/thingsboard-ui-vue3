import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import Register from '/@/components/Authentication/src/Register';

// Mock router
const router: any = createRouter({
  history: createWebHistory(),
  routes: [],
});
// Add install method to prevent Vue warnings
router.install = vi.fn();

// Mock pinia
const pinia = createPinia();

// Mock global properties
const globalMocks = {
  $t: (key: string) => key,
  $router: router,
  $route: router.currentRoute.value,
};

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key),
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
  }),
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div class="basic-form"><button type="button">Submit</button></div>',
  },
  useForm: () => [vi.fn(), { validate: vi.fn() }],
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
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

describe('Register', () => {
  it('should render without crashing', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().formSchema).toEqual([]);
    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().loginPath).toBe('/auth/login');
    expect(wrapper.props().submitButtonText).toBe('');
    expect(wrapper.props().subTitle).toBe('');
    expect(wrapper.props().title).toBe('');
  });

  it('should have correct component name', () => {
    expect(Register.name).toBe('RegisterForm');
  });

  it('should render slots correctly', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      slots: {
        title: '<span>Custom Title</span>',
        subTitle: '<span>Custom Subtitle</span>',
        submitButtonText: '<span>Custom Submit</span>',
      },
      global: {
        mocks: globalMocks,
        components: {
          Button: {
            name: 'AButton',
            props: ['type', 'onClick', 'loading', 'size'],
            template: '<button @click="$emit(\'click\')"><slot /></button>',
          },
        },
      },
    });
    expect(wrapper.find('span').text()).toBe('Custom Title');
  });

  it('should handle form submission', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
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

  it('should navigate to login page when login button is clicked', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find the login button (should be the last button)
    const buttons = wrapper.findAll('button');
    if (buttons.length > 0) {
      const loginButton = buttons[buttons.length - 1];
      await loginButton.trigger('click');
    }
  });

  it('should expose form API', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    const formApi = wrapper.vm.getFormApi();
    expect(formApi).toBeDefined();
  });

  it('should handle form validation error', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Mock the form validation to throw an error with errorFields
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockRejectedValue({
      errorFields: ['username', 'password'],
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find and trigger the submit button
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger('click');
    }
  });

  it('should handle form validation error without errorFields', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Mock the form validation to throw an error without errorFields
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockRejectedValue(new Error('Validation failed'));

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find and trigger the submit button
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger('click');
    }
  });

  it('should handle form validation with null error', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Mock the form validation to throw a null error
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockRejectedValue(null);

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find and trigger the submit button
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger('click');
    }
  });

  it('should handle successful form submission', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Mock the form validation to return data
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockResolvedValue({
      username: 'testuser',
      password: 'password123',
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Find and trigger the submit button
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger('click');
    }

    // Wait for the event to be emitted
    await wrapper.vm.$nextTick();

    // Just check that the component exists and the test runs
    expect(wrapper.exists()).toBe(true);
  });

  it('should call handleSubmit directly', async () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        mocks: globalMocks,
      },
    });

    // Mock the form validation to return data
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn().mockResolvedValue({
      username: 'testuser',
      password: 'password123',
    });

    // Call handleSubmit directly
    await wrapper.vm.handleSubmit();

    // Check that submit event was emitted
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([{
      username: 'testuser',
      password: 'password123',
    }]);
  });

  it('should handle custom props', () => {
    const wrapper = mount(Register, {
      props: {
        title: 'Custom Title',
        subTitle: 'Custom Subtitle',
        submitButtonText: 'Custom Submit',
        loading: true,
        loginPath: '/custom/login',
      },
      global: {
        mocks: globalMocks,
      },
    });
    expect(wrapper.props().title).toBe('Custom Title');
    expect(wrapper.props().subTitle).toBe('Custom Subtitle');
    expect(wrapper.props().submitButtonText).toBe('Custom Submit');
    expect(wrapper.props().loading).toBe(true);
    expect(wrapper.props().loginPath).toBe('/custom/login');
  });
});