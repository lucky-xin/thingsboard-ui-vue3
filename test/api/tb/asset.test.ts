import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAssetById,
  getAssetInfoById,
  getTenantAssetByName,
  saveAsset,
  deleteAsset,
  assignAssetToCustomer,
  assignAssetToPublicCustomer,
  unAssignAssetFromCustomer,
  getTenantAssetList,
  getEdgeAssetList,
  getCustomerAssetList,
  getTenantAssetInfoList,
  getCustomerAssetInfoList,
  getAssetsByIds,
  getAssetListByQuery,
  getAssetTypes,
  assignAssetToEdge,
  unAssignAssetFromEdge,
  processAssetsBulkImport,
} from '/@/api/tb/asset';
import type {
  Asset,
  AssetInfo,
  AssetSearchQuery,
} from '/@/api/tb/asset';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/asset', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAssetById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
        label: 'Building A',
        assetProfileId: 'profile-1',
        externalId: 'ext-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        additionalInfo: { description: 'Test building asset' },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetById('asset-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAssetInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetInfo = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
        label: 'Building A',
        customerTitle: 'Customer A',
        customerIsPublic: false,
        assetProfileName: 'Building Profile',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetInfoById('asset-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/asset/info/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantAssetByName', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantAssetByName('Test Asset');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/assets',
        params: { assetName: 'Test Asset' },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAsset', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
      };
      const testData: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAsset(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/asset',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Asset', type: 'vehicle' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAsset(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/asset',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAsset', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteAsset('asset-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignAssetToCustomer', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        customerId: 'customer-1',
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignAssetToCustomer('customer-1', 'asset-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignAssetToPublicCustomer', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        customerId: 'public',
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignAssetToPublicCustomer('asset-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/customer/public/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unAssignAssetFromCustomer', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await unAssignAssetFromCustomer('asset-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/customer/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantAssetList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'asset-1',
            createdTime: 1234567890,
            name: 'Asset 1',
          },
          {
            id: 'asset-2',
            createdTime: 1234567891,
            name: 'Asset 2',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantAssetList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/assets',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEdgeAssetList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'asset-1',
            createdTime: 1234567890,
            name: 'Edge Asset 1',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEdgeAssetList(params, 'edge-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/assets',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerAssetList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'asset-1',
            createdTime: 1234567890,
            name: 'Customer Asset 1',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerAssetList(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/assets',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantAssetInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'asset-1',
            createdTime: 1234567890,
            name: 'Asset Info 1',
            customerTitle: 'Customer A',
            customerIsPublic: false,
            assetProfileName: 'Profile A',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantAssetInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/assetInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerAssetInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'asset-1',
            createdTime: 1234567890,
            name: 'Customer Asset Info 1',
            customerTitle: 'Customer B',
            customerIsPublic: true,
            assetProfileName: 'Profile B',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerAssetInfoList(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/assetInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAssetsByIds', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [
        {
          id: 'asset-1',
          createdTime: 1234567890,
          name: 'Asset 1',
        },
        {
          id: 'asset-2',
          createdTime: 1234567891,
          name: 'Asset 2',
        },
      ];
      const assetIds = ['asset-1', 'asset-2'];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetsByIds(assetIds);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assets',
        params: { assetIds },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAssetListByQuery', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [
        {
          id: 'asset-1',
          createdTime: 1234567890,
          name: 'Query Asset 1',
        },
      ];
      const testData: AssetSearchQuery = {
        parameters: {
          rootId: 'root-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM',
          relationTypeGroup: 'COMMON' as any,
          maxLevel: 2,
          fetchLastLevelOnly: false,
        },
        relationType: 'CONTAINS',
        assetTypes: ['building', 'vehicle'],
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getAssetListByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/assets',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [{ id: 'asset-1', name: 'Test Asset' }];
      const testData = { search: 'test', types: ['building'] };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getAssetListByQuery(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/assets',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAssetTypes', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = [
        {
          tenantId: 'tenant-1',
          entityType: 'ASSET' as any,
          type: 'building',
        },
        {
          tenantId: 'tenant-1',
          entityType: 'ASSET' as any,
          type: 'vehicle',
        },
      ];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetTypes();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/asset/types',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignAssetToEdge', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Edge Asset',
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignAssetToEdge('edge-1', 'asset-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unAssignAssetFromEdge', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await unAssignAssetFromEdge('edge-1', 'asset-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/edge/edge-1/asset/asset-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('processAssetsBulkImport', () => {
    it('should be defined as empty function', () => {
      expect(processAssetsBulkImport).toBeDefined();
      expect(typeof processAssetsBulkImport).toBe('function');
      
      // This function is empty, so we just verify it exists and can be called
      expect(() => processAssetsBulkImport()).not.toThrow();
    });
  });

  describe('Type definitions', () => {
    it('should create Asset object', () => {
      const asset: Asset = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
        label: 'Building A',
        assetProfileId: 'profile-1',
        externalId: 'ext-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        additionalInfo: { description: 'Test building asset' },
      };

      expect(asset.id).toBe('asset-1');
      expect(asset.createdTime).toBe(1234567890);
      expect(asset.name).toBe('Test Asset');
      expect(asset.type).toBe('building');
      expect(asset.label).toBe('Building A');
      expect(asset.assetProfileId).toBe('profile-1');
      expect(asset.externalId).toBe('ext-1');
      expect(asset.tenantId).toBe('tenant-1');
      expect(asset.customerId).toBe('customer-1');
      expect(asset.additionalInfo).toEqual({ description: 'Test building asset' });
    });

    it('should create AssetInfo object', () => {
      const assetInfo: AssetInfo = {
        id: 'asset-1',
        createdTime: 1234567890,
        name: 'Test Asset',
        type: 'building',
        label: 'Building A',
        customerTitle: 'Customer A',
        customerIsPublic: false,
        assetProfileName: 'Building Profile',
      };

      expect(assetInfo.id).toBe('asset-1');
      expect(assetInfo.createdTime).toBe(1234567890);
      expect(assetInfo.name).toBe('Test Asset');
      expect(assetInfo.type).toBe('building');
      expect(assetInfo.label).toBe('Building A');
      expect(assetInfo.customerTitle).toBe('Customer A');
      expect(assetInfo.customerIsPublic).toBe(false);
      expect(assetInfo.assetProfileName).toBe('Building Profile');
    });

    it('should create AssetSearchQuery object', () => {
      const assetSearchQuery: AssetSearchQuery = {
        parameters: {
          rootId: 'root-1',
          rootType: 'DEVICE' as any,
          direction: 'FROM',
          relationTypeGroup: 'COMMON' as any,
          maxLevel: 3,
          fetchLastLevelOnly: true,
        },
        relationType: 'CONTAINS',
        assetTypes: ['building', 'vehicle', 'equipment'],
      };

      expect(assetSearchQuery.parameters?.rootId).toBe('root-1');
      expect(assetSearchQuery.parameters?.rootType).toBe('DEVICE');
      expect(assetSearchQuery.parameters?.direction).toBe('FROM');
      expect(assetSearchQuery.parameters?.relationTypeGroup).toBe('COMMON');
      expect(assetSearchQuery.parameters?.maxLevel).toBe(3);
      expect(assetSearchQuery.parameters?.fetchLastLevelOnly).toBe(true);
      expect(assetSearchQuery.relationType).toBe('CONTAINS');
      expect(assetSearchQuery.assetTypes).toEqual(['building', 'vehicle', 'equipment']);
    });
  });
});