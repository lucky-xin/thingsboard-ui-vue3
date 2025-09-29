import { describe, it, expect } from 'vitest';
import { AxiosTransform } from '/@/utils/http/axios/axiosTransform';
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

describe('AxiosTransform', () => {
  class TestAxiosTransform extends AxiosTransform {
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
    transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
    requestInterceptors?: (config: AxiosRequestConfig, options: any) => AxiosRequestConfig;
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
    requestInterceptorsCatch?: (error: Error) => void;
    responseInterceptorsCatch?: (error: Error, instance: AxiosInstance) => void;
  }

  it('should create AxiosTransform instance', () => {
    const transform = new TestAxiosTransform();
    expect(transform).toBeDefined();
  });

  it('should have optional hook properties', () => {
    const transform = new TestAxiosTransform();

    expect(transform.beforeRequestHook).toBeUndefined();
    expect(transform.transformRequestHook).toBeUndefined();
    expect(transform.requestCatchHook).toBeUndefined();
    expect(transform.requestInterceptors).toBeUndefined();
    expect(transform.responseInterceptors).toBeUndefined();
    expect(transform.requestInterceptorsCatch).toBeUndefined();
    expect(transform.responseInterceptorsCatch).toBeUndefined();
  });

  it('should allow setting hook properties', () => {
    const transform = new TestAxiosTransform();
    const mockConfig = {} as AxiosRequestConfig;
    const mockOptions = {} as RequestOptions;
    const mockResponse = {} as AxiosResponse<Result>;
    const mockError = new Error('Test error');
    const mockInstance = {} as AxiosInstance;

    transform.beforeRequestHook = (config, options) => config;
    transform.transformRequestHook = (res, options) => res.data;
    transform.requestCatchHook = async (e, options) => Promise.resolve();
    transform.requestInterceptors = (config, options) => config;
    transform.responseInterceptors = (res) => res;
    transform.requestInterceptorsCatch = (error) => {};
    transform.responseInterceptorsCatch = (error, instance) => {};

    expect(transform.beforeRequestHook).toBeDefined();
    expect(transform.transformRequestHook).toBeDefined();
    expect(transform.requestCatchHook).toBeDefined();
    expect(transform.requestInterceptors).toBeDefined();
    expect(transform.responseInterceptors).toBeDefined();
    expect(transform.requestInterceptorsCatch).toBeDefined();
    expect(transform.responseInterceptorsCatch).toBeDefined();
  });

  it('should call beforeRequestHook when defined', () => {
    const transform = new TestAxiosTransform();
    const mockConfig = { url: '/test' } as AxiosRequestConfig;
    const mockOptions = { joinTime: true } as RequestOptions;

    transform.beforeRequestHook = (config, options) => {
      return { ...config, url: '/modified' };
    };

    const result = transform.beforeRequestHook!(mockConfig, mockOptions);
    expect(result.url).toBe('/modified');
  });

  it('should call transformRequestHook when defined', () => {
    const transform = new TestAxiosTransform();
    const mockResponse = { data: { code: 200, result: 'success' } } as AxiosResponse<Result>;
    const mockOptions = { isTransformResponse: true } as RequestOptions;

    transform.transformRequestHook = (res, options) => {
      return res.data.result;
    };

    const result = transform.transformRequestHook!(mockResponse, mockOptions);
    expect(result).toBe('success');
  });

  it('should call requestCatchHook when defined', async () => {
    const transform = new TestAxiosTransform();
    const mockError = new Error('Network error');
    const mockOptions = { errorMessageMode: 'message' } as RequestOptions;

    transform.requestCatchHook = async (e, options) => {
      return Promise.resolve('handled');
    };

    const result = await transform.requestCatchHook!(mockError, mockOptions);
    expect(result).toBe('handled');
  });
});
