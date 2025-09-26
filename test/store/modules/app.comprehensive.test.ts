import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore, useAppStoreWithOut } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY, PROJ_CFG_KEY } from '/@/enums/cacheEnum';

// Mock dependencies
vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    getLocal: vi.fn(() => null),
    setLocal: vi.fn(),
    clearAll: vi.fn(),
  },
}));

vi.mock('/@/settings/designSetting', () => ({
  darkMode: 'light',
}));

vi.mock('/@/router', () => ({
  resetRouter: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

vi.mock('/@/store', () => ({
  store: 'mockStore',
}));

describe('store/modules/app', () => {
  let store: ReturnType<typeof useAppStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    
    // Clear localStorage
    localStorage.clear();
    
    store = useAppStore();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(store.darkMode).toBeUndefined();
      expect(store.pageLoading).toBe(false);
      expect(store.projectConfig).toBeNull();
      expect(store.beforeMiniInfo).toEqual({});
    });

    it('should initialize with cached project config', async () => {
      const { Persistent } = await import('/@/utils/cache/persistent');
      const mockConfig = { theme: 'dark' };
      vi.mocked(Persistent.getLocal).mockReturnValue(mockConfig);
      
      const newStore = useAppStore();
      
      expect(Persistent.getLocal).toHaveBeenCalledWith(PROJ_CFG_KEY);
    });
  });

  describe('Getters', () => {
    it('should return page loading state', () => {
      store.pageLoading = true;
      expect(store.getPageLoading).toBe(true);
      
      store.pageLoading = false;
      expect(store.getPageLoading).toBe(false);
    });

    it('should return dark mode from state', () => {
      store.darkMode = ThemeEnum.DARK;
      expect(store.getDarkMode).toBe(ThemeEnum.DARK);
    });

    it('should return dark mode from localStorage when state is undefined', () => {
      localStorage.setItem(APP_DARK_MODE_KEY, ThemeEnum.DARK);
      store.darkMode = undefined;
      
      expect(store.getDarkMode).toBe(ThemeEnum.DARK);
    });

    it('should return default dark mode when neither state nor localStorage', () => {
      store.darkMode = undefined;
      localStorage.removeItem(APP_DARK_MODE_KEY);
      
      expect(store.getDarkMode).toBe('light'); // from designSetting mock
    });

    it('should return before mini info', () => {
      const miniInfo = { collapsed: true };
      store.beforeMiniInfo = miniInfo;
      
      expect(store.getBeforeMiniInfo).toEqual(miniInfo);
    });

    it('should return project config', () => {
      const config = { theme: 'dark' } as any;
      store.projectConfig = config;
      
      expect(store.getProjectConfig).toBe(config);
    });

    it('should return empty object when project config is null', () => {
      store.projectConfig = null;
      
      expect(store.getProjectConfig).toEqual({});
    });

    it('should return header setting from project config', () => {
      const headerSetting = { show: true };
      store.projectConfig = { headerSetting } as any;
      
      expect(store.getHeaderSetting).toBe(headerSetting);
    });

    it('should return menu setting from project config', () => {
      const menuSetting = { collapsed: false };
      store.projectConfig = { menuSetting } as any;
      
      expect(store.getMenuSetting).toBe(menuSetting);
    });

    it('should return transition setting from project config', () => {
      const transitionSetting = { enable: true };
      store.projectConfig = { transitionSetting } as any;
      
      expect(store.getTransitionSetting).toBe(transitionSetting);
    });

    it('should return multi tabs setting from project config', () => {
      const multiTabsSetting = { show: true };
      store.projectConfig = { multiTabsSetting } as any;
      
      expect(store.getMultiTabsSetting).toBe(multiTabsSetting);
    });
  });

  describe('Actions', () => {
    describe('setPageLoading', () => {
      it('should set page loading state', () => {
        store.setPageLoading(true);
        expect(store.pageLoading).toBe(true);
        
        store.setPageLoading(false);
        expect(store.pageLoading).toBe(false);
      });
    });

    describe('setDarkMode', () => {
      it('should set dark mode and save to localStorage', () => {
        store.setDarkMode(ThemeEnum.DARK);
        
        expect(store.darkMode).toBe(ThemeEnum.DARK);
        expect(localStorage.getItem(APP_DARK_MODE_KEY)).toBe(ThemeEnum.DARK);
      });

      it('should set light mode and save to localStorage', () => {
        store.setDarkMode(ThemeEnum.LIGHT);
        
        expect(store.darkMode).toBe(ThemeEnum.LIGHT);
        expect(localStorage.getItem(APP_DARK_MODE_KEY)).toBe(ThemeEnum.LIGHT);
      });
    });

    describe('setBeforeMiniInfo', () => {
      it('should set before mini info', () => {
        const miniInfo = { collapsed: true, width: 200 };
        
        store.setBeforeMiniInfo(miniInfo);
        
        expect(store.beforeMiniInfo).toEqual(miniInfo);
      });
    });

    describe('setProjectConfig', () => {
      it('should merge and set project config', async () => {
        const { Persistent } = await import('/@/utils/cache/persistent');
        const { deepMerge } = await import('/@/utils');
        
        const existingConfig = { theme: 'light', setting1: 'value1' };
        const newConfig = { theme: 'dark', setting2: 'value2' };
        const mergedConfig = { theme: 'dark', setting1: 'value1', setting2: 'value2' };
        
        store.projectConfig = existingConfig as any;
        vi.mocked(deepMerge).mockReturnValue(mergedConfig);
        
        store.setProjectConfig(newConfig);
        
        expect(deepMerge).toHaveBeenCalledWith(existingConfig, newConfig);
        expect(store.projectConfig).toEqual(mergedConfig);
        expect(Persistent.setLocal).toHaveBeenCalledWith(PROJ_CFG_KEY, mergedConfig);
      });

      it('should handle null project config', async () => {
        const { deepMerge } = await import('/@/utils');
        
        const newConfig = { theme: 'dark' };
        store.projectConfig = null;
        
        store.setProjectConfig(newConfig);
        
        expect(deepMerge).toHaveBeenCalledWith({}, newConfig);
      });
    });

    describe('resetAllState', () => {
      it('should reset router', async () => {
        const { resetRouter } = await import('/@/router');
        
        await store.resetAllState();
        
        expect(resetRouter).toHaveBeenCalled();
      });
    });

    describe('setPageLoadingAction', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('should set loading with delay when true', async () => {
        const promise = store.setPageLoadingAction(true);
        
        // Initially should not be loading
        expect(store.pageLoading).toBe(false);
        
        // Fast-forward time
        vi.advanceTimersByTime(50);
        
        await promise;
        expect(store.pageLoading).toBe(true);
      });

      it('should set loading immediately when false', async () => {
        store.pageLoading = true;
        
        await store.setPageLoadingAction(false);
        
        expect(store.pageLoading).toBe(false);
      });

      it('should clear existing timeout when setting loading true multiple times', async () => {
        const spy = vi.spyOn(global, 'clearTimeout');
        
        // First call
        store.setPageLoadingAction(true);
        
        // Second call should clear the first timeout
        store.setPageLoadingAction(true);
        
        expect(spy).toHaveBeenCalled();
      });

      it('should clear timeout when setting loading false', async () => {
        const spy = vi.spyOn(global, 'clearTimeout');
        
        // Set loading true first
        store.setPageLoadingAction(true);
        
        // Then set false should clear timeout
        await store.setPageLoadingAction(false);
        
        expect(spy).toHaveBeenCalled();
      });
    });
  });

  describe('useAppStoreWithOut', () => {
    it('should return app store instance', () => {
      const storeInstance = useAppStoreWithOut();
      
      expect(storeInstance).toBeDefined();
      expect(typeof storeInstance.setPageLoading).toBe('function');
      expect(typeof storeInstance.setDarkMode).toBe('function');
    });
  });
});