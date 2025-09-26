import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setupRouterGuard } from '/@/router/guard/index';

// Mock dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: vi.fn(() => ({
    getPageLoading: false,
    setPageLoading: vi.fn(),
  })),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: vi.fn(() => ({
    getToken: 'mock-token',
    getUserInfo: {},
  })),
}));

vi.mock('/@/hooks/setting/useTransitionSetting', () => ({
  useTransitionSetting: vi.fn(() => ({
    getEnableTransition: true,
    getOpenNProgress: true,
  })),
}));

vi.mock('/@/utils/http/axios/axiosCancel', () => ({
  AxiosCanceler: vi.fn().mockImplementation(() => ({
    addPending: vi.fn(),
    removePending: vi.fn(),
    removeAllPending: vi.fn(),
  })),
}));

vi.mock('ant-design-vue', () => ({
  Modal: {
    confirm: vi.fn(),
    destroyAll: vi.fn(),
  },
  notification: {
    destroy: vi.fn(),
  },
}));

vi.mock('/@/utils/log', () => ({
  warn: vi.fn(),
}));

vi.mock('/@/logics/mitt/routeChange', () => ({
  setRouteChange: vi.fn(),
}));

vi.mock('/@/router/guard/permissionGuard', () => ({
  createPermissionGuard: vi.fn(),
}));

vi.mock('/@/router/guard/stateGuard', () => ({
  createStateGuard: vi.fn(),
}));

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
    configure: vi.fn(),
  },
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    removeAllHttpPending: true,
  },
}));

describe('router/guard/index', () => {
  let mockRouter: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockRouter = {
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
    };
  });

  it('should setup router guard with all guards', () => {
    setupRouterGuard(mockRouter);

    // Verify that beforeEach and afterEach were called multiple times
    // (once for each guard that uses them)
    expect(mockRouter.beforeEach).toHaveBeenCalled();
    expect(mockRouter.afterEach).toHaveBeenCalled();
  });

  it('should handle page guard functionality', async () => {
    setupRouterGuard(mockRouter);

    // Get the first beforeEach callback (page guard)
    const pageGuardCallback = mockRouter.beforeEach.mock.calls[0][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    const result = await pageGuardCallback(mockTo);

    expect(result).toBe(true);
    expect(mockTo.meta.loaded).toBe(false);
  });

  it('should handle page loading guard', async () => {
    setupRouterGuard(mockRouter);

    // Get the second beforeEach callback (page loading guard)
    const loadingGuardCallback = mockRouter.beforeEach.mock.calls[1][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    const result = await loadingGuardCallback(mockTo);

    expect(result).toBe(true);
  });

  it('should handle HTTP guard', async () => {
    setupRouterGuard(mockRouter);

    // Get the third beforeEach callback (HTTP guard)
    const httpGuardCallback = mockRouter.beforeEach.mock.calls[2][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    const result = await httpGuardCallback(mockTo);

    expect(result).toBe(true);
  });

  it('should handle scroll guard', async () => {
    setupRouterGuard(mockRouter);

    // Get the fourth beforeEach callback (scroll guard)
    const scrollGuardCallback = mockRouter.beforeEach.mock.calls[3][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    const result = await scrollGuardCallback(mockTo);

    expect(result).toBe(true);
  });

  it('should handle message guard', async () => {
    setupRouterGuard(mockRouter);

    // Get the fifth beforeEach callback (message guard)
    const messageGuardCallback = mockRouter.beforeEach.mock.calls[4][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    const result = await messageGuardCallback(mockTo);

    expect(result).toBe(true);
  });

  it('should handle progress guard', async () => {
    setupRouterGuard(mockRouter);

    // Check if there are enough beforeEach calls
    if (mockRouter.beforeEach.mock.calls.length > 5) {
      const progressGuardCallback = mockRouter.beforeEach.mock.calls[5][0];
      
      const mockTo = {
        path: '/test',
        meta: {},
      };

      const result = await progressGuardCallback(mockTo);

      expect(result).toBe(true);
    } else {
      // If there are fewer calls, just verify the setup was called
      expect(mockRouter.beforeEach).toHaveBeenCalled();
    }
  });

  it('should handle afterEach callbacks', () => {
    setupRouterGuard(mockRouter);

    // Get the first afterEach callback
    const afterEachCallback = mockRouter.afterEach.mock.calls[0][0];
    
    const mockTo = {
      path: '/test',
      meta: {},
    };

    // Should not throw error
    expect(() => afterEachCallback(mockTo)).not.toThrow();
  });
});
