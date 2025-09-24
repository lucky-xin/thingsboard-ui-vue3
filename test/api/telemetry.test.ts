import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as telemetryApi from '/@/api/tb/telemetry';
import { Scope } from '/@/enums/telemetryEnum';
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

describe('Telemetry API', () => {
  let defHttp;

  beforeEach(async () => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Get the mocked defHttp
    const axiosModule = await import('/@/utils/http/axios');
    defHttp = axiosModule.defHttp;
  });

  it('should call getAttributeKeys with correct parameters', async () => {
    const entityId = { id: 'device123', entityType: EntityType.DEVICE };
    const mockResponse = ['temperature', 'humidity'];

    defHttp.get.mockResolvedValue(mockResponse);

    await telemetryApi.getAttributeKeys(entityId);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/attributes`,
    });
  });

  it('should call getAttributeKeysByScope with correct parameters', async () => {
    const entityId = { id: 'device123', entityType: EntityType.DEVICE };
    const scope = Scope.SERVER_SCOPE;
    const mockResponse = ['config1', 'config2'];

    defHttp.get.mockResolvedValue(mockResponse);

    await telemetryApi.getAttributeKeysByScope(entityId, scope);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/attributes/${scope}`,
    });
  });

  it('should call getTimeseries with correct parameters', async () => {
    const params = {
      entityType: EntityType.DEVICE,
      entityId: 'device123',
      keys: 'temperature,humidity',
      startTs: 1640995200000,
      endTs: 1640998800000,
    };
    const mockResponse = {
      temperature: [{ ts: 1640995200000, value: '22.5' }],
      humidity: [{ ts: 1640995200000, value: '65.0' }],
    };

    defHttp.get.mockResolvedValue(mockResponse);

    await telemetryApi.getTimeseries(params);

    expect(defHttp.get).toHaveBeenCalledWith({
      url: `/api/plugins/telemetry/${params.entityType}/${params.entityId}/values/timeseries`,
      params: params,
    });
  });

  it('should call saveDeviceAttributes with correct parameters', async () => {
    const deviceId = 'device123';
    const scope = Scope.SERVER_SCOPE;
    const attributes = { config1: 'value1', config2: 'value2' };
    const mockResponse = { status: 'success' };

    defHttp.postJson.mockResolvedValue(mockResponse);

    await telemetryApi.saveDeviceAttributes(deviceId, scope, attributes);

    expect(defHttp.postJson).toHaveBeenCalledWith({
      url: `/api/plugins/telemetry/${deviceId}/${scope}`,
      data: attributes,
    });
  });

  it('should call deleteDeviceAttributes with correct parameters', async () => {
    const deviceId = 'device123';
    const scope = Scope.SERVER_SCOPE;
    const keys = ['config1', 'config2'];

    defHttp.delete.mockResolvedValue(undefined);

    await telemetryApi.deleteDeviceAttributes(deviceId, scope, keys);

    expect(defHttp.delete).toHaveBeenCalledWith({
      url: `/api/plugins/telemetry/${deviceId}/${scope}`,
      params: { keys: keys.join(',') },
    });
  });
});
