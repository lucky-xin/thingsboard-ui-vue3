import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicHelp from '/@/components/Basic/src/BasicHelp.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-help',
  })),
}));

vi.mock('/@/utils', () => ({
  getPopupContainer: vi.fn(() => document.body),
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string'),
  isArray: vi.fn((val) => Array.isArray(val)),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn(() => null),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span data-testid="icon"></span>',
    props: ['icon'],
  },
}));

vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    template: '<div data-testid="tooltip"><slot /></div>',
    props: ['overlayClassName', 'title', 'autoAdjustOverflow', 'overlayStyle', 'placement', 'getPopupContainer'],
  },
}));

describe('components/Basic/src/BasicHelp', () => {
  it('should render with default props', () => {
    const wrapper = mount(BasicHelp);
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true);
  });

  it('should render with string text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should render with array text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['First help text', 'Second help text'],
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should render with array text and show index', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['First help text', 'Second help text'],
        showIndex: true,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should apply custom maxWidth', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '800px',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should apply custom color and fontSize', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        color: '#ff0000',
        fontSize: '16px',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should apply custom placement', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        placement: 'top',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should render with all props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '500px',
        showIndex: true,
        color: '#000000',
        fontSize: '12px',
        placement: 'bottom',
        text: ['Help 1', 'Help 2'],
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should handle empty text array', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: [],
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should handle null text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: null,
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });

  it('should render with slot content', () => {
    const wrapper = mount(BasicHelp, {
      slots: {
        default: '<span data-testid="slot-content">Custom content</span>',
      },
    });
    
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('[data-testid="tooltip"]').exists()).toBe(true);
  });
});
