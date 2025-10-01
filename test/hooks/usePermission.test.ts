import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePermission } from '/@/hooks/web/usePermission';

// Mock all dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStore: () => ({
    setProjectConfig: vi.fn(),
  }),
}));

vi.mock('/@/store/modules/permission', () => ({
  usePermissionStore: () => ({
    buildRoutesAction: vi.fn().mockResolvedValue([]),
    setLastBuildMenuTime: vi.fn(),
  }),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({
    getAuthority: ['admin'],
    setAuthority: vi.fn(),
  }),
}));

vi.mock('/@/store/modules/multipleTab', () => ({
  useMultipleTabStore: () => ({
    clearCacheTabs: vi.fn(),
  }),
}));

vi.mock('/@/hooks/web/useTabs', () => ({
  useTabs: () => ({
    closeAll: vi.fn(),
  }),
}));

vi.mock('/@/router', () => ({
  router: {
    addRoute: vi.fn(),
  },
  resetRouter: vi.fn(),
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    permissionMode: 'ROUTE_MAPPING',
  },
}));

vi.mock('/@/enums/appEnum', () => ({
  PermissionModeEnum: {
    BACK: 'BACK',
    ROUTE_MAPPING: 'ROUTE_MAPPING',
    ROLE: 'ROLE',
  },
}));

vi.mock('lodash-es', () => ({
  intersection: vi.fn((arr1, arr2) => {
    return arr1.filter(value => arr2.includes(value));
  }),
}));

vi.mock('/@/utils/is', () => ({
  isArray: vi.fn((value) => Array.isArray(value)),
}));

describe('hooks/usePermission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return all permission functions', () => {
    const { changeAuthority, hasPermission, togglePermissionMode, refreshMenu } = usePermission();

    expect(typeof changeAuthority).toBe('function');
    expect(typeof hasPermission).toBe('function');
    expect(typeof togglePermissionMode).toBe('function');
    expect(typeof refreshMenu).toBe('function');
  });

  it('should check permissions correctly with default value', () => {
    const { hasPermission } = usePermission();

    // Test with no value (should return true by default)
    expect(hasPermission()).toBe(true);
  });

  it('should check permissions with custom default value', () => {
    const { hasPermission } = usePermission();

    // Test with custom default value when no value provided
    expect(hasPermission(undefined, false)).toBe(false);
    expect(hasPermission(null, true)).toBe(true);
  });

  it('should toggle permission mode', async () => {
    const { togglePermissionMode } = usePermission();

    // Mock location.reload
    const reloadSpy = vi.spyOn(window.location, 'reload').mockImplementation(() => {});

    // Call the function
    await togglePermissionMode();

    // Verify that reload was called
    expect(reloadSpy).toHaveBeenCalled();

    // Clean up
    reloadSpy.mockRestore();
  });

  it('should refresh menu without throwing error', async () => {
    const { refreshMenu } = usePermission();

    // Should not throw
    await expect(refreshMenu()).resolves.not.toThrow();
  });
});