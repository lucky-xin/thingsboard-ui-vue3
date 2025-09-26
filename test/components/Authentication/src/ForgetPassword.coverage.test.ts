import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

// Import the component
import ForgetPassword from '/@/components/Authentication/src/ForgetPassword.vue';

// Create a simple router for testing
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/auth/login', component: { template: '<div>Login</div>' } },
  ],
});

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

// Store reference to mock form API
let mockFormApi: any;

vi.mock('/@/components/Form', () => {
  return {
    BasicForm: {
      name: 'BasicForm',
      template: '<div class="basic-form"><button type="button">Submit</button></div>',
    },
    useForm: () => {
      // Create a mock form API with validate function
      mockFormApi = {
        validate: vi.fn(),
      };
      return [vi.fn(), mockFormApi];
    },
  };
});

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
  },
}));

describe('ForgetPassword coverage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    const wrapper = mount(ForgetPassword, {
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
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().loginPath).toBe('/auth/login');
    expect(wrapper.props().title).toBe('');
    expect(wrapper.props().subTitle).toBe('');
    expect(wrapper.props().submitButtonText).toBe('');
  });

  it('should call form validation when handleSubmit is called', async () => {
    // Mock the form validation to return some data
    mockFormApi.validate.mockResolvedValue({ email: 'test@example.com' });

    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Call handleSubmit directly
    await (wrapper.vm as any).handleSubmit();

    // Check that the mock was called
    expect(mockFormApi.validate).toHaveBeenCalled();
  });

  it('should navigate to login page when back button is clicked', async () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2); // Should have at least 2 buttons

    if (buttons.length >= 2) {
      const backButton = buttons[1]; // Second button should be the back button
      await backButton.trigger('click');
    }
  });

  it('should have correct component name', () => {
    expect(ForgetPassword.name).toBe('ForgetPassword');
  });

  it('should handle form validation errors', async () => {
    // Mock the form validation to throw an error
    mockFormApi.validate.mockRejectedValue({ errorFields: true });

    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: [],
      },
      global: {
        plugins: [router],
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    // Call handleSubmit directly
    await (wrapper.vm as any).handleSubmit();

    // Check that the mock was called
    expect(mockFormApi.validate).toHaveBeenCalled();
  });

  it('should render slots correctly', () => {
    const wrapper = mount(ForgetPassword, {
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
      },
    });

    expect(wrapper.find('span').text()).toBe('Custom Title');
  });
});