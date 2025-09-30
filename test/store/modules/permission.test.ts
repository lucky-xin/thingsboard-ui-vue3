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

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePermissionStore, usePermissionStoreWithOut } from '/@/store/modules/permission';
import { createPinia, setActivePinia } from 'pinia';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { Authority } from '/@/enums/authorityEnum';

// Mock the i18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

// Mock the user store
vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({
    getAuthority: 'admin',
    getUserInfo: {
      additionalInfo: {
        homePath: '/dashboard',
      },
    },
    setAuthority: vi.fn(),
  }),
}));

// Mock the app store
vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: () => ({
    getProjectConfig: {
      permissionMode: 'ROUTE_MAPPING',
    },
  }),
}));

// Mock project settings
vi.mock('/@/settings/projectSetting', () => ({
  default: {
    permissionMode: 'ROUTE_MAPPING',
  },
}));

// Mock the route helper functions
vi.mock('/@/router/helper/routeHelper', () => ({
  transformObjToRoute: (routes: any) => routes,
  flatMultiLevelRoutes: (routes: any) => routes,
}));

// Mock the menu helper functions
vi.mock('/@/router/helper/menuHelper', () => ({
  transformRouteToMenu: (routes: any) => routes,
}));

// Mock the tree helper functions
vi.mock('/@/utils/helper/treeHelper', () => ({
  filter: (routes: any, filterFn: any) => routes.filter(filterFn),
}));

// Mock the message hook
vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    createMessage: {
      loading: vi.fn(),
    },
  }),
}));

// Mock the page enum
vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: {
    BASE_HOME: '/dashboard',
  },
}));

// Mock the login API
vi.mock('/@/api/tb/login', () => ({
  userInfoApi: vi.fn().mockResolvedValue({}),
}));

// Mock the async routes
vi.mock('/@/router/routes', () => ({
  asyncRoutes: [],
}));

// Mock the basic routes
vi.mock('/@/router/routes/basic', () => ({
  ERROR_LOG_ROUTE: {},
}));

// Mock the app enum
vi.mock('/@/enums/appEnum', () => ({
  PermissionModeEnum: {
    ROLE: 'ROLE',
    ROUTE_MAPPING: 'ROUTE_MAPPING',
    BACK: 'BACK',
  },
}));

// Mock the store
vi.mock('/@/store', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    store: { 
      // Mock the Pinia instance methods that might be used
      use: vi.fn(),
      _s: new Map(), // Mock the stores map
      _p: [], // Mock the plugins array
      install: vi.fn(),
      state: {
        value: {}
      },
      _e: {
        active: true,
        run: vi.fn((fn) => fn())
      }
    },
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
  };
});

