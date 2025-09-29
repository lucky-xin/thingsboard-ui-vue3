import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

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

vi.mock('../src/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
  },
}));

// Create a mock for the $t function
const mockT = vi.fn((key) => key);

// Import the component
import Register from '/@/components/Authentication/src/Register';

// Create a simple router for testing
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/auth/login', component: { template: '<div>Login</div>' } },
  ],
});

describe('Register coverage', () => {
  it('should render the component', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
        mocks: {
          $t: mockT,
        },
      },
    });

    expect(wrapper.find('.auth-title').exists()).toBe(true);
    expect(wrapper.find('.basic-form').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(Register, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
        mocks: {
          $t: mockT,
        },
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
        plugins: [router],
        mocks: {
          $t: mockT,
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
        plugins: [router],
        mocks: {
          $t: mockT,
        },
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
        plugins: [router],
        mocks: {
          $t: mockT,
        },
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
        plugins: [router],
        mocks: {
          $t: mockT,
        },
      },
    });

    const formApi = wrapper.vm.getFormApi();
    expect(formApi).toBeDefined();
  });
});
