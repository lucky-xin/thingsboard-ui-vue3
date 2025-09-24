import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Description from '/@/components/Description/src/Description.vue';

describe('Description', () => {
  it('should render with default props', () => {
    const wrapper = mount(Description);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with title', () => {
    const wrapper = mount(Description, {
      props: {
        title: 'Test Title',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with schema', () => {
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

    const wrapper = mount(Description, {
      props: {
        schema,
        data: {
          name: 'John',
          age: 30,
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
          size,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should render bordered description', () => {
    const wrapper = mount(Description, {
      props: {
        bordered: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render without border', () => {
    const wrapper = mount(Description, {
      props: {
        bordered: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with collapse options', () => {
    const wrapper = mount(Description, {
      props: {
        useCollapse: true,
        collapseOptions: {
          canExpand: true,
          helpMessage: 'Help message',
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom column configuration', () => {
    const wrapper = mount(Description, {
      props: {
        column: { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 },
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
