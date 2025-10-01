import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { watchEffect } from 'vue';
import { useThrottleFn } from '@vueuse/core';
import { useLockPage } from '/@/hooks/web/useLockPage';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

// Mock Vue composition API
vi.mock('vue', () => ({
  computed: vi.fn((fn) => ({ value: fn() })),
  onUnmounted: vi.fn((callback) => callback()),
  unref: vi.fn((ref) => ref?.value ?? ref),
  watchEffect: vi.fn((fn) => {
    // Call the function immediately to trigger the watch effect
    const cleanup = vi.fn();
    fn(cleanup);
    return cleanup;
  }),
}));

// Mock external dependencies
const mockUseRootSetting = {
  getLockTime: { value: true },
};

const mockLockStore = {
  setLockInfo: vi.fn(),
};

const mockUserStore = {
  getSessionTimeout: false,
  getToken: 'test-token',
};

const mockAppStore = {
  getProjectConfig: {
    lockTime: 10, // 10 minutes
  },
};

vi.mock('@vueuse/core', () => ({
  useThrottleFn: vi.fn((fn) => fn),
}));

vi.mock('/@/store/modules/app', () => ({
  useAppStore: () => mockAppStore,
}));

vi.mock('/@/store/modules/lock', () => ({
  useLockStore: () => mockLockStore,
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => mockUserStore,
}));

vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => mockUseRootSetting,
}));

describe('hooks/web/useLockPage', () => {
  let mockSetTimeout: any;
  let mockClearTimeout: any;
  let timeoutCallback: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock timers
    mockSetTimeout = vi.fn((callback, delay) => {
      timeoutCallback = callback;
      return 123; // Mock timer ID
    });
    mockClearTimeout = vi.fn();

    global.setTimeout = mockSetTimeout;
    global.clearTimeout = mockClearTimeout;
    global.window = {
      clearTimeout: mockClearTimeout,
    } as any;

    mockUseRootSetting.getLockTime.value = true;
    mockUserStore.getSessionTimeout = false;
    mockAppStore.getProjectConfig.lockTime = 10;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    timeoutCallback = null;
  });

  it('should return event handlers when lock time is enabled', () => {
    mockUseRootSetting.getLockTime.value = true;

    const result = useLockPage();

    expect(result.value).toHaveProperty('onKeyup');
    expect(result.value).toHaveProperty('onMousemove');
    expect(typeof result.value.onKeyup).toBe('function');
    expect(typeof result.value.onMousemove).toBe('function');
  });

  it('should return empty object when lock time is disabled', () => {
    mockUseRootSetting.getLockTime.value = false;

    const result = useLockPage();

    expect(result.value).toEqual({});
    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should set up lock timeout when user is not in session timeout', () => {
    mockUserStore.getSessionTimeout = false;
    mockAppStore.getProjectConfig.lockTime = 10;

    useLockPage();

    // Verify that watchEffect was called
    expect(vi.mocked(watchEffect)).toHaveBeenCalled();

    expect(mockSetTimeout).toHaveBeenCalled();
  });

  it('should clear timeout when user is in session timeout and lock time is enabled', () => {
    mockUserStore.getSessionTimeout = true;
    mockUseRootSetting.getLockTime.value = true;

    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should clear timeout when lock time is invalid', () => {
    mockAppStore.getProjectConfig.lockTime = 0; // Invalid lock time

    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should clear timeout when lock time is too large', () => {
    mockAppStore.getProjectConfig.lockTime = 100000; // Too large

    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should lock page after timeout', () => {
    mockUserStore.getSessionTimeout = false;
    mockAppStore.getProjectConfig.lockTime = 10;

    useLockPage();

    // Trigger the timeout callback
    if (timeoutCallback) {
      timeoutCallback();
    }

    expect(mockLockStore.setLockInfo).toHaveBeenCalledWith({
      isLock: true,
      pwd: undefined,
    });
  });

  it('should clear timeout on unmount', () => {
    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should use throttled function for keyup and mousemove', () => {
    useLockPage();

    expect(vi.mocked(useThrottleFn)).toHaveBeenCalledWith(expect.any(Function), 2000);
  });

  it('should handle missing lock time configuration', () => {
    mockAppStore.getProjectConfig.lockTime = null;

    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should clear timeout when lock time is negative', () => {
    mockAppStore.getProjectConfig.lockTime = -5;

    useLockPage();

    expect(mockClearTimeout).toHaveBeenCalled();
  });

  it('should reset timeout when keyup function is called', () => {
    mockUserStore.getSessionTimeout = false;
    mockAppStore.getProjectConfig.lockTime = 10;

    const result = useLockPage();
    const keyupFn = result.value.onKeyup;

    // Call the keyup function
    keyupFn();

    // Should have called clearTimeout and then setTimeout again
    expect(mockClearTimeout).toHaveBeenCalled();
    expect(mockSetTimeout).toHaveBeenCalledTimes(2);
  });
});