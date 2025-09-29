import { mount } from '@vue/test-utils';
import Description from '/@/components/Description/src/Description';

// Mock ant-design-vue Descriptions component
vi.mock('ant-design-vue', () => {
  return {
    Descriptions: {
      name: 'ADescriptions',
      template: '<div class="a-descriptions"><slot></slot></div>',
      Item: {
        name: 'ADescriptionsItem',
        template: '<div class="a-descriptions-item"><slot></slot></div>',
      },
    },
  };
});

// Mock Container component
vi.mock('components/Container', () => {
  return {
    CollapseContainer: {
      name: 'CollapseContainer',
      template: '<div class="collapse-container"><slot></slot></div>',
    },
  };
});

// Mock useDesign hook
vi.mock('hooks/web/useDesign', () => {
  return {
    useDesign: vi.fn(() => {
      return {
        prefixCls: 'description',
      };
    }),
  };
});

// Mock useAttrs hook
vi.mock('hooks/core/useAttrs', () => {
  return {
    useAttrs: vi.fn(() => {
      return () => ({});
    }),
  };
});

describe('Description.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Description, {
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('renders with title when provided', () => {
    const wrapper = mount(Description, {
      props: {
        title: 'Test Title',
      },
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    expect(wrapper.props().title).toBe('Test Title');
  });

  it('renders schema items correctly', () => {
    const schema = [
      {
        field: 'name',
        label: 'Name',
      },
      {
        field: 'age',
        label: 'Age',
      },
    ];

    const data = {
      name: 'John Doe',
      age: 30,
    };

    const wrapper = mount(Description, {
      props: {
        schema,
        data,
      },
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    expect(wrapper.props().schema).toEqual(schema);
    expect(wrapper.props().data).toEqual(data);
  });

  it('emits register event on mount', async () => {
    const wrapper = mount(Description, {
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    // Wait for the next tick to allow the event to be emitted
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('register')).toBeTruthy();
  });

  it('uses collapse container when useCollapse is true', () => {
    const wrapper = mount(Description, {
      props: {
        useCollapse: true,
      },
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    expect(wrapper.props().useCollapse).toBe(true);
  });

  it('does not use collapse container when useCollapse is false', () => {
    const wrapper = mount(Description, {
      props: {
        useCollapse: false,
      },
      global: {
        stubs: {
          'a-descriptions': true,
          'a-descriptions-item': true,
          'collapse-container': true,
        },
      },
    });

    expect(wrapper.props().useCollapse).toBe(false);
  });
});
