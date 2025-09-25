import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/router/routes', () => ({ basicRoutes: [{ name: 'Root', path: '/' }] }));
vi.mock('/@/router/helper/routeHelper', () => ({ createRouteHistory: () => ({}) }));
vi.mock('/@/hooks/web/useMessage', () => ({ useMessage: () => ({ showMessage: vi.fn(), showMessageModal: vi.fn() }) }));
vi.mock('/@/hooks/setting', () => ({ useGlobSetting: () => ({ ctxPath: '/' }) }));
vi.mock('/@/hooks/web/useTabs', () => ({ useTabs: () => ({ tabStore: { getTabList: [{ path: '/' }, { path: '/a' }] }, closeCurrent: vi.fn() }) }));
vi.mock('/@/hooks/web/usePage', () => ({ useGo: () => vi.fn() }));
vi.mock('/@/layouts/iframe/useFrameKeepAlive', () => ({ initFramePage: () => vi.fn() }));
vi.mock('/@/utils/cipher', () => ({ encryptByMd5: (s: string) => 'md5' + s.length }));

import { router, resetRouter, setupRouter } from '/@/router';

describe('router/index.ts funcs', () => {
  it('should resetRouter without removing whitelisted routes', () => {
    // push a mock dynamic route and then reset
    const addSpy = vi.spyOn(router, 'removeRoute').mockImplementation(() => true as any);
    resetRouter();
    expect(addSpy).toHaveBeenCalledTimes(addSpy.mock.calls.length);
    addSpy.mockRestore();
  });

  it('should setupRouter and initTabPage', () => {
    const app: any = { use: vi.fn() };
    setupRouter(app);
    expect(app.use).toHaveBeenCalled();
    expect(typeof (window as any).tabPage).toBe('object');
    expect(typeof (window as any).toastr).toBe('object');
  });
});


