import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Login from '/@/components/Authentication/src/Login.vue';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
    notification: vi.fn(),
  }),
}));

vi.mock('/@/router', () => ({
  router: {
    push: vi.fn(),
  },
}));

vi.mock('/@/components/Form', () => ({
  BasicForm: {
    name: 'BasicForm',
    template: '<div data-testid="basic-form"></div>',
  },
  useForm: vi.fn(() => [
    'registerForm',
    {
      validate: vi.fn(),
      setFieldsValue: vi.fn(),
    },
  ]),
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'Title',
    template: '<div data-testid="auth-title"><slot name="title"></slot><slot name="desc"></slot></div>',
  },
}));

vi.mock('/@/components/Authentication/src/ThirdPartyLogin.vue', () => ({
  default: {
    name: 'ThirdPartyLogin',
    template: '<div data-testid="third-party-login"></div>',
  },
}));

vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button><slot></slot></button>',
    props: ['type', 'size', 'loading', 'class', 'variant'],
  },
  Checkbox: {
    name: 'Checkbox',
    template: '<input type="checkbox" /><slot></slot>',
    props: ['checked', 'name'],
  },
}));

describe('Login.vue', () => {
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
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('');
    wrapper = mount(Login, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('[data-testid="auth-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="basic-form"]').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should handle form submission successfully', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.resolve({ username: 'test', password: '123456' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
    expect(wrapper.emitted('submit')).toBeTruthy();
    expect(wrapper.emitted('submit')[0]).toEqual([{ username: 'test', password: '123456' }]);
  });

  it('should handle form validation errors', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.reject({ errorFields: ['username'] }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
  });

  it('should handle navigation to different paths', () => {
    wrapper.vm.handleGo('/auth/forget-password');
    wrapper.vm.handleGo('/auth/register');
  });

  it('should expose getFormApi method', () => {
    expect(wrapper.vm.getFormApi).toBeDefined();
    expect(typeof wrapper.vm.getFormApi).toBe('function');
  });

  it('should handle remember me functionality', async () => {
    wrapper.vm.rememberMe = true;
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.resolve({ username: 'test', password: '123456' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('REMEMBER_ME_USERNAME_localhost', 'test');
  });

  it('should handle remember me when unchecked', async () => {
    wrapper.vm.rememberMe = false;
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.resolve({ username: 'test', password: '123456' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('REMEMBER_ME_USERNAME_localhost', '');
  });

  it('should set username from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('saved-username');
    
    const newWrapper = mount(Login, {
      props: defaultProps,
    });
    
    const formApi = newWrapper.vm.getFormApi();
    expect(formApi.setFieldsValue).toHaveBeenCalledWith({ username: 'saved-username' });
  });

  it('should handle props correctly', async () => {
    await wrapper.setProps({
      title: 'Custom Title',
      subTitle: 'Custom Subtitle',
      submitButtonText: 'Custom Submit',
      loading: true,
      showRememberMe: false,
      showForgetPassword: false,
      showCodeLogin: false,
      showQrcodeLogin: false,
      showRegister: false,
      showThirdPartyLogin: false,
    });
    
    expect(wrapper.props('title')).toBe('Custom Title');
    expect(wrapper.props('subTitle')).toBe('Custom Subtitle');
    expect(wrapper.props('submitButtonText')).toBe('Custom Submit');
    expect(wrapper.props('loading')).toBe(true);
    expect(wrapper.props('showRememberMe')).toBe(false);
    expect(wrapper.props('showForgetPassword')).toBe(false);
    expect(wrapper.props('showCodeLogin')).toBe(false);
    expect(wrapper.props('showQrcodeLogin')).toBe(false);
    expect(wrapper.props('showRegister')).toBe(false);
    expect(wrapper.props('showThirdPartyLogin')).toBe(false);
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

  it('should handle error without errorFields', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.reject({ message: 'Some error' }));
    
    await wrapper.vm.handleSubmit();
    
    expect(formApi.validate).toHaveBeenCalled();
  });

  it('should handle keydown.enter event', async () => {
    const formApi = wrapper.vm.getFormApi();
    formApi.validate = vi.fn(() => Promise.resolve({ username: 'test', password: '123456' }));
    
    await wrapper.trigger('keydown.enter');
    
    expect(formApi.validate).toHaveBeenCalled();
  });
});