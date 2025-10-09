import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  notificationTemplateList,
  getNotificationTemplateById,
  saveNotificationTemplate,
  deleteNotificationTemplate,
} from '/@/api/tb/notificationTemplate';
import type { NotificationTemplate } from '/@/api/tb/notificationTemplate';

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

describe('api/tb/notificationTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('notificationTemplateList', () => {
    it('should call defHttp.get with correct URL and params including notificationTypes', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'template-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Device Offline Template',
            notificationType: 'DEVICE_CONNECTIVITY' as any,
            configuration: {
              deliveryMethodsTemplates: {
                EMAIL: {
                  subject: 'Device {{deviceName}} is offline',
                  body: 'Device {{deviceName}} has been offline for {{duration}} minutes.',
                },
                SMS: {
                  message: 'Device {{deviceName}} is offline',
                },
                SLACK: {
                  message: 'Device {{deviceName}} is offline',
                  channel: '#alerts',
                },
              },
            },
          },
          {
            id: 'template-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            name: 'Alarm Template',
            notificationType: 'ALARM' as any,
            configuration: {
              deliveryMethodsTemplates: {
                EMAIL: {
                  subject: 'Alarm: {{alarmType}}',
                  body: 'Alarm {{alarmType}} with severity {{severity}} has been triggered.',
                },
                SMS: {
                  message: 'Alarm: {{alarmType}} - {{severity}}',
                },
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'template',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      const notificationTypes = 'DEVICE_CONNECTIVITY,ALARM';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationTemplateList(params, notificationTypes);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/templates',
        params: { notificationTypes, ...params },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without notificationTypes', async () => {
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

      const result = await notificationTemplateList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/templates',
        params: { notificationTypes: undefined, ...params },
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

      const result = await notificationTemplateList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/templates',
        params: { notificationTypes: undefined, ...params },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationTemplateById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationTemplate = {
        id: 'template-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Template',
        notificationType: 'DEVICE_CONNECTIVITY' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Device {{deviceName}} is offline',
              body: 'Device {{deviceName}} has been offline for {{duration}} minutes.',
            },
            SMS: {
              message: 'Device {{deviceName}} is offline',
            },
            SLACK: {
              message: 'Device {{deviceName}} is offline',
              channel: '#alerts',
            },
          },
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getNotificationTemplateById('template-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/template/template-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveNotificationTemplate', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationTemplate = {
        id: 'template-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Template',
        notificationType: 'DEVICE_CONNECTIVITY' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Device {{deviceName}} is offline',
              body: 'Device {{deviceName}} has been offline for {{duration}} minutes.',
            },
            SMS: {
              message: 'Device {{deviceName}} is offline',
            },
            SLACK: {
              message: 'Device {{deviceName}} is offline',
              channel: '#alerts',
            },
          },
        },
      };
      const testData: NotificationTemplate = {
        id: 'template-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Template',
        notificationType: 'DEVICE_CONNECTIVITY' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Device {{deviceName}} is offline',
              body: 'Device {{deviceName}} has been offline for {{duration}} minutes.',
            },
            SMS: {
              message: 'Device {{deviceName}} is offline',
            },
            SLACK: {
              message: 'Device {{deviceName}} is offline',
              channel: '#alerts',
            },
          },
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTemplate(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/template',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Template', notificationType: 'GENERAL' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTemplate(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/template',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTemplate();

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/template',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotificationTemplate', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteNotificationTemplate('template-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/notification/template/template-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create NotificationTemplate object with all fields', () => {
      const notificationTemplate: NotificationTemplate = {
        id: 'template-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Device Offline Template',
        notificationType: 'DEVICE_CONNECTIVITY' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Device {{deviceName}} is offline',
              body: 'Device {{deviceName}} has been offline for {{duration}} minutes.',
              htmlBody: '<p>Device {{deviceName}} has been offline for {{duration}} minutes.</p>',
              attachments: ['device-report.pdf'],
            },
            SMS: {
              message: 'Device {{deviceName}} is offline',
              sender: 'ThingsBoard',
            },
            SLACK: {
              message: 'Device {{deviceName}} is offline',
              channel: '#alerts',
              username: 'ThingsBoard Bot',
              iconEmoji: ':warning:',
            },
            WEBHOOK: {
              url: 'https://example.com/webhook',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token',
              },
              body: '{"message": "Device {{deviceName}} is offline"}',
            },
          },
        },
      };

      expect(notificationTemplate.id).toBe('template-1');
      expect(notificationTemplate.createdTime).toBe(1234567890);
      expect(notificationTemplate.tenantId).toBe('tenant-1');
      expect(notificationTemplate.name).toBe('Device Offline Template');
      expect(notificationTemplate.notificationType).toBe('DEVICE_CONNECTIVITY');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.subject).toBe('Device {{deviceName}} is offline');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.body).toBe('Device {{deviceName}} has been offline for {{duration}} minutes.');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.htmlBody).toBe('<p>Device {{deviceName}} has been offline for {{duration}} minutes.</p>');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.attachments).toEqual(['device-report.pdf']);
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SMS?.message).toBe('Device {{deviceName}} is offline');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SMS?.sender).toBe('ThingsBoard');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.message).toBe('Device {{deviceName}} is offline');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.channel).toBe('#alerts');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.username).toBe('ThingsBoard Bot');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.iconEmoji).toBe(':warning:');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.url).toBe('https://example.com/webhook');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.method).toBe('POST');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.headers?.['Content-Type']).toBe('application/json');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.headers?.['Authorization']).toBe('Bearer token');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toBe('{"message": "Device {{deviceName}} is offline"}');
    });

    it('should create NotificationTemplate object with minimal fields', () => {
      const notificationTemplate: NotificationTemplate = {
        id: 'template-minimal',
        createdTime: 1234567890,
        name: 'Minimal Template',
        notificationType: 'GENERAL' as any,
        configuration: {
          deliveryMethodsTemplates: {},
        },
      };

      expect(notificationTemplate.id).toBe('template-minimal');
      expect(notificationTemplate.createdTime).toBe(1234567890);
      expect(notificationTemplate.name).toBe('Minimal Template');
      expect(notificationTemplate.notificationType).toBe('GENERAL');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates).toEqual({});
      expect(notificationTemplate.tenantId).toBeUndefined();
    });

    it('should handle different notification types', () => {
      const alarmTemplate: NotificationTemplate = {
        id: 'alarm-template',
        createdTime: 1234567890,
        name: 'Alarm Template',
        notificationType: 'ALARM' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Alarm: {{alarmType}}',
              body: 'Alarm {{alarmType}} with severity {{severity}} has been triggered.',
            },
            SMS: {
              message: 'Alarm: {{alarmType}} - {{severity}}',
            },
          },
        },
      };

      const entityActionTemplate: NotificationTemplate = {
        id: 'entity-action-template',
        createdTime: 1234567890,
        name: 'Entity Action Template',
        notificationType: 'ENTITY_ACTION' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Entity {{entityType}} {{actionType}}',
              body: 'Entity {{entityName}} of type {{entityType}} has been {{actionType}}.',
            },
          },
        },
      };

      const apiUsageTemplate: NotificationTemplate = {
        id: 'api-usage-template',
        createdTime: 1234567890,
        name: 'API Usage Template',
        notificationType: 'API_USAGE_LIMIT' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'API Usage Limit Exceeded',
              body: 'API usage limit of {{limit}} requests per {{period}} has been exceeded.',
            },
          },
        },
      };

      expect(alarmTemplate.notificationType).toBe('ALARM');
      expect(alarmTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.subject).toBe('Alarm: {{alarmType}}');
      expect(alarmTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.body).toBe('Alarm {{alarmType}} with severity {{severity}} has been triggered.');
      expect(alarmTemplate.configuration.deliveryMethodsTemplates?.SMS?.message).toBe('Alarm: {{alarmType}} - {{severity}}');

      expect(entityActionTemplate.notificationType).toBe('ENTITY_ACTION');
      expect(entityActionTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.subject).toBe('Entity {{entityType}} {{actionType}}');
      expect(entityActionTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.body).toBe('Entity {{entityName}} of type {{entityType}} has been {{actionType}}.');

      expect(apiUsageTemplate.notificationType).toBe('API_USAGE_LIMIT');
      expect(apiUsageTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.subject).toBe('API Usage Limit Exceeded');
      expect(apiUsageTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.body).toBe('API usage limit of {{limit}} requests per {{period}} has been exceeded.');
    });

    it('should handle complex delivery method configurations', () => {
      const notificationTemplate: NotificationTemplate = {
        id: 'complex-template',
        createdTime: 1234567890,
        name: 'Complex Template',
        notificationType: 'GENERAL' as any,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Complex Notification',
              body: 'This is a complex notification with multiple variables: {{var1}}, {{var2}}, {{var3}}.',
              htmlBody: '<h1>Complex Notification</h1><p>Variables: {{var1}}, {{var2}}, {{var3}}</p>',
              attachments: ['file1.pdf', 'file2.xlsx'],
              cc: ['cc@example.com'],
              bcc: ['bcc@example.com'],
            },
            SMS: {
              message: 'Complex SMS: {{var1}} - {{var2}}',
              sender: 'ComplexSender',
              encoding: 'UTF-8',
            },
            SLACK: {
              message: 'Complex Slack message: {{var1}} - {{var2}}',
              channel: '#complex-alerts',
              username: 'Complex Bot',
              iconEmoji: ':robot_face:',
              iconUrl: 'https://example.com/icon.png',
              attachments: [
                {
                  color: 'danger',
                  title: 'Complex Alert',
                  text: 'This is a complex alert with variables: {{var1}}, {{var2}}',
                  fields: [
                    { title: 'Field 1', value: '{{var1}}', short: true },
                    { title: 'Field 2', value: '{{var2}}', short: true },
                  ],
                },
              ],
            },
            WEBHOOK: {
              url: 'https://complex-webhook.example.com/api/notifications',
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer complex-token',
                'X-Custom-Header': 'CustomValue',
              },
              body: JSON.stringify({
                message: 'Complex webhook notification',
                variables: {
                  var1: '{{var1}}',
                  var2: '{{var2}}',
                  var3: '{{var3}}',
                },
                metadata: {
                  timestamp: '{{timestamp}}',
                  source: 'ThingsBoard',
                },
              }),
            },
          },
        },
      };

      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.subject).toBe('Complex Notification');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.body).toBe('This is a complex notification with multiple variables: {{var1}}, {{var2}}, {{var3}}.');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.htmlBody).toBe('<h1>Complex Notification</h1><p>Variables: {{var1}}, {{var2}}, {{var3}}</p>');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.attachments).toEqual(['file1.pdf', 'file2.xlsx']);
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.cc).toEqual(['cc@example.com']);
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.EMAIL?.bcc).toEqual(['bcc@example.com']);

      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SMS?.message).toBe('Complex SMS: {{var1}} - {{var2}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SMS?.sender).toBe('ComplexSender');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SMS?.encoding).toBe('UTF-8');

      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.message).toBe('Complex Slack message: {{var1}} - {{var2}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.channel).toBe('#complex-alerts');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.username).toBe('Complex Bot');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.iconEmoji).toBe(':robot_face:');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.iconUrl).toBe('https://example.com/icon.png');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.attachments).toHaveLength(1);
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.attachments?.[0]?.color).toBe('danger');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.attachments?.[0]?.title).toBe('Complex Alert');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.attachments?.[0]?.text).toBe('This is a complex alert with variables: {{var1}}, {{var2}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.SLACK?.attachments?.[0]?.fields).toHaveLength(2);

      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.url).toBe('https://complex-webhook.example.com/api/notifications');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.method).toBe('PUT');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.headers?.['Content-Type']).toBe('application/json');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.headers?.['Authorization']).toBe('Bearer complex-token');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.headers?.['X-Custom-Header']).toBe('CustomValue');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toContain('Complex webhook notification');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toContain('{{var1}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toContain('{{var2}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toContain('{{var3}}');
      expect(notificationTemplate.configuration.deliveryMethodsTemplates?.WEBHOOK?.body).toContain('{{timestamp}}');
    });
  });
});