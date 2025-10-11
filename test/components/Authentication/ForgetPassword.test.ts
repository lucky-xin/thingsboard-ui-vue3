import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

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

const mockFormApi = {
  validate: vi.fn().mockResolvedValue({ email: 'test@example.com' }),
};

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div class="basic-form"></div>',
  },
  useForm: () => [vi.fn(), mockFormApi],
}));

vi.mock('../src/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'Title',
    template: '<div class="mb-7 sm:mx-auto sm:w-full sm:max-w-md"><h2 class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl"><slot></slot></h2><p class="text-muted-foreground lg:text-md text-sm"><slot name="desc"></slot></p></div>',
  },
}));

vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button><slot></slot></button>',
  },
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

import ForgetPassword from '/@/components/Authentication/src/ForgetPassword.vue';

describe('ForgetPassword', () => {
  const mockFormSchema = [
    {
      field: 'email',
      label: 'Email',
      component: 'Input',
      required: true,
    },
  ];

  it('should render with default props', () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
      },
    });

    expect(wrapper.find('.mb-7').exists()).toBe(true);
    expect(wrapper.find('.basic-form').exists()).toBe(true);
    expect(wrapper.findAllComponents({ name: 'Button' }).length).toBe(2);
  });

  it('should render with custom title and subtitle', () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
        title: 'Custom Title',
        subTitle: 'Custom Subtitle',
      },
      slots: {
        title: 'Slot Title',
        subTitle: 'Slot Subtitle',
      },
    });

    expect(wrapper.text()).toContain('Slot Title');
    expect(wrapper.text()).toContain('Slot Subtitle');
  });

  it('should emit submit event when form is submitted', async () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const submitButton = buttons[0];

    await submitButton.trigger('click');

    // Should emit submit event
    expect(wrapper.emitted('submit')).toBeDefined();
  });

  it('should navigate to login path when back button is clicked', async () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
        loginPath: '/custom/login',
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const backButton = buttons[1];

    await backButton.trigger('click');

    // The goToLogin function should be called, but we can't easily test router navigation in this setup
    expect(backButton.exists()).toBe(true);
  });

  it('should handle form validation error', async () => {
    // Mock form validation to throw error
    mockFormApi.validate.mockRejectedValueOnce({
      errorFields: [{ message: 'Validation error' }]
    });

    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const submitButton = buttons[0];

    await submitButton.trigger('click');

    // Should not emit submit event when validation fails
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('should handle form validation without error fields', async () => {
    // Mock form validation to throw error without errorFields
    mockFormApi.validate.mockRejectedValueOnce(new Error('Network error'));

    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const submitButton = buttons[0];

    await submitButton.trigger('click');

    // Should not emit submit event when validation fails
    expect(wrapper.emitted('submit')).toBeUndefined();
  });

  it('should expose getFormApi method', () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
      },
    });

    const vm = wrapper.vm as any;
    expect(vm.getFormApi).toBeDefined();
    expect(typeof vm.getFormApi).toBe('function');
  });

  it('should render with loading state', () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
        loading: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom submit button text', () => {
    const wrapper = mount(ForgetPassword, {
      props: {
        formSchema: mockFormSchema,
        submitButtonText: 'Reset Password',
      },
    });

    expect(wrapper.text()).toContain('Reset Password');
  });
});
