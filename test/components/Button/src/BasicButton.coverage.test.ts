import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock ant-design-vue Button component
vi.mock('ant-design-vue', async () => {
  const actual = await vi.importActual('ant-design-vue');
  return {
    ...actual,
    Button: {
      name: 'AButton',
      template: `
        <button
          :class="className"
          @click="$emit('click', $event)"
          v-bind="$attrs"
        >
          <slot />
        </button>
      `,
      props: {
        color: String,
        loading: Boolean,
        disabled: Boolean,
        preIcon: String,
        postIcon: String,
        iconSize: { type: Number, default: 14 },
        onClick: { type: Function, default: null },
        className: String,
      },
      emits: ['click'],
    },
  };
});

// Mock Icon component
vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span class="icon" :class="icon" :style="{ fontSize: size + \'px\' }"><slot /></span>',
    props: ['icon', 'size'],
  },
}));

// Mock useAttrs hook
vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: () => () => ({ class: 'test-class' }),
}));

describe('BasicButton coverage', () => {
  it('should cover all button props', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');
    const { buttonProps } = await import('/@/components/Button/src/props');

    const wrapper = mount(BasicButton, {
      props: {
        color: 'success',
        loading: true,
        disabled: true,
        preIcon: 'check-circle',
        postIcon: 'arrow-right',
        iconSize: 16,
        onClick: vi.fn(),
      },
      slots: {
        default: 'Click me'
      }
    });

    // Test all props are correctly set
    expect(wrapper.props().color).toBe('success');
    expect(wrapper.props().loading).toBe(true);
    expect(wrapper.props().disabled).toBe(true);
    expect(wrapper.props().preIcon).toBe('check-circle');
    expect(wrapper.props().postIcon).toBe('arrow-right');
    expect(wrapper.props().iconSize).toBe(16);
    expect(typeof wrapper.props().onClick).toBe('function');
  });

  it('should cover getButtonClass computed property', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    // Test with color and disabled
    const wrapper1 = mount(BasicButton, {
      props: {
        color: 'error',
        disabled: true,
      },
      slots: {
        default: 'Error Button'
      }
    });

    // Test with only color
    const wrapper2 = mount(BasicButton, {
      props: {
        color: 'warning',
      },
      slots: {
        default: 'Warning Button'
      }
    });

    // Test with only disabled
    const wrapper3 = mount(BasicButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled Button'
      }
    });

    // Test without color or disabled
    const wrapper4 = mount(BasicButton, {
      slots: {
        default: 'Normal Button'
      }
    });

    expect(wrapper1.exists()).toBe(true);
    expect(wrapper2.exists()).toBe(true);
    expect(wrapper3.exists()).toBe(true);
    expect(wrapper4.exists()).toBe(true);
  });

  it('should cover getBindValue computed property', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    const wrapper = mount(BasicButton, {
      props: {
        color: 'success',
        loading: false,
      },
      slots: {
        default: 'Bind Test'
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should cover onClick function', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    const onClick = vi.fn();
    const wrapper = mount(BasicButton, {
      props: {
        onClick,
      },
      slots: {
        default: 'Click Test'
      }
    });

    // Trigger click event
    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should cover all color validator values', async () => {
    const { buttonProps } = await import('/@/components/Button/src/props');

    // Test valid colors
    const validColors = ['error', 'warning', 'success', ''];
    validColors.forEach(color => {
      expect(buttonProps.color.validator(color)).toBe(true);
    });

    // Test invalid colors
    const invalidColors = ['primary', 'secondary', 'info', 'danger', 'invalid'];
    invalidColors.forEach(color => {
      expect(buttonProps.color.validator(color)).toBe(false);
    });
  });

  it('should cover default prop values', async () => {
    const { buttonProps } = await import('/@/components/Button/src/props');

    expect(buttonProps.iconSize.default).toBe(14);
    expect(buttonProps.onClick.default).toBeNull();
  });

  it('should cover icon rendering', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'check',
        postIcon: 'arrow',
        iconSize: 18,
      },
      slots: {
        default: 'Icon Test'
      }
    });

    expect(wrapper.props().preIcon).toBe('check');
    expect(wrapper.props().postIcon).toBe('arrow');
    expect(wrapper.props().iconSize).toBe(18);
  });

  it('should cover slot content', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    const wrapper = mount(BasicButton, {
      slots: {
        default: '<span class="custom-content">Custom Content</span>'
      }
    });

    expect(wrapper.find('.custom-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom Content');
  });

  it('should cover edge cases', async () => {
    const { default: BasicButton } = await import('/@/components/Button/src/BasicButton.vue');

    // Test with empty string color
    const wrapper1 = mount(BasicButton, {
      props: {
        color: '',
      },
      slots: {
        default: 'Empty Color'
      }
    });

    // Test with zero iconSize
    const wrapper2 = mount(BasicButton, {
      props: {
        iconSize: 0,
      },
      slots: {
        default: 'Zero Icon Size'
      }
    });

    // Test with null onClick
    const wrapper3 = mount(BasicButton, {
      props: {
        onClick: null,
      },
      slots: {
        default: 'Null onClick'
      }
    });

    expect(wrapper1.props().color).toBe('');
    expect(wrapper2.props().iconSize).toBe(0);
    expect(wrapper3.props().onClick).toBeNull();
  });

  it('should cover all prop type definitions', async () => {
    const { buttonProps } = await import('/@/components/Button/src/props');

    expect(buttonProps.color.type).toBe(String);
    expect(buttonProps.loading.type).toBe(Boolean);
    expect(buttonProps.disabled.type).toBe(Boolean);
    expect(buttonProps.preIcon.type).toBe(String);
    expect(buttonProps.postIcon.type).toBe(String);
    expect(buttonProps.iconSize.type).toBe(Number);
    expect(typeof buttonProps.onClick.type).toBe('function');
  });
});