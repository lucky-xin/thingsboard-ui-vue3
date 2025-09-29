import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TransportType } from '/@/enums/deviceEnum';
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
  getDeviceProfileById,
  getDeviceProfileInfoById,
  getDefaultDeviceProfileInfo,
  setDefaultDeviceProfile,
  deviceProfileList,
  getDeviceProfileInfoList,
  saveDeviceProfile,
  deleteDeviceProfile,
  getTimeseriesKeys,
  getAttributesKeys,
} from '/@/api/tb/deviceProfile';
import { defHttp } from '/@/utils/http/axios';

// Cast defHttp to access the mock functions
const mockDefHttp = defHttp as any;

describe('Device Profile API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('getDeviceProfileById', () => {
    it('should get device profile by ID', async () => {
      const deviceProfileId = 'test-profile-id';
      const mockResponse = {
        id: { id: deviceProfileId },
        name: 'Test Profile',
        type: 'DEFAULT',
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getDeviceProfileById(deviceProfileId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/deviceProfile/${deviceProfileId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDeviceProfileInfoById', () => {
    it('should get device profile info by ID', async () => {
      const deviceProfileId = 'test-profile-id';
      const mockResponse = {
        id: { id: deviceProfileId },
        name: 'Test Profile Info',
        transportType: 'DEFAULT',
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getDeviceProfileInfoById(deviceProfileId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/deviceProfileInfo/${deviceProfileId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDefaultDeviceProfileInfo', () => {
    it('should get default device profile info', async () => {
      const mockResponse = {
        id: { id: 'default-profile-id' },
        name: 'Default Profile',
        type: 'DEFAULT',
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getDefaultDeviceProfileInfo();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfileInfo/default',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setDefaultDeviceProfile', () => {
    it('should set default device profile', async () => {
      const deviceProfileId = 'test-profile-id';
      const mockResponse = {
        id: { id: deviceProfileId },
        name: 'Default Profile',
        default: true,
      };

      mockDefHttp.post.mockResolvedValue(mockResponse);

      const result = await setDefaultDeviceProfile(deviceProfileId);

      expect(mockDefHttp.post).toHaveBeenCalledWith({
        url: `/api/deviceProfile/${deviceProfileId}/default`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deviceProfileList', () => {
    it('should get device profile list with parameters', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 10,
        sortProperty: 'name',
        sortOrder: 'ASC',
      };
      const mockResponse = {
        data: [{ id: { id: 'profile1' }, name: 'Profile 1' }],
        totalElements: 1,
        totalPages: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await deviceProfileList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfiles',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDeviceProfileInfoList', () => {
    it('should get device profile info list without transport type', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 20,
      };
      const mockResponse = {
        data: [{ id: { id: 'info1' }, name: 'Info 1' }],
        totalElements: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getDeviceProfileInfoList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfileInfos',
        params: { ...params, transportType: undefined },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get device profile info list with transport type', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10 };
      const transportType = TransportType.DEFAULT;
      const mockResponse = {
        data: [{ id: { id: 'info1' }, transportType: TransportType.DEFAULT }],
        totalElements: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getDeviceProfileInfoList(params, transportType);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfileInfos',
        params: { ...params, transportType },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveDeviceProfile', () => {
    it('should save device profile', async () => {
      const deviceProfile = {
        name: 'New Profile',
        type: 'DEFAULT',
        description: 'Test profile',
      };
      const mockResponse = {
        id: { id: 'new-profile-id' },
        ...deviceProfile,
      };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveDeviceProfile(deviceProfile);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/deviceProfile',
        data: deviceProfile,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteDeviceProfile', () => {
    it('should delete device profile', async () => {
      const deviceProfileId = 'test-profile-id';

      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteDeviceProfile(deviceProfileId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/deviceProfile/${deviceProfileId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getTimeseriesKeys', () => {
    it('should get timeseries keys with device profile ID', async () => {
      const deviceProfileId = 'test-profile-id';
      const mockResponse = ['temperature', 'humidity', 'pressure'];

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getTimeseriesKeys(deviceProfileId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfile/devices/keys/timeseries',
        params: { deviceProfileId },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get timeseries keys without device profile ID', async () => {
      const mockResponse = ['defaultKey1', 'defaultKey2'];

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getTimeseriesKeys();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfile/devices/keys/timeseries',
        params: { deviceProfileId: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAttributesKeys', () => {
    it('should get attributes keys with device profile ID', async () => {
      const deviceProfileId = 'test-profile-id';
      const mockResponse = ['model', 'firmware', 'location'];

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getAttributesKeys(deviceProfileId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfile/devices/keys/attributes',
        params: { deviceProfileId },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get attributes keys without device profile ID', async () => {
      const mockResponse = ['defaultAttr1', 'defaultAttr2'];

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getAttributesKeys();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/deviceProfile/devices/keys/attributes',
        params: { deviceProfileId: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle getDeviceProfileById errors', async () => {
      const deviceProfileId = 'invalid-id';
      const error = new Error('Device profile not found');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(getDeviceProfileById(deviceProfileId)).rejects.toThrow('Device profile not found');
    });

    it('should handle saveDeviceProfile errors', async () => {
      const deviceProfile = { name: 'Invalid Profile' };
      const error = new Error('Validation failed');

      mockDefHttp.postJson.mockRejectedValue(error);

      await expect(saveDeviceProfile(deviceProfile)).rejects.toThrow('Validation failed');
    });

    it('should handle deleteDeviceProfile errors', async () => {
      const deviceProfileId = 'in-use-profile-id';
      const error = new Error('Profile is in use');

      mockDefHttp.delete.mockRejectedValue(error);

      await expect(deleteDeviceProfile(deviceProfileId)).rejects.toThrow('Profile is in use');
    });
  });
});
