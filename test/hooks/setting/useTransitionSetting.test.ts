import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { useAppStore } from '/@/store/modules/app';

vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(),
}));

describe('hooks/setting/useTransitionSetting', () => {
  let mockAppStore: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAppStore = {
      getTransitionSetting: {
        enable: true,
        openNProgress: true,
        openPageLoading: true,
        basicTransition: 'fade-slide',
      },
      setProjectConfig: vi.fn(),
    };
    (useAppStore as any).mockReturnValue(mockAppStore);
  });

  it('should return all computed properties', () => {
    const result = useTransitionSetting();

    expect(result.getEnableTransition).toBeDefined();
    expect(result.getOpenNProgress).toBeDefined();
    expect(result.getOpenPageLoading).toBeDefined();
    expect(result.getBasicTransition).toBeDefined();
  });

  it('should return computed values from appStore', () => {
    const result = useTransitionSetting();

    expect(result.getEnableTransition.value).toBe(true);
    expect(result.getOpenNProgress.value).toBe(true);
    expect(result.getOpenPageLoading.value).toBe(true);
    expect(result.getBasicTransition.value).toBe('fade-slide');
  });

  it('should return false for getOpenPageLoading when openPageLoading is falsy', () => {
    mockAppStore.getTransitionSetting.openPageLoading = false;
    const result = useTransitionSetting();
    expect(result.getOpenPageLoading.value).toBe(false);
  });

  it('should return false for getOpenPageLoading when openPageLoading is undefined', () => {
    mockAppStore.getTransitionSetting.openPageLoading = undefined;
    const result = useTransitionSetting();
    expect(result.getOpenPageLoading.value).toBe(false);
  });

  it('should call setProjectConfig when setTransitionSetting is called', () => {
    const result = useTransitionSetting();
    const transitionSetting = { enable: false, openNProgress: false };
    result.setTransitionSetting(transitionSetting);
    expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({ transitionSetting });
  });
});
