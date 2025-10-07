import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicButton from '/@/components/Button/src/BasicButton.vue';

// Mock dependencies
vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    props: ['icon', 'size'],
    template: '<span class="icon-mock" :data-icon="icon" :data-size="size"></span>',
  },
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: () => vi.fn(() => ({})),
}));

vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'AButton',
    template: '<button><slot /></button>',
  },
}));

describe('BasicButton coverage', () => {
  it('should render with default props', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const wrapper = mount(BasicButton, {
      props: {
        color: 'success',
        disabled: true,
        loading: true,
      },
      slots: {
        default: 'Submit',
      },
    });

    expect(wrapper.props().color).toBe('success');
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.props().loading).toBe(true);
  });

  it('should render with preIcon', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'check-circle',
        iconSize: 16,
      },
      slots: {
        default: 'Confirm',
      },
    });

    expect(wrapper.find('.icon-mock[data-icon="check-circle"]').exists()).toBe(true);
    expect(wrapper.find('.icon-mock[data-size="16"]').exists()).toBe(true);
  });

  it('should render with postIcon', () => {
    const wrapper = mount(BasicButton, {
      props: {
        postIcon: 'arrow-right',
        iconSize: 18,
      },
      slots: {
        default: 'Next',
      },
    });

    expect(wrapper.find('.icon-mock[data-icon="arrow-right"]').exists()).toBe(true);
    expect(wrapper.find('.icon-mock[data-size="18"]').exists()).toBe(true);
  });

  it('should handle click events', async () => {
    const onClick = vi.fn();
    const wrapper = mount(BasicButton, {
      props: {
        onClick,
      },
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should apply color class', () => {
    const wrapper = mount(BasicButton, {
      props: {
        color: 'error',
      },
      slots: {
        default: 'Error',
      },
    });

    expect(wrapper.classes()).toContain('ant-btn-error');
  });

  it('should apply disabled class', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('should render slot content', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: '<span class="custom-content">Custom Content</span>',
      },
    });

    expect(wrapper.find('.custom-content').text()).toBe('Custom Content');
  });

  it('should handle different color values', () => {
    const colors = ['error', 'warning', 'success'];

    colors.forEach((color) => {
      const wrapper = mount(BasicButton, {
        props: { color },
        slots: { default: 'Test' },
      });

      expect(wrapper.classes()).toContain(`ant-btn-${color}`);
      wrapper.unmount();
    });
  });

  it('should handle icon sizes', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'test-icon',
        iconSize: 20,
      },
      slots: { default: 'Test' },
    });

    expect(wrapper.find('.icon-mock[data-size="20"]').exists()).toBe(true);
  });

  it('should handle boolean props', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
        loading: false,
      },
      slots: { default: 'Test' },
    });

    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.props().loading).toBe(false);
  });
});