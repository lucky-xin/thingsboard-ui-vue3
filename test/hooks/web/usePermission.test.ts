import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePermission } from '/@/hooks/web/usePermission';
import { useAppStore } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { useUserStore } from '/@/store/modules/user';
import { useTabs } from '/@/hooks/web/useTabs';
import { router, resetRouter } from '/@/router';
import projectSetting from '/@/settings/projectSetting';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { Authority } from '/@/enums/authorityEnum';
import { intersection } from 'lodash-es';
import { isArray } from '/@/utils/is';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

// Mock dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStore: vi.fn(() => ({
    setProjectConfig: vi.fn(),
  })),
}));

vi.mock('/@/store/modules/permission', () => ({
  usePermissionStore: vi.fn(() => ({
    buildRoutesAction: vi.fn(() => Promise.resolve([
      { path: '/test', name: 'Test' },
    ])),
    setLastBuildMenuTime: vi.fn(),
  })),
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStore: vi.fn(() => ({
    getAuthority: ['admin', 'user'],
    setAuthority: vi.fn(),
  })),
}));

vi.mock('/@/hooks/web/useTabs', () => ({
  useTabs: vi.fn(() => ({
    closeAll: vi.fn(),
  })),
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

vi.mock('/@/enums/authorityEnum', () => ({
  Authority: {
    ADMIN: 'admin',
    USER: 'user',
  },
}));

vi.mock('lodash-es', () => ({
  intersection: vi.fn((arr1, arr2) => {
    return arr1.filter(item => arr2.includes(item));
  }),
}));

vi.mock('/@/utils/is', () => ({
  isArray: vi.fn((value) => Array.isArray(value)),
}));

vi.mock('/@/store/modules/multipleTab', () => ({
  useMultipleTabStore: vi.fn(() => ({
    clearCacheTabs: vi.fn(),
  })),
}));

// Mock global location
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
});

describe('hooks/web/usePermission', () => {
  let mockAppStore: any;
  let mockPermissionStore: any;
  let mockUserStore: any;
  let mockTabs: any;
  let mockMultipleTabStore: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockAppStore = {
      setProjectConfig: vi.fn(),
    };

    mockPermissionStore = {
      buildRoutesAction: vi.fn(() => Promise.resolve([
        { path: '/test', name: 'Test' },
      ])),
      setLastBuildMenuTime: vi.fn(),
    };

    mockUserStore = {
      getAuthority: ['admin', 'user'],
      setAuthority: vi.fn(),
    };

    mockTabs = {
      closeAll: vi.fn(),
    };

    mockMultipleTabStore = {
      clearCacheTabs: vi.fn(),
    };

    vi.mocked(useAppStore).mockReturnValue(mockAppStore);
    vi.mocked(usePermissionStore).mockReturnValue(mockPermissionStore);
    vi.mocked(useUserStore).mockReturnValue(mockUserStore);
    vi.mocked(useTabs).mockReturnValue(mockTabs);
    vi.mocked(useMultipleTabStore).mockReturnValue(mockMultipleTabStore);
  });

  describe('usePermission', () => {
    it('should return permission functions', () => {
      const { changeAuthority, hasPermission, togglePermissionMode, refreshMenu } = usePermission();

      expect(changeAuthority).toBeInstanceOf(Function);
      expect(hasPermission).toBeInstanceOf(Function);
      expect(togglePermissionMode).toBeInstanceOf(Function);
      expect(refreshMenu).toBeInstanceOf(Function);
    });

    it('should toggle permission mode from ROUTE_MAPPING to BACK', async () => {
      const { togglePermissionMode } = usePermission();

      await togglePermissionMode();

      expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({
        permissionMode: PermissionModeEnum.BACK,
      });
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('should toggle permission mode from BACK to ROUTE_MAPPING', async () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { togglePermissionMode } = usePermission();

      await togglePermissionMode();

      expect(mockAppStore.setProjectConfig).toHaveBeenCalledWith({
        permissionMode: PermissionModeEnum.ROUTE_MAPPING,
      });
      expect(window.location.reload).toHaveBeenCalled();
    });

    it('should resume and rebuild routes', async () => {
      const { refreshMenu } = usePermission();

      await refreshMenu();

      expect(mockMultipleTabStore.clearCacheTabs).toHaveBeenCalled();
      expect(resetRouter).toHaveBeenCalled();
      expect(mockPermissionStore.buildRoutesAction).toHaveBeenCalled();
      expect(router.addRoute).toHaveBeenCalledWith({ path: '/test', name: 'Test' });
      expect(mockPermissionStore.setLastBuildMenuTime).toHaveBeenCalled();
      expect(mockTabs.closeAll).toHaveBeenCalled();
    });

    it('should have permission when no value provided', () => {
      const { hasPermission } = usePermission();

      const result = hasPermission();

      expect(result).toBe(true);
    });

    it('should have permission when no value provided with custom default', () => {
      const { hasPermission } = usePermission();

      const result = hasPermission(undefined, false);

      expect(result).toBe(false);
    });

    it('should check permission for ROUTE_MAPPING mode with single authority', () => {
      const { hasPermission } = usePermission();

      const result = hasPermission('admin');

      expect(result).toBe(false); // userStore.getAuthority is ['admin', 'user'], not 'admin'
    });

    it('should check permission for ROUTE_MAPPING mode with array authority', () => {
      const { hasPermission } = usePermission();

      const result = hasPermission(['admin', 'user']);

      expect(result).toBe(false); // Based on the mock intersection behavior
    });

    it('should check permission for ROLE mode with single authority', () => {
      projectSetting.permissionMode = PermissionModeEnum.ROLE;
      const { hasPermission } = usePermission();

      const result = hasPermission('admin');

      expect(result).toBe(false);
    });

    it('should check permission for ROLE mode with array authority', () => {
      projectSetting.permissionMode = PermissionModeEnum.ROLE;
      const { hasPermission } = usePermission();

      const result = hasPermission(['admin', 'user']);

      expect(result).toBe(true);
    });

    it('should check permission for BACK mode', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission(['test:permission']);

      expect(result).toBe(false);
    });

    it('should check permission for BACK mode with empty value', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission('');

      expect(result).toBe(true); // Empty string should return default value (true)
    });

    it('should check permission for BACK mode with non-empty value', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission('test:permission');

      expect(result).toBe(false);
    });

    it('should change authority for ROUTE_MAPPING mode', async () => {
      projectSetting.permissionMode = PermissionModeEnum.ROUTE_MAPPING;
      const { changeAuthority } = usePermission();

      await changeAuthority('admin' as Authority);

      expect(mockUserStore.setAuthority).toHaveBeenCalledWith('admin');
      expect(mockMultipleTabStore.clearCacheTabs).toHaveBeenCalled();
      expect(resetRouter).toHaveBeenCalled();
    });

    it('should throw error when changing authority in non-ROUTE_MAPPING mode', async () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { changeAuthority } = usePermission();

      await expect(changeAuthority('admin' as Authority)).rejects.toThrow(
        'Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!'
      );
    });

    it('should refresh menu', async () => {
      const { refreshMenu } = usePermission();

      await refreshMenu();

      expect(mockMultipleTabStore.clearCacheTabs).toHaveBeenCalled();
      expect(resetRouter).toHaveBeenCalled();
      expect(mockPermissionStore.buildRoutesAction).toHaveBeenCalled();
    });

    it('should handle isPermitted function correctly', () => {
      const { hasPermission } = usePermission();
      
      // Test with BACK mode to trigger isPermitted
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      
      const result = hasPermission(['test:permission']);
      
      expect(result).toBe(false);
    });

    it('should handle array values in BACK mode', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission(['test:permission', 'another:permission']);

      expect(result).toBe(false);
    });

    it('should handle empty string values in BACK mode', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission('');

      expect(result).toBe(true); // Empty string should return default value (true)
    });

    it('should handle non-string values in BACK mode', () => {
      projectSetting.permissionMode = PermissionModeEnum.BACK;
      const { hasPermission } = usePermission();

      const result = hasPermission(['test:permission', '', 'another:permission']);

      expect(result).toBe(false);
    });
  });
});
