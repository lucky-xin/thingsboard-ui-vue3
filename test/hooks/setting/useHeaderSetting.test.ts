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

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useAppStore } from '/@/store/modules/app';
import { HeaderSetting } from '/#/config';

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('/@/hooks/web/useFullContent', () => ({
  useFullContent: vi.fn(() => ({ value: false })),
}));

vi.mock('/@/hooks/setting/useMenuSetting', () => ({
  useMenuSetting: vi.fn(() => ({
    getMenuMode: { value: 'inline' },
    getSplit: { value: false },
    getShowHeaderTrigger: { value: false },
    getIsSidebarType: { value: true },
    getIsMixSidebar: { value: false },
    getIsTopMenu: { value: false },
  })),
}));

vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: vi.fn(() => ({
    getShowBreadCrumb: { value: true },
    getShowLogo: { value: true },
  })),
}));

describe('hooks/setting/useHeaderSetting', () => {
  let mockAppStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAppStore = {
      getHeaderSetting: {
        bgColor: '#ffffff',
        fixed: true,
        show: true,
        hidden: false,
        showFullScreen: true,
        showDoc: true,
        showBreadCrumb: true,
        showBreadCrumbIcon: true,
        showCollapseButton: true,
        showNotice: true,
        showSearch: true,
        theme: 'light',
        useLockPage: true,
      },
      setProjectConfig: vi.fn(),
    };
    (useAppStore as any).mockReturnValue(mockAppStore);
  });

  it('should return all computed properties', () => {
    const result = useHeaderSetting();

    expect(result.getHeaderBgColor).toBeDefined();
    expect(result.getFixed).toBeDefined();
    expect(result.getShowHeader).toBeDefined();
    expect(result.getShowFullScreen).toBeDefined();
    expect(result.getShowDoc).toBeDefined();
    expect(result.getShowSearch).toBeDefined();
    expect(result.getShowNotice).toBeDefined();
    expect(result.getShowBread).toBeDefined();
    expect(result.getShowContent).toBeDefined();
    expect(result.getShowHeaderLogo).toBeDefined();
    expect(result.setHeaderSetting).toBeDefined();

    // Additional properties
    expect(result.getShowFullHeaderRef).toBeDefined();
    expect(result.getUnFixedAndFull).toBeDefined();
    expect(result.getShowInsetHeaderRef).toBeDefined();
    expect(result.getShowMixHeaderRef).toBeDefined();
    expect(result.getHeaderTheme).toBeDefined();
    expect(result.getUseLockPage).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useHeaderSetting();

    expect(result.getHeaderBgColor.value).toBe('#ffffff');
    expect(result.getFixed.value).toBe(true);
    expect(result.getShowHeader.value).toBe(true);
    expect(result.getShowFullScreen.value).toBe(true);
    expect(result.getShowDoc.value).toBe(true);
    expect(result.getShowSearch.value).toBe(true);
    expect(result.getShowNotice.value).toBe(true);
    expect(result.getHeaderTheme.value).toBe('light');
    expect(result.getUseLockPage.value).toBe(true);
  });

  it('should call setProjectConfig when setHeaderSetting is called', () => {
    const result = useHeaderSetting();
    const headerSetting: Partial<HeaderSetting> = { bgColor: '#000000', fixed: false };
    result.setHeaderSetting(headerSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ headerSetting });
  });

  // 增加测试用例以提高覆盖率
  it('should handle different header settings', () => {
    // Test when header is not shown
    mockAppStore.getHeaderSetting.show = false;
    const result1 = useHeaderSetting();
    expect(result1.getShowHeader.value).toBe(false);

    // Test when header is fixed
    mockAppStore.getHeaderSetting.show = true;
    mockAppStore.getHeaderSetting.fixed = false;
    const result2 = useHeaderSetting();
    expect(result2.getFixed.value).toBe(false);

    // Test header theme
    mockAppStore.getHeaderSetting.theme = 'dark';
    const result3 = useHeaderSetting();
    expect(result3.getHeaderTheme.value).toBe('dark');
  });

  it('should handle useLockPage setting', () => {
    mockAppStore.getHeaderSetting.useLockPage = false;
    const result = useHeaderSetting();
    expect(result.getUseLockPage.value).toBe(false);
  });
});