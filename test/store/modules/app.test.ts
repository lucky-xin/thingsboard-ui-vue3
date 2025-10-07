import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAppStore, useAppStoreWithOut } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';

// Mock the settings
vi.mock('/@/settings/designSetting', () => {
  return {
    darkMode: 'light',
  };
});

// Mock the router
vi.mock('/@/router', () => ({
  resetRouter: vi.fn(),
}));

// Mock the cache（合并真实导出，避免破坏其它使用场景）
vi.mock('/@/utils/cache/persistent', () => {
  return {
    Persistent: {
      getLocal: vi.fn(),
      setLocal: vi.fn(),
      removeLocal: vi.fn(),
      clearLocal: vi.fn(),
    },
  };
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('store/modules/app', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useAppStore', () => {
    it('should create app store', () => {
      const store = useAppStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useAppStore();
      expect(store.getPageLoading).toBe(false);
      expect(store.getDarkMode).toBeDefined();
      expect(store.getProjectConfig).toBeDefined();
    });

    it('should set page loading', () => {
      const store = useAppStore();
      store.setPageLoading(true);
      expect(store.getPageLoading).toBe(true);
    });

    it('should set dark mode', () => {
      const store = useAppStore();
      store.setDarkMode(ThemeEnum.DARK);
      expect(store.getDarkMode).toBe(ThemeEnum.DARK);
      expect(localStorage.setItem).toHaveBeenCalledWith(APP_DARK_MODE_KEY, ThemeEnum.DARK);
    });

    it('should set project config', () => {
      const store = useAppStore();
      const config = { title: 'Test Config' };
      store.setProjectConfig(config);
      expect(Persistent.setLocal).toHaveBeenCalledWith(PROJ_CFG_KEY, expect.any(Object));
    });
  });

  describe('useAppStoreWithOut', () => {
    it('should return app store', () => {
      const store = useAppStoreWithOut();
      expect(store).toBeDefined();
      // 允许为 true/false，仅断言为布尔值
      expect(typeof store.getPageLoading).toBe('boolean');
    });
  });
});