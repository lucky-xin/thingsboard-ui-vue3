import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock dependencies
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon', 'class'],
    template: '<span class="icon" :class="class"></span>',
  },
}));

const mockT = vi.fn((key) => key);
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: mockT,
  }),
}));

import ThirdPartyLogin from '/@/components/Authentication/src/ThirdPartyLogin.vue';

describe('ThirdPartyLogin coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render third party login component', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check main container
    expect(wrapper.find('.w-full').exists()).toBe(true);
  });

  it('should render divider with text', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check divider structure
    const divider = wrapper.find('.mt-4.flex.items-center.justify-between');
    expect(divider.exists()).toBe(true);

    // Check text span
    const textSpan = wrapper.find('.text-muted-foreground.text-center.text-xs.uppercase');
    expect(textSpan.exists()).toBe(true);
  });

  it('should call useI18n hook with correct namespace', () => {
    mount(ThirdPartyLogin);
    
    // Verify useI18n was called with 'tb' namespace
    expect(mockT).toHaveBeenCalledWith('authentication.thirdPartyLogin');
  });

  it('should render all social media icons', () => {
    const wrapper = mount(ThirdPartyLogin);

    // Check icons container
    const iconsContainer = wrapper.find('.mt-4.flex.flex-wrap.justify-center');
    expect(iconsContainer.exists()).toBe(true);

    // Check all icons are rendered
    const icons = wrapper.findAllComponents({ name: 'Icon' });
    expect(icons).toHaveLength(4);

    // Check specific icons
    expect(icons.at(0).props('icon')).toBe('mdi:wechat');
    expect(icons.at(1).props('icon')).toBe('mdi:qqchat');
    expect(icons.at(2).props('icon')).toBe('mdi:github');
    expect(icons.at(3).props('icon')).toBe('mdi:google');
  });

  it('should have correct component name', () => {
    expect(ThirdPartyLogin.name).toBe('ThirdPartyLogin');
  });

  it('should render icons with correct classes', () => {
    const wrapper = mount(ThirdPartyLogin);

    const icons = wrapper.findAllComponents({ name: 'Icon' });
    icons.forEach(icon => {
      expect(icon.props('class')).toBe('mb-3');
    });
  });

  it('should render text with correct translation key', () => {
    const wrapper = mount(ThirdPartyLogin);
    
    const textSpan = wrapper.find('.text-muted-foreground.text-center.text-xs.uppercase');
    expect(textSpan.text()).toBe('authentication.thirdPartyLogin');
  });

  it('should render component without errors', () => {
    const wrapper = mount(ThirdPartyLogin);
    expect(wrapper.exists()).toBe(true);
  });
});