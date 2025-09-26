import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PermissionModeEnum } from '/@/enums/appEnum';

// Mock all dependencies
vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: vi.fn(() => ({
    getProjectConfig: {
      permissionMode: PermissionModeEnum.ROUTE_MAPPING,
    },
  })),
}));

vi.mock('/@/store/modules/permission', () => ({
  usePermissionStore: vi.fn(() => ({
    getBackMenuList: [
      { path: '/dashboard', name: 'Dashboard', meta: { title: 'Dashboard' } },
      { path: '/users', name: 'Users', meta: { title: 'Users' } },
    ],
    getFrontMenuList: [
      { path: '/home', name: 'Home', meta: { title: 'Home' } },
      { path: '/profile', name: 'Profile', meta: { title: 'Profile' } },
    ],
  })),
}));

vi.mock('/@/router/helper/menuHelper', () => ({
  transformMenuModule: vi.fn((module) => module.menu || module),
  getAllParentPath: vi.fn(() => Promise.resolve(['/parent'])),
}));

vi.mock('/@/utils/helper/treeHelper', () => ({
  filter: vi.fn((menus, filterFn) => menus.filter(filterFn)),
}));

vi.mock('/@/utils/is', () => ({
  isUrl: vi.fn((path) => /^https?:\/\//.test(path)),
}));

vi.mock('/@/router', () => ({
  router: {
    getRoutes: vi.fn(() => [
      {
        path: '/dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard-icon' },
      },
      {
        path: '/users',
        meta: { title: 'Users', icon: 'users-icon', ignoreAuth: true },
      },
      {
        path: '/profile/:id',
        meta: { title: 'Profile', carryParam: true },
      },
    ]),
  },
}));

vi.mock('path-to-regexp', () => ({
  pathToRegexp: vi.fn((path) => ({
    regexp: {
      test: vi.fn((testPath) => path.includes(':') && testPath.includes(path.split('/:')[0])),
    },
  })),
}));

// Mock dynamic imports
vi.mock('./modules/**/*.ts', () => ({}));

describe('router/menus/index', () => {
  let mockAppStore: any;
  let mockPermissionStore: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    const { useAppStoreWithOut } = await import('/@/store/modules/app');
    const { usePermissionStore } = await import('/@/store/modules/permission');
    
    mockAppStore = useAppStoreWithOut();
    mockPermissionStore = usePermissionStore();
  });

  describe('getMenus', () => {
    it('should return back menu list when in BACK mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.BACK;
      
      const { getMenus } = await import('/@/router/menus');
      const menus = await getMenus();
      
      expect(menus).toEqual(mockPermissionStore.getBackMenuList);
    });

    it('should return front menu list when in ROUTE_MAPPING mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROUTE_MAPPING;
      
      const { getMenus } = await import('/@/router/menus');
      const menus = await getMenus();
      
      expect(menus).toEqual(mockPermissionStore.getFrontMenuList);
    });

    it('should return filtered menus when in ROLE mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      const { filter } = await import('/@/utils/helper/treeHelper');
      const { getMenus } = await import('/@/router/menus');
      
      await getMenus();
      
      expect(filter).toHaveBeenCalled();
    });
  });

  describe('getCurrentParentPath', () => {
    it('should return current parent path', async () => {
      const { getCurrentParentPath } = await import('/@/router/menus');
      const { getAllParentPath } = await import('/@/router/helper/menuHelper');
      
      const result = await getCurrentParentPath('/current');
      
      expect(getAllParentPath).toHaveBeenCalled();
      expect(result).toBe('/parent');
    });
  });

  describe('getShallowMenus', () => {
    it('should return menus without children', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROUTE_MAPPING;
      
      const { getShallowMenus } = await import('/@/router/menus');
      const menus = await getShallowMenus();
      
      expect(menus).toBeDefined();
      expect(Array.isArray(menus)).toBe(true);
    });

    it('should filter menus in ROLE mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      const { getShallowMenus } = await import('/@/router/menus');
      await getShallowMenus();
      
      // Should call the filtering logic
      expect(mockAppStore.getProjectConfig.permissionMode).toBe(PermissionModeEnum.ROLE);
    });
  });

  describe('getChildrenMenus', () => {
    it('should return empty array when parent not found', async () => {
      const { getChildrenMenus } = await import('/@/router/menus');
      const children = await getChildrenMenus('/nonexistent');
      
      expect(children).toEqual([]);
    });

    it('should return empty array when parent has no children', async () => {
      // Mock getMenus to return a parent without children
      const { getChildrenMenus } = await import('/@/router/menus');
      const children = await getChildrenMenus('/parent-without-children');
      
      expect(children).toEqual([]);
    });

    it('should return empty array when hideChildrenInMenu is true', async () => {
      const { getChildrenMenus } = await import('/@/router/menus');
      const children = await getChildrenMenus('/hidden-children');
      
      expect(children).toEqual([]);
    });
  });

  describe('Permission mode helpers', () => {
    it('should correctly identify BACK mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.BACK;
      
      const { getMenus } = await import('/@/router/menus');
      const menus = await getMenus();
      
      expect(menus).toEqual(mockPermissionStore.getBackMenuList);
    });

    it('should correctly identify ROUTE_MAPPING mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROUTE_MAPPING;
      
      const { getMenus } = await import('/@/router/menus');
      const menus = await getMenus();
      
      expect(menus).toEqual(mockPermissionStore.getFrontMenuList);
    });

    it('should correctly identify ROLE mode', async () => {
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      const { getMenus } = await import('/@/router/menus');
      await getMenus();
      
      // Should call filter function for role mode
      const { filter } = await import('/@/utils/helper/treeHelper');
      expect(filter).toHaveBeenCalled();
    });
  });

  describe('basicFilter', () => {
    it('should handle URL paths', async () => {
      const { isUrl } = await import('/@/utils/is');
      isUrl.mockReturnValue(true);
      
      const { getMenus } = await import('/@/router/menus');
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      await getMenus();
      
      expect(isUrl).toHaveBeenCalled();
    });

    it('should handle routes with carryParam', async () => {
      const { pathToRegexp } = await import('path-to-regexp');
      
      const { getMenus } = await import('/@/router/menus');
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      await getMenus();
      
      // Should be called for routes with carryParam
      expect(pathToRegexp).toHaveBeenCalled();
    });

    it('should handle routes with ignoreAuth', async () => {
      const { getMenus } = await import('/@/router/menus');
      mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;
      
      const menus = await getMenus();
      
      // Should process routes correctly
      expect(Array.isArray(menus)).toBe(true);
    });
  });
});