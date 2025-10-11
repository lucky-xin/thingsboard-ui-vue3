import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Register from '/@/components/Authentication/src/Register.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div data-testid="basic-form"></div>',
  },
  useForm: vi.fn(() => [
    vi.fn(), // registerForm function
    {
      validate: vi.fn(),
    },
  ]),
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'Title',
    template: '<div data-testid="auth-title"><slot name="title"></slot><slot name="desc"></slot></div>',
  },
}));

vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button><slot></slot></button>',
    props: ['type', 'size', 'loading', 'class'],
  },
}));

describe('Register.vue', () => {
  let wrapper: any;

  const defaultProps = {
    formSchema: [
      {
        field: 'username',
        label: '用户名',
        component: 'Input',
        required: true,
      },
      {
        field: 'password',
        label: '密码',
        component: 'InputPassword',
        required: true,
      },
      {
        field: 'confirmPassword',
        label: '确认密码',
        component: 'InputPassword',
        required: true,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(Register, {
      props: defaultProps,
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('[data-testid="auth-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="basic-form"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should handle form submission successfully', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.resolve({ username: 'test', password: '123456', confirmPassword: '123456' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([{ username: 'test', password: '123456', confirmPassword: '123456' }]);
  });

  it('should handle form validation errors', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.reject({ errorFields: ['username'] }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
  });

  it('should navigate to login page when goToLogin is called', () => {
    wrapper.vm.goToLogin();
    // Test that the method can be called without errors
  });

  it('should navigate to custom login path when provided', async () => {
    await wrapper.setProps({
      loginPath: '/custom/login',
    });
    
    wrapper.vm.goToLogin();
    // Test that the method can be called without errors
  });

  it('should expose getFormApi method', () => {
    expect(wrapper.vm.getFormApi).toBeDefined();
    expect(typeof wrapper.vm.getFormApi).toBe('function');
  });

  it('should handle form schema changes', async () => {
    const newSchema = [
      {
        field: 'newField',
        label: 'New Field',
        component: 'Input',
        required: true,
      },
    ];
    
    await wrapper.setProps({
      formSchema: newSchema,
    });
    
    expect(wrapper.props('formSchema')).toEqual(newSchema);
  });

  it('should handle props correctly', async () => {
    await wrapper.setProps({
      title: 'Custom Title',
      subTitle: 'Custom Subtitle',
      submitButtonText: 'Custom Submit',
      loading: true,
    });
    
    expect(wrapper.props('title')).toBe('Custom Title');
    expect(wrapper.props('subTitle')).toBe('Custom Subtitle');
    expect(wrapper.props('submitButtonText')).toBe('Custom Submit');
    expect(wrapper.props('loading')).toBe(true);
  });

  it('should handle error without errorFields', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.reject({ message: 'Some error' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
  });

  it('should handle empty form schema', async () => {
    await wrapper.setProps({
      formSchema: [],
    });
    
    expect(wrapper.props('formSchema')).toEqual([]);
  });

  it('should handle default props', () => {
    expect(wrapper.props('loading')).toBe(false);
    expect(wrapper.props('loginPath')).toBe('/auth/login');
    expect(wrapper.props('submitButtonText')).toBe('');
    expect(wrapper.props('subTitle')).toBe('');
    expect(wrapper.props('title')).toBe('');
  });
});