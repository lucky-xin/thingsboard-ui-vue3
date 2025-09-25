import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { Descriptions } from 'ant-design-vue';
import Description from '/@/components/Description/src/Description.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-description',
  })),
}));

vi.mock('/@/hooks/core/useAttrs', () => ({
  useAttrs: vi.fn(() => ({})),
}));

vi.mock('/@/components/Container', () => ({
  CollapseContainer: {
    name: 'CollapseContainer',
    template: '<div class="collapse-container"><slot /></div>',
  },
}));

vi.mock('lodash-es', () => ({
  get: vi.fn((obj, path) => {
    if (!obj) return undefined;
    return path.split('.').reduce((o, p) => o?.[p], obj);
  }),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
}));

vi.mock('/@/utils/helper/tsxHelper', () => ({
  getSlot: vi.fn((slots, name, data) => {
    if (slots && slots[name]) {
      return slots[name](data);
    }
    return null;
  }),
}));

describe('Description', () => {
  const mockSchema = [
    {
      field: 'name',
      label: 'Name',
      span: 1,
    },
    {
      field: 'age',
      label: 'Age',
      span: 1,
    },
    {
      field: 'email',
      label: 'Email',
      span: 1,
    },
  ];

  const mockData = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
  };

  it('should render with default props', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with title', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        title: 'User Information',
        column: 3,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with schema', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with different sizes', () => {
    const sizes = ['small', 'default', 'middle'];

    sizes.forEach((size) => {
      const wrapper = mount(Description, {
        props: {
          schema: mockSchema,
          data: mockData,
          size,
        },
        global: {
          components: {
            Descriptions,
          },
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should render bordered description', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
        bordered: true,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render without border', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
        bordered: false,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with collapse options', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
        useCollapse: true,
        collapseOptions: {
          canExpand: true,
          expand: false,
          helpMessage: 'Help message',
        },
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom column configuration', () => {
    const customSchema = [
      {
        field: 'name',
        label: 'Name',
        span: 1,
      },
      {
        field: 'age',
        label: 'Age',
        span: 1,
      },
    ];
    
    const wrapper = mount(Description, {
      props: {
        schema: customSchema,
        data: mockData,
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 },
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with slot content', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
      },
      slots: {
        title: '<span class="custom-title">Custom Title</span>',
        action: '<button class="custom-action">Action</button>',
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render without collapse when useCollapse is false', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
        useCollapse: false,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty schema', () => {
    const wrapper = mount(Description, {
      props: {
        schema: [],
        data: mockData,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null data', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: null,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should emit register event', () => {
    const wrapper = mount(Description, {
      props: {
        schema: mockSchema,
        data: mockData,
        column: 3,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.emitted('register')).toBeTruthy();
  });

  it('should handle schema with show function', () => {
    const schemaWithShow = [
      {
        field: 'name',
        label: 'Name',
        show: (data) => data && data.name,
      },
    ];

    const wrapper = mount(Description, {
      props: {
        schema: schemaWithShow,
        data: mockData,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema with render function', () => {
    const schemaWithRender = [
      {
        field: 'name',
        label: 'Name',
        render: (value) => `Rendered: ${value}`,
      },
    ];

    const wrapper = mount(Description, {
      props: {
        schema: schemaWithRender,
        data: mockData,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema with slot', () => {
    const schemaWithSlot = [
      {
        field: 'name',
        label: 'Name',
        slot: 'nameSlot',
      },
    ];

    const wrapper = mount(Description, {
      props: {
        schema: schemaWithSlot,
        data: mockData,
      },
      slots: {
        nameSlot: '<span class="name-slot">Name Slot Content</span>',
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema with contentMinWidth', () => {
    const schemaWithWidth = [
      {
        field: 'name',
        label: 'Name',
        contentMinWidth: 200,
      },
    ];

    const wrapper = mount(Description, {
      props: {
        schema: schemaWithWidth,
        data: mockData,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle schema with labelStyle and labelMinWidth', () => {
    const schemaWithLabelStyle = [
      {
        field: 'name',
        label: 'Name',
        labelStyle: { color: 'red' },
        labelMinWidth: 100,
      },
    ];

    const wrapper = mount(Description, {
      props: {
        schema: schemaWithLabelStyle,
        data: mockData,
      },
      global: {
        components: {
          Descriptions,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
