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
  });

  it('should call setProjectConfig when setHeaderSetting is called', () => {
    const result = useHeaderSetting();
    const headerSetting: Partial<HeaderSetting> = { bgColor: '#000000', fixed: false };
    result.setHeaderSetting(headerSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ headerSetting });
  });
});
