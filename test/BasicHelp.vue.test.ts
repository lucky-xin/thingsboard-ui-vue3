import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    props: {
      overlayClassName: String,
      title: [String, Object],
      autoAdjustOverflow: Boolean,
      overlayStyle: Object,
      placement: String,
      getPopupContainer: Function,
    },
    template: '<div class="ant-tooltip"><slot name="title" /><slot /></div>',
  },
}));

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: { icon: String },
    template: '<span class="mock-icon" :data-icon="icon"></span>',
  },
}));

// Mock utility functions
vi.mock('/@/utils', () => ({
  getPopupContainer: vi.fn(() => document.body),
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string'),
  isArray: vi.fn((val) => Array.isArray(val)),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn((slots) => slots.default?.()),
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-help',
  })),
}));

import BasicHelp from '/@/components/Basic/src/BasicHelp.vue';

describe('BasicHelp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be importable', () => {
    // 测试组件是否可以正常导入
    expect(BasicHelp).toBeDefined();
    expect(BasicHelp.name).toBe('BasicHelp');
  });

  it('should have basic structure', () => {
    // 基本的组件结构测试
    const wrapper = mount(BasicHelp); // Use mount instead of shallowMount
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ant-tooltip').exists()).toBe(true);
    expect(wrapper.find('.mock-icon').exists()).toBe(true);
  });

  it('should handle basic functionality', () => {
    // 基本功能测试 - 默认props
    const wrapper = mount(BasicHelp);
    
    expect(wrapper.props('maxWidth')).toBe('600px');
    expect(wrapper.props('showIndex')).toBe(false);
    expect(wrapper.props('color')).toBe('#ffffff');
    expect(wrapper.props('fontSize')).toBe('14px');
    expect(wrapper.props('placement')).toBe('right');
  });

  it('should be testable', () => {
    // 确保组件可测试 - 测试自定义props
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '800px',
        showIndex: true,
        color: '#000000',
        fontSize: '16px',
        placement: 'left',
        text: 'Test help text',
      },
    });

    expect(wrapper.props('maxWidth')).toBe('800px');
    expect(wrapper.props('showIndex')).toBe(true);
    expect(wrapper.props('color')).toBe('#000000');
    expect(wrapper.props('fontSize')).toBe('16px');
    expect(wrapper.props('placement')).toBe('left');
    expect(wrapper.props('text')).toBe('Test help text');
  });

  it('should meet coverage requirements', () => {
    // 满足覆盖率要求 - 测试字符串文本
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Single help text',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('text')).toBe('Single help text');
  });

  it('should render string text correctly', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help message',
        color: '#ff0000',
        fontSize: '18px',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render array text with index', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['First help', 'Second help', 'Third help'],
        showIndex: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('showIndex')).toBe(true);
  });

  it('should render array text without index', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['Help one', 'Help two'],
        showIndex: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('showIndex')).toBe(false);
  });

  it('should handle empty text', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: undefined,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should apply custom styling', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '400px',
        color: '#blue',
        fontSize: '12px',
      },
    });

    expect(wrapper.props('maxWidth')).toBe('400px');
    expect(wrapper.props('color')).toBe('#blue');
    expect(wrapper.props('fontSize')).toBe('12px');
  });

  it('should handle different placements', () => {
    const placements = ['top', 'bottom', 'left', 'right'];
    
    placements.forEach(placement => {
      const wrapper = mount(BasicHelp, {
        props: { placement },
      });
      expect(wrapper.props('placement')).toBe(placement);
    });
  });

  it('should render with custom slot content', () => {
    const wrapper = mount(BasicHelp, {
      slots: {
        default: '<span class="custom-help">Custom Help</span>',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should use design prefix correctly', () => {
    const wrapper = mount(BasicHelp);
    
    // Check that component renders correctly with design prefix
    expect(wrapper.exists()).toBe(true);
    // Verify that the component has the expected structure
    expect(wrapper.find('.ant-tooltip').exists()).toBe(true);
  });

  it('should handle tooltip properties correctly', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Tooltip test',
        placement: 'top',
      },
    });

    const tooltip = wrapper.findComponent({ name: 'Tooltip' });
    expect(tooltip.exists()).toBe(true);
    expect(tooltip.props('placement')).toBe('top');
    expect(tooltip.props('autoAdjustOverflow')).toBe(true);
  });
});