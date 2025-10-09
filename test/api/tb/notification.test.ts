import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  notificationList,
  markNotificationAsRead,
  markAllNotificationAsRead,
  deleteNotification,
  getDeliveryMethods,
  notificationRequestList,
  createNotificationRequest,
  getNotificationRequestById,
  deleteNotificationRequest,
  getNotificationRequestPreview,
  getNotificationSettings,
  saveNotificationSettings,
  getUserNotificationSettings,
  saveUserNotificationSettings,
} from '/@/api/tb/notification';
import type {
  Notification,
  NotificationConfig,
  NotificationInfo,
  NotificationRequest,
  NotificationRequestInfo,
  NotificationRequestPreview,
  NotificationSettings,
  NotificationPref,
} from '/@/api/tb/notification';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock NotificationTemplate
vi.mock('/@/api/tb/notificationTemplate', () => ({
  NotificationTemplate: {
    id: 'string',
    name: 'string',
    notificationType: 'string',
  },
}));

// Mock enums
vi.mock('/@/enums/notificationEnum', () => ({
  NotificationRequestStatus: {
    SCHEDULED: 'SCHEDULED',
    SENT: 'SENT',
    FAILED: 'FAILED',
  },
  NotificationStatus: {
    READ: 'READ',
    UNREAD: 'UNREAD',
  },
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

describe('api/tb/notification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('notificationList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'notification-1',
            createdTime: 1234567890,
            requestId: 'request-1',
            recipientId: 'user-1',
            subject: 'Test Notification',
            type: 'GENERAL' as any,
            text: 'This is a test notification',
            status: 'UNREAD' as any,
          },
          {
            id: 'notification-2',
            createdTime: 1234567891,
            requestId: 'request-2',
            recipientId: 'user-1',
            subject: 'Another Notification',
            type: 'ALARM' as any,
            text: 'This is an alarm notification',
            status: 'READ' as any,
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
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationList(params, true);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notifications',
        params: { ...params, unreadOnly: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle unreadOnly default value', async () => {
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

      const result = await notificationList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notifications',
        params: { ...params, unreadOnly: true },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('markNotificationAsRead', () => {
    it('should call defHttp.put with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await markNotificationAsRead('notification-1');

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/notification/notification-1/read',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('markAllNotificationAsRead', () => {
    it('should call defHttp.put with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.put).mockResolvedValue(mockResponse);

      const result = await markAllNotificationAsRead();

      expect(defHttp.put).toHaveBeenCalledWith({
        url: '/api/notifications/read',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotification', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteNotification('notification-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/notification/notification-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDeliveryMethods', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = ['EMAIL', 'SMS', 'SLACK', 'WEBHOOK'];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getDeliveryMethods();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/deliveryMethods',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('notificationRequestList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'request-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            targets: ['user-1', 'user-2'],
            templateId: 'template-1',
            template: { id: 'template-1', name: 'Test Template' } as any,
            info: {
              stateEntityId: 'device-1',
              templateData: { deviceName: 'Device 1' },
            },
            additionalConfig: { sendingDelayInSec: 0 },
            originatorEntityId: 'device-1',
            ruleId: 'rule-1',
            status: 'SENT' as any,
            stats: {
              sent: new Map([['EMAIL', 2]]),
              errors: new Map(),
              error: undefined,
            },
            templateName: 'Test Template',
            deliveryMethods: ['EMAIL'],
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
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationRequestList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/requests',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('createNotificationRequest', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRequest = {
        id: 'request-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        targets: ['user-1', 'user-2'],
        templateId: 'template-1',
        template: { id: 'template-1', name: 'Test Template' } as any,
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        additionalConfig: { sendingDelayInSec: 0 },
        originatorEntityId: 'device-1',
        ruleId: 'rule-1',
        status: 'SCHEDULED' as any,
        stats: {
          sent: new Map(),
          errors: new Map(),
          error: undefined,
        },
      };
      const testData: NotificationRequest = {
        id: 'request-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        targets: ['user-1', 'user-2'],
        templateId: 'template-1',
        template: { id: 'template-1', name: 'Test Template' } as any,
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        additionalConfig: { sendingDelayInSec: 0 },
        originatorEntityId: 'device-1',
        ruleId: 'rule-1',
        status: 'SCHEDULED' as any,
        stats: {
          sent: new Map(),
          errors: new Map(),
          error: undefined,
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await createNotificationRequest(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/request',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { targets: ['user-1'], templateId: 'template-1' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await createNotificationRequest(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/request',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationRequestById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRequestInfo = {
        id: 'request-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        targets: ['user-1', 'user-2'],
        templateId: 'template-1',
        template: { id: 'template-1', name: 'Test Template' } as any,
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        additionalConfig: { sendingDelayInSec: 0 },
        originatorEntityId: 'device-1',
        ruleId: 'rule-1',
        status: 'SENT' as any,
        stats: {
          sent: new Map([['EMAIL', 2]]),
          errors: new Map(),
          error: undefined,
        },
        templateName: 'Test Template',
        deliveryMethods: ['EMAIL'],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getNotificationRequestById('request-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/request/request-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotificationRequest', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteNotificationRequest('request-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/notification/request/request-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationRequestPreview', () => {
    it('should call defHttp.postJson with correct URL, params, and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRequestPreview = {
        processedTemplates: {
          EMAIL: { subject: 'Test Subject', body: 'Test Body' },
          SMS: { text: 'Test SMS' },
        },
        totalRecipientsCount: 5,
        recipientsCountByTarget: {
          EMAIL: 3,
          SMS: 2,
        },
        recipientsPreview: ['user1@example.com', 'user2@example.com', 'user3@example.com'],
      };
      const testData: NotificationRequest = {
        id: 'request-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        targets: ['user-1', 'user-2'],
        templateId: 'template-1',
        template: { id: 'template-1', name: 'Test Template' } as any,
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        additionalConfig: { sendingDelayInSec: 0 },
        originatorEntityId: 'device-1',
        ruleId: 'rule-1',
        status: 'SCHEDULED' as any,
        stats: {
          sent: new Map(),
          errors: new Map(),
          error: undefined,
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getNotificationRequestPreview(testData, 10);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/request/preview',
        params: { recipientsPreviewSize: 10 },
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle recipientsPreviewSize default value', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRequestPreview = {
        processedTemplates: {},
        totalRecipientsCount: 0,
        recipientsCountByTarget: {},
        recipientsPreview: [],
      };
      const testData = { targets: ['user-1'], templateId: 'template-1' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getNotificationRequestPreview(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/request/preview',
        params: { recipientsPreviewSize: 20 },
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationRequestPreview = {
        processedTemplates: { EMAIL: { subject: 'Test' } },
        totalRecipientsCount: 1,
        recipientsCountByTarget: { EMAIL: 1 },
        recipientsPreview: ['user@example.com'],
      };
      const testData = { targets: ['user-1'], templateId: 'template-1' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getNotificationRequestPreview(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/request/preview',
        params: { recipientsPreviewSize: 20 },
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationSettings', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', false],
            ]),
          }],
          ['ALARM' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', true],
            ]),
          }],
        ]),
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getNotificationSettings();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/settings',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveNotificationSettings', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', false],
            ]),
          }],
        ]),
      };
      const testData: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', false],
            ]),
          }],
        ]),
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationSettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/settings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { prefs: { GENERAL: { enabled: true } } };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationSettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/settings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUserNotificationSettings', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: false,
            enabledDeliveryMethods: new Map([
              ['EMAIL', false],
              ['SMS', false],
            ]),
          }],
        ]),
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getUserNotificationSettings();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/settings/user',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveUserNotificationSettings', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: false,
            enabledDeliveryMethods: new Map([
              ['EMAIL', false],
              ['SMS', false],
            ]),
          }],
        ]),
      };
      const testData: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: false,
            enabledDeliveryMethods: new Map([
              ['EMAIL', false],
              ['SMS', false],
            ]),
          }],
        ]),
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveUserNotificationSettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/settings/user',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { prefs: { GENERAL: { enabled: false } } };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveUserNotificationSettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/settings/user',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create Notification object with all fields', () => {
      const notification: Notification = {
        id: 'notification-1',
        createdTime: 1234567890,
        requestId: 'request-1',
        recipientId: 'user-1',
        subject: 'Test Notification',
        type: 'GENERAL' as any,
        text: 'This is a test notification',
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        status: 'UNREAD' as any,
        additionalConfig: {
          actionButtonConfig: {
            enabled: true,
            text: 'View Details',
            linkType: 'DASHBOARD',
            link: '/dashboard/device-1',
          },
          icon: {
            enabled: true,
            icon: 'info',
            color: '#1890ff',
          },
        },
      };

      expect(notification.id).toBe('notification-1');
      expect(notification.createdTime).toBe(1234567890);
      expect(notification.requestId).toBe('request-1');
      expect(notification.recipientId).toBe('user-1');
      expect(notification.subject).toBe('Test Notification');
      expect(notification.type).toBe('GENERAL');
      expect(notification.text).toBe('This is a test notification');
      expect(notification.info?.stateEntityId).toBe('device-1');
      expect(notification.info?.templateData?.deviceName).toBe('Device 1');
      expect(notification.status).toBe('UNREAD');
      expect(notification.additionalConfig?.actionButtonConfig?.enabled).toBe(true);
      expect(notification.additionalConfig?.actionButtonConfig?.text).toBe('View Details');
      expect(notification.additionalConfig?.actionButtonConfig?.linkType).toBe('DASHBOARD');
      expect(notification.additionalConfig?.actionButtonConfig?.link).toBe('/dashboard/device-1');
      expect(notification.additionalConfig?.icon?.enabled).toBe(true);
      expect(notification.additionalConfig?.icon?.icon).toBe('info');
      expect(notification.additionalConfig?.icon?.color).toBe('#1890ff');
    });

    it('should create NotificationConfig object', () => {
      const notificationConfig: NotificationConfig = {
        actionButtonConfig: {
          enabled: true,
          text: 'Click Here',
          linkType: 'URL',
          link: 'https://example.com',
        },
        icon: {
          enabled: true,
          icon: 'warning',
          color: '#ff4d4f',
        },
        customField: 'customValue',
      };

      expect(notificationConfig.actionButtonConfig.enabled).toBe(true);
      expect(notificationConfig.actionButtonConfig.text).toBe('Click Here');
      expect(notificationConfig.actionButtonConfig.linkType).toBe('URL');
      expect(notificationConfig.actionButtonConfig.link).toBe('https://example.com');
      expect(notificationConfig.icon.enabled).toBe(true);
      expect(notificationConfig.icon.icon).toBe('warning');
      expect(notificationConfig.icon.color).toBe('#ff4d4f');
      expect(notificationConfig.customField).toBe('customValue');
    });

    it('should create NotificationInfo object', () => {
      const notificationInfo: NotificationInfo = {
        stateEntityId: 'device-1',
        templateData: {
          deviceName: 'Device 1',
          temperature: 25.5,
          status: 'ACTIVE',
        },
        customField: 'customValue',
      };

      expect(notificationInfo.stateEntityId).toBe('device-1');
      expect(notificationInfo.templateData?.deviceName).toBe('Device 1');
      expect(notificationInfo.templateData?.temperature).toBe(25.5);
      expect(notificationInfo.templateData?.status).toBe('ACTIVE');
      expect(notificationInfo.customField).toBe('customValue');
    });

    it('should create NotificationRequest object', () => {
      const notificationRequest: NotificationRequest = {
        id: 'request-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        targets: ['user-1', 'user-2', 'user-3'],
        templateId: 'template-1',
        template: { id: 'template-1', name: 'Test Template' } as any,
        info: {
          stateEntityId: 'device-1',
          templateData: { deviceName: 'Device 1' },
        },
        additionalConfig: { sendingDelayInSec: 30 },
        originatorEntityId: 'device-1',
        ruleId: 'rule-1',
        status: 'SCHEDULED' as any,
        stats: {
          sent: new Map([['EMAIL', 2], ['SMS', 1]]),
          errors: new Map([['SMS', 'Invalid phone number']]),
          error: 'Some error occurred',
        },
      };

      expect(notificationRequest.id).toBe('request-1');
      expect(notificationRequest.createdTime).toBe(1234567890);
      expect(notificationRequest.tenantId).toBe('tenant-1');
      expect(notificationRequest.targets).toEqual(['user-1', 'user-2', 'user-3']);
      expect(notificationRequest.templateId).toBe('template-1');
      expect(notificationRequest.template?.id).toBe('template-1');
      expect(notificationRequest.template?.name).toBe('Test Template');
      expect(notificationRequest.info?.stateEntityId).toBe('device-1');
      expect(notificationRequest.info?.templateData?.deviceName).toBe('Device 1');
      expect(notificationRequest.additionalConfig?.sendingDelayInSec).toBe(30);
      expect(notificationRequest.originatorEntityId).toBe('device-1');
      expect(notificationRequest.ruleId).toBe('rule-1');
      expect(notificationRequest.status).toBe('SCHEDULED');
      expect(notificationRequest.stats?.sent?.get('EMAIL')).toBe(2);
      expect(notificationRequest.stats?.sent?.get('SMS')).toBe(1);
      expect(notificationRequest.stats?.errors?.get('SMS')).toBe('Invalid phone number');
      expect(notificationRequest.stats?.error).toBe('Some error occurred');
    });

    it('should create NotificationSettings object', () => {
      const notificationSettings: NotificationSettings = {
        prefs: new Map([
          ['GENERAL' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', false],
              ['SLACK', true],
            ]),
          }],
          ['ALARM' as any, {
            enabled: true,
            enabledDeliveryMethods: new Map([
              ['EMAIL', true],
              ['SMS', true],
              ['SLACK', false],
            ]),
          }],
        ]),
      };

      expect(notificationSettings.prefs.size).toBe(2);
      expect(notificationSettings.prefs.get('GENERAL')?.enabled).toBe(true);
      expect(notificationSettings.prefs.get('GENERAL')?.enabledDeliveryMethods?.get('EMAIL')).toBe(true);
      expect(notificationSettings.prefs.get('GENERAL')?.enabledDeliveryMethods?.get('SMS')).toBe(false);
      expect(notificationSettings.prefs.get('GENERAL')?.enabledDeliveryMethods?.get('SLACK')).toBe(true);
      expect(notificationSettings.prefs.get('ALARM')?.enabled).toBe(true);
      expect(notificationSettings.prefs.get('ALARM')?.enabledDeliveryMethods?.get('EMAIL')).toBe(true);
      expect(notificationSettings.prefs.get('ALARM')?.enabledDeliveryMethods?.get('SMS')).toBe(true);
      expect(notificationSettings.prefs.get('ALARM')?.enabledDeliveryMethods?.get('SLACK')).toBe(false);
    });

    it('should create NotificationPref object', () => {
      const notificationPref: NotificationPref = {
        enabled: true,
        enabledDeliveryMethods: new Map([
          ['EMAIL', true],
          ['SMS', false],
          ['WEBHOOK', true],
        ]),
      };

      expect(notificationPref.enabled).toBe(true);
      expect(notificationPref.enabledDeliveryMethods?.get('EMAIL')).toBe(true);
      expect(notificationPref.enabledDeliveryMethods?.get('SMS')).toBe(false);
      expect(notificationPref.enabledDeliveryMethods?.get('WEBHOOK')).toBe(true);
    });
  });
});