import { describe, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePermissionStore } from '/@/store/modules/permission';
import { PermissionModeEnum } from '/@/enums/appEnum';

vi.mock('/@/store/modules/user', () => ({
  useUserStore: () => ({ getAuthority: 'admin', getUserInfo: { additionalInfo: { homePath: '/home' } } }),
}));

vi.mock('/@/store/modules/app', () => ({
  useAppStoreWithOut: () => ({ getProjectConfig: { permissionMode: PermissionModeEnum.ROLE } }),
}));

vi.mock('/@/router/routes', () => ({ asyncRoutes: [{ path: '/home', meta: {} }] }));
vi.mock('/@/router/routes/basic', () => ({ ERROR_LOG_ROUTE: { path: '/error-log' } }));
vi.mock('/@/router/helper/routeHelper', () => ({
  transformObjToRoute: (r: any) => r,
  flatMultiLevelRoutes: (r: any) => r,
}));
vi.mock('/@/router/helper/menuHelper', () => ({ transformRouteToMenu: (r: any) => r }));
vi.mock('/@/utils/helper/treeHelper', () => ({ filter: (r: any) => r }));

describe('permission patchHomeAffix', () => {
  it('should mark home route affix true', async () => {
    setActivePinia(createPinia());
    const store = usePermissionStore();
    const routes = await store.buildRoutesAction();
    const home = routes.find((r: any) => r.path === '/home');
    expect(home?.meta?.affix).toBe(true);
  });

  it('should expose build methods for affix handling', () => {
    setActivePinia(createPinia());
    const store = usePermissionStore();
    expect(store.buildRoutesAction).toBeDefined();
  });
});