describe('store/modules/permission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up Pinia
    setActivePinia(createPinia());
  });

  describe('usePermissionStore', () => {
    it('should create permission store', () => {
      const store = usePermissionStore();
      expect(store).toBeDefined();
    });

    it('should have initial state', () => {
      const store = usePermissionStore();
      expect(store.getBackMenuList).toEqual([]);
      expect(store.getFrontMenuList).toEqual([]);
      expect(store.getLastBuildMenuTime).toBe(0);
      expect(store.getIsDynamicAddedRoute).toBe(false);
    });

    it('should set back menu list', () => {
      const store = usePermissionStore();
      const menuList = [{ name: 'Menu 1', path: '/menu1' }];

      store.setBackMenuList(menuList as any);

      expect(store.getBackMenuList).toEqual(menuList);
      expect(store.getLastBuildMenuTime).toBeGreaterThan(0);
    });

    it('should set front menu list', () => {
      const store = usePermissionStore();
      const menuList = [{ name: 'Menu 1', path: '/menu1' }];

      store.setFrontMenuList(menuList as any);

      expect(store.getFrontMenuList).toEqual(menuList);
    });

    it('should set last build menu time', () => {
      const store = usePermissionStore();
      const beforeTime = Date.now();

      store.setLastBuildMenuTime();

      expect(store.getLastBuildMenuTime).toBeGreaterThanOrEqual(beforeTime);
    });

    it('should set dynamic added route', () => {
      const store = usePermissionStore();

      store.setDynamicAddedRoute(true);

      expect(store.getIsDynamicAddedRoute).toBe(true);
    });

    it('should reset state', () => {
      const store = usePermissionStore();
      store.setDynamicAddedRoute(true);
      store.setBackMenuList([{ name: 'Menu 1', path: '/menu1' }] as any);
      store.setLastBuildMenuTime();

      store.resetState();

      expect(store.getIsDynamicAddedRoute).toBe(false);
      expect(store.getBackMenuList).toEqual([]);
      expect(store.getLastBuildMenuTime).toBe(0);
    });

    it('should change permission code', async () => {
      const store = usePermissionStore();
      const authInfo = { 
        id: { id: '1' },
        tenantId: { id: '1' },
        customerId: { id: '1' },
        name: 'Test User',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '123456789',
        authority: Authority.SYS_ADMIN,
        additionalInfo: {
          lastLoginTs: Date.now()
        },
        createdTime: Date.now()
      };

      // Mock the API call
      const loginApiMock = await import('/@/api/tb/login');
      vi.spyOn(loginApiMock, 'userInfoApi').mockResolvedValue(authInfo);

      await store.changePermissionCode();

      // Check that the API was called and the authority was set
      expect(loginApiMock.userInfoApi).toHaveBeenCalled();
    });

    it('should handle change permission code error', async () => {
      const store = usePermissionStore();

      // Mock the API call to throw an error
      const loginApiMock = await import('/@/api/tb/login');
      vi.spyOn(loginApiMock, 'userInfoApi').mockRejectedValue(new Error('API Error'));

      // Spy on console.error to verify the error is logged
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Should not throw an error (the method should catch it)
      await store.changePermissionCode();

      expect(loginApiMock.userInfoApi).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to change permission code:', expect.any(Error));

      // Clean up
      consoleSpy.mockRestore();
    });

    it('should build routes action', async () => {
      const store = usePermissionStore();

      const routes = await store.buildRoutesAction();

      expect(Array.isArray(routes)).toBe(true);
      expect(routes.length).toBeGreaterThan(0);
    });

    it('should build routes action with ROLE permission mode', async () => {
      const store = usePermissionStore();

      // Mock app store to return ROLE permission mode
      const appStoreModule = await import('/@/store/modules/app');
      vi.spyOn(appStoreModule, 'useAppStoreWithOut').mockReturnValue({
        getProjectConfig: {
          permissionMode: PermissionModeEnum.ROLE,
        } as any,
      } as any);

      const routes = await store.buildRoutesAction();

      expect(Array.isArray(routes)).toBe(true);
    });

    it('should build routes action with BACK permission mode', async () => {
      const store = usePermissionStore();

      // Mock the API call for changePermissionCode
      const loginApiMock = await import('/@/api/tb/login');
      vi.spyOn(loginApiMock, 'userInfoApi').mockResolvedValue({ 
        id: { id: '1' },
        tenantId: { id: '1' },
        customerId: { id: '1' },
        name: 'Test User',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '123456789',
        authority: Authority.SYS_ADMIN,
        additionalInfo: {
          lastLoginTs: Date.now()
        },
        createdTime: Date.now()
      });

      // Mock app store to return BACK permission mode
      const appStoreModule = await import('/@/store/modules/app');
      vi.spyOn(appStoreModule, 'useAppStoreWithOut').mockReturnValue({
        getProjectConfig: {
          permissionMode: PermissionModeEnum.BACK,
        } as any,
      } as any);

      const routes = await store.buildRoutesAction();

      expect(Array.isArray(routes)).toBe(true);
    });
  });

  describe('usePermissionStoreWithOut', () => {
    it('should return permission store', () => {
      const store = usePermissionStoreWithOut();
      expect(store).toBeDefined();
    });
  });
});
