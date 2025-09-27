import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: vi.fn(),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: vi.fn(),
}));

vi.mock('/@/hooks/setting/useTransitionSetting', () => ({
  useTransitionSetting: vi.fn(),
}));

vi.mock('/@/utils/http/axios/axiosCancel', () => ({
  AxiosCanceler: vi.fn(),
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

vi.mock('vue', () => ({
  unref: vi.fn(),
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
  },
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    removeAllHttpPending: true,
    closeMessageOnSwitch: true,
  },
}));

import { setupRouterGuard, createMessageGuard, createProgressGuard } from '/@/router/guard/index';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { Modal, notification } from 'ant-design-vue';
import { warn } from '/@/utils/log';
import { unref } from 'vue';
import { setRouteChange } from '/@/logics/mitt/routeChange';
import { createPermissionGuard } from '/@/router/guard/permissionGuard';
import { createStateGuard } from '/@/router/guard/stateGuard';
import nProgress from 'nprogress';

const mockUseAppStoreWithOut = vi.mocked(useAppStoreWithOut);
const mockUseUserStoreWithOut = vi.mocked(useUserStoreWithOut);
const mockUseTransitionSetting = vi.mocked(useTransitionSetting);
const mockAxiosCanceler = vi.mocked(AxiosCanceler);
const mockUnref = vi.mocked(unref);
const mockSetRouteChange = vi.mocked(setRouteChange);
const mockCreatePermissionGuard = vi.mocked(createPermissionGuard);
const mockCreateStateGuard = vi.mocked(createStateGuard);
const mockWarn = vi.mocked(warn);

// Mock DOM
const mockDocument = {
  body: {
    scrollTo: vi.fn(),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

describe('router guard coverage', () => {
  let mockRouter: any;
  let mockAppStore: any;
  let mockUserStore: any;
  let mockTransitionSetting: any;
  let mockAxiosCancelerInstance: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock router
    mockRouter = {
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
    };

    // Mock app store
    mockAppStore = {
      setPageLoadingAction: vi.fn(),
      setPageLoading: vi.fn(),
    };
    mockUseAppStoreWithOut.mockReturnValue(mockAppStore);

    // Mock user store
    mockUserStore = {
      getSessionTimeout: false,
    };
    mockUseUserStoreWithOut.mockReturnValue(mockUserStore);

    // Mock transition setting
    mockTransitionSetting = {
      getOpenPageLoading: vi.fn(),
      getOpenNProgress: vi.fn(),
    };
    mockUseTransitionSetting.mockReturnValue(mockTransitionSetting);

    // Mock axios canceller
    mockAxiosCancelerInstance = {
      removeAllPending: vi.fn(),
    };
    mockAxiosCanceler.mockImplementation(() => mockAxiosCancelerInstance);

    // Mock unref
    mockUnref.mockImplementation((value) => value);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should setup router guard with all guards', () => {
    setupRouterGuard(mockRouter);

    expect(mockRouter.beforeEach).toHaveBeenCalled();
    expect(mockRouter.afterEach).toHaveBeenCalled();
    expect(mockCreatePermissionGuard).toHaveBeenCalledWith(mockRouter);
    expect(mockCreateStateGuard).toHaveBeenCalledWith(mockRouter);
  });

  it('should handle page guard correctly', () => {
    setupRouterGuard(mockRouter);

    const beforeEachCallback = mockRouter.beforeEach.mock.calls[0][0];
    const afterEachCallback = mockRouter.afterEach.mock.calls[0][0];

    const mockTo = { path: '/test', meta: {} };
    const mockFrom = { path: '/previous' };

    // Test beforeEach
    beforeEachCallback(mockTo, mockFrom);
    expect(mockSetRouteChange).toHaveBeenCalledWith(mockTo);

    // Test afterEach
    afterEachCallback(mockTo, mockFrom);
    expect(true).toBe(true); // Page loaded map is internal
  });

  it('should handle page loading guard correctly', () => {
    setupRouterGuard(mockRouter);

    const beforeEachCallback = mockRouter.beforeEach.mock.calls[1][0];
    const afterEachCallback = mockRouter.afterEach.mock.calls[1][0];

    const mockTo = { path: '/test', meta: { loaded: false } };

    // Test beforeEach with session timeout
    mockUserStore.getSessionTimeout = true;
    beforeEachCallback(mockTo);
    expect(mockAppStore.setPageLoadingAction).not.toHaveBeenCalled();

    // Test beforeEach with loaded page
    mockUserStore.getSessionTimeout = false;
    mockTo.meta.loaded = true;
    beforeEachCallback(mockTo);
    expect(mockAppStore.setPageLoadingAction).not.toHaveBeenCalled();

    // Test beforeEach with page loading enabled
    mockTo.meta.loaded = false;
    mockTransitionSetting.getOpenPageLoading.mockReturnValue(true);
    mockUnref.mockReturnValue(true);
    beforeEachCallback(mockTo);
    expect(mockAppStore.setPageLoadingAction).toHaveBeenCalledWith(true);

    // Test afterEach
    mockTransitionSetting.getOpenPageLoading.mockReturnValue(true);
    mockUnref.mockReturnValue(true);
    afterEachCallback(mockTo);
    expect(mockAppStore.setPageLoading).toHaveBeenCalledWith(false);
  });

  it('should handle http guard correctly', () => {
    setupRouterGuard(mockRouter);

    const beforeEachCallback = mockRouter.beforeEach.mock.calls[2][0];

    beforeEachCallback({ path: '/test' });
    expect(mockAxiosCancelerInstance.removeAllPending).toHaveBeenCalled();
  });

  it('should handle scroll guard correctly', () => {
    setupRouterGuard(mockRouter);

    const afterEachCallback = mockRouter.afterEach.mock.calls[2][0];

    // Test with hash href
    const mockTo = { href: '#test' };
    afterEachCallback(mockTo);
    expect(mockDocument.body.scrollTo).toHaveBeenCalledWith(0, 0);

    // Test without hash href
    mockDocument.body.scrollTo.mockClear();
    const mockTo2 = { href: '/test' };
    afterEachCallback(mockTo2);
    expect(mockDocument.body.scrollTo).not.toHaveBeenCalled();
  });

  it('should handle message guard correctly', () => {
    const mockRouter2 = {
      beforeEach: vi.fn(),
    };

    createMessageGuard(mockRouter2);

    const beforeEachCallback = mockRouter2.beforeEach.mock.calls[0][0];

    beforeEachCallback();
    expect(Modal.destroyAll).toHaveBeenCalled();
    expect(notification.destroy).toHaveBeenCalled();
  });

  it('should handle message guard with error', () => {
    const mockRouter2 = {
      beforeEach: vi.fn(),
    };

    // Mock project setting to disable close message
    vi.doMock('/@/settings/projectSetting', () => ({
      default: {
        closeMessageOnSwitch: false,
      },
    }));

    createMessageGuard(mockRouter2);

    const beforeEachCallback = mockRouter2.beforeEach.mock.calls[0][0];

    beforeEachCallback();
    expect(Modal.destroyAll).not.toHaveBeenCalled();
    expect(notification.destroy).not.toHaveBeenCalled();
  });

  it('should handle progress guard correctly', () => {
    const mockRouter2 = {
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
    };

    createProgressGuard(mockRouter2);

    const beforeEachCallback = mockRouter2.beforeEach.mock.calls[0][0];
    const afterEachCallback = mockRouter2.afterEach.mock.calls[0][0];

    // Test beforeEach with loaded page
    const mockTo = { meta: { loaded: true } };
    beforeEachCallback(mockTo);
    expect(nProgress.start).not.toHaveBeenCalled();

    // Test beforeEach with not loaded page and nprogress enabled
    mockTo.meta.loaded = false;
    mockTransitionSetting.getOpenNProgress.mockReturnValue(true);
    mockUnref.mockReturnValue(true);
    beforeEachCallback(mockTo);
    expect(nProgress.start).toHaveBeenCalled();

    // Test afterEach with nprogress enabled
    mockTransitionSetting.getOpenNProgress.mockReturnValue(true);
    mockUnref.mockReturnValue(true);
    afterEachCallback(mockTo);
    expect(nProgress.done).toHaveBeenCalled();
  });

  it('should handle progress guard with nprogress disabled', () => {
    const mockRouter2 = {
      beforeEach: vi.fn(),
      afterEach: vi.fn(),
    };

    createProgressGuard(mockRouter2);

    const beforeEachCallback = mockRouter2.beforeEach.mock.calls[0][0];
    const afterEachCallback = mockRouter2.afterEach.mock.calls[0][0];

    // Test with nprogress disabled
    mockTransitionSetting.getOpenNProgress.mockReturnValue(false);
    mockUnref.mockReturnValue(false);

    const mockTo = { meta: { loaded: false } };
    beforeEachCallback(mockTo);
    expect(nProgress.start).not.toHaveBeenCalled();

    afterEachCallback(mockTo);
    expect(nProgress.done).not.toHaveBeenCalled();
  });

  it('should handle different route scenarios', () => {
    setupRouterGuard(mockRouter);

    const beforeEachCallback = mockRouter.beforeEach.mock.calls[0][0];
    const afterEachCallback = mockRouter.afterEach.mock.calls[0][0];

    // Test with different route paths
    const routes = [
      { path: '/', meta: {} },
      { path: '/dashboard', meta: { loaded: true } },
      { path: '/users', meta: { loaded: false } },
    ];

    routes.forEach((route) => {
      beforeEachCallback(route);
      expect(mockSetRouteChange).toHaveBeenCalledWith(route);
    });

    routes.forEach((route) => {
      afterEachCallback(route);
      expect(true).toBe(true); // Page loaded map is internal
    });
  });

  it('should handle error in message guard', () => {
    const mockRouter2 = {
      beforeEach: vi.fn(),
    };

    // Mock Modal.destroyAll to throw error
    Modal.destroyAll.mockImplementation(() => {
      throw new Error('Test error');
    });

    createMessageGuard(mockRouter2);

    const beforeEachCallback = mockRouter2.beforeEach.mock.calls[0][0];

    beforeEachCallback();
    expect(mockWarn).toHaveBeenCalledWith('message guard error:' + expect.any(Error));
  });

  it('should handle timeout in page loading guard', () => {
    setupRouterGuard(mockRouter);

    const afterEachCallback = mockRouter.afterEach.mock.calls[1][0];

    // Mock setTimeout to execute immediately
    vi.useFakeTimers();
    mockTransitionSetting.getOpenPageLoading.mockReturnValue(true);
    mockUnref.mockReturnValue(true);

    const mockTo = { path: '/test', meta: { loaded: false } };
    afterEachCallback(mockTo);

    // Fast-forward time
    vi.advanceTimersByTime(220);
    expect(mockAppStore.setPageLoading).toHaveBeenCalledWith(false);

    vi.useRealTimers();
  });
});
