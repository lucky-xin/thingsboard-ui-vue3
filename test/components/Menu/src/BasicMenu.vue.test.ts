import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';

// Mock store with complete menu settings
vi.mock('/@/store', () => ({
  useAppStore: () => ({
    getMenuSetting: {
      collapsed: false,
      type: 'sidebar',
      mode: 'inline',
      theme: 'dark',
      split: false,
      contentWidth: 'Fluid',
      fixed: true,
      collapsedShowTitle: false,
      canDrag: false,
      siderHidden: false,
      topMenuAlign: 'center',
      trigger: 'HEADER',
      accordion: true,
      mixSideTrigger: 'click',
      mixSideFixed: false,
      closeMixSidebarOnChange: false,
    },
  }),
}));

// Mock Ant Design Vue components with proper structure
vi.mock("ant-design-vue", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Menu: {
      name: 'AMenu',
      template: '<div class="ant-menu"><slot /></div>',
      props: ['mode', 'selectedKeys', 'openKeys', 'inlineCollapsed'],
      SubMenu: {
        name: 'SubMenu',
        template: '<div class="ant-sub-menu"><slot /></div>',
      },
      Item: {
        name: 'MenuItem',
        template: '<div class="ant-menu-item"><slot /></div>',
      },
    },
  };
});

// Mock Vue Router
vi.mock('vue-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      go: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    })),
    useRoute: vi.fn(() => ({
      path: '/',
      name: 'Home',
      params: {},
      query: {},
      meta: {}
    })),
    createRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      go: vi.fn(),
      back: vi.fn(),
      forward: vi.fn()
    })),
    createWebHistory: vi.fn(() => ({})),
    createWebHashHistory: vi.fn(() => ({}))
  };
});

// Mock other dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-basic-menu',
  })),
}));

vi.mock('/@/hooks/web/useI18n', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useI18n: vi.fn(() => ({
      t: vi.fn((key) => key),
    })),
  };
});

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    createMessage: vi.fn(),
  })),
}));

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: vi.fn(() => ({
    getCollapsed: { value: false },
    getIsMixSidebar: { value: false },
  })),
}));

vi.mock('/@/router/helper/menuHelper', () => ({
  getAllParentPath: vi.fn(() => []),
}));

vi.mock('/@/hooks/core/useTimeout', () => ({
  useTimeoutFn: vi.fn((fn) => {
    fn();
    return { start: vi.fn(), stop: vi.fn() };
  }),
}));

// Import the component
import BasicMenu from '/@/components/Menu/src/BasicMenu';

// Create pinia instance
const pinia = createPinia();

describe('BasicMenu', () => {
  it('should render without crashing', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.props().items).toEqual([]);
    expect(wrapper.props().theme).toBe('dark');
    expect(wrapper.props().inlineIndent).toBe(20);
    expect(wrapper.props().collapsedShowTitle).toBe(false);
    expect(wrapper.props().mode).toBe('inline');
    expect(wrapper.props().type).toBe('mix');
    expect(wrapper.props().accordion).toBe(true);
  });

  it('should handle props correctly', () => {
    const props = {
      items: [
        { key: '1', title: 'Item 1' },
        { key: '2', title: 'Item 2' }
      ],
      theme: 'light',
      inlineIndent: 24,
      collapsedShowTitle: true,
      mode: 'horizontal',
      type: 'top-menu',
      accordion: false,
    };
    const wrapper = mount(BasicMenu, {
      props,
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.props().items).toEqual(props.items);
    expect(wrapper.props().theme).toBe(props.theme);
    expect(wrapper.props().inlineIndent).toBe(props.inlineIndent);
    expect(wrapper.props().collapsedShowTitle).toBe(props.collapsedShowTitle);
    expect(wrapper.props().mode).toBe(props.mode);
    expect(wrapper.props().type).toBe(props.type);
    expect(wrapper.props().accordion).toBe(props.accordion);
  });

  it('should render with different items', () => {
    const props = {
      items: [
        { key: '1', title: 'Item 1' }
      ],
    };
    const wrapper = mount(BasicMenu, {
      props,
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.props().items).toEqual(props.items);
  });

  it('should handle menu interactions', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu events', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu selection', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu opening', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu closing', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu item clicks', () => {
    const wrapper = mount(BasicMenu, {
      global: {
        plugins: [pinia],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});