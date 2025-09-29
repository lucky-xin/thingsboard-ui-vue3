import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BasicQuery } from '/@/api/model/baseModel';

// Mock the http client - create the mock functions directly in the factory
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Import after the mock is set up
import {
  saveWidgetsBundle,
  getWidgetsBundleById,
  deleteWidgetsBundle,
  widgetsBundles,
  widgetsBundleList,
} from '/@/api/tb/widgetsBundle';
import { defHttp } from '/@/utils/http/axios';

// Cast defHttp to access the mock functions
const mockDefHttp = defHttp as any;

describe('Widgets Bundle API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('saveWidgetsBundle', () => {
    it('should save widgets bundle with data', async () => {
      const bundleData = {
        name: 'New Bundle',
        alias: 'new_bundle',
        title: 'New Bundle Title',
        description: 'Test bundle description',
      };
      const mockResponse = {
        id: { id: 'new-bundle-id' },
        ...bundleData,
      };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetsBundle(bundleData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetsBundle',
        data: bundleData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should save widgets bundle without data', async () => {
      const mockResponse = {
        id: { id: 'empty-bundle-id' },
        name: 'Default Bundle',
      };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveWidgetsBundle();

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/widgetsBundle',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getWidgetsBundleById', () => {
    it('should get widgets bundle by ID', async () => {
      const bundleId = 'test-bundle-id';
      const mockResponse = {
        id: { id: bundleId },
        name: 'Test Bundle',
        alias: 'test_bundle',
        title: 'Test Bundle Title',
        description: 'Test description',
        image: 'test-image.png',
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getWidgetsBundleById(bundleId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/widgetsBundle/${bundleId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteWidgetsBundle', () => {
    it('should delete widgets bundle', async () => {
      const bundleId = 'test-bundle-id';

      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteWidgetsBundle(bundleId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/widgetsBundle/${bundleId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('widgetsBundles', () => {
    it('should get all widgets bundles', async () => {
      const mockResponse = [
        {
          id: { id: 'bundle1' },
          name: 'Bundle 1',
          alias: 'bundle_1',
          title: 'Bundle 1 Title',
        },
        {
          id: { id: 'bundle2' },
          name: 'Bundle 2',
          alias: 'bundle_2',
          title: 'Bundle 2 Title',
        },
      ];

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundles();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetsBundles',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('widgetsBundleList', () => {
    it('should get widgets bundle list with parameters', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 10,
        sortProperty: 'name',
        sortOrder: 'ASC',
      };
      const mockResponse = {
        data: [
          {
            id: { id: 'bundle1' },
            name: 'Bundle 1',
            alias: 'bundle_1',
          },
          {
            id: { id: 'bundle2' },
            name: 'Bundle 2',
            alias: 'bundle_2',
          },
        ],
        totalElements: 2,
        totalPages: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundleList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetsBundles',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get widgets bundle list with minimal parameters', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 20,
      };
      const mockResponse = {
        data: [
          {
            id: { id: 'bundle1' },
            name: 'Bundle 1',
          },
        ],
        totalElements: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await widgetsBundleList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/widgetsBundles',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle saveWidgetsBundle errors', async () => {
      const bundleData = { name: 'Invalid Bundle' };
      const error = new Error('Validation failed');

      mockDefHttp.postJson.mockRejectedValue(error);

      await expect(saveWidgetsBundle(bundleData)).rejects.toThrow('Validation failed');
    });

    it('should handle getWidgetsBundleById errors', async () => {
      const bundleId = 'invalid-id';
      const error = new Error('Bundle not found');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(getWidgetsBundleById(bundleId)).rejects.toThrow('Bundle not found');
    });

    it('should handle deleteWidgetsBundle errors', async () => {
      const bundleId = 'in-use-bundle-id';
      const error = new Error('Bundle is in use');

      mockDefHttp.delete.mockRejectedValue(error);

      await expect(deleteWidgetsBundle(bundleId)).rejects.toThrow('Bundle is in use');
    });

    it('should handle widgetsBundles errors', async () => {
      const error = new Error('Server error');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(widgetsBundles()).rejects.toThrow('Server error');
    });

    it('should handle widgetsBundleList errors', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10 };
      const error = new Error('Server error');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(widgetsBundleList(params)).rejects.toThrow('Server error');
    });
  });
});
