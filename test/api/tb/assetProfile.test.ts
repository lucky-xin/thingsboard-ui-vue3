import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAssetProfileById,
  getAssetProfileInfoById,
  getDefaultAssetProfileInfo,
  setDefaultAssetProfile,
  saveAssetProfile,
  deleteAssetProfile,
  assetProfileList,
  assetProfileInfoList,
} from '/@/api/tb/assetProfile';
import type {
  AssetProfile,
  AssetProfileInfo,
} from '/@/api/tb/assetProfile';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/assetProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAssetProfileById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetProfile = {
        id: 'profile-1',
        createdTime: 1234567890,
        name: 'Test Asset Profile',
        description: 'Test profile description',
        image: 'profile-image.jpg',
        default: false,
        defaultQueueName: 'default-queue',
        defaultRuleChainId: 'rule-chain-1',
        defaultEdgeRuleChainId: 'edge-rule-chain-1',
        defaultDashboardId: 'dashboard-1',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetProfileById('profile-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assetProfile/profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAssetProfileInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetProfileInfo = {
        id: 'profile-1',
        name: 'Test Asset Profile',
        image: 'profile-image.jpg',
        tenantId: 'tenant-1',
        defaultDashboardId: 'dashboard-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAssetProfileInfoById('profile-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assetProfileInfo/profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDefaultAssetProfileInfo', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetProfileInfo = {
        id: 'default-profile',
        name: 'Default Asset Profile',
        image: 'default-image.jpg',
        tenantId: 'tenant-1',
        defaultDashboardId: 'default-dashboard',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getDefaultAssetProfileInfo();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assetProfileInfo/default',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setDefaultAssetProfile', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetProfile = {
        id: 'profile-1',
        createdTime: 1234567890,
        name: 'Test Asset Profile',
        default: true,
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await setDefaultAssetProfile('profile-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/assetProfile/profile-1/default',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAssetProfile', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AssetProfile = {
        id: 'profile-1',
        createdTime: 1234567890,
        name: 'Test Asset Profile',
        description: 'Test profile description',
        image: 'profile-image.jpg',
        default: false,
        defaultQueueName: 'default-queue',
        defaultRuleChainId: 'rule-chain-1',
        defaultEdgeRuleChainId: 'edge-rule-chain-1',
        defaultDashboardId: 'dashboard-1',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
      };
      const testData: AssetProfile = {
        id: 'profile-1',
        createdTime: 1234567890,
        name: 'Test Asset Profile',
        description: 'Test profile description',
        image: 'profile-image.jpg',
        default: false,
        defaultQueueName: 'default-queue',
        defaultRuleChainId: 'rule-chain-1',
        defaultEdgeRuleChainId: 'edge-rule-chain-1',
        defaultDashboardId: 'dashboard-1',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAssetProfile(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/assetProfile',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Profile', description: 'New description' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAssetProfile(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/assetProfile',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAssetProfile', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteAssetProfile('profile-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/assetProfile/profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assetProfileList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'profile-1',
            createdTime: 1234567890,
            name: 'Profile 1',
            description: 'Description 1',
          },
          {
            id: 'profile-2',
            createdTime: 1234567891,
            name: 'Profile 2',
            description: 'Description 2',
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
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await assetProfileList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assetProfiles',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assetProfileInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'profile-1',
            name: 'Profile Info 1',
            image: 'image1.jpg',
            tenantId: 'tenant-1',
            defaultDashboardId: 'dashboard-1',
          },
          {
            id: 'profile-2',
            name: 'Profile Info 2',
            image: 'image2.jpg',
            tenantId: 'tenant-1',
            defaultDashboardId: 'dashboard-2',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'info',
        sortProperty: 'name',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await assetProfileInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/assetProfileInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create AssetProfile object', () => {
      const assetProfile: AssetProfile = {
        id: 'profile-1',
        createdTime: 1234567890,
        name: 'Test Asset Profile',
        description: 'Test profile description',
        image: 'profile-image.jpg',
        default: true,
        defaultQueueName: 'default-queue',
        defaultRuleChainId: 'rule-chain-1',
        defaultEdgeRuleChainId: 'edge-rule-chain-1',
        defaultDashboardId: 'dashboard-1',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
      };

      expect(assetProfile.id).toBe('profile-1');
      expect(assetProfile.createdTime).toBe(1234567890);
      expect(assetProfile.name).toBe('Test Asset Profile');
      expect(assetProfile.description).toBe('Test profile description');
      expect(assetProfile.image).toBe('profile-image.jpg');
      expect(assetProfile.default).toBe(true);
      expect(assetProfile.defaultQueueName).toBe('default-queue');
      expect(assetProfile.defaultRuleChainId).toBe('rule-chain-1');
      expect(assetProfile.defaultEdgeRuleChainId).toBe('edge-rule-chain-1');
      expect(assetProfile.defaultDashboardId).toBe('dashboard-1');
      expect(assetProfile.tenantId).toBe('tenant-1');
      expect(assetProfile.externalId).toBe('ext-1');
    });

    it('should create AssetProfileInfo object', () => {
      const assetProfileInfo: AssetProfileInfo = {
        id: 'profile-1',
        name: 'Test Asset Profile Info',
        image: 'profile-info-image.jpg',
        tenantId: 'tenant-1',
        defaultDashboardId: 'dashboard-1',
      };

      expect(assetProfileInfo.id).toBe('profile-1');
      expect(assetProfileInfo.name).toBe('Test Asset Profile Info');
      expect(assetProfileInfo.image).toBe('profile-info-image.jpg');
      expect(assetProfileInfo.tenantId).toBe('tenant-1');
      expect(assetProfileInfo.defaultDashboardId).toBe('dashboard-1');
    });

    it('should create AssetProfile with minimal fields', () => {
      const assetProfile: AssetProfile = {
        id: 'profile-minimal',
        createdTime: 1234567890,
        name: 'Minimal Profile',
      };

      expect(assetProfile.id).toBe('profile-minimal');
      expect(assetProfile.createdTime).toBe(1234567890);
      expect(assetProfile.name).toBe('Minimal Profile');
      expect(assetProfile.description).toBeUndefined();
      expect(assetProfile.image).toBeUndefined();
      expect(assetProfile.default).toBeUndefined();
      expect(assetProfile.defaultQueueName).toBeUndefined();
      expect(assetProfile.defaultRuleChainId).toBeUndefined();
      expect(assetProfile.defaultEdgeRuleChainId).toBeUndefined();
      expect(assetProfile.defaultDashboardId).toBeUndefined();
      expect(assetProfile.tenantId).toBeUndefined();
      expect(assetProfile.externalId).toBeUndefined();
    });

    it('should create AssetProfileInfo with minimal fields', () => {
      const assetProfileInfo: AssetProfileInfo = {
        id: 'profile-info-minimal',
        name: 'Minimal Profile Info',
      };

      expect(assetProfileInfo.id).toBe('profile-info-minimal');
      expect(assetProfileInfo.name).toBe('Minimal Profile Info');
      expect(assetProfileInfo.image).toBeUndefined();
      expect(assetProfileInfo.tenantId).toBeUndefined();
      expect(assetProfileInfo.defaultDashboardId).toBeUndefined();
    });
  });
});