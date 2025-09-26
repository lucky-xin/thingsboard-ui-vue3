import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMenus, getCurrentParentPath, getShallowMenus, getChildrenMenus } from '/@/router/menus/index';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { PermissionModeEnum } from '/@/enums/appEnum';

// Mock dependencies
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
      { path: '/back1', name: 'Back1', meta: { title: 'Back Menu 1' } },
      { path: '/back2', name: 'Back2', meta: { title: 'Back Menu 2' } },
    ],
    getFrontMenuList: [
      { path: '/front1', name: 'Front1', meta: { title: 'Front Menu 1' } },
      { path: '/front2', name: 'Front2', meta: { title: 'Front Menu 2' } },
    ],
  })),
}));

vi.mock('/@/router/helper/menuHelper', () => ({
  transformMenuModule: vi.fn((menu) => ({ ...menu, transformed: true })),
  getAllParentPath: vi.fn(() => ['/parent1', '/parent2']),
}));

vi.mock('/@/utils/helper/treeHelper', () => ({
  filter: vi.fn((menus, filterFn) => menus.filter(filterFn)),
}));

vi.mock('/@/utils/is', () => ({
  isUrl: vi.fn((path) => path.startsWith('http')),
}));

vi.mock('/@/router', () => ({
  router: {
    getRoutes: vi.fn(() => [
      {
        path: '/test',
        meta: { title: 'Test Route', icon: 'test-icon', ignoreAuth: false },
      },
      {
        path: '/auth-test',
        meta: { title: 'Auth Test Route', icon: 'auth-icon', ignoreAuth: true },
      },
    ]),
  },
}));

vi.mock('path-to-regexp', () => ({
  pathToRegexp: vi.fn((path) => ({
    regexp: new RegExp(path.replace(/:\w+/g, '[^/]+')),
  })),
}));

describe('router/menus/index', () => {
  let mockAppStore: any;
  let mockPermissionStore: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockAppStore = {
      getProjectConfig: {
        permissionMode: PermissionModeEnum.ROUTE_MAPPING,
      },
    };

    mockPermissionStore = {
      getBackMenuList: [
        { path: '/back1', name: 'Back1', meta: { title: 'Back Menu 1' } },
        { path: '/back2', name: 'Back2', meta: { title: 'Back Menu 2' } },
      ],
      getFrontMenuList: [
        { path: '/front1', name: 'Front1', meta: { title: 'Front Menu 1' } },
        { path: '/front2', name: 'Front2', meta: { title: 'Front Menu 2' } },
      ],
    };

    vi.mocked(useAppStoreWithOut).mockReturnValue(mockAppStore);
    vi.mocked(usePermissionStore).mockReturnValue(mockPermissionStore);
  });

  it('should get menus in BACK mode', async () => {
    mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.BACK;

    const result = await getMenus();

    expect(result).toEqual(mockPermissionStore.getBackMenuList);
  });

  it('should get menus in ROUTE_MAPPING mode', async () => {
    mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROUTE_MAPPING;

    const result = await getMenus();

    expect(result).toEqual(mockPermissionStore.getFrontMenuList);
  });

  it('should get menus in ROLE mode with filtering', async () => {
    mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;

    const result = await getMenus();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should get current parent path', async () => {
    const result = await getCurrentParentPath('/test/path');

    expect(result).toBe('/parent1');
  });

  it('should get shallow menus', async () => {
    const result = await getShallowMenus();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach(menu => {
      expect(menu.children).toBeUndefined();
    });
  });

  it('should get children menus for valid parent', async () => {
    const mockMenus = [
      {
        path: '/parent',
        name: 'Parent',
        children: [
          { path: '/parent/child1', name: 'Child1' },
          { path: '/parent/child2', name: 'Child2' },
        ],
      },
    ];

    // Mock getMenus to return our test data
    vi.doMock('/@/router/menus/index', async (importOriginal) => {
      const original = await importOriginal();
      return {
        ...original,
        getMenus: vi.fn(() => Promise.resolve(mockMenus)),
      };
    });

    const result = await getChildrenMenus('/parent');

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return empty array for invalid parent', async () => {
    const result = await getChildrenMenus('/nonexistent');

    expect(result).toEqual([]);
  });

  it('should handle menus with hideChildrenInMenu meta', async () => {
    const mockMenus = [
      {
        path: '/parent',
        name: 'Parent',
        children: [
          { path: '/parent/child1', name: 'Child1' },
        ],
        meta: { hideChildrenInMenu: true },
      },
    ];

    // Mock getMenus to return our test data
    vi.doMock('/@/router/menus/index', async (importOriginal) => {
      const original = await importOriginal();
      return {
        ...original,
        getMenus: vi.fn(() => Promise.resolve(mockMenus)),
      };
    });

    const result = await getChildrenMenus('/parent');

    expect(result).toEqual([]);
  });

  it('should handle different permission modes in getShallowMenus', async () => {
    mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;

    const result = await getShallowMenus();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle different permission modes in getChildrenMenus', async () => {
    mockAppStore.getProjectConfig.permissionMode = PermissionModeEnum.ROLE;

    const result = await getChildrenMenus('/test');

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
