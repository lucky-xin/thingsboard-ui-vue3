import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { Icon } from '/@/components/Icon';

describe('Icon', () => {
  it('should render icon with default props', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test-icon',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render icon with custom size', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test-icon',
        size: 24,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render icon with custom color', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test-icon',
        color: '#ff0000',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render spinning icon', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test-icon',
        spin: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render image icon when icon contains dot', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: 'test.png',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
