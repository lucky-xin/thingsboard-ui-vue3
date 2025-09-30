import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '/@/components/Button/src/BasicButton';
import { ref } from 'vue';

// Mock dependencies
vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="icon" :data-icon="icon" :data-size="size"></span>',
  },
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: () => ({ value: {} }),
}));

vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    props: ['class', 'disabled', 'loading', 'onClick'],
    template: '<button :class="class" :disabled="disabled" :loading="loading" @click="$emit(\'click\')"><slot /></button>',
  },
}));

describe('Button', () => {
  it('should render Button correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('should show loading state when loading prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Click me',
      },
    });

    // BasicButton passes loading prop to ant-design Button component
    expect(wrapper.find('button').attributes('loading')).toBeDefined();
  });

  it('should apply correct color class', () => {
    const wrapper = mount(Button, {
      props: {
        color: 'success',
      },
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.find('.ant-btn-success').exists()).toBe(true);
  });

  it('should render with preIcon and postIcon', () => {
    const wrapper = mount(Button, {
      props: {
        preIcon: 'i-test:pre',
        postIcon: 'i-test:post',
        iconSize: 16,
      },
      slots: {
        default: 'Button Text',
      },
    });

    expect(wrapper.find('.icon[data-icon="i-test:pre"]').exists()).toBe(true);
    expect(wrapper.find('.icon[data-icon="i-test:post"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Button Text');
  });

  it('should handle different color values', () => {
    const colors = ['error', 'warning', 'success', ''];
    
    colors.forEach((color) => {
      const wrapper = mount(Button, {
        props: { color },
        slots: { default: 'Test' },
      });
      
      if (color) {
        expect(wrapper.find(`.ant-btn-${color}`).exists()).toBe(true);
      }
      wrapper.unmount();
    });
  });

  it('should handle onClick prop', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      props: { onClick },
      slots: { default: 'Click me' },
    });

    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should handle iconSize prop', () => {
    const wrapper = mount(Button, {
      props: {
        preIcon: 'i-test:icon',
        iconSize: 20,
      },
      slots: { default: 'Test' },
    });

    expect(wrapper.find('.icon[data-size="20"]').exists()).toBe(true);
  });

  it('should handle boolean props', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
        loading: false,
      },
      slots: { default: 'Test' },
    });

    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').attributes('loading')).toBe('false');
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(Button, {
      props: { preIcon: 'i-test:icon' },
      slots: { default: 'Test' },
    });

    expect(wrapper.exists()).toBe(true);
    await wrapper.setProps({ preIcon: 'i-test:new' });
    expect(wrapper.exists()).toBe(true);
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
