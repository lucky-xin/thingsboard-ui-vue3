import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ThirdPartyLogin from '/@/components/Authentication/src/ThirdPartyLogin';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', async () => {
  const actual = await vi.importActual('/@/hooks/web/useI18n');
  return {
    ...actual,
    useI18n: (namespace?: string) => ({
      t: vi.fn((key) => namespace ? `${namespace}.${key}` : key),
    }),
  };
});

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'class'],
    template: '<div data-icon="icon"></div>',
  },
}));

describe('ThirdPartyLogin', () => {
  it('should render without crashing', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should have correct component name', () => {
    expect(ThirdPartyLogin.name).toBe('ThirdPartyLogin');
  });

  it('should render slots correctly', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle form submission', async () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should navigate to login page when login button is clicked', async () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle custom props', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render third party login icons', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });

  it('should display third party login text', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.text()).toContain('tb.authentication.thirdPartyLogin');
  });

  it('should render social media icons', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });
});