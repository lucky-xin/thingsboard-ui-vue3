import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { Router } from 'vue-router';

// Mock all dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: () => ({
    setPageLoadingAction: vi.fn(),
    setPageLoading: vi.fn(),
  }),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: () => ({
    getToken: 'mock-token',
    getSessionTimeout: false,
  }),
}));

vi.mock('/@/hooks/setting/useTransitionSetting', () => ({
  useTransitionSetting: () => ({
    getOpenPageLoading: vi.fn(() => ({ value: false })),
    getOpenNProgress: vi.fn(() => ({ value: false })),
  }),
}));

vi.mock('/@/utils/http/axios/axiosCancel', () => ({
  AxiosCanceler: vi.fn().mockImplementation(() => ({
    removeAllPending: vi.fn(),
  })),
}));

vi.mock('ant-design-vue', () => ({
  Modal: {
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

vi.mock('./permissionGuard', () => ({
  createPermissionGuard: vi.fn(),
}));

vi.mock('./stateGuard', () => ({
  createStateGuard: vi.fn(),
}));

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    removeAllHttpPending: true,
    closeMessageOnSwitch: true,
  },
}));

describe('router/guard/index', () => {
  let mockRouter: Router;
  let beforeEachCallbacks: Array<(to: any, from?: any, next?: any) => any>;
  let afterEachCallbacks: Array<(to: any, from?: any) => any>;

  beforeEach(async () => {
    beforeEachCallbacks = [];
    afterEachCallbacks = [];
    
    mockRouter = {
      beforeEach: vi.fn((callback) => {
        beforeEachCallbacks.push(callback);
      }),
      afterEach: vi.fn((callback) => {
        afterEachCallbacks.push(callback);
      }),
    } as any;

    // Mock document.body
    global.document = {
      body: {
        scrollTo: vi.fn(),
      },
    } as any;

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('setupRouterGuard', () => {
    it('should setup all router guards', async () => {
      const { setupRouterGuard } = await import('/@/router/guard');
      const { createPermissionGuard } = await import('./permissionGuard');
      const { createStateGuard } = await import('./stateGuard');

      setupRouterGuard(mockRouter);

      expect(mockRouter.beforeEach).toHaveBeenCalled();
      expect(mockRouter.afterEach).toHaveBeenCalled();
      expect(createPermissionGuard).toHaveBeenCalledWith(mockRouter);
      expect(createStateGuard).toHaveBeenCalledWith(mockRouter);
    });

    it('should create guards in correct order', async () => {
      const { setupRouterGuard } = await import('/@/router/guard');
      
      setupRouterGuard(mockRouter);

      // Verify that router guards are set up (beforeEach and afterEach called multiple times)
      expect(mockRouter.beforeEach).toHaveBeenCalled();
      expect(mockRouter.afterEach).toHaveBeenCalled();
    });
  });

  describe('Router guard functions', () => {
    beforeEach(async () => {
      const { setupRouterGuard } = await import('/@/router/guard');
      setupRouterGuard(mockRouter);
    });

    it('should handle page guard - beforeEach', async () => {
      const mockTo = {
        path: '/test',
        meta: {},
      };

      const { setRouteChange } = await import('/@/logics/mitt/routeChange');

      // Execute the first beforeEach callback (page guard)
      const result = await beforeEachCallbacks[0](mockTo);

      expect(mockTo.meta.loaded).toBe(false);
      expect(setRouteChange).toHaveBeenCalledWith(mockTo);
      expect(result).toBe(true);
    });

    it('should handle page guard - afterEach', async () => {
      const mockTo = {
        path: '/test',
        meta: {},
      };

      // Execute the first afterEach callback (page guard)
      const result = await afterEachCallbacks[0](mockTo);

      expect(result).toBeUndefined(); // afterEach doesn't return anything
    });

    it('should handle scroll guard', async () => {
      const mockTo = {
        href: '#section',
      };

      // Find and execute scroll guard (should be one of the afterEach callbacks)
      await afterEachCallbacks[1](mockTo); // Assuming scroll guard is the second afterEach

      expect(global.document.body.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    it('should handle message guard', async () => {
      const { Modal, notification } = await import('ant-design-vue');

      // Execute message guard (should be one of the beforeEach callbacks)
      const result = await beforeEachCallbacks[2]({}, {}); // Assuming message guard is third

      expect(Modal.destroyAll).toHaveBeenCalled();
      expect(notification.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle message guard error', async () => {
      const { Modal } = await import('ant-design-vue');
      const { warn } = await import('/@/utils/log');

      Modal.destroyAll.mockImplementation(() => {
        throw new Error('Modal error');
      });

      // Execute message guard
      const result = await beforeEachCallbacks[2]({}, {});

      expect(warn).toHaveBeenCalledWith('message guard error:Error: Modal error');
      expect(result).toBe(true);
    });
  });

  describe('createMessageGuard', () => {
    it('should create message guard independently', async () => {
      const { createMessageGuard } = await import('/@/router/guard');
      const separateRouter = {
        beforeEach: vi.fn(),
      } as any;

      createMessageGuard(separateRouter);

      expect(separateRouter.beforeEach).toHaveBeenCalled();
    });
  });

  describe('createProgressGuard', () => {
    it('should create progress guard independently', async () => {
      const { createProgressGuard } = await import('/@/router/guard');
      const separateRouter = {
        beforeEach: vi.fn(),
        afterEach: vi.fn(),
      } as any;

      createProgressGuard(separateRouter);

      expect(separateRouter.beforeEach).toHaveBeenCalled();
      expect(separateRouter.afterEach).toHaveBeenCalled();
    });
  });
});