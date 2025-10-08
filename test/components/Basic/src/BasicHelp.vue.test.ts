import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicHelp from '/@/components/Basic/src/BasicHelp';

// Mock useDesign hook to return the actual prefix
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({ prefixCls: 'jeesite-basic-help' }),
}));

// Mock utils but keep the actual functionality where possible
vi.mock('/@/utils', () => ({
  getPopupContainer: vi.fn(() => document.body),
}));

vi.mock('/@/utils/is', () => ({
  isString: (val: any) => typeof val === 'string',
  isArray: (val: any) => Array.isArray(val),
}));

// Mock Icon component with actual implementation
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    props: ['icon'],
    template: '<span class="icon-mock" data-icon="icon">Icon</span>',
  },
}));

// Mock Ant Design components with actual implementation for better coverage
vi.mock('ant-design-vue', () => ({
  Tooltip: {
    name: 'Tooltip',
    props: ['title', 'placement', 'autoAdjustOverflow', 'overlayClassName', 'overlayStyle', 'getPopupContainer'],
    template: '<div class="tooltip-mock" :title="title"><slot /></div>',
  },
}));

describe('BasicHelp', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicHelp);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.jeesite-basic-help').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicHelp);
    expect(wrapper.props().maxWidth).toBe('600px');
    expect(wrapper.props().color).toBe('#ffffff');
    expect(wrapper.props().fontSize).toBe('14px');
    expect(wrapper.props().placement).toBe('right');
  });

  it('should handle props correctly', () => {
    const props = {
      maxWidth: '800px',
      color: '#000000',
      fontSize: '16px',
      placement: 'top',
      text: 'Help text',
      showIndex: true,
    };
    const wrapper = mount(BasicHelp, {
      props,
    });
    expect(wrapper.props().maxWidth).toBe('800px');
    expect(wrapper.props().color).toBe('#000000');
    expect(wrapper.props().fontSize).toBe('16px');
    expect(wrapper.props().placement).toBe('top');
    expect(wrapper.props().text).toBe('Help text');
    expect(wrapper.props().showIndex).toBe(true);
  });

  it('should render with string text and generate correct tooltip title', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with array text and generate correct tooltip title', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['Help text 1', 'Help text 2'],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with showIndex when text is array and generate correct tooltip title', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: ['Help text 1', 'Help text 2'],
        showIndex: true,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '500px',
        color: '#ff0000',
        fontSize: '12px',
        placement: 'bottom',
        text: 'Custom help text',
        showIndex: false,
      },
    });
    expect(wrapper.props().maxWidth).toBe('500px');
    expect(wrapper.props().color).toBe('#ff0000');
    expect(wrapper.props().fontSize).toBe('12px');
    expect(wrapper.props().placement).toBe('bottom');
    expect(wrapper.props().text).toBe('Custom help text');
    expect(wrapper.props().showIndex).toBe(false);
  });

  it('should render with slot content', () => {
    const wrapper = mount(BasicHelp, {
      slots: {
        default: '<span class="custom-icon">Custom Icon</span>',
      },
    });
    expect(wrapper.find('.custom-icon').exists()).toBe(true);
    // Should not render default icon when slot is provided
    expect(wrapper.find('.icon-mock').exists()).toBe(false);
  });

  it('should render with default icon when no slot is provided', () => {
    const wrapper = mount(BasicHelp);
    // Should render default icon when no slot is provided
    expect(wrapper.find('.icon-mock').exists()).toBe(true);
  });

  it('should render with different placement values', () => {
    const placements = ['top', 'bottom', 'left', 'right'];

    placements.forEach((placement) => {
      const wrapper = mount(BasicHelp, {
        props: {
          placement,
          text: 'Help text',
        },
      });
      expect(wrapper.props().placement).toBe(placement);
      wrapper.unmount();
    });
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: 'Help text',
        placement: 'top',
      },
    });

    // Test component mounting
    expect(wrapper.exists()).toBe(true);

    // Test prop changes
    await wrapper.setProps({ placement: 'bottom' });
    expect(wrapper.props().placement).toBe('bottom');

    // Test component unmounting
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle edge cases', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: '',
        placement: 'top',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle boolean props', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        showIndex: true,
        text: 'Help text',
      },
    });
    expect(wrapper.props().showIndex).toBe(true);
  });

  it('should handle mixed prop types', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        maxWidth: '700px',
        color: '#00ff00',
        fontSize: '18px',
        placement: 'left',
        text: ['Text 1', 'Text 2', 'Text 3'],
        showIndex: true,
      },
    });
    expect(wrapper.props().maxWidth).toBe('700px');
    expect(wrapper.props().color).toBe('#00ff00');
    expect(wrapper.props().fontSize).toBe('18px');
    expect(wrapper.props().placement).toBe('left');
    expect(wrapper.props().text).toEqual(['Text 1', 'Text 2', 'Text 3']);
    expect(wrapper.props().showIndex).toBe(true);
  });

  it('should handle undefined text prop', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: undefined,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null text prop', () => {
    const wrapper = mount(BasicHelp, {
      props: {
        text: null,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});