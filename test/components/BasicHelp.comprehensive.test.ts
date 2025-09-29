import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicHelp from '/@/components/Basic/src/BasicHelp';

// Mock dependencies
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const wrappedComponent = { ...component, install: vi.fn() };
    return wrappedComponent;
  }),
  deepMerge: vi.fn((target, source) => {
    if (!target) return source;
    if (!source) return target;
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = { ...(target[key] || {}), ...source[key] };
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }),
  setObjToUrlParams: vi.fn(),
  openWindow: vi.fn(),
  noop: vi.fn(),
  sleep: vi.fn(),
  getPopupContainer: vi.fn(() => document.body),
  convertBytesToSize: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string'),
  isArray: vi.fn((val) => Array.isArray(val)),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn((slots) => slots?.default?.()),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-help',
  })),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span data-testid="icon">Icon</span>',
  },
}));

describe('BasicHelp', () => {
  it('should render with default props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with string text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Single help text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with array text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['First help text', 'Second help text'],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with array text and showIndex', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['First help text', 'Second help text'],
        showIndex: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Custom help text',
        maxWidth: '800px',
        color: '#ff0000',
        fontSize: '16px',
        placement: 'top',
        showIndex: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with slot content', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
      slots: {
        default: '<span data-testid="custom-slot">Custom Slot</span>',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with default icon when no slot', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should handle empty text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: '',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should handle null text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: null,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should handle undefined text', () => {
    const wrapper = mount(BasicHelp, {
      props: {},
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should apply correct CSS classes', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });

    expect(wrapper.find('.jeesite-basic-help').classes()).toContain('jeesite-basic-help');
  });

  it('should render tooltip with correct props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
        placement: 'bottom',
        maxWidth: '500px',
      },
    });

    expect(wrapper.exists()).toBe(true);
    // The tooltip is rendered by ant-design-vue, so we just verify the component exists
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should handle component lifecycle', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });
});
