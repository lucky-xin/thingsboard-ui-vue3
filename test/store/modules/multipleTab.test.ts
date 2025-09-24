import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMultipleTabStore, useMultipleTabWithOutStore } from '/@/store/modules/multipleTab';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';

// Remove the store mock to use the actual Pinia instance from setup

// Mock the page hook
vi.mock('/@/hooks/web/usePage', () => ({
  useGo: () => vi.fn(),
  useRedo: () => vi.fn(),
}));

// Mock the cache
vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    getLocal: vi.fn(),
    setLocal: vi.fn(),
  },
}));

// Mock the page enum
vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: {
    BASE_HOME: '/dashboard',
    ERROR_PAGE: '/error',
    BASE_LOGIN: '/login',
  },
}));

// Mock the route constants
vi.mock('/@/router/routes/basic', () => ({
  PAGE_NOT_FOUND_ROUTE: { name: 'PageNotFound' },
  REDIRECT_ROUTE: { name: 'Redirect' },
}));

// Mock the utils（合并真实导出）
vi.mock('/@/utils', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    getRawRoute: (route: any) => route,
  };
});

// Mock project settings
vi.mock('/@/settings/projectSetting', () => ({
  default: {
    multiTabsSetting: {
      cache: false,
    },
  },
}));

// Mock the user store
vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({
    getUserInfo: {
      homePath: '/dashboard',
    },
  }),
}));

describe('store/modules/multipleTab', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store state between tests
    const store = useMultipleTabStore();
    store.$reset();
  });

  describe('useMultipleTabStore', () => {
    it('should create multiple tab store', () => {
      const store = useMultipleTabStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = useMultipleTabStore();
      expect(store.getTabList).toEqual([]);
      expect(store.getCachedTabList).toEqual([]);
      expect(store.getLastDragEndIndex).toBe(0);
    });

    it('should update cache tab', async () => {
      const store = useMultipleTabStore();
      store.tabList = [
        { name: 'test1', meta: { ignoreKeepAlive: false } },
        { name: 'test2', meta: { ignoreKeepAlive: true } },
      ];

      await store.updateCacheTab();

      expect(store.getCachedTabList).toEqual(['test1']);
    });

    it('should clear cache tabs', () => {
      const store = useMultipleTabStore();
      store.cacheTabList.add('test1');
      store.cacheTabList.add('test2');

      store.clearCacheTabs();

      expect(store.getCachedTabList).toEqual([]);
    });

    it('should reset state', () => {
      const store = useMultipleTabStore();
      store.tabList = [{ name: 'test1' }];
      store.cacheTabList.add('test1');

      store.resetState();

      expect(store.getTabList).toEqual([]);
      expect(store.getCachedTabList).toEqual([]);
    });

    it('should add tab', async () => {
      const store = useMultipleTabStore();
      const route = { name: 'test', path: '/test' };

      await store.addTab(route);

      expect(store.getTabList).toContainEqual(route);
    });

    it('should not add tab for ignored routes', async () => {
      const store = useMultipleTabStore();
      const route = { name: 'Redirect', path: '/redirect' };

      await store.addTab(route);

      expect(store.getTabList).toEqual([]);
    });

    it('should close tab', async () => {
      const store = useMultipleTabStore();
      const route1 = { name: 'test1', path: '/test1' };
      const route2 = { name: 'test2', path: '/test2' };

      store.tabList = [route1, route2];

      // Mock router
      const router = {
        currentRoute: { value: route1 },
        replace: vi.fn(),
      } as any;

      await store.closeTab(route2, router);

      expect(store.getTabList).toEqual([route1]);
    });

    it('should sort tabs', async () => {
      const store = useMultipleTabStore();
      const route1 = { name: 'test1', path: '/test1' };
      const route2 = { name: 'test2', path: '/test2' };
      const route3 = { name: 'test3', path: '/test3' };

      store.tabList = [route1, route2, route3];

      await store.sortTabs(0, 2);

      expect(store.getTabList).toEqual([route2, route3, route1]);
      expect(store.getLastDragEndIndex).toBe(1);
    });

    it('should close all tabs', async () => {
      const store = useMultipleTabStore();
      const route1 = { name: 'test1', path: '/test1', meta: { affix: true } };
      const route2 = { name: 'test2', path: '/test2' };

      store.tabList = [route1, route2];

      // Mock router
      const router = {
        currentRoute: { value: route1 },
        replace: vi.fn(),
      } as any;

      await store.closeAllTab(router);

      // Only affix tabs should remain
      expect(store.getTabList).toEqual([route1]);
    });
  });

  describe('useMultipleTabWithOutStore', () => {
    it('should return multiple tab store', () => {
      const store = useMultipleTabWithOutStore();
      expect(store).toBeDefined();
    });
  });
});
