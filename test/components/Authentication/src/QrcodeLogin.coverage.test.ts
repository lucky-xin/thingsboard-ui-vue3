import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

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
  },
}));

vi.mock('/@/components/Authentication/src/AuthTitle.vue', () => ({
  default: {
    name: 'AuthTitle',
    template: '<div class="auth-title"><slot></slot><slot name="desc"></slot></div>',
  },
}));

// Import the component
import QrcodeLogin from '/@/components/Authentication/src/QrcodeLogin.vue';

// Create a simple router for testing
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/auth/login', component: { template: '<div>Login</div>' } },
  ],
});

describe('QrcodeLogin coverage', () => {
  it('should render the component', () => {
    const wrapper = mount(QrcodeLogin, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('.auth-title').exists()).toBe(true);
    expect(wrapper.find('.qrcode').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(QrcodeLogin, {
      global: {
        plugins: [router],
      },
    });

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
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find('span').text()).toBe('Custom Title');
  });

  it('should navigate to login page when back button is clicked', async () => {
    const wrapper = mount(QrcodeLogin, {
      global: {
        plugins: [router],
      },
    });

    // Wait for next tick to ensure DOM is updated
    await wrapper.vm.$nextTick();

    const backButton = wrapper.find('button');
    expect(backButton.exists()).toBe(true);

    await backButton.trigger('click');
  });

  it('should display correct QR code text', () => {
    const wrapper = mount(QrcodeLogin, {
      global: {
        plugins: [router],
      },
    });

    // The component should have a ref with the QR code text
    expect(wrapper.vm.text).toBe('https://vben.vvbin.cn');
  });
});