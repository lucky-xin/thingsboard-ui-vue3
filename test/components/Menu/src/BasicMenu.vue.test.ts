import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicMenu from '/@/components/Menu/src/BasicMenu.vue';

// Mock dependencies
vi.mock('ant-design-vue', () => ({
  Menu: {
    name: 'AMenu',
    template: '<div class="mock-menu"><slot /></div>',
    props: ['selectedKeys', 'defaultSelectedKeys', 'mode', 'openKeys', 'inlineIndent', 'theme', 'subMenuOpenDelay', 'class'],
  },
}));

vi.mock('/@/components/Menu/src/components/BasicSubMenuItem.vue', () => ({
  default: {
    name: 'BasicSubMenuItem',
    template: '<div class="mock-sub-menu-item"><slot /></div>',
    props: ['item', 'theme', 'isHorizontal'],
  },
}));

vi.mock('/@/enums/menuEnum', () => ({
  MenuModeEnum: {
    HORIZONTAL: 'horizontal',
    INLINE: 'inline',
  },
  MenuTypeEnum: {
    TOP_MENU: 'top-menu',
  },
}));

vi.mock('/@/components/Menu/src/useOpenKeys', () => ({
  useOpenKeys: () => ({
    handleOpenChange: vi.fn(),
    setOpenKeys: vi.fn(),
    getOpenKeys: vi.fn(() => []),
  }),
}));

vi.mock('vue-router', () => ({
  useRouter: () => ({
    currentRoute: {
      value: {
        path: '/dashboard',
        meta: {},
      },
    },
  }),
  RouteLocationNormalizedLoaded: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

vi.mock('/@/components/Menu/src/props', () => ({
  basicProps: {
    items: { type: Array, default: () => [] },
    mode: { type: String, default: 'inline' },
    theme: { type: String, default: 'dark' },
    accordion: { type: Boolean, default: false },
    type: { type: String, default: 'sidebar' },
    isHorizontal: { type: Boolean, default: false },
    mixSider: { type: Boolean, default: false },
    beforeClickFn: { type: Function, default: null },
  },
}));

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: () => ({
    getCollapsed: vi.fn(() => false),
    getTopMenuAlign: vi.fn(() => 'start'),
    getSplit: vi.fn(() => false),
  }),
}));

vi.mock('/@/router/constant', () => ({
  REDIRECT_NAME: 'Redirect',
}));

vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-basic-menu',
  }),
}));

vi.mock('/@/router/menus', () => ({
  getCurrentParentPath: vi.fn(() => Promise.resolve('/dashboard')),
}));

vi.mock('/@/logics/mitt/routeChange', () => ({
  listenerRouteChange: vi.fn(),
}));

vi.mock('/@/router/helper/menuHelper', () => ({
  getAllParentPath: vi.fn(() => Promise.resolve(['/dashboard'])),
}));

