import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotificationType } from '/@/enums/notificationEnum';
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
  notificationTemplateList,
  getNotificationTemplateById,
  saveNotificationTemplate,
  deleteNotificationTemplate,
} from '/@/api/tb/notificationTemplate';
import { defHttp } from '/@/utils/http/axios';

// Cast defHttp to access the mock functions
const mockDefHttp = defHttp as any;

describe('Notification Template API', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('notificationTemplateList', () => {
    it('should get notification template list without notification types', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 10,
        sortProperty: 'name',
        sortOrder: 'ASC',
      };
      const mockResponse = {
        data: [
          {
            id: { id: 'template1' },
            name: 'Email Template',
            notificationType: NotificationType.GENERAL,
          },
        ],
        totalElements: 1,
        totalPages: 1,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await notificationTemplateList(params);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/templates',
        params: { notificationTypes: undefined, ...params },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should get notification template list with notification types', async () => {
      const params: BasicQuery = {
        page: 0,
        pageSize: 20,
      };
      const notificationTypes = 'GENERAL,ALARM';
      const mockResponse = {
        data: [
          {
            id: { id: 'template1' },
            name: 'General Template',
            notificationType: NotificationType.GENERAL,
          },
          {
            id: { id: 'template2' },
            name: 'Alarm Template',
            notificationType: NotificationType.ALARM,
          },
        ],
        totalElements: 2,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await notificationTemplateList(params, notificationTypes);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/templates',
        params: { notificationTypes, ...params },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationTemplateById', () => {
    it('should get notification template by ID', async () => {
      const templateId = 'test-template-id';
      const mockResponse = {
        id: { id: templateId },
        name: 'Test Template',
        notificationType: NotificationType.GENERAL,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'Test Subject',
              body: 'Test Body',
            },
          },
        },
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getNotificationTemplateById(templateId);

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: `/api/notification/template/${templateId}`,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveNotificationTemplate', () => {
    it('should save notification template with data', async () => {
      const templateData = {
        name: 'New Template',
        notificationType: NotificationType.GENERAL,
        configuration: {
          deliveryMethodsTemplates: {
            EMAIL: {
              subject: 'New Subject',
              body: 'New Body',
            },
          },
        },
      };
      const mockResponse = {
        id: { id: 'new-template-id' },
        ...templateData,
      };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveNotificationTemplate(templateData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/template',
        data: templateData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should save notification template without data', async () => {
      const mockResponse = {
        id: { id: 'empty-template-id' },
        name: 'Empty Template',
      };

      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveNotificationTemplate();

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/template',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotificationTemplate', () => {
    it('should delete notification template', async () => {
      const templateId = 'test-template-id';

      mockDefHttp.delete.mockResolvedValue(undefined);

      const result = await deleteNotificationTemplate(templateId);

      expect(mockDefHttp.delete).toHaveBeenCalledWith({
        url: `/api/notification/template/${templateId}`,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('Error handling', () => {
    it('should handle notificationTemplateList errors', async () => {
      const params: BasicQuery = { page: 0, pageSize: 10 };
      const error = new Error('Server error');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(notificationTemplateList(params)).rejects.toThrow('Server error');
    });

    it('should handle getNotificationTemplateById errors', async () => {
      const templateId = 'invalid-id';
      const error = new Error('Template not found');

      mockDefHttp.get.mockRejectedValue(error);

      await expect(getNotificationTemplateById(templateId)).rejects.toThrow('Template not found');
    });

    it('should handle saveNotificationTemplate errors', async () => {
      const templateData = { name: 'Invalid Template' };
      const error = new Error('Validation failed');

      mockDefHttp.postJson.mockRejectedValue(error);

      await expect(saveNotificationTemplate(templateData)).rejects.toThrow('Validation failed');
    });

    it('should handle deleteNotificationTemplate errors', async () => {
      const templateId = 'in-use-template-id';
      const error = new Error('Template is in use');

      mockDefHttp.delete.mockRejectedValue(error);

      await expect(deleteNotificationTemplate(templateId)).rejects.toThrow('Template is in use');
    });
  });
});
