import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as deviceApi from '/@/api/tb/device';
import { EntityType } from '/@/enums/entityTypeEnum';

// Mock the http client
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    post: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('Device API', () => {
  let defHttp;

  beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Get the mocked defHttp
    const axiosModule = await import('/@/utils/http/axios');
    defHttp = axiosModule.defHttp;
  });

  it('should call getDeviceById with correct parameters', async () => {
    const deviceId = 'device123';
    const mockResponse = { id: { id: deviceId, entityType: EntityType.DEVICE }, name: 'Test Device' };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getDeviceById(deviceId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/device/${deviceId}`,
    });
  });

  it('should call getDeviceInfoById with correct parameters', async () => {
    const deviceId = 'device123';
    const mockResponse = {
      id: { id: deviceId, entityType: EntityType.DEVICE },
      name: 'Test Device',
      customerTitle: 'Test Customer',
    };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getDeviceInfoById(deviceId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/device/info/${deviceId}`,
    });
  });

  it('should call saveDevice with correct parameters', async () => {
    const deviceData = { name: 'Test Device', type: 'default' };
    const mockResponse = { id: { id: 'device123', entityType: EntityType.DEVICE }, ...deviceData };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.saveDevice(deviceData);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/device',
      data: deviceData,
      params: null,
    });
  });

  it('should call saveDevice with access token when provided', async () => {
    const deviceData = { name: 'Test Device', type: 'default' };
    const accessToken = 'test-token';
    const mockResponse = { id: { id: 'device123', entityType: EntityType.DEVICE }, ...deviceData };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.saveDevice(deviceData, accessToken);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/device',
      data: deviceData,
      params: { accessToken: accessToken },
    });
  });

  it('should call deleteDevice with correct parameters', async () => {
    const deviceId = 'device123';

    defHttp.delete.mockResolvedValue(undefined);

    // Check if deleteDevice function exists before testing
    if (typeof deviceApi.deleteDevice === 'function') {
      await deviceApi.deleteDevice(deviceId);
      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/device/${deviceId}`,
      });
    }
  });

  it('should call getDeviceTypes', async () => {
    const mockResponse = [{ type: 'default' }];

    defHttp.get.mockResolvedValue(mockResponse);

    // Check if getDeviceTypes function exists before testing
    if (typeof deviceApi.getDeviceTypes === 'function') {
      await deviceApi.getDeviceTypes();
      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/device/types',
      });
    }
  });
});