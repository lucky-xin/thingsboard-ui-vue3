import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { AxiosResponse } from 'axios';

// Mock dependencies
vi.mock('/@/hooks/setting', () => ({
  useGlobSetting: vi.fn(() => ({
    urlPrefix: '/api',
    apiUrl: 'http://localhost:8080'
  }))
}));

vi.mock('/@/hooks/web/useMessage', () => ({
  useMessage: vi.fn(() => ({
    showMessageModal: vi.fn(),
    showMessage: vi.fn()
  }))
}));

vi.mock('/@/utils/auth', () => ({
  getToken: vi.fn(() => 'test-token')
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => key)
  }))
}));

vi.mock('/@/store/modules/errorLog', () => ({
  useErrorLogStoreWithOut: vi.fn(() => ({
    addAjaxErrorInfo: vi.fn()
  }))
}));

vi.mock('/@/store/modules/user', () => ({
  useUserStoreWithOut: vi.fn(() => ({
    setToken: vi.fn(),
    getRefreshToken: 'refresh-token'
  }))
}));

vi.mock('/@/api/tb/login', () => ({
  refreshTokenApi: vi.fn(() => Promise.resolve('new-token'))
}));

vi.mock('/@/utils/jwt', () => ({
  isExpired: vi.fn(() => false)
}));

vi.mock('/@/utils/is', () => {
  return {
    isString: vi.fn((val) => typeof val === 'string'),
    isFunction: vi.fn((val) => typeof val === 'function'),
    isDef: vi.fn((val) => typeof val !== 'undefined'),
    isObject: vi.fn((val) => val !== null && typeof val === 'object'),
    isArray: vi.fn((val) => Array.isArray(val))
  };
});

vi.mock('/@/utils', () => ({
  setObjToUrlParams: vi.fn((url, params) => {
    const paramStr = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    return `${url}?${paramStr}`;
  }),
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
  cloneDeep: vi.fn((obj) => obj)
}));

vi.mock('./helper', () => ({
  joinTimestamp: vi.fn(() => ({ _t: Date.now() })),
  formatRequestDate: vi.fn()
}));

vi.mock('./checkStatus', () => ({
  checkStatus: vi.fn()
}));

describe('utils/http/axios/index coverage', () => {
  let transform: any;
  
  beforeEach(async () => {
    // Clear all mocks
    vi.clearAllMocks();
    
    // Import the transform directly from the module
    const axiosModule = await import('/@/utils/http/axios/index');
    // Access the transform through the defHttp instance
    transform = (axiosModule.defHttp as any).options.transform;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('transformRequestHook', () => {
    it('should return raw response when isReturnNativeResponse is true', () => {
      const mockResponse = {
        data: { result: 'test' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      } as AxiosResponse;
      
      const options = {
        isReturnNativeResponse: true,
        isTransformResponse: true
      };
      
      const result = transform.transformRequestHook(mockResponse, options);
      expect(result).toBe(mockResponse);
    });

    it('should return data when isTransformResponse is false', () => {
      const mockData = { result: 'test' };
      const mockResponse = {
        data: mockData,
        status: 200,
        headers: {},
        config: {}
      } as AxiosResponse;
      
      const options = {
        isReturnNativeResponse: false,
        isTransformResponse: false
      };
      
      const result = transform.transformRequestHook(mockResponse, options);
      expect(result).toBe(mockData);
    });

    it('should set token from response headers and return data', () => {
      const mockData = { result: 'test' };
      const mockResponse = {
        data: mockData,
        status: 200,
        headers: {
          'X-Authorization': 'new-token'
        },
        config: {
          authenticationHeader: 'X-Authorization'
        }
      } as any as AxiosResponse;
      
      const options = {
        isReturnNativeResponse: false,
        isTransformResponse: true
      };
      
      const result = transform.transformRequestHook(mockResponse, options);
      expect(result).toBe(mockData);
    });
  });

  describe('beforeRequestHook', () => {
    it('should handle GET requests with object params and joinPrefix/apiUrl', () => {
      const config: any = { 
        method: 'GET', 
        url: '/list', 
        params: { a: 1 } 
      };
      const options: any = { 
        joinPrefix: true, 
        apiUrl: 'http://api.local', 
        joinTime: true, 
        urlPrefix: '/api' 
      };
      
      const result = transform.beforeRequestHook(config, options);
      expect(result.url).toContain('/api');
      expect(result.params).toBeTruthy();
    });

    it('should handle POST requests with data and joinParamsToUrl', () => {
      const config: any = { 
        method: 'POST', 
        url: '/save', 
        params: { q: 1 }, 
        data: { x: 2 } 
      };
      const options: any = { 
        joinParamsToUrl: true 
      };
      
      const result = transform.beforeRequestHook(config, options);
      expect(typeof result.url).toBe('string');
    });
  });

  describe('requestInterceptors', () => {
    it('should attach auth header with scheme', () => {
      const config: any = { 
        headers: {}, 
        requestOptions: { 
          withToken: true 
        } 
      };
      const options: any = { 
        authenticationHeader: 'X-Authorization', 
        authenticationScheme: 'Bearer' 
      };
      
      const result = transform.requestInterceptors(config, options);
      expect(result.headers['X-Authorization']).toContain('Bearer');
    });

    it('should not attach auth header when withToken is false', () => {
      const config: any = { 
        headers: {}, 
        requestOptions: { 
          withToken: false 
        } 
      };
      const options: any = { 
        authenticationHeader: 'X-Authorization', 
        authenticationScheme: 'Bearer' 
      };
      
      const result = transform.requestInterceptors(config, options);
      expect(result.headers['X-Authorization']).toBeUndefined();
    });
  });

  describe('responseInterceptors', () => {
    it('should return response as-is', () => {
      const mockResponse = {
        data: { test: true },
        status: 200,
        headers: {}
      };
      
      const result = transform.responseInterceptors(mockResponse);
      expect(result).toBe(mockResponse);
    });
  });

  describe('responseInterceptorsCatch', () => {
    it('should handle timeout errors', async () => {
      const error: any = {
        code: 'ECONNABORTED',
        message: 'timeout of 1ms exceeded',
        response: null,
        config: {}
      };
      const instance: any = {
        request: vi.fn()
      };
      
      await expect(transform.responseInterceptorsCatch(error, instance)).rejects.toBeTruthy();
    });

    it('should handle network errors', async () => {
      const error: any = {
        message: 'Network Error',
        response: null,
        config: {}
      };
      const instance: any = {
        request: vi.fn()
      };
      
      await expect(transform.responseInterceptorsCatch(error, instance)).rejects.toBeTruthy();
    });

    it('should handle bad response errors', async () => {
      const error: any = {
        code: 'ERR_BAD_RESPONSE',
        response: null,
        config: {}
      };
      const instance: any = {
        request: vi.fn()
      };
      
      await expect(transform.responseInterceptorsCatch(error, instance)).rejects.toBeTruthy();
    });

    it('should handle 401 error with refresh token flow', async () => {
      const error: any = {
        response: {
          status: 401,
          data: {
            errorCode: 11,
            message: 'Token expired'
          }
        },
        config: {},
        toString: () => ''
      };
      const instance: any = {
        request: vi.fn(() => Promise.resolve({ data: 'new-response' }))
      };
      
      const result = await transform.responseInterceptorsCatch(error, instance);
      expect(result).toEqual({ data: 'new-response' });
    });
  });
});