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
    expect(result.getHeaderFixed).toBeDefined();
    expect(result.getHeaderShow).toBeDefined();
    expect(result.getHeaderHidden).toBeDefined();
    expect(result.getHeaderShowFullScreen).toBeDefined();
    expect(result.getHeaderShowDoc).toBeDefined();
    expect(result.getHeaderShowBreadCrumb).toBeDefined();
    expect(result.getHeaderShowBreadCrumbIcon).toBeDefined();
    expect(result.getHeaderShowCollapseButton).toBeDefined();
    expect(result.getHeaderShowNotice).toBeDefined();
    expect(result.getHeaderShowSearch).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useHeaderSetting();

    expect(result.getHeaderBgColor.value).toBe('#ffffff');
    expect(result.getHeaderFixed.value).toBe(true);
    expect(result.getHeaderShow.value).toBe(true);
    expect(result.getHeaderHidden.value).toBe(false);
    expect(result.getHeaderShowFullScreen.value).toBe(true);
    expect(result.getHeaderShowDoc.value).toBe(true);
    expect(result.getHeaderShowBreadCrumb.value).toBe(true);
    expect(result.getHeaderShowBreadCrumbIcon.value).toBe(true);
    expect(result.getHeaderShowCollapseButton.value).toBe(true);
    expect(result.getHeaderShowNotice.value).toBe(true);
    expect(result.getHeaderShowSearch.value).toBe(true);
  });

  it('should call setProjectConfig when setHeaderSetting is called', () => {
    const result = useHeaderSetting();
    const headerSetting: Partial<HeaderSetting> = { bgColor: '#000000', fixed: false };
    result.setHeaderSetting(headerSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ headerSetting });
  });
});
