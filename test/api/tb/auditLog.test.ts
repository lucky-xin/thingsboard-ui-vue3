import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  auditLogList,
  getAuditLogByEntityId,
  getAuditLogByUserId,
  getAuditLogByCustomerId,
} from '/@/api/tb/auditLog';
import type {
  AuditLog,
} from '/@/api/tb/auditLog';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

describe('api/tb/auditLog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('auditLogList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: { id: 'log-1' },
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            customerId: 'customer-1',
            entityId: 'entity-1',
            entityName: 'Test Entity',
            userId: 'user-1',
            userName: 'Test User',
            actionType: 'ADDED' as any,
            actionStatus: 'SUCCESS',
            actionData: { field: 'value' },
            actionFailureDetails: undefined,
          },
          {
            id: { id: 'log-2' },
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            userId: 'user-2',
            userName: 'Another User',
            actionType: 'UPDATED' as any,
            actionStatus: 'FAILURE',
            actionData: undefined,
            actionFailureDetails: 'Validation failed',
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
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
        startTime: 1234567890,
        endTime: 1234567899,
        actionTypes: 'ADDED,UPDATED,DELETED',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await auditLogList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle minimal params', async () => {
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
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await auditLogList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAuditLogByEntityId', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: { id: 'log-1' },
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            entityId: 'device-1',
            entityName: 'Test Device',
            userId: 'user-1',
            userName: 'Test User',
            actionType: 'ADDED' as any,
            actionStatus: 'SUCCESS',
            actionData: { name: 'Device 1' },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'device',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAuditLogByEntityId(params, 'DEVICE' as any, 'device-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs/entity/DEVICE/device-1',
        params,
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
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAuditLogByEntityId(params, 'ASSET' as any, 'asset-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs/entity/ASSET/asset-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAuditLogByUserId', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: { id: 'log-1' },
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            userId: 'user-1',
            userName: 'Test User',
            actionType: 'LOGIN' as any,
            actionStatus: 'SUCCESS',
            actionData: { ip: '192.168.1.1' },
          },
          {
            id: { id: 'log-2' },
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            userId: 'user-1',
            userName: 'Test User',
            actionType: 'LOGOUT' as any,
            actionStatus: 'SUCCESS',
            actionData: { sessionDuration: 3600 },
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'user',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
        startTime: 1234567890,
        endTime: 1234567899,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAuditLogByUserId(params, 'user-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs/user/user-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAuditLogByCustomerId', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: { id: 'log-1' },
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            customerId: 'customer-1',
            userId: 'user-1',
            userName: 'Customer User',
            actionType: 'ASSIGNED_TO_CUSTOMER' as any,
            actionStatus: 'SUCCESS',
            actionData: { customerName: 'Customer A' },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'customer',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAuditLogByCustomerId(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/audit/logs/customer/customer-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create AuditLog object with all fields', () => {
      const auditLog: AuditLog = {
        id: { id: 'log-1' },
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        entityId: 'entity-1',
        entityName: 'Test Entity',
        userId: 'user-1',
        userName: 'Test User',
        actionType: 'ADDED' as any,
        actionStatus: 'SUCCESS',
        actionData: { field: 'value', nested: { data: 'test' } },
        actionFailureDetails: undefined,
      };

      expect(auditLog.id).toEqual({ id: 'log-1' });
      expect(auditLog.createdTime).toBe(1234567890);
      expect(auditLog.tenantId).toBe('tenant-1');
      expect(auditLog.customerId).toBe('customer-1');
      expect(auditLog.entityId).toBe('entity-1');
      expect(auditLog.entityName).toBe('Test Entity');
      expect(auditLog.userId).toBe('user-1');
      expect(auditLog.userName).toBe('Test User');
      expect(auditLog.actionType).toBe('ADDED');
      expect(auditLog.actionStatus).toBe('SUCCESS');
      expect(auditLog.actionData).toEqual({ field: 'value', nested: { data: 'test' } });
      expect(auditLog.actionFailureDetails).toBeUndefined();
    });

    it('should create AuditLog object with failure status', () => {
      const auditLog: AuditLog = {
        id: { id: 'log-2' },
        createdTime: 1234567891,
        tenantId: 'tenant-1',
        userId: 'user-2',
        userName: 'Another User',
        actionType: 'UPDATED' as any,
        actionStatus: 'FAILURE',
        actionData: undefined,
        actionFailureDetails: 'Validation failed: Required field missing',
      };

      expect(auditLog.id).toEqual({ id: 'log-2' });
      expect(auditLog.createdTime).toBe(1234567891);
      expect(auditLog.tenantId).toBe('tenant-1');
      expect(auditLog.customerId).toBeUndefined();
      expect(auditLog.entityId).toBeUndefined();
      expect(auditLog.entityName).toBeUndefined();
      expect(auditLog.userId).toBe('user-2');
      expect(auditLog.userName).toBe('Another User');
      expect(auditLog.actionType).toBe('UPDATED');
      expect(auditLog.actionStatus).toBe('FAILURE');
      expect(auditLog.actionData).toBeUndefined();
      expect(auditLog.actionFailureDetails).toBe('Validation failed: Required field missing');
    });

    it('should create AuditLog object with minimal required fields', () => {
      const auditLog: AuditLog = {
        userId: 'user-3',
      };

      expect(auditLog.id).toBeUndefined();
      expect(auditLog.createdTime).toBeUndefined();
      expect(auditLog.tenantId).toBeUndefined();
      expect(auditLog.customerId).toBeUndefined();
      expect(auditLog.entityId).toBeUndefined();
      expect(auditLog.entityName).toBeUndefined();
      expect(auditLog.userId).toBe('user-3');
      expect(auditLog.userName).toBeUndefined();
      expect(auditLog.actionType).toBeUndefined();
      expect(auditLog.actionStatus).toBeUndefined();
      expect(auditLog.actionData).toBeUndefined();
      expect(auditLog.actionFailureDetails).toBeUndefined();
    });

    it('should handle different action statuses', () => {
      const successLog: AuditLog = {
        userId: 'user-1',
        actionStatus: 'SUCCESS',
      };

      const failureLog: AuditLog = {
        userId: 'user-2',
        actionStatus: 'FAILURE',
      };

      expect(successLog.actionStatus).toBe('SUCCESS');
      expect(failureLog.actionStatus).toBe('FAILURE');
    });

    it('should handle complex action data', () => {
      const auditLog: AuditLog = {
        userId: 'user-1',
        actionData: {
          entityType: 'DEVICE',
          entityId: 'device-1',
          changes: {
            name: { old: 'Old Name', new: 'New Name' },
            status: { old: 'INACTIVE', new: 'ACTIVE' },
          },
          metadata: {
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0',
            timestamp: 1234567890,
          },
        },
      };

      expect(auditLog.actionData?.entityType).toBe('DEVICE');
      expect(auditLog.actionData?.entityId).toBe('device-1');
      expect(auditLog.actionData?.changes?.name?.old).toBe('Old Name');
      expect(auditLog.actionData?.changes?.name?.new).toBe('New Name');
      expect(auditLog.actionData?.changes?.status?.old).toBe('INACTIVE');
      expect(auditLog.actionData?.changes?.status?.new).toBe('ACTIVE');
      expect(auditLog.actionData?.metadata?.ip).toBe('192.168.1.100');
      expect(auditLog.actionData?.metadata?.userAgent).toBe('Mozilla/5.0');
      expect(auditLog.actionData?.metadata?.timestamp).toBe(1234567890);
    });
  });
});