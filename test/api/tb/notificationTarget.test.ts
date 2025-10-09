import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  notificationTargetListByIds,
  notificationTargetList,
  saveNotificationTarget,
  getNotificationTargetById,
  deleteNotificationTarget,
  getRecipientsByTargetConfig,
} from '/@/api/tb/notificationTarget';
import type {
  NotificationTarget,
  NotificationTargetConfig,
} from '/@/api/tb/notificationTarget';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock UserInfo type
vi.mock('/#/store', () => ({
  UserInfo: {
    id: 'string',
    username: 'string',
    email: 'string',
    firstName: 'string',
    lastName: 'string',
  },
}));

describe('api/tb/notificationTarget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('notificationTargetListByIds', () => {
    it('should call defHttp.get with correct URL and ids params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'target-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Platform Users Target',
            configuration: {
              description: 'Target for platform users',
              type: 'PLATFORM_USERS',
              usersFilter: {
                type: 'USER_LIST',
                usersIds: ['user-1', 'user-2'],
              },
            },
          },
          {
            id: 'target-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            name: 'Slack Target',
            configuration: {
              description: 'Target for Slack notifications',
              type: 'SLACK',
              conversationType: 'PUBLIC_CHANNEL',
              conversation: {
                id: 'channel-1',
                name: 'alerts',
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const ids = ['target-1', 'target-2'];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationTargetListByIds(ids);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/targets',
        params: { ids },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty ids array', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const ids: string[] = [];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationTargetListByIds(ids);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/targets',
        params: { ids },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('notificationTargetList', () => {
    it('should call defHttp.get with notificationType param', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'target-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Platform Users Target',
            configuration: {
              description: 'Target for platform users',
              type: 'PLATFORM_USERS',
              usersFilter: {
                type: 'USER_LIST',
                usersIds: ['user-1', 'user-2'],
              },
            },
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'target',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      const notificationType = 'GENERAL';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await notificationTargetList(params, notificationType);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/targets',
        params: { notificationType, ...params },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call defHttp.get without notificationType param', async () => {
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

      const result = await notificationTargetList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/targets',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveNotificationTarget', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationTarget = {
        id: 'target-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Platform Users Target',
        configuration: {
          description: 'Target for platform users',
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'USER_LIST',
            usersIds: ['user-1', 'user-2'],
          },
        },
      };
      const testData: NotificationTarget = {
        id: 'target-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Platform Users Target',
        configuration: {
          description: 'Target for platform users',
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'USER_LIST',
            usersIds: ['user-1', 'user-2'],
          },
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTarget(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/target',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Target', type: 'PLATFORM_USERS' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTarget(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/target',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveNotificationTarget();

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/target',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getNotificationTargetById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: NotificationTarget = {
        id: 'target-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Platform Users Target',
        configuration: {
          description: 'Target for platform users',
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'USER_LIST',
            usersIds: ['user-1', 'user-2'],
          },
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getNotificationTargetById('target-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/notification/target/target-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteNotificationTarget', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteNotificationTarget('target-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/notification/target/target-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRecipientsByTargetConfig', () => {
    it('should call defHttp.postJson with correct URL, data and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'user-1',
            username: 'user1',
            email: 'user1@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
          {
            id: 'user-2',
            username: 'user2',
            email: 'user2@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const testData: NotificationTarget = {
        id: 'target-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Platform Users Target',
        configuration: {
          description: 'Target for platform users',
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'USER_LIST',
            usersIds: ['user-1', 'user-2'],
          },
        },
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getRecipientsByTargetConfig(testData, params);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/target/recipients',
        data: testData,
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const testData = { type: 'PLATFORM_USERS', usersFilter: { type: 'ALL_USERS' } };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await getRecipientsByTargetConfig(testData, params);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/notification/target/recipients',
        data: testData,
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create NotificationTargetConfig with PLATFORM_USERS type', () => {
      const config: NotificationTargetConfig = {
        description: 'Target for platform users',
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'USER_LIST',
          usersIds: ['user-1', 'user-2', 'user-3'],
        },
      };

      expect(config.description).toBe('Target for platform users');
      expect(config.type).toBe('PLATFORM_USERS');
      expect(config.usersFilter?.type).toBe('USER_LIST');
      expect(config.usersFilter?.usersIds).toEqual(['user-1', 'user-2', 'user-3']);
      expect(config.conversationType).toBeUndefined();
      expect(config.conversation).toBeUndefined();
    });

    it('should create NotificationTargetConfig with SLACK type', () => {
      const config: NotificationTargetConfig = {
        description: 'Target for Slack notifications',
        type: 'SLACK',
        conversationType: 'PUBLIC_CHANNEL',
        conversation: {
          id: 'channel-1',
          name: 'alerts',
          topic: 'System alerts and notifications',
        },
      };

      expect(config.description).toBe('Target for Slack notifications');
      expect(config.type).toBe('SLACK');
      expect(config.conversationType).toBe('PUBLIC_CHANNEL');
      expect(config.conversation?.id).toBe('channel-1');
      expect(config.conversation?.name).toBe('alerts');
      expect(config.conversation?.topic).toBe('System alerts and notifications');
      expect(config.usersFilter).toBeUndefined();
    });

    it('should create NotificationTargetConfig with different user filter types', () => {
      const userListConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'USER_LIST',
          usersIds: ['user-1', 'user-2'],
        },
      };

      const customerUsersConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'CUSTOMER_USERS',
          customerId: 'customer-1',
        },
      };

      const tenantAdminsConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'TENANT_ADMINISTRATORS',
          tenantsIds: ['tenant-1', 'tenant-2'],
          tenantProfilesIds: ['profile-1'],
        },
      };

      const allUsersConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'ALL_USERS',
        },
      };

      const systemAdminsConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'SYSTEM_ADMINISTRATORS',
        },
      };

      const affectedTenantAdminsConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'AFFECTED_TENANT_ADMINISTRATORS',
        },
      };

      const originatorEntityOwnerConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'ORIGINATOR_ENTITY_OWNER_USERS',
        },
      };

      const affectedUserConfig: NotificationTargetConfig = {
        type: 'PLATFORM_USERS',
        usersFilter: {
          type: 'AFFECTED_USER',
        },
      };

      expect(userListConfig.usersFilter?.type).toBe('USER_LIST');
      expect(userListConfig.usersFilter?.usersIds).toEqual(['user-1', 'user-2']);

      expect(customerUsersConfig.usersFilter?.type).toBe('CUSTOMER_USERS');
      expect(customerUsersConfig.usersFilter?.customerId).toBe('customer-1');

      expect(tenantAdminsConfig.usersFilter?.type).toBe('TENANT_ADMINISTRATORS');
      expect(tenantAdminsConfig.usersFilter?.tenantsIds).toEqual(['tenant-1', 'tenant-2']);
      expect(tenantAdminsConfig.usersFilter?.tenantProfilesIds).toEqual(['profile-1']);

      expect(allUsersConfig.usersFilter?.type).toBe('ALL_USERS');

      expect(systemAdminsConfig.usersFilter?.type).toBe('SYSTEM_ADMINISTRATORS');

      expect(affectedTenantAdminsConfig.usersFilter?.type).toBe('AFFECTED_TENANT_ADMINISTRATORS');

      expect(originatorEntityOwnerConfig.usersFilter?.type).toBe('ORIGINATOR_ENTITY_OWNER_USERS');

      expect(affectedUserConfig.usersFilter?.type).toBe('AFFECTED_USER');
    });

    it('should create NotificationTargetConfig with different Slack conversation types', () => {
      const directConfig: NotificationTargetConfig = {
        type: 'SLACK',
        conversationType: 'DIRECT',
        conversation: {
          id: 'user-123',
          name: 'john.doe',
        },
      };

      const publicChannelConfig: NotificationTargetConfig = {
        type: 'SLACK',
        conversationType: 'PUBLIC_CHANNEL',
        conversation: {
          id: 'channel-456',
          name: 'general',
          topic: 'General discussion',
        },
      };

      const privateChannelConfig: NotificationTargetConfig = {
        type: 'SLACK',
        conversationType: 'PRIVATE_CHANNEL',
        conversation: {
          id: 'channel-789',
          name: 'private-alerts',
          topic: 'Private alerts channel',
        },
      };

      expect(directConfig.conversationType).toBe('DIRECT');
      expect(directConfig.conversation?.id).toBe('user-123');
      expect(directConfig.conversation?.name).toBe('john.doe');

      expect(publicChannelConfig.conversationType).toBe('PUBLIC_CHANNEL');
      expect(publicChannelConfig.conversation?.id).toBe('channel-456');
      expect(publicChannelConfig.conversation?.name).toBe('general');
      expect(publicChannelConfig.conversation?.topic).toBe('General discussion');

      expect(privateChannelConfig.conversationType).toBe('PRIVATE_CHANNEL');
      expect(privateChannelConfig.conversation?.id).toBe('channel-789');
      expect(privateChannelConfig.conversation?.name).toBe('private-alerts');
      expect(privateChannelConfig.conversation?.topic).toBe('Private alerts channel');
    });

    it('should create NotificationTarget object with all fields', () => {
      const notificationTarget: NotificationTarget = {
        id: 'target-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Platform Users Target',
        configuration: {
          description: 'Target for platform users',
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'USER_LIST',
            usersIds: ['user-1', 'user-2', 'user-3'],
          },
        },
      };

      expect(notificationTarget.id).toBe('target-1');
      expect(notificationTarget.createdTime).toBe(1234567890);
      expect(notificationTarget.tenantId).toBe('tenant-1');
      expect(notificationTarget.name).toBe('Platform Users Target');
      expect(notificationTarget.configuration?.description).toBe('Target for platform users');
      expect(notificationTarget.configuration?.type).toBe('PLATFORM_USERS');
      expect(notificationTarget.configuration?.usersFilter?.type).toBe('USER_LIST');
      expect(notificationTarget.configuration?.usersFilter?.usersIds).toEqual(['user-1', 'user-2', 'user-3']);
    });

    it('should create NotificationTarget object with minimal fields', () => {
      const notificationTarget: NotificationTarget = {
        id: 'target-minimal',
        createdTime: 1234567890,
        name: 'Minimal Target',
        configuration: {
          type: 'PLATFORM_USERS',
          usersFilter: {
            type: 'ALL_USERS',
          },
        },
      };

      expect(notificationTarget.id).toBe('target-minimal');
      expect(notificationTarget.createdTime).toBe(1234567890);
      expect(notificationTarget.name).toBe('Minimal Target');
      expect(notificationTarget.configuration?.type).toBe('PLATFORM_USERS');
      expect(notificationTarget.configuration?.usersFilter?.type).toBe('ALL_USERS');
      expect(notificationTarget.tenantId).toBeUndefined();
      expect(notificationTarget.configuration?.description).toBeUndefined();
    });

    it('should handle complex Slack configuration', () => {
      const notificationTarget: NotificationTarget = {
        id: 'slack-target',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Complex Slack Target',
        configuration: {
          description: 'Complex Slack target with multiple settings',
          type: 'SLACK',
          conversationType: 'PUBLIC_CHANNEL',
          conversation: {
            id: 'channel-complex',
            name: 'complex-alerts',
            topic: 'Complex system alerts and notifications',
            purpose: 'Channel for complex system alerts',
            isChannel: true,
            isGroup: false,
            isIm: false,
            isMpim: false,
            isPrivate: false,
            isArchived: false,
            members: ['user-1', 'user-2', 'user-3'],
            created: 1234567890,
            creator: 'user-admin',
            isGeneral: false,
            unlinked: 0,
            nameNormalized: 'complex-alerts',
            isShared: false,
            isOrgShared: false,
            pendingShared: [],
            pendingConnectedTeamIds: [],
            isPendingExtShared: false,
            isExtShared: false,
            isMember: true,
            isOpen: true,
            priority: 0,
          },
        },
      };

      expect(notificationTarget.id).toBe('slack-target');
      expect(notificationTarget.createdTime).toBe(1234567890);
      expect(notificationTarget.tenantId).toBe('tenant-1');
      expect(notificationTarget.name).toBe('Complex Slack Target');
      expect(notificationTarget.configuration?.description).toBe('Complex Slack target with multiple settings');
      expect(notificationTarget.configuration?.type).toBe('SLACK');
      expect(notificationTarget.configuration?.conversationType).toBe('PUBLIC_CHANNEL');
      expect(notificationTarget.configuration?.conversation?.id).toBe('channel-complex');
      expect(notificationTarget.configuration?.conversation?.name).toBe('complex-alerts');
      expect(notificationTarget.configuration?.conversation?.topic).toBe('Complex system alerts and notifications');
      expect(notificationTarget.configuration?.conversation?.purpose).toBe('Channel for complex system alerts');
      expect(notificationTarget.configuration?.conversation?.isChannel).toBe(true);
      expect(notificationTarget.configuration?.conversation?.isGroup).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isIm).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isMpim).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isPrivate).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isArchived).toBe(false);
      expect(notificationTarget.configuration?.conversation?.members).toEqual(['user-1', 'user-2', 'user-3']);
      expect(notificationTarget.configuration?.conversation?.created).toBe(1234567890);
      expect(notificationTarget.configuration?.conversation?.creator).toBe('user-admin');
      expect(notificationTarget.configuration?.conversation?.isGeneral).toBe(false);
      expect(notificationTarget.configuration?.conversation?.unlinked).toBe(0);
      expect(notificationTarget.configuration?.conversation?.nameNormalized).toBe('complex-alerts');
      expect(notificationTarget.configuration?.conversation?.isShared).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isOrgShared).toBe(false);
      expect(notificationTarget.configuration?.conversation?.pendingShared).toEqual([]);
      expect(notificationTarget.configuration?.conversation?.pendingConnectedTeamIds).toEqual([]);
      expect(notificationTarget.configuration?.conversation?.isPendingExtShared).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isExtShared).toBe(false);
      expect(notificationTarget.configuration?.conversation?.isMember).toBe(true);
      expect(notificationTarget.configuration?.conversation?.isOpen).toBe(true);
      expect(notificationTarget.configuration?.conversation?.priority).toBe(0);
    });
  });
});