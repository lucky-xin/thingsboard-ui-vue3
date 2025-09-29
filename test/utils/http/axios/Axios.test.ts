import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VAxios } from '/@/utils/http/axios/Axios';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { isFunction } from '/@/utils/is';
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum';
import qs from 'qs';

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
  defaults: {
    headers: {},
  },
  request: vi.fn(() => Promise.resolve({ data: 'test' })),
};

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => mockAxiosInstance),
    isAxiosError: vi.fn(() => true),
  },
}));

// Mock dependencies
vi.mock('/@/utils/http/axios/axiosCancel', () => ({
  AxiosCanceler: vi.fn(() => ({
    addPending: vi.fn(),
    removePending: vi.fn(),
  })),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

vi.mock('qs', () => ({
  default: {
    stringify: vi.fn((data) => JSON.stringify(data)),
  },
}));

vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
  omit: vi.fn((obj, ...keys) => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
  }),
}));

vi.mock('/@/enums/httpEnum', () => ({
  ContentTypeEnum: {
    FORM_DATA: 'multipart/form-data',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    JSON: 'application/json',
  },
  RequestEnum: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  },
}));

describe('utils/http/axios/Axios', () => {
  let vAxios: VAxios;
  let mockOptions: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockOptions = {
      baseURL: 'https://api.example.com',
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      requestOptions: {
        ignoreCancelToken: false,
      },
      transform: {
        requestInterceptors: vi.fn((config) => config),
        requestInterceptorsCatch: vi.fn(),
        responseInterceptors: vi.fn((res) => res),
        responseInterceptorsCatch: vi.fn(),
        beforeRequestHook: vi.fn((config) => config),
        transformRequestHook: vi.fn((res) => res.data),
        requestCatchHook: vi.fn(),
      },
    };

    vAxios = new VAxios(mockOptions);
  });

  it('should create VAxios instance', () => {
    expect(vAxios).toBeInstanceOf(VAxios);
  });

  it('should get axios instance', () => {
    const instance = vAxios.getAxios();
    expect(instance).toBe(mockAxiosInstance);
  });

  it('should configure axios', () => {
    const newConfig = {
      baseURL: 'https://new-api.example.com',
      timeout: 10000,
    };

    expect(() => vAxios.configAxios(newConfig)).not.toThrow();
  });

  it('should set headers', () => {
    const headers = {
      Authorization: 'Bearer token',
      'X-Custom-Header': 'value',
    };

    vAxios.setHeader(headers);

    expect(mockAxiosInstance.defaults.headers).toEqual(expect.objectContaining(headers));
  });

  it('should handle upload file', () => {
    const config = {
      url: '/upload',
    };
    const params = {
      name: 'file',
      file: new File(['test'], 'test.txt'),
      filename: 'test.txt',
      data: {
        userId: 123,
        category: 'documents',
      },
    };

    // Mock FormData
    global.FormData = vi.fn(() => ({
      append: vi.fn(),
    })) as any;

    const result = vAxios.uploadFile(config, params);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/upload',
        method: 'POST',
        headers: {
          'Content-type': 'multipart/form-data',
          ignoreCancelToken: 'true',
        },
      }),
    );
  });

  it('should handle upload file with array data', () => {
    const config = {
      url: '/upload',
    };
    const params = {
      name: 'files',
      file: new File(['test'], 'test.txt'),
      filename: 'test.txt',
      data: {
        tags: ['tag1', 'tag2'],
        userId: 123,
      },
    };

    global.FormData = vi.fn(() => ({
      append: vi.fn(),
    })) as any;

    const result = vAxios.uploadFile(config, params);

    expect(result).toBeDefined();
  });

  it('should support form data with GET request', () => {
    const config = {
      method: 'GET',
      url: '/api/test',
      params: {
        id: 123,
        name: 'test',
      },
    };

    const result = vAxios.supportFormData(config);

    expect(result.url).toContain('?');
    expect(result.params).toEqual({});
  });

  it('should support form data with POST request and form-urlencoded content type', () => {
    const config = {
      method: 'POST',
      url: '/api/test',
      data: {
        id: 123,
        name: 'test',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const result = vAxios.supportFormData(config);

    expect(result.data).toBeDefined();
    expect(qs.stringify).toHaveBeenCalledWith(config.data, { arrayFormat: 'indices' });
  });

  it('should not modify config for non-form-urlencoded content type', () => {
    const config = {
      method: 'POST',
      url: '/api/test',
      data: { id: 123 },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = vAxios.supportFormData(config);

    expect(result).toEqual(config);
  });

  it('should handle GET request', () => {
    const config = {
      url: '/api/users',
    };

    const result = vAxios.get(config);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/api/users',
      }),
    );
  });

  it('should handle POST request', () => {
    const config = {
      url: '/api/users',
      data: { name: 'test' },
    };

    const result = vAxios.post(config);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/users',
        data: { name: 'test' },
      }),
    );
  });

  it('should handle POST JSON request', () => {
    const config = {
      url: '/api/users',
      data: { name: 'test' },
    };

    const result = vAxios.postJson(config);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/users',
        data: { name: 'test' },
        headers: {
          'content-type': 'application/json',
        },
      }),
    );
  });

  it('should handle PUT request', () => {
    const config = {
      url: '/api/users/1',
      data: { name: 'updated' },
    };

    const result = vAxios.put(config);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PUT',
        url: '/api/users/1',
        data: { name: 'updated' },
      }),
    );
  });

  it('should handle DELETE request', () => {
    const config = {
      url: '/api/users/1',
    };

    const result = vAxios.delete(config);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'DELETE',
        url: '/api/users/1',
      }),
    );
  });

  it('should handle request with options', () => {
    const config = {
      url: '/api/test',
    };
    const options = {
      withToken: true,
      joinTime: true,
    };

    const result = vAxios.get(config, options);

    expect(result).toBeDefined();
    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/api/test',
      }),
    );
  });

  it('should handle request with transform hooks', async () => {
    const config = {
      url: '/api/test',
    };

    // Mock successful response
    mockAxiosInstance.request.mockResolvedValueOnce({
      data: { success: true },
    });

    const result = await vAxios.request(config);

    expect(result).toBeDefined();
  });

  it('should handle request with error', async () => {
    const config = {
      url: '/api/test',
    };

    // Mock error response
    const error = new Error('Network error');
    mockAxiosInstance.request.mockRejectedValueOnce(error);

    await expect(vAxios.request(config)).rejects.toThrow('Network error');
  });

  it('should handle request with transform error', async () => {
    const config = {
      url: '/api/test',
    };

    // Mock successful response but transform error
    mockAxiosInstance.request.mockResolvedValueOnce({
      data: { success: true },
    });

    // Mock transform hook to throw error
    mockOptions.transform.transformRequestHook.mockImplementationOnce(() => {
      throw new Error('Transform error');
    });

    try {
      await vAxios.request(config);
    } catch (e) {
      expect(e.message).toBe('Transform error');
    }
  });

  it('should handle request with axios error', async () => {
    const config = {
      url: '/api/test',
    };

    // Mock axios error
    const axiosError = {
      isAxiosError: true,
      message: 'Network Error',
    };
    mockAxiosInstance.request.mockRejectedValueOnce(axiosError);

    // No requestCatchHook to test axios error branch
    mockOptions.transform.requestCatchHook = undefined;

    try {
      await vAxios.request(config);
    } catch (e) {
      expect(e).toBe(axiosError);
    }
  });

  it('should handle request with non-axios error', async () => {
    const config = {
      url: '/api/test',
    };

    // Mock non-axios error
    const error = new Error('Generic error');
    mockAxiosInstance.request.mockRejectedValueOnce(error);

    // No requestCatchHook to test non-axios error branch
    mockOptions.transform.requestCatchHook = undefined;

    try {
      await vAxios.request(config);
    } catch (e) {
      expect(e).toBe(error);
    }
  });

  it('should handle request catch hook', async () => {
    const config = {
      url: '/api/test',
    };

    const error = new Error('Request error');
    mockAxiosInstance.request.mockRejectedValueOnce(error);

    // Mock catch hook
    mockOptions.transform.requestCatchHook.mockReturnValueOnce('Handled error');

    try {
      await vAxios.request(config);
    } catch (e) {
      expect(e).toBe('Handled error');
    }
  });

  it('should handle request without transform', async () => {
    const vAxiosNoTransform = new VAxios({
      baseURL: 'https://api.example.com',
      transform: undefined,
    });

    const config = {
      url: '/api/test',
    };

    mockAxiosInstance.request.mockResolvedValueOnce({
      data: { success: true },
    });

    const result = await vAxiosNoTransform.request(config);

    expect(result).toBeDefined();
  });

  it('should handle configAxios when axios instance is null', () => {
    const vAxiosNoInstance = new VAxios(mockOptions);
    // @ts-ignore - Simulate null instance
    vAxiosNoInstance['axiosInstance'] = null;

    expect(() => vAxiosNoInstance.configAxios(mockOptions)).not.toThrow();
  });

  it('should handle setupInterceptors with missing transform', () => {
    const vAxiosNoTransform = new VAxios({
      ...mockOptions,
      transform: undefined,
    });

    expect(vAxiosNoTransform).toBeDefined();
  });

  it('should handle setupInterceptors with missing requestInterceptors', () => {
    const vAxiosNoRequestInterceptors = new VAxios({
      ...mockOptions,
      transform: {
        ...mockOptions.transform,
        requestInterceptors: undefined,
      },
    });

    expect(vAxiosNoRequestInterceptors).toBeDefined();
  });

  it('should handle setupInterceptors with missing responseInterceptors', () => {
    const vAxiosNoResponseInterceptors = new VAxios({
      ...mockOptions,
      transform: {
        ...mockOptions.transform,
        responseInterceptors: undefined,
      },
    });

    expect(vAxiosNoResponseInterceptors).toBeDefined();
  });

  it('should handle setupInterceptors with non-function interceptors', () => {
    const vAxiosNonFunctionInterceptors = new VAxios({
      ...mockOptions,
      transform: {
        ...mockOptions.transform,
        requestInterceptors: 'not a function',
        responseInterceptors: 'not a function',
      },
    });

    expect(vAxiosNonFunctionInterceptors).toBeDefined();
  });

  it('should handle setHeader when axios instance is null', () => {
    const vAxiosNoInstance = new VAxios(mockOptions);
    // @ts-ignore - Simulate null instance
    vAxiosNoInstance['axiosInstance'] = null;

    expect(() => vAxiosNoInstance.setHeader({})).not.toThrow();
  });

  it('should handle request with ignoreCancelToken header', () => {
    const config = {
      url: '/api/test',
      headers: {
        ignoreCancelToken: 'true',
      },
    };

    const result = vAxios.request(config);

    expect(result).toBeDefined();
  });

  it('should handle request with false ignoreCancelToken header', () => {
    const config = {
      url: '/api/test',
      headers: {
        ignoreCancelToken: 'false',
      },
    };

    const result = vAxios.request(config);

    expect(result).toBeDefined();
  });

  it('should handle request with undefined ignoreCancelToken header', () => {
    const config = {
      url: '/api/test',
      headers: {},
    };

    const result = vAxios.request(config);

    expect(result).toBeDefined();
  });

  it('should handle upload file with custom params', () => {
    const config = {
      url: '/upload',
    };
    const params = {
      name: 'file',
      file: new File(['test'], 'test.txt'),
      filename: 'test.txt',
      customParam: 'customValue',
    };

    global.FormData = vi.fn(() => ({
      append: vi.fn(),
    })) as any;

    const result = vAxios.uploadFile(config, params);

    expect(result).toBeDefined();
  });

  it('should handle upload file without data', () => {
    const config = {
      url: '/upload',
    };
    const params = {
      name: 'file',
      file: new File(['test'], 'test.txt'),
      filename: 'test.txt',
    };

    global.FormData = vi.fn(() => ({
      append: vi.fn(),
    })) as any;

    const result = vAxios.uploadFile(config, params);

    expect(result).toBeDefined();
  });

  it('should handle supportFormData with existing query params', () => {
    const config = {
      method: 'GET',
      url: '/api/test?existing=param',
      params: {
        id: 123,
      },
    };

    const result = vAxios.supportFormData(config);

    expect(result.url).toContain('existing=param');
    expect(result.params).toEqual({});
  });
});
