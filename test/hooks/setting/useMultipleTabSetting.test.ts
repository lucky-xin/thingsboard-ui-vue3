import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
import { useAppStore } from '/@/store/modules/app';

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(),
}));

describe('hooks/setting/useMultipleTabSetting', () => {
  let mockAppStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAppStore = {
      getMultiTabsSetting: {
        show: true,
        style: 'chrome',
        showQuick: true,
        showRedo: true,
        showFold: true,
      },
      setProjectConfig: vi.fn(),
    };
    (useAppStore as any).mockReturnValue(mockAppStore);
  });

  it('should return all computed properties', () => {
    const result = useMultipleTabSetting();

    expect(result.getShowMultipleTab).toBeDefined();
    expect(result.getTabsStyle).toBeDefined();
    expect(result.getShowQuick).toBeDefined();
    expect(result.getShowRedo).toBeDefined();
    expect(result.getShowFold).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useMultipleTabSetting();

    expect(result.getShowMultipleTab.value).toBe(true);
    expect(result.getTabsStyle.value).toBe('chrome');
    expect(result.getShowQuick.value).toBe(true);
    expect(result.getShowRedo.value).toBe(true);
    expect(result.getShowFold.value).toBe(true);
  });

  it('should call setProjectConfig when setMultipleTabSetting is called', () => {
    const result = useMultipleTabSetting();
    const multiTabsSetting = { show: false, style: 'firefox' };
    result.setMultipleTabSetting(multiTabsSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ multiTabsSetting });
  });
});
