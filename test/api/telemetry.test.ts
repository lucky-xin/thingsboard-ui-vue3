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

  describe('getAttributeKeys', () => {
    it('should call getAttributeKeys with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const mockResponse = ['temperature', 'humidity'];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getAttributeKeys(entityId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/attributes`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAttributeKeysByScope', () => {
    it('should call getAttributeKeysByScope with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const scope = Scope.SERVER_SCOPE;
      const mockResponse = ['config1', 'config2'];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getAttributeKeysByScope(entityId, scope);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/attributes/${scope}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTimeseriesKeys', () => {
    it('should call getTimeseriesKeys with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const mockResponse = ['temperature', 'humidity', 'pressure'];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getTimeseriesKeys(entityId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/timeseries`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAttributes', () => {
    it('should call getAttributes with keys', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const keys = 'temperature,humidity';
      const mockResponse = [
        { key: 'temperature', value: 22.5, lastUpdateTs: 1640995200000 },
        { key: 'humidity', value: 65.0, lastUpdateTs: 1640995200000 },
      ];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getAttributes(entityId, keys);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/attributes`,
        params: { keys },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call getAttributes without keys', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const mockResponse = [{ key: 'all', value: 'data' }];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getAttributes(entityId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/attributes`,
        params: { keys: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAttributesByScope', () => {
    it('should call getAttributesByScope with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const scope = Scope.SERVER_SCOPE;
      const mockResponse = [{ key: 'config1', value: 'value1' }];

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getAttributesByScope(entityId, scope);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/attributes/${scope}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getLatestTimeseries', () => {
    it('should call getLatestTimeseries with all parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const keys = 'temperature,humidity';
      const useStrictDataTypes = true;
      const mockResponse = {
        temperature: { data: [{ ts: 1640995200000, value: '22.5' }] },
        humidity: { data: [{ ts: 1640995200000, value: '65.0' }] },
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getLatestTimeseries(entityId, keys, useStrictDataTypes);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/timeseries`,
        params: { keys, useStrictDataTypes },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call getLatestTimeseries with minimal parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const mockResponse = { temperature: { data: [] } };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getLatestTimeseries(entityId);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/timeseries`,
        params: { keys: undefined, useStrictDataTypes: undefined },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTimeseries', () => {
    it('should call getTimeseries with correct parameters', async () => {
      const params = {
        entityType: EntityType.DEVICE,
        entityId: 'device123',
        keys: 'temperature,humidity',
        startTs: 1640995200000,
        endTs: 1640998800000,
        interval: 60000,
        limit: 100,
        agg: 'AVG' as const,
        orderBy: 'ASC' as const,
        useStrictDataTypes: true,
      };
      const mockResponse = {
        temperature: { data: [{ ts: 1640995200000, value: '22.5' }] },
        humidity: { data: [{ ts: 1640995200000, value: '65.0' }] },
      };

      defHttp.get.mockResolvedValue(mockResponse);

      const result = await telemetryApi.getTimeseries(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${params.entityType}/${params.entityId}/values/timeseries`,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteDeviceAttributes', () => {
    it('should call deleteDeviceAttributes with correct parameters', async () => {
      const deviceId = 'device123';
      const scope = Scope.SERVER_SCOPE;
      const keys = ['config1', 'config2'];

      defHttp.delete.mockResolvedValue(undefined);

      const result = await telemetryApi.deleteDeviceAttributes(deviceId, scope, keys);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${deviceId}/${scope}`,
        params: { keys: keys.join(',') },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteEntityAttributes', () => {
    it('should call deleteEntityAttributes with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const scope = Scope.SERVER_SCOPE;
      const keys = ['attr1', 'attr2'];

      defHttp.delete.mockResolvedValue(undefined);

      const result = await telemetryApi.deleteEntityAttributes(entityId, scope, keys);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/${scope}`,
        params: { keys: keys.join(',') },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('saveDeviceAttributes', () => {
    it('should call saveDeviceAttributes with correct parameters', async () => {
      const deviceId = 'device123';
      const scope = Scope.SERVER_SCOPE;
      const attributes = { config1: 'value1', config2: 'value2' };
      const mockResponse = { status: 'success' };

      defHttp.postJson.mockResolvedValue(mockResponse);

      const result = await telemetryApi.saveDeviceAttributes(deviceId, scope, attributes);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${deviceId}/${scope}`,
        data: attributes,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveEntityAttributesV1', () => {
    it('should call saveEntityAttributesV1 with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const scope = Scope.SHARED_SCOPE;
      const data = { attr1: 'value1', attr2: 'value2' };

      defHttp.postJson.mockResolvedValue(undefined);

      const result = await telemetryApi.saveEntityAttributesV1(entityId, scope, data);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/${scope}`,
        data,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('saveEntityAttributesV2', () => {
    it('should call saveEntityAttributesV2 with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const scope = Scope.SERVER_SCOPE;
      const data = { newAttr1: 'newValue1', newAttr2: 'newValue2' };

      defHttp.postJson.mockResolvedValue(undefined);

      const result = await telemetryApi.saveEntityAttributesV2(entityId, scope, data);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/attributes/${scope}`,
        data,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('saveEntityTelemetry', () => {
    it('should call saveEntityTelemetry with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const data = {
        temperature: [{ ts: 1640995200000, value: 22.5 }],
        humidity: [{ ts: 1640995200000, value: 65.0 }],
      };

      defHttp.postJson.mockResolvedValue(undefined);

      const result = await telemetryApi.saveEntityTelemetry(entityId, data);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/timeseries/any`,
        data,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('saveEntityTelemetryWithTTL', () => {
    it('should call saveEntityTelemetryWithTTL with correct parameters', async () => {
      const entityId = { id: 'device123', entityType: EntityType.DEVICE };
      const ttl = 3600; // 1 hour
      const data = {
        temperature: [{ ts: 1640995200000, value: 22.5 }],
      };

      defHttp.postJson.mockResolvedValue(undefined);

      const result = await telemetryApi.saveEntityTelemetryWithTTL(entityId, ttl, data);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/timeseries/any/${ttl}`,
        data,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteEntityTimeseries', () => {
    it('should call deleteEntityTimeseries with all parameters', async () => {
      const params = {
        entityType: EntityType.DEVICE,
        entityId: 'device123',
        keys: 'temperature,humidity',
        deleteAllDataForKeys: false,
        startTs: 1640995200000,
        endTs: 1640998800000,
        rewriteLatestIfDeleted: true,
      };

      defHttp.delete.mockResolvedValue(undefined);

      const result = await telemetryApi.deleteEntityTimeseries(params);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${params.entityType}/${params.entityId}/timeseries/delete`,
        params,
      });
      expect(result).toBeUndefined();
    });

    it('should call deleteEntityTimeseries with minimal parameters', async () => {
      const params = {
        entityType: EntityType.DEVICE,
        entityId: 'device123',
        keys: 'temperature',
      };

      defHttp.delete.mockResolvedValue(undefined);

      const result = await telemetryApi.deleteEntityTimeseries(params);

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: `/api/plugins/telemetry/${params.entityType}/${params.entityId}/timeseries/delete`,
        params,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('Error handling', () => {
    it('should handle getAttributeKeys errors', async () => {
      const entityId = { id: 'invalid', entityType: EntityType.DEVICE };
      const error = new Error('Entity not found');

      defHttp.get.mockRejectedValue(error);

      await expect(telemetryApi.getAttributeKeys(entityId)).rejects.toThrow('Entity not found');
    });

    it('should handle saveDeviceAttributes errors', async () => {
      const deviceId = 'invalid';
      const scope = Scope.SERVER_SCOPE;
      const data = { invalid: 'data' };
      const error = new Error('Invalid device');

      defHttp.postJson.mockRejectedValue(error);

      await expect(telemetryApi.saveDeviceAttributes(deviceId, scope, data)).rejects.toThrow('Invalid device');
    });

    it('should handle deleteEntityTimeseries errors', async () => {
      const params = {
        entityType: EntityType.DEVICE,
        entityId: 'invalid',
        keys: 'temperature',
      };
      const error = new Error('Permission denied');

      defHttp.delete.mockRejectedValue(error);

      await expect(telemetryApi.deleteEntityTimeseries(params)).rejects.toThrow('Permission denied');
    });
  });
});
