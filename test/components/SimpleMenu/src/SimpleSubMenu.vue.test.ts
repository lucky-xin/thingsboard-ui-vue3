import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock provide/inject before importing component
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    inject: vi.fn((key) => {
      if (key === 'activeName') {
        return { value: 'test' };
      }
      if (key === 'rootMenuEmitter') {
        return {
          on: vi.fn(),
          off: vi.fn(),
          emit: vi.fn()
        };
      }
      if (key === 'getCollapse') {
        return { value: false };
      }
      // Mock the subMenu provider with all required properties
      return {
        addMenuItem: vi.fn(),
        removeMenuItem: vi.fn(),
        removeAll: vi.fn(),
        addSubMenu: vi.fn(),
        removeSubMenu: vi.fn(),
        getOpenNames: vi.fn(() => []),
        isRemoveAllPopup: { value: false },
        sliceIndex: vi.fn(),
        level: 0,
        props: {
          collapse: false,
          accordion: true,
          theme: 'light'
        },
        handleMouseleave: vi.fn()
      };
    }),
  };
});

// Mock useSimpleRootMenuContext
vi.mock('/@/components/SimpleMenu/src/components/useSimpleMenuContext', () => ({
  useSimpleRootMenuContext: vi.fn(() => ({
    rootMenuEmitter: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn()
    },
    activeName: { value: 'test' }
  })),
}));

// Mock the emitter module
vi.mock('/@/components/SimpleMenu/src/emitter', () => ({
  rootMenuEmitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
}));

// Mock useI18n
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}));

// Mock useDesign
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-simple-menu'
  })
}));

import SimpleSubMenu from '/@/components/SimpleMenu/src/SimpleSubMenu';

describe('SimpleSubMenu', () => {
  const defaultProps = {
    item: {
      path: '/test',
      name: 'Test Menu',
      meta: {}
    }
  };

  it('should render without crashing', () => {
    const wrapper = mount(SimpleSubMenu, {
      props: defaultProps
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(SimpleSubMenu, {
      props: defaultProps
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      item: {
        path: '/test',
        name: 'Test Menu',
        meta: {}
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with children', () => {
    const props = {
      item: {
        path: '/parent',
        name: 'Parent Menu',
        meta: {},
        children: [
          {
            path: '/child',
            name: 'Child Menu',
            meta: {}
          }
        ]
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with hideMenu meta', () => {
    const props = {
      item: {
        path: '/hidden',
        name: 'Hidden Menu',
        meta: {
          hideMenu: true
        }
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with icon', () => {
    const props = {
      item: {
        path: '/icon',
        name: 'Icon Menu',
        icon: 'test-icon',
        meta: {}
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle collapse props', () => {
    const props = {
      item: {
        path: '/collapse',
        name: 'Collapse Menu',
        meta: {}
      },
      collapse: true,
      parent: true
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle theme props', () => {
    const props = {
      item: {
        path: '/theme',
        name: 'Theme Menu',
        meta: {}
      },
      theme: 'dark'
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle collapsedShowTitle props', () => {
    const props = {
      item: {
        path: '/title',
        name: 'Title Menu',
        meta: {}
      },
      collapsedShowTitle: true,
      collapse: true,
      parent: true
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with color', () => {
    const props = {
      item: {
        path: '/color',
        name: 'Color Menu',
        color: '#ff0000',
        meta: {}
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle item with hideChildrenInMenu meta', () => {
    const props = {
      item: {
        path: '/no-children',
        name: 'No Children Menu',
        meta: {
          hideChildrenInMenu: true
        },
        children: [
          {
            path: '/child',
            name: 'Child Menu',
            meta: {}
          }
        ]
      }
    };
    const wrapper = mount(SimpleSubMenu, {
      props,
    });
    expect(wrapper.exists()).toBe(true);
  });
});
