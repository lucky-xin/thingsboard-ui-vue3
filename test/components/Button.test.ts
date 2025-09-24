import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '/@/components/Button/src/BasicButton.vue';
import { ref } from 'vue';

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

    expect(wrapper.find('.ant-btn-loading').exists()).toBe(true);
  });

  it('should apply correct type class', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.find('.ant-btn-primary').exists()).toBe(true);
  });
});
