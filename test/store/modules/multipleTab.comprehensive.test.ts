import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';
import { PageEnum } from '/@/enums/pageEnum';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';

// Mock dependencies
vi.mock('/@/hooks/web/usePage', () => ({
  useGo: vi.fn(() => vi.fn()),
  useRedo: vi.fn(() => vi.fn()),
}));

vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    getLocal: vi.fn(() => []),
    setLocal: vi.fn(),
  },
}));

vi.mock('/@/utils', () => ({
  getRawRoute: vi.fn((route) => route),
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    multiTabsSetting: {
      cache: true,
    },
  },
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: vi.fn(() => ({
    getUserInfo: {
      homePath: PageEnum.BASE_HOME,
    },
  })),
}));

vi.mock('/@/router/routes/basic', () => ({
  PAGE_NOT_FOUND_ROUTE: { name: 'PageNotFound' },
  REDIRECT_ROUTE: { name: 'Redirect' },
}));

describe('store/modules/multipleTab', () => {
  let store: ReturnType<typeof useMultipleTabStore>;
  let mockRouter: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    
    store = useMultipleTabStore();
    
    mockRouter = {
      currentRoute: {
        value: {
          path: '/dashboard',
          fullPath: '/dashboard',
          name: 'Dashboard',
          params: {},
          query: {},
          meta: {},
        },
      },
      replace: vi.fn(),
    };
  });

  describe('Initial state', () => {
    it('should have correct initial state', () => {
      expect(store.cacheTabList).toBeInstanceOf(Set);
      expect(store.tabList).toEqual([]);
      expect(store.lastDragEndIndex).toBe(0);
    });
  });

  describe('Getters', () => {
    it('should return tabList', () => {
      const mockTabs = [{ path: '/test', name: 'Test' }] as any;
      store.tabList = mockTabs;
      
      expect(store.getTabList).toEqual(mockTabs);
    });

    it('should return cached tab list as array', () => {
      store.cacheTabList.add('Tab1');
      store.cacheTabList.add('Tab2');
      
      expect(store.getCachedTabList).toEqual(['Tab1', 'Tab2']);
    });

    it('should return last drag end index', () => {
      store.lastDragEndIndex = 5;
      
      expect(store.getLastDragEndIndex).toBe(5);
    });
  });

  describe('Actions', () => {
    describe('updateCacheTab', () => {
      it('should update cache tabs based on tabList', async () => {
        store.tabList = [
          { name: 'Tab1', meta: {} },
          { name: 'Tab2', meta: { ignoreKeepAlive: true } },
          { name: 'Tab3', meta: {} },
        ] as any;

        await store.updateCacheTab();

        expect(store.cacheTabList.has('Tab1')).toBe(true);
        expect(store.cacheTabList.has('Tab2')).toBe(false); // ignored
        expect(store.cacheTabList.has('Tab3')).toBe(true);
      });

      it('should handle tabs without meta', async () => {
        store.tabList = [
          { name: 'Tab1' },
        ] as any;

        await store.updateCacheTab();

        expect(store.cacheTabList.has('Tab1')).toBe(true);
      });
    });

    describe('refreshPage', () => {
      it('should refresh current page', async () => {
        const { useRedo } = await import('/@/hooks/web/usePage');
        const mockRedo = vi.fn();
        vi.mocked(useRedo).mockReturnValue(mockRedo);
        
        store.cacheTabList.add('Dashboard');
        mockRouter.currentRoute.value.name = 'Dashboard';

        await store.refreshPage(mockRouter);

        expect(store.cacheTabList.has('Dashboard')).toBe(false);
        expect(mockRedo).toHaveBeenCalled();
      });

      it('should handle page not in cache', async () => {
        const { useRedo } = await import('/@/hooks/web/usePage');
        const mockRedo = vi.fn();
        vi.mocked(useRedo).mockReturnValue(mockRedo);
        
        mockRouter.currentRoute.value.name = 'NotCached';

        await store.refreshPage(mockRouter);

        expect(mockRedo).toHaveBeenCalled();
      });
    });

    describe('clearCacheTabs', () => {
      it('should clear all cached tabs', () => {
        store.cacheTabList.add('Tab1');
        store.cacheTabList.add('Tab2');
        
        store.clearCacheTabs();
        
        expect(store.cacheTabList.size).toBe(0);
      });
    });

    describe('resetState', () => {
      it('should reset tabList and cache', () => {
        store.tabList = [{ path: '/test' }] as any;
        store.cacheTabList.add('Test');
        
        store.resetState();
        
        expect(store.tabList).toEqual([]);
        expect(store.cacheTabList.size).toBe(0);
      });
    });

    describe('goToPage', () => {
      it('should go to last tab when tabList is not empty', () => {
        const { useGo } = vi.mocked(await import('/@/hooks/web/usePage'));
        const mockGo = vi.fn();
        vi.mocked(useGo).mockReturnValue(mockGo);
        
        store.tabList = [
          { path: '/tab1' },
          { fullPath: '/tab2?id=1' },
        ] as any;
        
        mockRouter.currentRoute.value.path = '/different';
        
        store.goToPage(mockRouter);
        
        expect(mockGo).toHaveBeenCalledWith('/tab2?id=1', true);
      });

      it('should go to home when tabList is empty', () => {
        const { useGo } = vi.mocked(await import('/@/hooks/web/usePage'));
        const mockGo = vi.fn();
        vi.mocked(useGo).mockReturnValue(mockGo);
        
        store.tabList = [];
        mockRouter.currentRoute.value.path = '/different';
        
        store.goToPage(mockRouter);
        
        expect(mockGo).toHaveBeenCalledWith(PageEnum.BASE_HOME, true);
      });

      it('should not navigate if already on target page', () => {
        const { useGo } = vi.mocked(await import('/@/hooks/web/usePage'));
        const mockGo = vi.fn();
        vi.mocked(useGo).mockReturnValue(mockGo);
        
        store.tabList = [{ path: '/current' }] as any;
        mockRouter.currentRoute.value.path = '/current';
        
        store.goToPage(mockRouter);
        
        expect(mockGo).not.toHaveBeenCalled();
      });
    });

    describe('addTab', () => {
      it('should add new tab', async () => {
        const { Persistent } = await import('/@/utils/cache/persistent');
        
        const newRoute = {
          path: '/new-tab',
          name: 'NewTab',
          fullPath: '/new-tab',
          params: {},
          query: {},
        } as any;

        await store.addTab(newRoute);

        expect(store.tabList).toContain(newRoute);
        expect(Persistent.setLocal).toHaveBeenCalledWith(MULTIPLE_TABS_KEY, store.tabList);
      });

      it('should not add excluded pages', async () => {
        const routes = [
          { path: PageEnum.ERROR_PAGE, name: 'Error' },
          { path: PageEnum.BASE_LOGIN, name: 'Login' },
          { path: '/test', name: 'PageNotFound' },
          { path: '/test', name: 'Redirect' },
          { path: '/test' }, // no name
        ] as any;

        for (const route of routes) {
          await store.addTab(route);
        }

        expect(store.tabList).toEqual([]);
      });

      it('should update existing tab', async () => {
        const existingTab = {
          path: '/existing',
          fullPath: '/existing',
          name: 'Existing',
          params: { id: '1' },
          query: { tab: 'info' },
        } as any;
        
        store.tabList = [existingTab];
        
        const updatedRoute = {
          path: '/existing',
          fullPath: '/existing',
          name: 'Existing',
          params: { id: '2' },
          query: { tab: 'settings' },
        } as any;

        await store.addTab(updatedRoute);

        expect(store.tabList).toHaveLength(1);
        expect(store.tabList[0].params).toEqual({ id: '2' });
        expect(store.tabList[0].query).toEqual({ tab: 'settings' });
      });
    });

    describe('closeTab', () => {
      beforeEach(() => {
        store.tabList = [
          { path: '/tab1', fullPath: '/tab1', name: 'Tab1', params: {}, query: {} },
          { path: '/tab2', fullPath: '/tab2', name: 'Tab2', params: {}, query: {} },
          { path: '/tab3', fullPath: '/tab3', name: 'Tab3', params: {}, query: {} },
        ] as any;
      });

      it('should close non-current tab', async () => {
        mockRouter.currentRoute.value = {
          path: '/tab1',
          fullPath: '/tab1',
        };
        
        const tabToClose = store.tabList[1]; // tab2
        
        await store.closeTab(tabToClose, mockRouter);
        
        expect(store.tabList).toHaveLength(2);
        expect(store.tabList.find(t => t.path === '/tab2')).toBeUndefined();
        expect(mockRouter.replace).not.toHaveBeenCalled();
      });

      it('should close current tab and navigate to next', async () => {
        mockRouter.currentRoute.value = {
          path: '/tab1',
          fullPath: '/tab1',
        };
        
        const tabToClose = store.tabList[0]; // tab1
        
        await store.closeTab(tabToClose, mockRouter);
        
        expect(store.tabList.find(t => t.path === '/tab1')).toBeUndefined();
        expect(mockRouter.replace).toHaveBeenCalledWith({
          params: {},
          path: '/tab2',
          query: {},
        });
      });

      it('should close current tab and navigate to previous', async () => {
        mockRouter.currentRoute.value = {
          path: '/tab2',
          fullPath: '/tab2',
        };
        
        const tabToClose = store.tabList[1]; // tab2
        
        await store.closeTab(tabToClose, mockRouter);
        
        expect(mockRouter.replace).toHaveBeenCalledWith({
          params: {},
          path: '/tab1',
          query: {},
        });
      });

      it('should navigate to home when closing last tab', async () => {
        store.tabList = [{ path: '/only-tab', fullPath: '/only-tab', params: {}, query: {} }] as any;
        
        mockRouter.currentRoute.value = {
          path: '/only-tab',
          fullPath: '/only-tab',
        };
        
        await store.closeTab(store.tabList[0], mockRouter);
        
        expect(mockRouter.replace).toHaveBeenCalledWith(PageEnum.BASE_HOME);
      });

      it('should not close affix tab', async () => {
        const affixTab = {
          path: '/affix',
          fullPath: '/affix',
          meta: { affix: true },
        } as any;
        
        store.tabList = [affixTab];
        
        await store.closeTab(affixTab, mockRouter);
        
        expect(store.tabList).toContain(affixTab);
        expect(mockRouter.replace).not.toHaveBeenCalled();
      });
    });
  });
});