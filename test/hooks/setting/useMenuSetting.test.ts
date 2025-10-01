// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

// Mock build configuration for Vite plugins
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme-output.css',
  writable: true
});

Object.defineProperty(globalThis, '__PROD__', {
  value: false,
  writable: true
});

Object.defineProperty(globalThis, '__COLOR_PLUGIN_OPTIONS__', {
  value: {},
  writable: true
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useAppStore } from '/@/store/modules/app';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum } from '/@/enums/menuEnum';

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(),
}));

// Mock useFullContent to test different scenarios
vi.mock('/@/hooks/web/useFullContent', () => ({
  useFullContent: vi.fn(() => ({ value: false })),
}));

describe('hooks/setting/useMenuSetting', () => {
  let mockAppStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAppStore = {
      getMenuSetting: {
        bgColor: '#001529',
        fixed: true,
        collapsed: false,
        canDrag: false,
        show: true,
        hidden: false,
        split: false,
        menuWidth: 210,
        mode: MenuModeEnum.INLINE,
        type: MenuTypeEnum.SIDEBAR,
        theme: 'dark',
        topMenuAlign: 'center',
        trigger: 'HEADER',
        accordion: true,
        closeMixSidebarOnChange: false,
        collapsedShowTitle: false,
        mixSideTrigger: 'click',
        mixSideFixed: false,
      },
      setProjectConfig: vi.fn(),
    };
    (useAppStore as any).mockReturnValue(mockAppStore);
  });

  it('should return all computed properties', () => {
    const result = useMenuSetting();

    expect(result.getMenuBgColor).toBeDefined();
    expect(result.getMenuFixed).toBeDefined();
    expect(result.getCollapsed).toBeDefined();
    expect(result.getCanDrag).toBeDefined();
    expect(result.getShowMenu).toBeDefined();
    expect(result.getMenuHidden).toBeDefined();
    expect(result.getSplit).toBeDefined();
    expect(result.getMenuWidth).toBeDefined();
    expect(result.getMenuMode).toBeDefined();
    expect(result.getMenuType).toBeDefined();
    expect(result.getMenuTheme).toBeDefined();
    expect(result.getTopMenuAlign).toBeDefined();
    expect(result.getTrigger).toBeDefined();
    expect(result.getAccordion).toBeDefined();
    expect(result.getCloseMixSidebarOnChange).toBeDefined();
    expect(result.getCollapsedShowTitle).toBeDefined();
    expect(result.getMixSideTrigger).toBeDefined();
    expect(result.getMixSideFixed).toBeDefined();
    expect(result.setMenuSetting).toBeDefined();
    expect(result.toggleCollapsed).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useMenuSetting();

    expect(result.getMenuBgColor.value).toBe('#001529');
    expect(result.getMenuFixed.value).toBe(true);
    expect(result.getCollapsed.value).toBe(false);
    expect(result.getCanDrag.value).toBe(false);
    expect(result.getShowMenu.value).toBe(true);
    expect(result.getMenuHidden.value).toBe(false);
    expect(result.getSplit.value).toBe(false);
    expect(result.getMenuWidth.value).toBe(210);
    expect(result.getMenuMode.value).toBe(MenuModeEnum.INLINE);
    expect(result.getMenuType.value).toBe(MenuTypeEnum.SIDEBAR);
    expect(result.getMenuTheme.value).toBe('dark');
    expect(result.getTopMenuAlign.value).toBe('center');
    expect(result.getTrigger.value).toBe('HEADER');
    expect(result.getAccordion.value).toBe(true);
    expect(result.getCloseMixSidebarOnChange.value).toBe(false);
    expect(result.getCollapsedShowTitle.value).toBe(false);
    expect(result.getMixSideTrigger.value).toBe('click');
    expect(result.getMixSideFixed.value).toBe(false);
  });

  it('should call setProjectConfig when setMenuSetting is called', () => {
    const result = useMenuSetting();
    const menuSetting = { bgColor: '#ffffff', fixed: false };
    result.setMenuSetting(menuSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ menuSetting });
  });

  // 增加测试用例以提高覆盖率
  it('should call setProjectConfig when toggleCollapsed is called', () => {
    const result = useMenuSetting();
    result.toggleCollapsed();
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({
      menuSetting: { collapsed: true }
    });
  });

  it('should handle different menu types', () => {
    // Test SIDEBAR type
    mockAppStore.getMenuSetting.type = MenuTypeEnum.SIDEBAR;
    const result1 = useMenuSetting();
    expect(result1.getIsSidebarType.value).toBe(true);
    expect(result1.getIsTopMenu.value).toBe(false);

    // Test TOP_MENU type
    mockAppStore.getMenuSetting.type = MenuTypeEnum.TOP_MENU;
    const result2 = useMenuSetting();
    expect(result2.getIsSidebarType.value).toBe(false);
    expect(result2.getIsTopMenu.value).toBe(true);
  });

  it('should handle different menu modes', () => {
    // Test INLINE mode
    mockAppStore.getMenuSetting.mode = MenuModeEnum.INLINE;
    const result1 = useMenuSetting();
    expect(result1.getIsHorizontal.value).toBe(false);

    // Test HORIZONTAL mode
    mockAppStore.getMenuSetting.mode = MenuModeEnum.HORIZONTAL;
    const result2 = useMenuSetting();
    expect(result2.getIsHorizontal.value).toBe(true);
  });

  it('should handle collapsed state correctly', () => {
    // Test when collapsed is false
    mockAppStore.getMenuSetting.collapsed = false;
    const result1 = useMenuSetting();
    expect(result1.getCollapsed.value).toBe(false);

    // Test when collapsed is true
    mockAppStore.getMenuSetting.collapsed = true;
    const result2 = useMenuSetting();
    expect(result2.getCollapsed.value).toBe(true);
  });

  it('should handle trigger types', () => {
    // Test HEADER trigger
    mockAppStore.getMenuSetting.trigger = TriggerEnum.HEADER;
    const result1 = useMenuSetting();
    expect(result1.getTrigger.value).toBe('HEADER');

    // Test FOOTER trigger
    mockAppStore.getMenuSetting.trigger = TriggerEnum.FOOTER;
    const result2 = useMenuSetting();
    expect(result2.getTrigger.value).toBe('FOOTER');
  });

  // 增加更多测试用例以提高覆盖率
  it('should handle MIX_SIDEBAR type', () => {
    mockAppStore.getMenuSetting.type = MenuTypeEnum.MIX_SIDEBAR;
    const result = useMenuSetting();
    expect(result.getIsMixSidebar.value).toBe(true);
  });

  it('should handle MIX type with INLINE mode', () => {
    mockAppStore.getMenuSetting.type = MenuTypeEnum.MIX;
    mockAppStore.getMenuSetting.mode = MenuModeEnum.INLINE;
    const result = useMenuSetting();
    expect(result.getIsMixMode.value).toBe(true);
  });

  it('should handle split menu', () => {
    mockAppStore.getMenuSetting.split = true;
    const result = useMenuSetting();
    expect(result.getSplit.value).toBe(true);
  });

  it('should handle menu hidden', () => {
    mockAppStore.getMenuSetting.hidden = true;
    const result = useMenuSetting();
    expect(result.getMenuHidden.value).toBe(true);
  });

  it('should handle show top menu', () => {
    // Test HORIZONTAL mode
    mockAppStore.getMenuSetting.mode = MenuModeEnum.HORIZONTAL;
    const result1 = useMenuSetting();
    expect(result1.getShowTopMenu.value).toBe(true);

    // Test split menu
    mockAppStore.getMenuSetting.mode = MenuModeEnum.INLINE;
    mockAppStore.getMenuSetting.split = true;
    const result2 = useMenuSetting();
    expect(result2.getShowTopMenu.value).toBe(true);
  });

  it('should handle collapsed show title', () => {
    mockAppStore.getMenuSetting.collapsedShowTitle = true;
    const result = useMenuSetting();
    expect(result.getCollapsedShowTitle.value).toBe(true);
  });

  it('should handle mix side trigger', () => {
    mockAppStore.getMenuSetting.mixSideTrigger = 'hover';
    const result = useMenuSetting();
    expect(result.getMixSideTrigger.value).toBe('hover');
  });

  it('should handle mix side fixed', () => {
    mockAppStore.getMenuSetting.mixSideFixed = true;
    const result = useMenuSetting();
    expect(result.getMixSideFixed.value).toBe(true);
  });

  it('should handle toggleCollapsed with different initial states', () => {
    // Test when collapsed is true initially
    mockAppStore.getMenuSetting.collapsed = true;
    const result = useMenuSetting();
    result.toggleCollapsed();
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({
      menuSetting: { collapsed: false }
    });
  });
});