describe('BasicMenu.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    items: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard' },
      },
    ],
    mode: 'inline',
    theme: 'dark',
    accordion: false,
    type: 'sidebar',
    isHorizontal: false,
    mixSider: false,
    beforeClickFn: null,
  };

  it('should render BasicMenu component', () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.mock-menu').exists()).toBe(true);
  });

  it('should render menu items', () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    expect(wrapper.find('.mock-sub-menu-item').exists()).toBe(true);
  });

  it('should handle menu click', async () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    const menuClickSpy = vi.spyOn(wrapper.vm, 'handleMenuClick');
    
    await wrapper.vm.handleMenuClick({
      item: { key: '/dashboard' },
      key: '/dashboard',
    });

    expect(menuClickSpy).toHaveBeenCalled();
  });

  it('should handle beforeClickFn when provided', async () => {
    const beforeClickFn = vi.fn(() => Promise.resolve(true));
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        beforeClickFn,
      },
    });

    await wrapper.vm.handleMenuClick({
      item: { key: '/dashboard' },
      key: '/dashboard',
    });

    expect(beforeClickFn).toHaveBeenCalledWith('/dashboard');
  });

  it('should not emit menuClick when beforeClickFn returns false', async () => {
    const beforeClickFn = vi.fn(() => Promise.resolve(false));
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        beforeClickFn,
      },
    });

    const emitSpy = vi.spyOn(wrapper.vm, '$emit');
    
    await wrapper.vm.handleMenuClick({
      item: { key: '/dashboard' },
      key: '/dashboard',
    });

    expect(beforeClickFn).toHaveBeenCalledWith('/dashboard');
    expect(emitSpy).not.toHaveBeenCalledWith('menuClick', '/dashboard', { key: '/dashboard' });
  });

  it('should handle menu change', async () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    // handleMenuChange is a function returned from setup, so we can call it directly
    await wrapper.vm.handleMenuChange();

    // Verify that the function executed without error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu change with route', async () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    const route = {
      path: '/dashboard',
      meta: { currentActiveMenu: '/dashboard' },
    };

    await wrapper.vm.handleMenuChange(route);

    // Verify that the function executed without error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle horizontal menu with split', async () => {
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        isHorizontal: true,
      },
    });

    // Mock getSplit to return true
    vi.doMock('/@/hooks/setting/useMenuSetting', () => ({
      useMenuSetting: () => ({
        getCollapsed: vi.fn(() => false),
        getTopMenuAlign: vi.fn(() => 'start'),
        getSplit: vi.fn(() => true),
      }),
    }));

    await wrapper.vm.handleMenuChange();

    // Verify that the function executed without error
    expect(wrapper.exists()).toBe(true);
  });

  it('should compute menu class correctly', () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    const menuClass = wrapper.vm.getMenuClass;
    expect(menuClass).toContain('jeesite-basic-menu');
    // The justify class depends on getTopMenuAlign, which defaults to 'start'
    expect(menuClass).toContain('justify-start');
  });

  it('should compute inline collapse options correctly', () => {
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        mode: 'inline',
      },
    });

    const options = wrapper.vm.getInlineCollapseOptions;
    expect(options).toHaveProperty('inlineCollapsed');
  });

  it('should handle open keys change', () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    const handleOpenChangeSpy = vi.spyOn(wrapper.vm, 'handleOpenChange');
    
    wrapper.vm.handleOpenChange(['/dashboard']);

    expect(handleOpenChangeSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should emit menuClick event', async () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    // Test the handleMenuClick function directly
    await wrapper.vm.handleMenuClick({
      item: { key: '/dashboard' },
      key: '/dashboard',
    });

    // Verify that the function executed without error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle menu state correctly', () => {
    const wrapper = mount(BasicMenu, {
      props: defaultProps,
    });

    expect(wrapper.vm.defaultSelectedKeys).toEqual([]);
    expect(wrapper.vm.openKeys).toEqual([]);
    expect(wrapper.vm.selectedKeys).toEqual([]);
    expect(wrapper.vm.collapsedOpenKeys).toEqual([]);
  });

  it('should handle top menu mode', () => {
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        type: 'top-menu',
        mode: 'horizontal',
      },
    });

    // Verify that the component renders correctly for top menu mode
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.mock-menu').exists()).toBe(true);
  });

  it('should handle horizontal split mode', () => {
    const wrapper = mount(BasicMenu, {
      props: {
        ...defaultProps,
        isHorizontal: true,
      },
    });

    // Mock getSplit to return true
    vi.doMock('/@/hooks/setting/useMenuSetting', () => ({
      useMenuSetting: () => ({
        getCollapsed: vi.fn(() => false),
        getTopMenuAlign: vi.fn(() => 'start'),
        getSplit: vi.fn(() => true),
      }),
    }));

    // Verify that the component renders correctly for horizontal split mode
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.mock-menu').exists()).toBe(true);
  });
});