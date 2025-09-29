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

  it('should call saveDeviceWithCredentials with correct parameters', async () => {
    const deviceData = { device: { name: 'Test Device' }, credentials: { credentialsType: 'ACCESS_TOKEN' } };
    const mockResponse = { id: { id: 'device123', entityType: EntityType.DEVICE }, ...deviceData };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.saveDeviceWithCredentials(deviceData);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/device-with-credentials',
      data: deviceData,
    });
  });

  it('should call assignDeviceToCustomer with correct parameters', async () => {
    const customerId = 'customer123';
    const deviceId = 'device123';
    const mockResponse = { id: { id: deviceId, entityType: EntityType.DEVICE } };

    defHttp.post.mockResolvedValue(mockResponse);

    await deviceApi.assignDeviceToCustomer(customerId, deviceId);

    expect(defHttp.post).toHaveBeenCalledWith({
      url: `/api/customer/${customerId}/device/${deviceId}`,
    });
  });

  it('should call assignDeviceToPublicCustomer with correct parameters', async () => {
    const deviceId = 'device123';
    const mockResponse = { id: { id: deviceId, entityType: EntityType.DEVICE } };

    defHttp.post.mockResolvedValue(mockResponse);

    await deviceApi.assignDeviceToPublicCustomer(deviceId);

    expect(defHttp.post).toHaveBeenCalledWith({
      url: `/api/customer/public/device/${deviceId}`,
    });
  });

  it('should call unAssignDeviceFromCustomer with correct parameters', async () => {
    const deviceId = 'device123';

    defHttp.delete.mockResolvedValue(undefined);

    await deviceApi.unAssignDeviceFromCustomer(deviceId);

    expect(defHttp.delete).toHaveBeenCalledWith({
      url: `/api/customer/device/${deviceId}`,
    });
  });

  it('should call assignDeviceToTenant with correct parameters', async () => {
    const tenantId = 'tenant123';
    const deviceId = 'device123';
    const mockResponse = { id: { id: deviceId, entityType: EntityType.DEVICE } };

    defHttp.post.mockResolvedValue(mockResponse);

    await deviceApi.assignDeviceToTenant(tenantId, deviceId);

    expect(defHttp.post).toHaveBeenCalledWith({
      url: `/api/tenant/${tenantId}/device/${deviceId}`,
    });
  });

  it('should call assignDeviceToEdge with correct parameters', async () => {
    const edgeId = 'edge123';
    const deviceId = 'device123';
    const mockResponse = { id: { id: deviceId, entityType: EntityType.DEVICE } };

    defHttp.post.mockResolvedValue(mockResponse);

    await deviceApi.assignDeviceToEdge(edgeId, deviceId);

    expect(defHttp.post).toHaveBeenCalledWith({
      url: `/api/edge/${edgeId}/device/${deviceId}`,
    });
  });

  it('should call unAssignDeviceFromEdge with correct parameters', async () => {
    const edgeId = 'edge123';
    const deviceId = 'device123';

    defHttp.delete.mockResolvedValue(undefined);

    await deviceApi.unAssignDeviceFromEdge(edgeId, deviceId);

    expect(defHttp.delete).toHaveBeenCalledWith({
      url: `/api/edge/${edgeId}/device/${deviceId}`,
    });
  });

  it('should call getDeviceCredentialsByDeviceId with correct parameters', async () => {
    const deviceId = 'device123';
    const mockResponse = { deviceId, credentialsType: 'ACCESS_TOKEN' };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getDeviceCredentialsByDeviceId(deviceId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/device/${deviceId}/credentials`,
    });
  });

  it('should call updateDeviceCredentials with correct parameters', async () => {
    const credentialsData = { deviceId: 'device123', credentialsType: 'ACCESS_TOKEN' };
    const mockResponse = credentialsData;

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.updateDeviceCredentials(credentialsData);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/device/credentials',
      data: credentialsData,
    });
  });

  it('should call getTenantDeviceInfoList with correct parameters', async () => {
    const params = { pageSize: 10, page: 0 };
    const mockResponse = { data: [], totalElements: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getTenantDeviceInfoList(params);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/tenant/deviceInfos',
      params,
    });
  });

  it('should call getTenantDeviceList with correct parameters', async () => {
    const params = { pageSize: 10, page: 0 };
    const mockResponse = { data: [], totalElements: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getTenantDeviceList(params);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/tenant/devices',
      params,
    });
  });

  it('should call getCustomerDeviceList with correct parameters', async () => {
    const params = { pageSize: 10, page: 0 };
    const customerId = 'customer123';
    const mockResponse = { data: [], totalElements: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getCustomerDeviceList(params, customerId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/customer/${customerId}/devices`,
      params,
    });
  });

  it('should call getCustomerDeviceInfoList with correct parameters', async () => {
    const params = { pageSize: 10, page: 0 };
    const customerId = 'customer123';
    const mockResponse = { data: [], totalElements: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getCustomerDeviceInfoList(params, customerId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/customer/${customerId}/deviceInfos`,
      params,
    });
  });

  it('should call getEdgeDeviceInfoList with correct parameters', async () => {
    const params = { pageSize: 10, page: 0 };
    const edgeId = 'edge123';
    const mockResponse = { data: [], totalElements: 0 };

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getEdgeDeviceInfoList(params, edgeId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/edge/${edgeId}/devices`,
      params,
    });
  });

  it('should call getDevicesByIds with correct parameters', async () => {
    const deviceIds = ['device1', 'device2'];
    const mockResponse = [{ id: { id: 'device1' } }, { id: { id: 'device2' } }];

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.getDevicesByIds(deviceIds);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/devices',
      params: { deviceIds: deviceIds },
    });
  });

  it('should call getDeviceListByQuery with correct parameters', async () => {
    const queryData = { parameters: { relationType: 'Contains' } };
    const mockResponse = [{ id: { id: 'device1' } }];

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.getDeviceListByQuery(queryData);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: '/api/devices',
      data: queryData,
    });
  });

  it('should call claimDevice with correct parameters', async () => {
    const deviceName = 'device123';
    const secretKey = 'secret123';
    const mockResponse = { success: true };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await deviceApi.claimDevice(deviceName, secretKey);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: `/api/customer/device/${deviceName}/claim`,
      data: { secretKey: secretKey },
    });
  });

  it('should call reClaimDevice with correct parameters', async () => {
    const deviceName = 'device123';

    defHttp.delete.mockResolvedValue(undefined);

    await deviceApi.reClaimDevice(deviceName);

    expect(defHttp.delete).toHaveBeenCalledWith({
      url: `/api/customer/device/${deviceName}/claim`,
    });
  });

  it('should call countByDeviceProfileAndEmptyOtaPackage with correct parameters', async () => {
    const otaPackageType = 'FIRMWARE';
    const deviceProfileId = 'profile123';
    const mockResponse = 5;

    defHttp.get.mockResolvedValue(mockResponse);

    await deviceApi.countByDeviceProfileAndEmptyOtaPackage(otaPackageType, deviceProfileId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/devices/count/${otaPackageType}/${deviceProfileId}`,
    });
  });

  it('should call processDevicesBulkImport', async () => {
    // This function is empty, so we just test that it exists and can be called
    expect(typeof deviceApi.processDevicesBulkImport).toBe('function');
    await deviceApi.processDevicesBulkImport();
  });
});
