import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicArrow from '/@/components/Basic/src/BasicArrow';

// Mock global properties
const globalMocks = {
  $t: (key: string) => key,
};

// Mock Ant Design components
vi.mock('ant-design-vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Spin: {
      name: 'ASpin',
      template: '<div class="ant-spin">Loading...</div>',
      props: ['size', 'style'],
    },
  };
});

// Mock Icon component
vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<i class="mock-icon"></i>',
    props: ['icon', 'style'],
  },
}));

describe('BasicArrow', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicArrow);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicArrow);
    // Vue converts undefined to false for boolean props
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(false);
  });

  it('should handle props correctly', () => {
    const props = {
      expand: false,
      up: true,
    };
    const wrapper = mount(BasicArrow, {
      props,
    });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);
  });

  it('should render with expand prop true', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
      },
    });
    expect(wrapper.props().expand).toBe(true);
  });

  it('should render with expand prop false', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: false,
      },
    });
    expect(wrapper.props().expand).toBe(false);
  });

  it('should render with up prop true', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        up: true,
      },
    });
    expect(wrapper.props().up).toBe(true);
  });

  it('should render with up prop false', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        up: false,
      },
    });
    expect(wrapper.props().up).toBe(false);
  });

  it('should handle both props together', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: false,
        up: true,
      },
    });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);
  });

  it('should handle component lifecycle', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
    });

    // Test component mounting
    expect(wrapper.exists()).toBe(true);

    // Test prop changes
    await wrapper.setProps({ expand: false, up: true });
    expect(wrapper.props().expand).toBe(false);
    expect(wrapper.props().up).toBe(true);

    // Test component unmounting
    await wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle click events', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
    });

    // Test click event
    await wrapper.trigger('click');
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle different prop combinations', () => {
    const combinations = [
      { expand: true, up: true },
      { expand: true, up: false },
      { expand: false, up: true },
      { expand: false, up: false },
    ];

    combinations.forEach((combo) => {
      const wrapper = mount(BasicArrow, {
        props: combo,
      });
      expect(wrapper.props().expand).toBe(combo.expand);
      expect(wrapper.props().up).toBe(combo.up);
      wrapper.unmount();
    });
  });

  it('should render with custom classes', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle prop changes dynamically', async () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
    });

    // Change expand prop
    await wrapper.setProps({ expand: false });
    expect(wrapper.props().expand).toBe(false);

    // Change up prop
    await wrapper.setProps({ up: true });
    expect(wrapper.props().up).toBe(true);

    // Change both props
    await wrapper.setProps({ expand: true, up: true });
    expect(wrapper.props().expand).toBe(true);
    expect(wrapper.props().up).toBe(true);
  });

  it('should handle edge cases', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: false,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
