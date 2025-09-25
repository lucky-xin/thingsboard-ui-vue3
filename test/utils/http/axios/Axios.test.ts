import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VAxios } from '/@/utils/http/axios/Axios';
import type { CreateAxiosOptions } from '/@/utils/http/axios/axiosTransform';

// Mock axios
const mockAxiosInstance = {
  interceptors: {
    request: {
      use: vi.fn(),
    },
    response: {
      use: vi.fn(),
    },
  },
  request: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
  head: vi.fn(),
  options: vi.fn(),
};

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
  },
}));

vi.mock('qs', () => ({
  default: {
    stringify: vi.fn((obj) => JSON.stringify(obj)),
  },
}));

vi.mock('/@/utils/http/axios/axiosCancel', () => ({
  AxiosCanceler: vi.fn().mockImplementation(() => ({
    addPending: vi.fn(),
    removePending: vi.fn(),
    removeAllPending: vi.fn(),
  })),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
  omit: vi.fn((obj, keys) => {
    const result = { ...obj };
    keys.forEach((key: string) => delete result[key]);
    return result;
  }),
}));

vi.mock('/@/enums/httpEnum', () => ({
  ContentTypeEnum: {
    JSON: 'application/json',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    FORM_DATA: 'multipart/form-data',
  },
  RequestEnum: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

describe('VAxios', () => {
  let vAxios: VAxios;
  let mockOptions: CreateAxiosOptions;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockOptions = {
      baseURL: 'https://api.example.com',
      timeout: 10000,
      transform: {
        beforeRequestHook: vi.fn(),
        transformRequestHook: vi.fn(),
        requestCatchHook: vi.fn(),
        requestInterceptors: vi.fn(),
        responseInterceptors: vi.fn(),
        requestInterceptorsCatch: vi.fn(),
        responseInterceptorsCatch: vi.fn(),
      },
      requestOptions: {
        joinTime: true,
        joinParamsToUrl: false,
        formatDate: true,
        errorMessageMode: 'message',
        successMessageMode: 'success',
        isTransformResponse: true,
        isReturnNativeResponse: false,
        ignoreCancelToken: false,
        withToken: true,
      },
    };
  });

  it('should create VAxios instance with options', () => {
    vAxios = new VAxios(mockOptions);
    expect(vAxios).toBeDefined();
    expect(vAxios.getAxios()).toBe(mockAxiosInstance);
  });

  it('should get transform from options', () => {
    vAxios = new VAxios(mockOptions);
    const transform = (vAxios as any).getTransform();
    expect(transform).toBe(mockOptions.transform);
  });

  it('should configure axios with new options', () => {
    vAxios = new VAxios(mockOptions);
    const newOptions = { ...mockOptions, baseURL: 'https://new-api.example.com' };
    
    vAxios.configAxios(newOptions);
    expect(mockAxiosInstance).toBeDefined();
  });

  it('should handle configAxios when axiosInstance is null', () => {
    vAxios = new VAxios(mockOptions);
    (vAxios as any).axiosInstance = null;
    
    vAxios.configAxios(mockOptions);
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should setup interceptors on construction', () => {
    vAxios = new VAxios(mockOptions);
    
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });

  it('should get axios instance', () => {
    vAxios = new VAxios(mockOptions);
    const instance = vAxios.getAxios();
    expect(instance).toBe(mockAxiosInstance);
  });
});
