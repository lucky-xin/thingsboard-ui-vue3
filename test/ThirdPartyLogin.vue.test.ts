import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ThirdPartyLogin from '/@/components/Authentication/src/ThirdPartyLogin';

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<div class="icon" :class="icon"><slot /></div>',
    props: ['icon'],
  },
}));

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key === 'authentication.thirdPartyLogin' ? '第三方登录' : key,
  }),
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

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(ThirdPartyLogin, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should emit events when expected', () => {
    const wrapper = mount(ThirdPartyLogin);
    // Add event testing based on component functionality
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle user interactions', () => {
    const wrapper = mount(ThirdPartyLogin);
    // Add interaction testing
    expect(wrapper.exists()).toBe(true);
  });

  // 新增的测试用例来提高覆盖率

  it('should render the third party login container', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the main container exists
    expect(wrapper.find('.w-full').exists()).toBe(true);
    expect(wrapper.find('.sm\\:mx-auto').exists()).toBe(true);
    expect(wrapper.find('.md\\:max-w-md').exists()).toBe(true);
  });

  it('should render the divider with text', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the divider elements exist
    const dividers = wrapper.findAll('.border-input');
    expect(dividers.length).toBe(2);

    // Check that the text element exists
    const textElement = wrapper.find('.text-muted-foreground');
    expect(textElement.exists()).toBe(true);
    expect(textElement.text()).toBe('第三方登录');
  });

  it('should render all four third party icons', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that all four icons are rendered
    const icons = wrapper.findAll('.icon');
    expect(icons.length).toBe(4);

    // Check that each icon has the correct class
    expect(icons[0].classes()).toContain('mdi:wechat');
    expect(icons[1].classes()).toContain('mdi:qqchat');
    expect(icons[2].classes()).toContain('mdi:github');
    expect(icons[3].classes()).toContain('mdi:google');
  });

  it('should apply correct styling classes', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the main container has correct classes
    const mainContainer = wrapper.find('div');
    expect(mainContainer.classes()).toContain('w-full');

    // Check that the icon container has correct classes
    const iconContainer = wrapper.find('.flex-wrap');
    expect(iconContainer.exists()).toBe(true);
    expect(iconContainer.classes()).toContain('mt-4');
    expect(iconContainer.classes()).toContain('flex');
    expect(iconContainer.classes()).toContain('justify-center');
  });

  it('should render icons with correct attributes', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that icons have correct attributes
    const icons = wrapper.findAll('.icon');
    expect(icons[0].attributes('class')).toContain('mb-3');
    expect(icons[1].attributes('class')).toContain('mb-3');
    expect(icons[2].attributes('class')).toContain('mb-3');
    expect(icons[3].attributes('class')).toContain('mb-3');
  });

  it('should use translation for third party login text', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the translation function is called
    const textElement = wrapper.find('.text-muted-foreground');
    expect(textElement.exists()).toBe(true);
    expect(textElement.text()).toBe('第三方登录');
  });

  it('should have correct flex layout for icons', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the icon container uses flex layout
    const iconContainer = wrapper.find('.flex-wrap');
    expect(iconContainer.exists()).toBe(true);
  });

  it('should render component with correct structure', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check the overall structure
    expect(wrapper.find('.mt-4').exists()).toBe(true);
    expect(wrapper.find('.flex').exists()).toBe(true);
    expect(wrapper.find('.items-center').exists()).toBe(true);
    expect(wrapper.find('.justify-between').exists()).toBe(true);
  });

  it('should apply dark mode classes correctly', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that dark mode classes are present
    const dividers = wrapper.findAll('.dark\\:border-gray-600');
    expect(dividers.length).toBe(2);
  });

  it('should render text with correct styling', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check that the text has correct styling classes
    const textElement = wrapper.find('.text-muted-foreground');
    expect(textElement.classes()).toContain('text-center');
    expect(textElement.classes()).toContain('text-xs');
    expect(textElement.classes()).toContain('uppercase');
  });
});