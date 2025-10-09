import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getEvents,
  getEventList,
  clearEvents,
} from '/@/api/tb/events';
import type {
  EventInfo,
  EventFilter,
} from '/@/api/tb/events';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
  },
}));

// Mock EventType enum
vi.mock('/@/enums/eventEnum', () => ({
  EventType: {
    STATS: 'STATS',
    LC_EVENT: 'LC_EVENT',
    ERROR: 'ERROR',
    DEBUG_RULE_NODE: 'DEBUG_RULE_NODE',
  },
}));

describe('api/tb/events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should call defHttp.postJson with correct URL, params, and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'event-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            type: 'STATS',
            uid: 'uid-1',
            entityId: 'device-1',
            body: { message: 'Test event' },
          },
          {
            id: 'event-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            type: 'LC_EVENT',
            uid: 'uid-2',
            entityId: 'device-1',
            body: { status: 'ACTIVE' },
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const filter: EventFilter = {
        eventType: 'STATS' as any,
        server: 'server-1',
        minMessagesProcessed: 10,
        maxMessagesProcessed: 100,
        minErrorsOccurred: 0,
        maxErrorsOccurred: 5,
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getEvents('DEVICE', 'device-1', filter, params);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/DEVICE/device-1',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different entity types', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const filter: EventFilter = {
        eventType: 'ERROR' as any,
        method: 'POST',
        errorStr: 'Test error',
      };
      const params = {
        pageSize: 10,
        page: 1,
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getEvents('ASSET', 'asset-1', filter, params);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/ASSET/asset-1',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle DEBUG_RULE_NODE event type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'event-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            type: 'DEBUG_RULE_NODE',
            uid: 'uid-1',
            entityId: 'rule-1',
            body: { message: 'Debug message' },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const filter: EventFilter = {
        eventType: 'DEBUG_RULE_NODE' as any,
        isError: false,
        message: 'Debug message',
        msgDirectionType: 'IN',
        entityId: 'rule-1',
        entityType: 'RULE_CHAIN',
        msgId: 'msg-1',
        msgType: 'POST_TELEMETRY_REQUEST',
        relationType: 'CONTAINS',
        dataSearch: 'temperature',
        metadataSearch: 'device',
      };
      const params = {
        pageSize: 10,
        page: 1,
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getEvents('RULE_CHAIN', 'rule-1', filter, params);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/RULE_CHAIN/rule-1',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getEventList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'event-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            type: 'STATS',
            uid: 'uid-1',
            entityId: 'device-1',
            body: { message: 'Test event' },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEventList('DEVICE', 'device-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/events/DEVICE/device-1',
        params: params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different entity types', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        pageSize: 10,
        page: 1,
        startTime: 1234567890,
        endTime: 1234567899,
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getEventList('CUSTOMER', 'customer-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/events/CUSTOMER/customer-1',
        params: params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('clearEvents', () => {
    it('should call defHttp.postJson with correct URL, params, and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        startTime: 1234567890,
        endTime: 1234567899,
      };
      const filter: EventFilter = {
        eventType: 'STATS' as any,
        server: 'server-1',
        minMessagesProcessed: 10,
        maxMessagesProcessed: 100,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await clearEvents('DEVICE', 'device-1', params, filter);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/DEVICE/device-1/clear',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different entity types', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        startTime: 1234567890,
        endTime: 1234567899,
      };
      const filter: EventFilter = {
        eventType: 'ERROR' as any,
        method: 'POST',
        errorStr: 'Test error',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await clearEvents('ASSET', 'asset-1', params, filter);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/ASSET/asset-1/clear',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle LC_EVENT filter', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        startTime: 1234567890,
        endTime: 1234567899,
      };
      const filter: EventFilter = {
        eventType: 'LC_EVENT' as any,
        event: 'STARTED',
        status: 'SUCCESS',
        errorStr: 'No errors',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await clearEvents('RULE_CHAIN', 'rule-1', params, filter);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/events/RULE_CHAIN/rule-1/clear',
        params: params,
        data: filter,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create EventInfo object with all fields', () => {
      const eventInfo: EventInfo = {
        id: 'event-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        type: 'STATS',
        uid: 'uid-1',
        entityId: 'device-1',
        body: { message: 'Test event', data: { temperature: 25.5 } },
      };

      expect(eventInfo.id).toBe('event-1');
      expect(eventInfo.createdTime).toBe(1234567890);
      expect(eventInfo.tenantId).toBe('tenant-1');
      expect(eventInfo.type).toBe('STATS');
      expect(eventInfo.uid).toBe('uid-1');
      expect(eventInfo.entityId).toBe('device-1');
      expect(eventInfo.body).toEqual({ message: 'Test event', data: { temperature: 25.5 } });
    });

    it('should create EventInfo object with minimal fields', () => {
      const eventInfo: EventInfo = {
        id: 'event-minimal',
        createdTime: 1234567890,
        type: 'ERROR',
        uid: 'uid-minimal',
        entityId: 'device-1',
      };

      expect(eventInfo.id).toBe('event-minimal');
      expect(eventInfo.createdTime).toBe(1234567890);
      expect(eventInfo.type).toBe('ERROR');
      expect(eventInfo.uid).toBe('uid-minimal');
      expect(eventInfo.entityId).toBe('device-1');
      expect(eventInfo.tenantId).toBeUndefined();
      expect(eventInfo.body).toBeUndefined();
    });

    it('should create EventFilter object with STATS type', () => {
      const eventFilter: EventFilter = {
        eventType: 'STATS' as any,
        server: 'server-1',
        minMessagesProcessed: 10,
        maxMessagesProcessed: 100,
        minErrorsOccurred: 0,
        maxErrorsOccurred: 5,
      };

      expect(eventFilter.eventType).toBe('STATS');
      expect(eventFilter.server).toBe('server-1');
      expect(eventFilter.minMessagesProcessed).toBe(10);
      expect(eventFilter.maxMessagesProcessed).toBe(100);
      expect(eventFilter.minErrorsOccurred).toBe(0);
      expect(eventFilter.maxErrorsOccurred).toBe(5);
    });

    it('should create EventFilter object with LC_EVENT type', () => {
      const eventFilter: EventFilter = {
        eventType: 'LC_EVENT' as any,
        event: 'STARTED',
        status: 'SUCCESS',
        errorStr: 'No errors',
      };

      expect(eventFilter.eventType).toBe('LC_EVENT');
      expect(eventFilter.event).toBe('STARTED');
      expect(eventFilter.status).toBe('SUCCESS');
      expect(eventFilter.errorStr).toBe('No errors');
    });

    it('should create EventFilter object with ERROR type', () => {
      const eventFilter: EventFilter = {
        eventType: 'ERROR' as any,
        method: 'POST',
        errorStr: 'Validation failed',
      };

      expect(eventFilter.eventType).toBe('ERROR');
      expect(eventFilter.method).toBe('POST');
      expect(eventFilter.errorStr).toBe('Validation failed');
    });

    it('should create EventFilter object with DEBUG_RULE_NODE type', () => {
      const eventFilter: EventFilter = {
        eventType: 'DEBUG_RULE_NODE' as any,
        isError: false,
        message: 'Debug message',
        msgDirectionType: 'IN',
        entityId: 'rule-1',
        entityType: 'RULE_CHAIN',
        msgId: 'msg-1',
        msgType: 'POST_TELEMETRY_REQUEST',
        relationType: 'CONTAINS',
        dataSearch: 'temperature',
        metadataSearch: 'device',
      };

      expect(eventFilter.eventType).toBe('DEBUG_RULE_NODE');
      expect(eventFilter.isError).toBe(false);
      expect(eventFilter.message).toBe('Debug message');
      expect(eventFilter.msgDirectionType).toBe('IN');
      expect(eventFilter.entityId).toBe('rule-1');
      expect(eventFilter.entityType).toBe('RULE_CHAIN');
      expect(eventFilter.msgId).toBe('msg-1');
      expect(eventFilter.msgType).toBe('POST_TELEMETRY_REQUEST');
      expect(eventFilter.relationType).toBe('CONTAINS');
      expect(eventFilter.dataSearch).toBe('temperature');
      expect(eventFilter.metadataSearch).toBe('device');
    });

    it('should handle complex event body', () => {
      const eventInfo: EventInfo = {
        id: 'event-complex',
        createdTime: 1234567890,
        type: 'STATS',
        uid: 'uid-complex',
        entityId: 'device-1',
        body: {
          message: 'Complex event',
          data: {
            temperature: 25.5,
            humidity: 60.2,
            pressure: 1013.25,
          },
          metadata: {
            source: 'sensor-1',
            timestamp: 1234567890,
            version: '1.0',
          },
          errors: [
            { code: 'E001', message: 'Minor error' },
            { code: 'E002', message: 'Another error' },
          ],
        },
      };

      expect(eventInfo.body?.message).toBe('Complex event');
      expect(eventInfo.body?.data?.temperature).toBe(25.5);
      expect(eventInfo.body?.data?.humidity).toBe(60.2);
      expect(eventInfo.body?.data?.pressure).toBe(1013.25);
      expect(eventInfo.body?.metadata?.source).toBe('sensor-1');
      expect(eventInfo.body?.metadata?.timestamp).toBe(1234567890);
      expect(eventInfo.body?.metadata?.version).toBe('1.0');
      expect(eventInfo.body?.errors).toHaveLength(2);
      expect(eventInfo.body?.errors?.[0].code).toBe('E001');
      expect(eventInfo.body?.errors?.[0].message).toBe('Minor error');
      expect(eventInfo.body?.errors?.[1].code).toBe('E002');
      expect(eventInfo.body?.errors?.[1].message).toBe('Another error');
    });
  });
});