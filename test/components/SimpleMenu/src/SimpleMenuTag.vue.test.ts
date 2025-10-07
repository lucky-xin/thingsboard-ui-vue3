import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-simple-menu',
  })),
}));

import SimpleMenuTag from '/@/components/SimpleMenu/src/SimpleMenuTag';

describe('SimpleMenuTag', () => {
  it('should render without crashing', () => {
    const wrapper = mount(SimpleMenuTag);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(SimpleMenuTag);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {};
    const wrapper = mount(SimpleMenuTag, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should not show tag when no item provided', () => {
    const wrapper = mount(SimpleMenuTag);
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('should not show tag when item has no tag property', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test'
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('should not show tag when tag has no dot or content', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {}
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('should show tag when tag has dot property', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            dot: true
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('should show tag when tag has content property', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New'
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toBe('New');
  });

  it('should show tag with correct class when tag has type', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New',
            type: 'success'
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag');
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag--success');
  });

  it('should show dot tag with correct class', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            dot: true
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag--dot');
  });

  it('should show dot tag when dot prop is true', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New'
          }
        },
        dot: true
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag--dot');
  });

  it('should show collapse tag with correct class', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New'
          }
        },
        collapseParent: true
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag--collapse');
  });

  it('should show empty content when collapseParent is true', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New'
          }
        },
        collapseParent: true
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  it('should show empty content when dot is true', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New',
            dot: true
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.text()).toBe('');
  });

  it('should handle tag with default type', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: {
            content: 'New'
          }
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(true);
    expect(wrapper.classes()).toContain('jeesite-simple-menu-tag--error');
  });

  it('should handle item with null tag', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {
          path: '/test',
          name: 'Test',
          tag: null
        }
      }
    });
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('should handle empty item', () => {
    const wrapper = mount(SimpleMenuTag, {
      props: {
        item: {}
      }
    });
    expect(wrapper.find('span').exists()).toBe(false);
  });
});
