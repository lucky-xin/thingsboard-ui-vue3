import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ForgetPassword from '/@/components/Authentication/src/ForgetPassword.vue';

// Mock dependencies
const mockPush = vi.fn();
const mockShowMessage = vi.fn();
const mockValidate = vi.fn();

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: mockShowMessage,
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div data-testid="basic-form"></div>',
  },
  useForm: vi.fn(() => [
    'registerForm',
    {
      validate: mockValidate,
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

describe('ForgetPassword.vue', () => {
  let wrapper: any;

  const defaultProps = {
    formSchema: [
      {
        field: 'email',
        label: '邮箱',
        component: 'Input',
        required: true,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(ForgetPassword, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('[data-testid="auth-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="basic-form"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should handle form submission successfully', async () => {
    mockValidate.mockResolvedValue({ email: 'test@example.com' });
    
    await wrapper.vm.handleSubmit();
    
    expect(mockValidate).toHaveBeenCalled();
  });

  it('should handle form validation errors', async () => {
    mockValidate.mockRejectedValue({ errorFields: ['email'] });
    
    await wrapper.vm.handleSubmit();
    
    expect(mockValidate).toHaveBeenCalled();
    expect(mockShowMessage).toHaveBeenCalledWith('common.validateError');
  });

  it('should navigate to login page when goToLogin is called', () => {
    wrapper.vm.goToLogin();
    
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  it('should navigate to custom login path when provided', async () => {
    await wrapper.setProps({
      loginPath: '/custom/login',
    });
    
    wrapper.vm.goToLogin();
    
    expect(mockPush).toHaveBeenCalledWith('/custom/login');
  });

  it('should expose getFormApi method', () => {
    expect(wrapper.vm.getFormApi).toBeDefined();
    expect(typeof wrapper.vm.getFormApi).toBe('function');
  });

  it('should emit submit event with form data', async () => {
    mockValidate.mockResolvedValue({ email: 'test@example.com' });
    
    await wrapper.vm.handleSubmit();
    
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([{ email: 'test@example.com' }]);
  });

  it('should handle form schema changes', async () => {
    const newSchema = [
      {
        field: 'newEmail',
        label: 'New Email',
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
    mockValidate.mockRejectedValue({ message: 'Some error' });
    
    await wrapper.vm.handleSubmit();
    
    expect(mockValidate).toHaveBeenCalled();
    expect(mockShowMessage).not.toHaveBeenCalled();
  });
});