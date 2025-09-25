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
    expect(result.getMenuCollapsed).toBeDefined();
    expect(result.getMenuCanDrag).toBeDefined();
    expect(result.getMenuShow).toBeDefined();
    expect(result.getMenuHidden).toBeDefined();
    expect(result.getMenuSplit).toBeDefined();
    expect(result.getMenuWidth).toBeDefined();
    expect(result.getMenuMode).toBeDefined();
    expect(result.getMenuType).toBeDefined();
    expect(result.getMenuTheme).toBeDefined();
    expect(result.getMenuTopAlign).toBeDefined();
    expect(result.getMenuTrigger).toBeDefined();
    expect(result.getMenuAccordion).toBeDefined();
    expect(result.getMenuCloseMixSidebarOnChange).toBeDefined();
    expect(result.getMenuCollapsedShowTitle).toBeDefined();
    expect(result.getMenuMixSideTrigger).toBeDefined();
    expect(result.getMenuMixSideFixed).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useMenuSetting();

    expect(result.getMenuBgColor.value).toBe('#001529');
    expect(result.getMenuFixed.value).toBe(true);
    expect(result.getMenuCollapsed.value).toBe(false);
    expect(result.getMenuCanDrag.value).toBe(false);
    expect(result.getMenuShow.value).toBe(true);
    expect(result.getMenuHidden.value).toBe(false);
    expect(result.getMenuSplit.value).toBe(false);
    expect(result.getMenuWidth.value).toBe(210);
    expect(result.getMenuMode.value).toBe(MenuModeEnum.INLINE);
    expect(result.getMenuType.value).toBe(MenuTypeEnum.SIDEBAR);
    expect(result.getMenuTheme.value).toBe('dark');
    expect(result.getMenuTopAlign.value).toBe('center');
    expect(result.getMenuTrigger.value).toBe('HEADER');
    expect(result.getMenuAccordion.value).toBe(true);
    expect(result.getMenuCloseMixSidebarOnChange.value).toBe(false);
    expect(result.getMenuCollapsedShowTitle.value).toBe(false);
    expect(result.getMenuMixSideTrigger.value).toBe('click');
    expect(result.getMenuMixSideFixed.value).toBe(false);
  });

  it('should call setProjectConfig when setMenuSetting is called', () => {
    const result = useMenuSetting();
    const menuSetting = { bgColor: '#ffffff', fixed: false };
    result.setMenuSetting(menuSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ menuSetting });
  });
});
