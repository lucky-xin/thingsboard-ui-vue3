import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore, useEmitter, useUserStoreWithOut } from '/@/store/modules/user';
import type { UserInfo, JwtPair } from '/#/store';

// Mock dependencies
vi.mock('/@/utils/auth', () => ({
  getAuthCache: vi.fn(),
  setAuthCache: vi.fn(),
}));

vi.mock('/@/api/tb/login', () => ({
  loginApi: vi.fn(),
  logoutApi: vi.fn(),
  userInfoApi: vi.fn(),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessage: vi.fn(),
    createConfirm: vi.fn(),
  }),
}));

vi.mock('/@/router', () => ({
  router: {
    addRoute: vi.fn(),
    replace: vi.fn(),
    currentRoute: {
      value: {
        query: {},
      },
    },
  },
}));

vi.mock('/@/store/modules/permission', () => ({
  usePermissionStore: () => ({
    isDynamicAddedRoute: false,
    setDynamicAddedRoute: vi.fn(),
    buildRoutesAction: vi.fn().mockResolvedValue([]),
  }),
}));

vi.mock('/@/router/routes/basic', () => ({
  PAGE_NOT_FOUND_ROUTE: { name: 'NotFound' },
}));

vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({
    ctxPath: '/',
  }),
}));

vi.mock('/@/utils/mitt', () => ({
  mitt: vi.fn(() => ({
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  })),
}));

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

