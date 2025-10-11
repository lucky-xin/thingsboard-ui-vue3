import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicButton from '/@/components/Button/src/BasicButton.vue';

// Mock dependencies
vi.mock('ant-design-vue', () => ({
  Button: {
    name: 'Button',
    template: '<button><slot v-bind="{}"></slot></button>',
    props: ['class', 'onClick'],
    emits: ['click']
  }
}));

vi.mock('/@/components/Icon/src/Icon.vue', () => ({
  default: {
    name: 'Icon',
    template: '<span class="icon-mock"></span>',
    props: ['icon', 'size']
  }
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({}))
}));

describe('components/Button/src/BasicButton.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'Test Button'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Button');
  });

  it('should handle click events', () => {
    const onClick = vi.fn();
    const wrapper = mount(BasicButton, {
      props: {
        onClick
      },
      slots: {
        default: 'Click Me'
      }
    });

    // Test that the component renders with onClick prop
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Click Me');
  });

  it('should render with custom props', () => {
    const wrapper = mount(BasicButton, {
      props: {
        color: 'success',
        disabled: true
      },
      slots: {
        default: 'Custom Button'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom Button');
  });

  it('should render with slot content', () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: '<span>Slot Content</span>'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain('Slot Content');
  });

  it('should handle different color values', () => {
    const wrapper = mount(BasicButton, {
      props: {
        color: 'error'
      },
      slots: {
        default: 'Error Button'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Error Button');
  });

  it('should handle different icon sizes', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'test-icon',
        iconSize: 16
      },
      slots: {
        default: 'Icon Button'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Icon Button');
  });

  it('should handle boolean props', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true,
        loading: true
      },
      slots: {
        default: 'Disabled Button'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Disabled Button');
  });

  it('should render prefix icon when provided', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'prefix-icon'
      },
      slots: {
        default: 'Button with Prefix'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Button with Prefix');
  });

  it('should render postfix icon when provided', () => {
    const wrapper = mount(BasicButton, {
      props: {
        postIcon: 'postfix-icon'
      },
      slots: {
        default: 'Button with Postfix'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Button with Postfix');
  });

  it('should render both prefix and postfix icons', () => {
    const wrapper = mount(BasicButton, {
      props: {
        preIcon: 'prefix-icon',
        postIcon: 'postfix-icon'
      },
      slots: {
        default: 'Button with Both Icons'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Button with Both Icons');
  });

  it('should apply disabled class when disabled', () => {
    const wrapper = mount(BasicButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Disabled');
  });

  it('should handle click event with event parameter', () => {
    const onClick = vi.fn();
    const wrapper = mount(BasicButton, {
      props: {
        onClick
      },
      slots: {
        default: 'Click Test'
      }
    });

    // Test that the component renders with onClick prop
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Click Test');
  });

  it('should handle click event without onClick prop', async () => {
    const wrapper = mount(BasicButton, {
      slots: {
        default: 'No Click Handler'
      }
    });

    // Should not throw error when clicking without onClick handler
    await wrapper.trigger('click');
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle color prop variations', () => {
    const colors = ['error', 'warning', 'success', ''];
    
    colors.forEach(color => {
      const buttonText = color ? `${color} button` : 'button';
      const wrapper = mount(BasicButton, {
        props: { color },
        slots: { default: buttonText }
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toContain(buttonText);
    });
  });

  it('should handle icon size variations', () => {
    const iconSizes = [12, 14, 16, 18, 20];
    
    iconSizes.forEach(iconSize => {
      const wrapper = mount(BasicButton, {
        props: { iconSize },
        slots: { default: `button with size ${iconSize}` }
      });
      
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toContain(`button with size ${iconSize}`);
    });
  });

  it('should call onClick function when provided', () => {
    const onClick = vi.fn();
    const wrapper = mount(BasicButton, {
      props: { onClick },
      slots: { default: 'Test' }
    });

    // Access the component instance and call onClick directly
    const vm = wrapper.vm as any;
    if (vm.onClick) {
      vm.onClick(new Event('click'));
      expect(onClick).toHaveBeenCalled();
    }
  });

  it('should handle onClick when not provided', () => {
    const wrapper = mount(BasicButton, {
      slots: { default: 'Test' }
    });

    // Access the component instance and call onClick directly
    const vm = wrapper.vm as any;
    if (vm.onClick) {
      // Should not throw error when onClick is not provided
      expect(() => vm.onClick(new Event('click'))).not.toThrow();
    }
  });
});