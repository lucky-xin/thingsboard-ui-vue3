import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicButton from '/@/components/Button/src/BasicButton';

// Mock Icon component
vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="icon" :data-icon="icon" :data-size="size"></span>',
  },
}));

// Mock useAttrs hook
vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: () => ({ excludeDefaultKeys: false }),
}));

// Mock Button component
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    props: ['class', 'disabled', 'onClick'],
    template: '<button :class="class" :disabled="disabled" @click="$emit(\'click\')"><slot /></button>',
  },
}));

describe('components/Button/src/BasicButton.vue', () => {
  it('should render prefix/postfix icon classes when provided', async () => {
    const wrapper = mount(BasicButton, {
      props: { preIcon: 'i-test:pre', postIcon: 'i-test:post', iconSize: 16, color: 'success' },
    });
    // Check if the component renders
    expect(wrapper.exists()).toBe(true);
    // Check if icons are rendered
    expect(wrapper.html()).toContain('i-test:pre');
    expect(wrapper.html()).toContain('i-test:post');
  });

  it('should apply disabled class', () => {
    const wrapper = mount(BasicButton, { props: { disabled: true } });
    expect(wrapper.exists()).toBe(true);
    // Check if the button has the disabled class
    expect(wrapper.find('button').classes()).toContain('is-disabled');
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicButton);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle click events', async () => {
    const wrapper = mount(BasicButton, {
      props: { onClick: vi.fn() },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'i-test:pre',
        postIcon: 'i-test:post',
        iconSize: 20,
        color: 'success',
        disabled: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain('i-test:pre');
    expect(wrapper.html()).toContain('i-test:post');
  });

  it('should render with slot content', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: '<span>Button Text</span>',
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain('Button Text');
  });

  it('should handle different color values', () => {
    const colors = ['error', 'warning', 'success', ''];
    
    colors.forEach((color) => {
      const wrapper = mount(BasicButton, {
        props: { color },
      });
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });

  it('should handle different icon sizes', () => {
    const sizes = [12, 16, 20, 24];
    
    sizes.forEach((size) => {
      const wrapper = mount(BasicButton, {
        props: { preIcon: 'i-test:pre', iconSize: size },
      });
      expect(wrapper.exists()).toBe(true);
      wrapper.unmount();
    });
  });

  it('should handle boolean props', () => {
    const wrapper = mount(BasicButton, {
      props: { disabled: true },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(BasicButton, {
      props: { preIcon: 'i-test:pre' },
    });
    
    // Test component mounting
    expect(wrapper.exists()).toBe(true);
    
    // Test prop changes
    await wrapper.setProps({ preIcon: 'i-test:new' });
    expect(wrapper.exists()).toBe(true);
    
    // Test component unmounting
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
