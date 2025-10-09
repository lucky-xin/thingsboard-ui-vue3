import { describe, it, expect, vi } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

import {
  saveWidgetsBundle,
  getWidgetsBundleById,
  deleteWidgetsBundle,
  widgetsBundles,
  widgetsBundleList,
} from '/@/api/tb/widgetsBundle';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/widgetsBundle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveWidgetsBundle', () => {
    it('should call defHttp.postJson with data', async () => {
      const bundleData = {
        name: 'Test Bundle',
        alias: 'test-bundle',
        title: 'Test Widget Bundle',
        description: 'A test widget bundle',
      };
      const mockResponse = { id: '1', ...bundleData };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetsBundle(bundleData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetsBundle',
        data: bundleData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.postJson without data', async () => {
      const mockResponse = { id: '1', name: 'Default Bundle' };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetsBundle();

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetsBundle',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.postJson with null data', async () => {
      const mockResponse = { id: '1', name: 'Empty Bundle' };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetsBundle(null);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetsBundle',
        data: null,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWidgetsBundleById', () => {
    it('should call defHttp.get with correct widgetsBundleId', async () => {
      const widgetsBundleId = 'bundle123';
      const mockResponse = {
        id: widgetsBundleId,
        name: 'Test Bundle',
        alias: 'test-bundle',
        title: 'Test Widget Bundle',
      };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetsBundleById(widgetsBundleId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundle/${widgetsBundleId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteWidgetsBundle', () => {
    it('should call defHttp.delete with correct widgetsBundleId', async () => {
      const widgetsBundleId = 'bundle123';
      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteWidgetsBundle(widgetsBundleId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/widgetsBundle/${widgetsBundleId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('widgetsBundles', () => {
    it('should call defHttp.get with correct url', async () => {
      const mockResponse = [
        {
          id: '1',
          name: 'System Bundle',
          alias: 'system',
          title: 'System Widget Bundle',
        },
        {
          id: '2',
          name: 'Custom Bundle',
          alias: 'custom',
          title: 'Custom Widget Bundle',
        },
      ];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundles();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundles`,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty response', async () => {
      const mockResponse = [];
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundles();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundles`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('widgetsBundleList', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const params = { page: 1, size: 10, textSearch: 'test' };
      const mockResponse = {
        data: [
          {
            id: '1',
            name: 'Test Bundle',
            alias: 'test-bundle',
            title: 'Test Widget Bundle',
          },
        ],
        totalElements: 1,
        totalPages: 1,
      };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundleList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundles`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty params', async () => {
      const params = {};
      const mockResponse = {
        data: [],
        totalElements: 0,
        totalPages: 0,
      };
      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundleList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundles`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error response', async () => {
      const params = { page: 1, size: 10 };
      const mockError = new Error('Network error');
      mockDefHttp.get.mockRejectedValue(mockError);

      await expect(widgetsBundleList(params)).rejects.toThrow('Network error');
    });
  });
});