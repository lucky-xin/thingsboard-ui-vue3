import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  notificationRuleInfoList,
  getNotificationRuleById,
  saveNotificationRule,
  deleteNotificationRule,
} from '/@/api/tb/notificationRule';
import type {
  NotificationRule,
  NotificationRuleInfo,
} from '/@/api/tb/notificationRule';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock NotificationType enum
vi.mock('/@/enums/notificationEnum', () => ({
  NotificationType: {
    GENERAL: 'GENERAL',
    RULE_ENGINE: 'RULE_ENGINE',
    ALARM: 'ALARM',
    DEVICE_CONNECTIVITY: 'DEVICE_CONNECTIVITY',
    ENTITY_ACTION: 'ENTITY_ACTION',
    INTEGRATION_LIFECYCLE: 'INTEGRATION_LIFECYCLE',
    API_USAGE_LIMIT: 'API_USAGE_LIMIT',
    MAINTENANCE: 'MAINTENANCE',
    RATE_LIMITS: 'RATE_LIMITS',
  },
}));

describe('api/tb/notificationRule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('notificationRuleInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'rule-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Device Offline Rule',
            templateId: 'template-1',
            triggerType: 'DEVICE_CONNECTIVITY' as any,
            triggerConfig: {
              deviceId: 'device-1',
              timeout: 300,
            },
            recipientsConfig: {
              triggerType: 'DEVICE_CONNECTIVITY' as any,
              targets: ['user-1', 'user-2'],
              escalationTable: new Map([
                [0, ['user-1']],
                [300, ['user-2', 'admin-1']],
              ]),
            },
            additionalConfig: {
              description: 'Rule for device connectivity issues',
            },
            templateName: 'Device Offline Template',
            deliveryMethods: ['EMAIL', 'SMS'],
          },
          {
            id: 'rule-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            name: 'Alarm Rule',
            templateId: 'template-2',
            triggerType: 'ALARM' as any,
            triggerConfig: {
              severity: 'CRITICAL',
              alarmType: 'temperature',
            },
            recipientsConfig: {
              triggerType: 'ALARM' as any,
              targets: ['admin-1'],
              escalationTable: new Map([
                [0, ['admin-1']],
                [600, ['admin-2', 'admin-3']],
              ]),
            },
            additionalConfig: {
              description: 'Rule for critical alarms',
            },
            templateName: 'Alarm Template',
            deliveryMethods: ['EMAIL', 'SLACK'],
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'rule',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationRuleInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/rules',
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

      const result = await notificationRuleInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/rules',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationRuleById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRuleInfo = {
        id: 'rule-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Rule',
        templateId: 'template-1',
        triggerType: 'DEVICE_CONNECTIVITY' as any,
        triggerConfig: {
          deviceId: 'device-1',
          timeout: 300,
        },
        recipientsConfig: {
          triggerType: 'DEVICE_CONNECTIVITY' as any,
          targets: ['user-1', 'user-2'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
          ]),
        },
        additionalConfig: {
          description: 'Rule for device connectivity issues',
        },
        templateName: 'Device Offline Template',
        deliveryMethods: ['EMAIL', 'SMS'],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getNotificationRuleById('rule-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/rule/rule-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveNotificationRule', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRule = {
        id: 'rule-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Rule',
        templateId: 'template-1',
        triggerType: 'DEVICE_CONNECTIVITY' as any,
        triggerConfig: {
          deviceId: 'device-1',
          timeout: 300,
        },
        recipientsConfig: {
          triggerType: 'DEVICE_CONNECTIVITY' as any,
          targets: ['user-1', 'user-2'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
          ]),
        },
        additionalConfig: {
          description: 'Rule for device connectivity issues',
        },
      };
      const testData: NotificationRule = {
        id: 'rule-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Rule',
        templateId: 'template-1',
        triggerType: 'DEVICE_CONNECTIVITY' as any,
        triggerConfig: {
          deviceId: 'device-1',
          timeout: 300,
        },
        recipientsConfig: {
          triggerType: 'DEVICE_CONNECTIVITY' as any,
          targets: ['user-1', 'user-2'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
          ]),
        },
        additionalConfig: {
          description: 'Rule for device connectivity issues',
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationRule(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/rule',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Rule', triggerType: 'GENERAL' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationRule(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/rule',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationRule();

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/rule',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotificationRule', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteNotificationRule('rule-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/notification/rule/rule-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create NotificationRule object with all fields', () => {
      const notificationRule: NotificationRule = {
        id: 'rule-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Rule',
        templateId: 'template-1',
        triggerType: 'DEVICE_CONNECTIVITY' as any,
        triggerConfig: {
          deviceId: 'device-1',
          timeout: 300,
          conditions: {
            operator: 'AND',
            conditions: [
              { key: 'status', operator: 'EQUALS', value: 'OFFLINE' },
              { key: 'lastSeen', operator: 'GREATER_THAN', value: 300 },
            ],
          },
        },
        recipientsConfig: {
          triggerType: 'DEVICE_CONNECTIVITY' as any,
          targets: ['user-1', 'user-2', 'admin-1'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
            [600, ['admin-2', 'admin-3']],
          ]),
        },
        additionalConfig: {
          description: 'Rule for device connectivity issues',
          priority: 'HIGH',
          enabled: true,
        },
      };

      expect(notificationRule.id).toBe('rule-1');
      expect(notificationRule.createdTime).toBe(1234567890);
      expect(notificationRule.tenantId).toBe('tenant-1');
      expect(notificationRule.name).toBe('Device Offline Rule');
      expect(notificationRule.templateId).toBe('template-1');
      expect(notificationRule.triggerType).toBe('DEVICE_CONNECTIVITY');
      expect(notificationRule.triggerConfig?.deviceId).toBe('device-1');
      expect(notificationRule.triggerConfig?.timeout).toBe(300);
      expect(notificationRule.triggerConfig?.conditions?.operator).toBe('AND');
      expect(notificationRule.triggerConfig?.conditions?.conditions).toHaveLength(2);
      expect(notificationRule.recipientsConfig?.triggerType).toBe('DEVICE_CONNECTIVITY');
      expect(notificationRule.recipientsConfig?.targets).toEqual(['user-1', 'user-2', 'admin-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(0)).toEqual(['user-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(300)).toEqual(['user-2', 'admin-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(600)).toEqual(['admin-2', 'admin-3']);
      expect(notificationRule.additionalConfig?.description).toBe('Rule for device connectivity issues');
      expect(notificationRule.additionalConfig?.priority).toBe('HIGH');
      expect(notificationRule.additionalConfig?.enabled).toBe(true);
    });

    it('should create NotificationRule object with minimal fields', () => {
      const notificationRule: NotificationRule = {
        id: 'rule-minimal',
        createdTime: 1234567890,
        name: 'Minimal Rule',
        triggerType: 'GENERAL' as any,
        triggerConfig: {},
        recipientsConfig: {
          triggerType: 'GENERAL' as any,
          targets: ['user-1'],
        },
      };

      expect(notificationRule.id).toBe('rule-minimal');
      expect(notificationRule.createdTime).toBe(1234567890);
      expect(notificationRule.name).toBe('Minimal Rule');
      expect(notificationRule.triggerType).toBe('GENERAL');
      expect(notificationRule.triggerConfig).toEqual({});
      expect(notificationRule.recipientsConfig?.triggerType).toBe('GENERAL');
      expect(notificationRule.recipientsConfig?.targets).toEqual(['user-1']);
      expect(notificationRule.tenantId).toBeUndefined();
      expect(notificationRule.templateId).toBeUndefined();
      expect(notificationRule.additionalConfig).toBeUndefined();
    });

    it('should create NotificationRuleInfo object', () => {
      const notificationRuleInfo: NotificationRuleInfo = {
        id: 'rule-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Rule',
        templateId: 'template-1',
        triggerType: 'DEVICE_CONNECTIVITY' as any,
        triggerConfig: {
          deviceId: 'device-1',
          timeout: 300,
        },
        recipientsConfig: {
          triggerType: 'DEVICE_CONNECTIVITY' as any,
          targets: ['user-1', 'user-2'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
          ]),
        },
        additionalConfig: {
          description: 'Rule for device connectivity issues',
        },
        templateName: 'Device Offline Template',
        deliveryMethods: ['EMAIL', 'SMS', 'SLACK'],
      };

      expect(notificationRuleInfo.id).toBe('rule-1');
      expect(notificationRuleInfo.createdTime).toBe(1234567890);
      expect(notificationRuleInfo.tenantId).toBe('tenant-1');
      expect(notificationRuleInfo.name).toBe('Device Offline Rule');
      expect(notificationRuleInfo.templateId).toBe('template-1');
      expect(notificationRuleInfo.triggerType).toBe('DEVICE_CONNECTIVITY');
      expect(notificationRuleInfo.triggerConfig?.deviceId).toBe('device-1');
      expect(notificationRuleInfo.triggerConfig?.timeout).toBe(300);
      expect(notificationRuleInfo.recipientsConfig?.triggerType).toBe('DEVICE_CONNECTIVITY');
      expect(notificationRuleInfo.recipientsConfig?.targets).toEqual(['user-1', 'user-2']);
      expect(notificationRuleInfo.recipientsConfig?.escalationTable?.get(0)).toEqual(['user-1']);
      expect(notificationRuleInfo.recipientsConfig?.escalationTable?.get(300)).toEqual(['user-2', 'admin-1']);
      expect(notificationRuleInfo.additionalConfig?.description).toBe('Rule for device connectivity issues');
      expect(notificationRuleInfo.templateName).toBe('Device Offline Template');
      expect(notificationRuleInfo.deliveryMethods).toEqual(['EMAIL', 'SMS', 'SLACK']);
    });

    it('should handle different trigger types', () => {
      const alarmRule: NotificationRule = {
        id: 'alarm-rule',
        createdTime: 1234567890,
        name: 'Alarm Rule',
        triggerType: 'ALARM' as any,
        triggerConfig: {
          severity: 'CRITICAL',
          alarmType: 'temperature',
          threshold: 80,
        },
        recipientsConfig: {
          triggerType: 'ALARM' as any,
          targets: ['admin-1'],
        },
      };

      const entityActionRule: NotificationRule = {
        id: 'entity-action-rule',
        createdTime: 1234567890,
        name: 'Entity Action Rule',
        triggerType: 'ENTITY_ACTION' as any,
        triggerConfig: {
          entityType: 'DEVICE',
          actionType: 'CREATED',
        },
        recipientsConfig: {
          triggerType: 'ENTITY_ACTION' as any,
          targets: ['user-1'],
        },
      };

      const apiUsageRule: NotificationRule = {
        id: 'api-usage-rule',
        createdTime: 1234567890,
        name: 'API Usage Rule',
        triggerType: 'API_USAGE_LIMIT' as any,
        triggerConfig: {
          limit: 1000,
          period: 'DAILY',
        },
        recipientsConfig: {
          triggerType: 'API_USAGE_LIMIT' as any,
          targets: ['admin-1'],
        },
      };

      expect(alarmRule.triggerType).toBe('ALARM');
      expect(alarmRule.triggerConfig?.severity).toBe('CRITICAL');
      expect(alarmRule.triggerConfig?.alarmType).toBe('temperature');
      expect(alarmRule.triggerConfig?.threshold).toBe(80);

      expect(entityActionRule.triggerType).toBe('ENTITY_ACTION');
      expect(entityActionRule.triggerConfig?.entityType).toBe('DEVICE');
      expect(entityActionRule.triggerConfig?.actionType).toBe('CREATED');

      expect(apiUsageRule.triggerType).toBe('API_USAGE_LIMIT');
      expect(apiUsageRule.triggerConfig?.limit).toBe(1000);
      expect(apiUsageRule.triggerConfig?.period).toBe('DAILY');
    });

    it('should handle complex escalation tables', () => {
      const notificationRule: NotificationRule = {
        id: 'complex-rule',
        createdTime: 1234567890,
        name: 'Complex Escalation Rule',
        triggerType: 'GENERAL' as any,
        triggerConfig: {},
        recipientsConfig: {
          triggerType: 'GENERAL' as any,
          targets: ['user-1'],
          escalationTable: new Map([
            [0, ['user-1']],
            [300, ['user-2', 'admin-1']],
            [600, ['admin-2', 'admin-3', 'manager-1']],
            [900, ['director-1', 'director-2']],
            [1200, ['ceo-1']],
          ]),
        },
      };

      expect(notificationRule.recipientsConfig?.escalationTable?.get(0)).toEqual(['user-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(300)).toEqual(['user-2', 'admin-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(600)).toEqual(['admin-2', 'admin-3', 'manager-1']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(900)).toEqual(['director-1', 'director-2']);
      expect(notificationRule.recipientsConfig?.escalationTable?.get(1200)).toEqual(['ceo-1']);
    });
  });
});