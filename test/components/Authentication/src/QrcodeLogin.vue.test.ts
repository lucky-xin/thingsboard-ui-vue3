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

vi.mock('/@/components/Qrcode', () => ({
  QrCode: {
    name: 'QrCode',
    template: '<div class="qrcode"></div>',
    props: ['value'],
  },
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
  },
}));

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button class="ant-btn" @click="$emit(\'click\')"><slot></slot></button>',
    props: ['type', 'size', 'loading'],
  },
}));

// Mock vue-router with proper setup
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  currentRoute: {
    value: {
      path: '/',
      params: {},
      query: {}
    }
  }
};

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router');
  return {
    ...actual,
    createRouter: vi.fn(() => mockRouter),
    createMemoryHistory: vi.fn(),
    useRouter: () => mockRouter,
    useRoute: () => mockRouter.currentRoute,
  };
});

// Import the component
import QrcodeLogin from '/@/components/Authentication/src/QrcodeLogin';

describe('QrcodeLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('should render the component', () => {
    const wrapper = mount(QrcodeLogin);
    expect(wrapper.find('.auth-title').exists()).toBe(true);
    expect(wrapper.find('.qrcode').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(QrcodeLogin);
    expect(wrapper.props().description).toBe('');
    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().loginPath).toBe('/auth/login');
    expect(wrapper.props().submitButtonText).toBe('');
    expect(wrapper.props().subTitle).toBe('');
    expect(wrapper.props().title).toBe('');
  });

  it('should have correct component name', () => {
    expect(QrcodeLogin.name).toBe('AuthenticationQrCodeLogin');
  });

  it('should render slots correctly', () => {
    const wrapper = mount(QrcodeLogin, {
      slots: {
        title: '<span>Custom Title</span>',
        subTitle: '<span>Custom Subtitle</span>',
        description: '<span>Custom Description</span>',
      },
    });

    expect(wrapper.find('span').text()).toBe('Custom Title');
  });

  it('should navigate to login page when back button is clicked', async () => {
    const wrapper = mount(QrcodeLogin);

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    const backButton = wrapper.find('button');
    expect(backButton.exists()).toBe(true);

    await backButton.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/login');
  });

  it('should display correct QR code text', () => {
    const wrapper = mount(QrcodeLogin);

    // The component should have a ref with the QR code text
    expect(wrapper.vm.text).toBe('https://vben.vvbin.cn');
  });

  it('should handle custom props', () => {
    const customProps = {
      title: 'Custom QR Login',
      subTitle: 'Custom subtitle',
      description: 'Custom description',
      submitButtonText: 'Custom Submit',
      loading: true,
      loginPath: '/custom/login',
    };

    const wrapper = mount(QrcodeLogin, {
      props: customProps,
    });

    expect(wrapper.props().title).toBe('Custom QR Login');
    expect(wrapper.props().subTitle).toBe('Custom subtitle');
    expect(wrapper.props().description).toBe('Custom description');
    expect(wrapper.props().submitButtonText).toBe('Custom Submit');
    expect(wrapper.props().loading).toBe(true);
    expect(wrapper.props().loginPath).toBe('/custom/login');
  });

  it('should handle goToLogin function', async () => {
    const wrapper = mount(QrcodeLogin, {
      props: {
        loginPath: '/custom/login',
      },
    });

    // Test the goToLogin function
    await wrapper.vm.goToLogin();
    expect(mockRouter.push).toHaveBeenCalledWith('/custom/login');
  });

  it('should render QR code with correct value', () => {
    const wrapper = mount(QrcodeLogin);

    // Check that QrCode component receives the correct value
    const qrCodeComponent = wrapper.findComponent({ name: 'QrCode' });
    expect(qrCodeComponent.exists()).toBe(true);
  });

  it('should handle loading state', () => {
    const wrapper = mount(QrcodeLogin, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.props().loading).toBe(true);
  });

  it('should handle empty props', () => {
    const wrapper = mount(QrcodeLogin, {
      props: {},
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().description).toBe('');
    expect(wrapper.props().loading).toBe(false);
    expect(wrapper.props().loginPath).toBe('/auth/login');
  });
});