import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useAppStore } from '/@/store/modules/app';
import { MenuTypeEnum, MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(),
}));

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
});