describe('User Store', () => {
  let pinia: any;
  let userStore: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    userStore = useUserStore();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(userStore.userInfo).toBeNull();
      expect(userStore.token).toBeUndefined();
      expect(userStore.authority).toBeUndefined();
      expect(userStore.sessionTimeout).toBeUndefined();
      expect(userStore.lastUpdateTime).toBe(0);
      expect(userStore.pageCache).toEqual({});
      expect(userStore.emitter).toBeDefined();
    });
  });

  describe('Getters', () => {
    it('should get user info from cache when not in state', async () => {
      const { getAuthCache } = await import('/@/utils/auth');
      const mockUserInfo = { id: 1, name: 'Test User' };
      getAuthCache.mockReturnValue(mockUserInfo);

      const result = userStore.getUserInfo;
      expect(result).toEqual(mockUserInfo);
      expect(getAuthCache).toHaveBeenCalledWith('USER_INFO__');
    });

    it('should get token from cache when not in state', async () => {
      const { getAuthCache } = await import('/@/utils/auth');
      const mockToken = 'test-token';
      getAuthCache.mockReturnValue(mockToken);

      const result = userStore.getToken;
      expect(result).toEqual(mockToken);
      expect(getAuthCache).toHaveBeenCalledWith('TOKEN__');
    });

    it('should get refresh token from cache when not in state', async () => {
      const { getAuthCache } = await import('/@/utils/auth');
      const mockRefreshToken = 'refresh-token';
      getAuthCache.mockReturnValue(mockRefreshToken);

      const result = userStore.getRefreshToken;
      expect(result).toEqual(mockRefreshToken);
      expect(getAuthCache).toHaveBeenCalledWith('REFRESH_TOKEN__');
    });

    it('should get authority from cache when not in state', async () => {
      const { getAuthCache } = await import('/@/utils/auth');
      const mockAuthority = 'ADMIN';
      getAuthCache.mockReturnValue(mockAuthority);

      const result = userStore.getAuthority;
      expect(result).toEqual(mockAuthority);
      expect(getAuthCache).toHaveBeenCalledWith('AUTHORITY__');
    });

    it('should get session timeout from cache when not in state', async () => {
      const { getAuthCache } = await import('/@/utils/auth');
      getAuthCache.mockReturnValue(true);

      const result = userStore.getSessionTimeout;
      expect(result).toBe(true);
      expect(getAuthCache).toHaveBeenCalledWith('SESSION_TIMEOUT__');
    });

    it('should return state values when available', () => {
      const mockUserInfo = { id: 1, name: 'Test User' };
      const mockToken = 'test-token';
      const mockAuthority = 'ADMIN';

      userStore.userInfo = mockUserInfo;
      userStore.token = mockToken;
      userStore.authority = mockAuthority;
      userStore.sessionTimeout = false;
      userStore.lastUpdateTime = 1234567890;

      expect(userStore.getUserInfo).toEqual(mockUserInfo);
      expect(userStore.getToken).toEqual(mockToken);
      expect(userStore.getAuthority).toEqual(mockAuthority);
      expect(userStore.getSessionTimeout).toBe(false);
      expect(userStore.getLastUpdateTime).toBe(1234567890);
      expect(userStore.getPageCache).toEqual({});
      expect(userStore.getEmitter).toBeDefined();
    });
  });

  describe('Actions', () => {
    it('should set token and refresh token', async () => {
      const { setAuthCache } = await import('/@/utils/auth');
      const mockJwtPair: JwtPair = {
        token: 'access-token',
        refreshToken: 'refresh-token',
      };

      userStore.setToken(mockJwtPair);

      expect(userStore.token).toBe('access-token');
      expect(userStore.refreshToken).toBe('refresh-token');
      expect(userStore.lastUpdateTime).toBeGreaterThan(0);
      expect(setAuthCache).toHaveBeenCalledWith('TOKEN__', 'access-token');
      expect(setAuthCache).toHaveBeenCalledWith('REFRESH_TOKEN__', 'refresh-token');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('jwt_token', 'access-token');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('refresh_token', 'refresh-token');
    });

    it('should set token with undefined values', async () => {
      const { setAuthCache } = await import('/@/utils/auth');

      userStore.setToken(undefined);

      expect(userStore.token).toBeUndefined();
      expect(userStore.refreshToken).toBeUndefined();
      expect(setAuthCache).toHaveBeenCalledWith('TOKEN__', undefined);
      expect(setAuthCache).toHaveBeenCalledWith('REFRESH_TOKEN__', undefined);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('jwt_token', '');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('refresh_token', '');
    });

    it('should set session timeout', async () => {
      const { setAuthCache } = await import('/@/utils/auth');

      userStore.setSessionTimeout(true);

      expect(userStore.sessionTimeout).toBe(true);
      expect(setAuthCache).toHaveBeenCalledWith('SESSION_TIMEOUT__', true);
    });

    it('should set user info with avatar processing', async () => {
      const { setAuthCache } = await import('/@/utils/auth');
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
        additionalInfo: {
          avatarUrl: 'custom-avatar.jpg',
        },
      } as UserInfo;

      userStore.setUserInfo(mockUserInfo);

      expect(userStore.userInfo).toEqual(mockUserInfo);
      expect(userStore.lastUpdateTime).toBeGreaterThan(0);
      expect(setAuthCache).toHaveBeenCalledWith('USER_INFO__', mockUserInfo);
    });

    it('should set user info with default avatar', async () => {
      const { setAuthCache } = await import('/@/utils/auth');
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
        additionalInfo: {},
      } as UserInfo;

      userStore.setUserInfo(mockUserInfo);

      expect(userStore.userInfo).toEqual(mockUserInfo);
      expect(setAuthCache).toHaveBeenCalledWith('USER_INFO__', mockUserInfo);
    });

    it('should set authority', async () => {
      const { setAuthCache } = await import('/@/utils/auth');

      userStore.setAuthority('ADMIN');

      expect(userStore.authority).toBe('ADMIN');
      expect(setAuthCache).toHaveBeenCalledWith('AUTHORITY__', 'ADMIN');
    });

    it('should reset state', () => {
      userStore.userInfo = { id: 1, name: 'Test User' };
      userStore.token = 'test-token';
      userStore.authority = 'ADMIN';
      userStore.sessionTimeout = false;

      userStore.resetState();

      expect(userStore.userInfo).toBeNull();
      expect(userStore.token).toBe('');
      expect(userStore.authority).toBeUndefined();
      expect(userStore.sessionTimeout).toBe(true);
    });

    it('should set page cache', () => {
      userStore.setPageCache('test-key', 'test-value');

      expect(userStore.pageCache['test-key']).toBe('test-value');
    });

    it('should get page cache by key', () => {
      userStore.pageCache['existing-key'] = 'existing-value';

      const result = userStore.getPageCacheByKey('existing-key');
      expect(result).toBe('existing-value');
    });

    it('should get page cache by key with default value', () => {
      const result = userStore.getPageCacheByKey('non-existing-key', 'default-value');
      expect(result).toBe('default-value');
      expect(userStore.pageCache['non-existing-key']).toBe('default-value');
    });

    it('should login successfully', async () => {
      const { loginApi, userInfoApi } = await import('/@/api/tb/login');
      const mockJwtPair: JwtPair = {
        token: 'access-token',
        refreshToken: 'refresh-token',
      };
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
      } as UserInfo;

      loginApi.mockResolvedValue(mockJwtPair);
      userInfoApi.mockResolvedValue(mockUserInfo);

      const result = await userStore.login({
        username: 'test',
        password: 'test',
        goHome: true,
      });

      expect(loginApi).toHaveBeenCalledWith({ username: 'test', password: 'test' }, undefined);
      expect(userInfoApi).toHaveBeenCalled();
      expect(result).toEqual(mockUserInfo);
    });

    it('should handle login failure', async () => {
      const { loginApi } = await import('/@/api/tb/login');
      loginApi.mockResolvedValue(null);

      await expect(userStore.login({
        username: 'test',
        password: 'test',
      })).rejects.toThrow('Login failed, please try again!');
    });

    it('should handle after login action', async () => {
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
        additionalInfo: {
          homePath: '/dashboard',
        },
      } as UserInfo;

      const result = await userStore.afterLoginAction(mockUserInfo, true);

      expect(userStore.userInfo).toEqual(mockUserInfo);
      expect(userStore.sessionTimeout).toBe(false);
      expect(result).toEqual(mockUserInfo);
    });

    it('should get user info action', async () => {
      const { userInfoApi } = await import('/@/api/tb/login');
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
      } as UserInfo;

      userInfoApi.mockResolvedValue(mockUserInfo);

      const result = await userStore.getUserInfoAction();

      expect(userInfoApi).toHaveBeenCalled();
      expect(userStore.userInfo).toEqual(mockUserInfo);
      expect(userStore.sessionTimeout).toBe(false);
      expect(result).toEqual(mockUserInfo);
    });

    it('should init page cache', () => {
      const mockUserInfo: UserInfo = {
        id: 1,
        name: 'Test User',
        authority: 'ADMIN',
        tenantId: { id: 'tenant-1' },
        customerId: { id: 'customer-1' },
      } as UserInfo;

      userStore.initPageCache(mockUserInfo);

      expect(userStore.pageCache['authority']).toBe('ADMIN');
      expect(userStore.pageCache['tenantId']).toBe('tenant-1');
      expect(userStore.pageCache['customerId']).toBe('customer-1');
    });

    it('should logout successfully', async () => {
      const { logoutApi } = await import('/@/api/tb/login');
      const { router } = await import('/@/router');
      userStore.token = 'test-token';

      await userStore.logout(true);

      expect(logoutApi).toHaveBeenCalled();
      expect(userStore.token).toBeUndefined();
      expect(userStore.sessionTimeout).toBe(true);
      expect(userStore.userInfo).toBeNull();
      expect(userStore.authority).toBeUndefined();
      expect(router.replace).toHaveBeenCalledWith('/auth/login');
    });

    it('should handle logout API failure', async () => {
      const { logoutApi } = await import('/@/api/tb/login');
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      logoutApi.mockRejectedValue(new Error('API Error'));
      userStore.token = 'test-token';

      await userStore.logout(false);

      expect(logoutApi).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('注销Token失败');
      expect(userStore.token).toBeUndefined();
      expect(userStore.sessionTimeout).toBe(true);
      expect(userStore.userInfo).toBeNull();
      expect(userStore.authority).toBeUndefined();
    });

    it('should confirm login out', async () => {
      const logoutSpy = vi.spyOn(userStore, 'logout').mockResolvedValue(undefined);

      await userStore.confirmLoginOut();

      expect(logoutSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('Utility Functions', () => {
    it('should return emitter from useEmitter', () => {
      const emitter = useEmitter();
      expect(emitter).toBeDefined();
    });

    it('should return user store from useUserStoreWithOut', () => {
      const store = useUserStoreWithOut();
      expect(store).toBeDefined();
    });
  });
});
