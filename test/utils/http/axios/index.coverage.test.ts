import { describe, it, expect, vi, beforeEach } from 'vitest';

// Capture options passed to VAxios to invoke transform hooks directly
vi.mock('/@/utils/http/axios/Axios', () => {
  let last: any;
  class MockVAxios {
    constructor(public options: any) {
      last = options;
    }
  }
  const __getLastOptions = () => last;
  return { VAxios: MockVAxios, __getLastOptions };
});

// Stable mocks for external deps referenced by index.ts
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: () => ({ apiUrl: 'http://api.local', urlPrefix: '/api' }),
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: () => ({
    showMessageModal: vi.fn(),
    showMessage: vi.fn(),
  }),
}));

vi.mock('/@/store/modules/errorLog', () => ({
  useErrorLogStoreWithOut: () => ({ addAjaxErrorInfo: vi.fn() }),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}));

const userStoreInst = { setToken: vi.fn(), getRefreshToken: 'refresh-token' };
vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: () => userStoreInst,
}));

vi.mock('/@/utils/auth', () => ({ getToken: () => 'jwt-token' }));

vi.mock('/@/api/tb/login', () => ({
  refreshTokenApi: vi.fn(async () => 'new-jwt'),
}));

vi.mock('/@/utils/jwt', () => ({ isExpired: () => false }));

// Import helper from mocked module, then import module under test
import { __getLastOptions } from '/@/utils/http/axios/Axios';
import '/@/utils/http/axios/index';
const getCaptured = () => __getLastOptions();

describe('utils/http/axios/index coverage', () => {
  beforeEach(() => {
    expect(getCaptured()).toBeDefined();
  });

  it('beforeRequestHook - GET with object params and joinPrefix/apiUrl', () => {
    const cfg: any = { method: 'GET', url: '/list', params: { a: 1 } };
    const opt: any = { joinPrefix: true, apiUrl: 'http://api.local', joinTime: true, urlPrefix: '/api' };
    const res = getCaptured().transform.beforeRequestHook(cfg, opt);
    expect(res.url).toContain('/api');
    expect(res.params).toBeTruthy();
  });

  it('beforeRequestHook - POST with data and joinParamsToUrl', () => {
    const cfg: any = { method: 'POST', url: '/save', params: { q: 1 }, data: { x: 2 } };
    const opt: any = { joinParamsToUrl: true };
    const res = getCaptured().transform.beforeRequestHook(cfg, opt);
    expect(typeof res.url).toBe('string');
  });

  it('requestInterceptors - attaches auth header with scheme', () => {
    const cfg: any = { headers: {}, requestOptions: { withToken: true } };
    const opt: any = { authenticationHeader: 'X-Authorization', authenticationScheme: 'Bearer' };
    const res = getCaptured().transform.requestInterceptors(cfg, opt);
    expect(res.headers['X-Authorization']).toContain('Bearer');
  });

  it('transformRequestHook - returns data and sets token from headers', async () => {
    userStoreInst.setToken.mockClear();
    const axiosRes: any = { data: { ok: true }, headers: { 'X-Authorization': 'abc' }, config: { authenticationHeader: 'X-Authorization' } };
    const data = getCaptured().transform.transformRequestHook(axiosRes, { isTransformResponse: true });
    expect(data).toEqual({ ok: true });
    expect(userStoreInst.setToken).toHaveBeenCalled();
  });

  it('responseInterceptorsCatch - timeout/network/bad_response paths', async () => {
    const instance: any = { request: vi.fn(async () => ({ data: {} })) };
    const baseErr: any = { toString: () => 'Network Error', config: { requestOptions: {} } };
    // timeout
    await expect(
      getCaptured().transform.responseInterceptorsCatch({ ...baseErr, code: 'ECONNABORTED', message: 'timeout of 1ms exceeded' }, instance)
    ).rejects.toBeTruthy();
    // network error
    await expect(
      getCaptured().transform.responseInterceptorsCatch({ ...baseErr }, instance)
    ).rejects.toBeTruthy();
    // bad response
    await expect(
      getCaptured().transform.responseInterceptorsCatch({ ...baseErr, code: 'ERR_BAD_RESPONSE' }, instance)
    ).rejects.toBeTruthy();
  });

  it('responseInterceptorsCatch - 401 with refresh token flow', async () => {
    const instance: any = { request: vi.fn(async () => ({ data: { ok: 1 } })) };
    const error: any = {
      response: { status: 401, data: { errorCode: 11 } },
      config: { requestOptions: { errorMessageMode: 'none' } },
      toString: () => '',
    };
    const res = await getCaptured().transform.responseInterceptorsCatch(error, instance).catch((e: any) => e);
    // When refresh happens, the flow returns a promise; our mock instance.request resolves
    expect(instance.request).toHaveBeenCalled();
  });
});


