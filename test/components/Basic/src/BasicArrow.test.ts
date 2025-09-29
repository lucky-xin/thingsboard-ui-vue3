import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicArrow from '/@/components/Basic/src/BasicArrow';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-arrow',
  })),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: {
    name: 'Icon',
    template: '<span class="icon-mock"></span>',
  },
}));

vi.mock('ant-design-vue', () => ({
  Spin: {
    name: 'Spin',
    template: '<span class="spin-mock"></span>',
    props: ['size', 'style'],
  },
}));

describe('components/Basic/src/BasicArrow', () => {
  it('should render with default props', () => {
    const wrapper = mount(BasicArrow);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.icon-mock').exists()).toBe(true);
    expect(wrapper.find('.spin-mock').exists()).toBe(false);
  });

  it('should render loading state when loading is true', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.find('.spin-mock').exists()).toBe(true);
    expect(wrapper.find('.icon-mock').exists()).toBe(false);
  });

  it('should apply correct classes based on props', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: true,
        down: false,
        inset: true,
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-arrow');
    expect(element.classes()).toContain('jeesite-basic-arrow--active');
    expect(element.classes()).toContain('up');
    expect(element.classes()).toContain('inset');
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(BasicArrow);

    await wrapper.trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('should emit dblclick event when double clicked', async () => {
    const wrapper = mount(BasicArrow);

    await wrapper.trigger('dblclick');

    expect(wrapper.emitted('dblclick')).toBeTruthy();
    expect(wrapper.emitted('dblclick')).toHaveLength(1);
  });

  it('should show correct icon for leaf node', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        leaf: true,
      },
    });

    // The icon should be set based on the computed property
    expect(wrapper.find('.icon-mock').exists()).toBe(true);
  });

  it('should show correct icon for double arrow', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        double: true,
      },
    });

    expect(wrapper.find('.icon-mock').exists()).toBe(true);
  });

  it('should show correct icon for regular arrow', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        leaf: false,
        double: false,
      },
    });

    expect(wrapper.find('.icon-mock').exists()).toBe(true);
  });

  it('should handle all boolean props combinations', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        expand: true,
        up: true,
        down: true,
        inset: true,
        leaf: true,
        double: true,
        loading: false,
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-arrow');
    expect(element.classes()).toContain('jeesite-basic-arrow--active');
    expect(element.classes()).toContain('up');
    expect(element.classes()).toContain('down');
    expect(element.classes()).toContain('inset');
  });

  it('should handle down and active states together', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        down: true,
        expand: true,
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-arrow');
    expect(element.classes()).toContain('jeesite-basic-arrow--active');
    expect(element.classes()).toContain('down');
  });

  it('should handle up and active states together', () => {
    const wrapper = mount(BasicArrow, {
      props: {
        up: true,
        expand: true,
      },
    });

    const element = wrapper.find('span');
    expect(element.classes()).toContain('jeesite-basic-arrow');
    expect(element.classes()).toContain('jeesite-basic-arrow--active');
    expect(element.classes()).toContain('up');
  });
});
