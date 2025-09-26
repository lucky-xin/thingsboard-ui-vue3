import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPermissionGuard } from '/@/router/guard/permissionGuard';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { LoginRoute, RootRoute } from '/@/router/routes';
import { PageEnum } from '/@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

// Mock dependencies
vi.mock('/@/store/modules/permission', () => ({
  usePermissionStoreWithOut: vi.fn(() => ({
    buildRoutesAction: vi.fn(() => Promise.resolve([
      { path: '/test', name: 'Test' },
      { path: '/dashboard', name: 'Dashboard' },
    ])),
    setDynamicAddedRoute: vi.fn(),
    getIsDynamicAddedRoute: false,
  })),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: vi.fn(() => ({
    getUserInfo: {
      additionalInfo: {
        homePath: '/custom-home',
      },
    },
    getSessionTimeout: false,
    getLastUpdateTime: 1234567890,
    getUserInfoAction: vi.fn(),
    getPageCacheByKey: vi.fn(() => null),
  })),
}));

vi.mock('/@/router/routes', () => ({
  RootRoute: { path: '/' },
  LoginRoute: {
    children: [
      { path: '/login/register' },
      { path: '/login/forgot-password' },
    ],
  },
}));

vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: {
    BASE_HOME: '/dashboard',
    BASE_LOGIN: '/login',
    MOD_PWD_PAGE: '/modify-password',
  },
}));

vi.mock('/@/router/routes/basic', () => ({
  PAGE_NOT_FOUND_ROUTE: { name: 'PageNotFound' },
}));

describe('router/guard/permissionGuard', () => {
  let mockRouter: any;
  let mockUserStore: any;
  let mockPermissionStore: any;
  let beforeEachCallback: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUserStore = {
      getUserInfo: {
        additionalInfo: {
          homePath: '/custom-home',
        },
      },
      getSessionTimeout: false,
      getLastUpdateTime: 1234567890,
      getUserInfoAction: vi.fn(),
      getPageCacheByKey: vi.fn(() => null),
    };

    mockPermissionStore = {
      buildRoutesAction: vi.fn(() => Promise.resolve([
        { path: '/test', name: 'Test' },
        { path: '/dashboard', name: 'Dashboard' },
      ])),
      setDynamicAddedRoute: vi.fn(),
      getIsDynamicAddedRoute: false,
    };

    mockRouter = {
      beforeEach: vi.fn((callback) => {
        beforeEachCallback = callback;
      }),
      addRoute: vi.fn(),
    };

    vi.mocked(useUserStoreWithOut).mockReturnValue(mockUserStore);
    vi.mocked(usePermissionStoreWithOut).mockReturnValue(mockPermissionStore);
  });

  it('should create permission guard and register beforeEach callback', () => {
    createPermissionGuard(mockRouter);

    expect(mockRouter.beforeEach).toHaveBeenCalled();
    expect(beforeEachCallback).toBeInstanceOf(Function);
  });

  it('should redirect to custom home path when coming from root', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard' };
    const from = { path: '/' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith('/custom-home');
  });

  it('should allow access to whitelist paths', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/login' };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should handle modify password page', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/modify-password' };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(mockUserStore.getUserInfoAction).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it('should redirect to login when no token and not ignoring auth', async () => {
    mockUserStore.getSessionTimeout = true; // No token

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/protected', meta: { ignoreAuth: false } };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith({
      path: '/login',
      replace: true,
      query: { redirect: '/protected' },
    });
  });

  it('should allow access when no token but ignoring auth', async () => {
    mockUserStore.getSessionTimeout = true; // No token

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/public', meta: { ignoreAuth: true } };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should redirect to modify password when cache key exists', async () => {
    mockUserStore.getPageCacheByKey.mockReturnValue('modify-password-msg');

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard' };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith({
      path: '/modify-password',
      replace: true,
    });
  });

  it('should handle 404 redirect after login', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { 
      name: 'PageNotFound',
      fullPath: '/some-path',
    };
    const from = { path: '/login' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith('/404//custom-home');
  });

  it('should fetch user info when last update time is 0', async () => {
    mockUserStore.getLastUpdateTime = 0;

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard' };
    const from = { path: '/previous', query: {} };

    await beforeEachCallback(to, from, next);

    expect(mockUserStore.getUserInfoAction).toHaveBeenCalled();
  });

  it('should handle user info fetch error', async () => {
    mockUserStore.getLastUpdateTime = 0;
    mockUserStore.getUserInfoAction.mockRejectedValue(new Error('API Error'));

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard', fullPath: '/dashboard' };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith('/login?redirect=/dashboard');
  });

  it('should build and add routes when not dynamically added', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard', name: 'Dashboard' };
    const from = { path: '/login', query: {} };

    await beforeEachCallback(to, from, next);

    expect(mockPermissionStore.buildRoutesAction).toHaveBeenCalled();
    expect(mockRouter.addRoute).toHaveBeenCalledTimes(3); // 2 routes + PAGE_NOT_FOUND_ROUTE
    expect(mockPermissionStore.setDynamicAddedRoute).toHaveBeenCalledWith(true);
    expect(next).toHaveBeenCalled();
  });

  it('should skip route building when already dynamically added', async () => {
    mockPermissionStore.getIsDynamicAddedRoute = true;

    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { path: '/dashboard' };
    const from = { path: '/previous' };

    await beforeEachCallback(to, from, next);

    expect(mockPermissionStore.buildRoutesAction).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it('should handle 404 page after dynamic route addition', async () => {
    createPermissionGuard(mockRouter);

    const next = vi.fn();
    const to = { 
      name: 'PageNotFound',
      fullPath: '/not-found',
      query: { test: 'value' },
    };
    const from = { path: '/previous', query: {} };

    await beforeEachCallback(to, from, next);

    expect(next).toHaveBeenCalledWith({
      path: '/not-found',
      replace: true,
      query: { test: 'value' },
    });
  });
});
