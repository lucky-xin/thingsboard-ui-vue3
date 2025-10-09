import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getTenantProfileInfoById,
  getTenantProfileInfoDefault,
  tenantProfileInfoList,
  saveTenantProfile,
  setTenantProfileDefault,
  getTenantProfileById,
  tenantProfiles,
  tenantProfileList,
  deleteTenantProfile,
} from '/@/api/tb/tenantProfile';
import type {
  TenantProfileConfiguration,
  TenantProfile,
} from '/@/api/tb/tenantProfile';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock Queue
vi.mock('/@/api/tb/queue', () => ({
  Queue: {
    id: 'string',
    name: 'string',
    topic: 'string',
  },
}));

describe('api/tb/tenantProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTenantProfileInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        id: 'tenant-profile-1',
        name: 'Premium Profile',
        type: 'TENANT_PROFILE' as any,
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        entityId: 'tenant-profile-1',
        entityName: 'Premium Profile',
        title: 'Premium Tenant Profile',
        ownerId: 'tenant-1',
        ownerName: 'Tenant 1',
        groups: [],
        typeName: 'Tenant Profile',
        groupName: 'Default',
        externalId: 'external-tenant-profile-1',
        additionalInfo: {
          description: 'Premium tenant profile with advanced features',
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantProfileInfoById('tenant-profile-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfileInfo/tenant-profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantProfileInfoDefault', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        id: 'default-tenant-profile',
        name: 'Default Profile',
        type: 'TENANT_PROFILE' as any,
        createdTime: 1234567890,
        tenantId: 'system',
        customerId: 'system',
        entityId: 'default-tenant-profile',
        entityName: 'Default Profile',
        title: 'Default Tenant Profile',
        ownerId: 'system',
        ownerName: 'System',
        groups: [],
        typeName: 'Tenant Profile',
        groupName: 'Default',
        externalId: 'external-default-tenant-profile',
        additionalInfo: {
          description: 'Default tenant profile for new tenants',
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantProfileInfoDefault();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfileInfo/default',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantProfileInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'tenant-profile-1',
            name: 'Premium Profile',
            type: 'TENANT_PROFILE' as any,
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            customerId: 'customer-1',
            entityId: 'tenant-profile-1',
            entityName: 'Premium Profile',
            title: 'Premium Tenant Profile',
            ownerId: 'tenant-1',
            ownerName: 'Tenant 1',
            groups: [],
            typeName: 'Tenant Profile',
            groupName: 'Default',
            externalId: 'external-tenant-profile-1',
            additionalInfo: {
              description: 'Premium tenant profile with advanced features',
            },
          },
          {
            id: 'tenant-profile-2',
            name: 'Standard Profile',
            type: 'TENANT_PROFILE' as any,
            createdTime: 1234567891,
            tenantId: 'tenant-2',
            customerId: 'customer-2',
            entityId: 'tenant-profile-2',
            entityName: 'Standard Profile',
            title: 'Standard Tenant Profile',
            ownerId: 'tenant-2',
            ownerName: 'Tenant 2',
            groups: [],
            typeName: 'Tenant Profile',
            groupName: 'Default',
            externalId: 'external-tenant-profile-2',
            additionalInfo: {
              description: 'Standard tenant profile for regular use',
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
        textSearch: 'profile',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantProfileInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfileInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveTenantProfile', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantProfile = {
        id: 'tenant-profile-1',
        createdTime: 1234567890,
        name: 'Premium Profile',
        description: 'Premium tenant profile with advanced features',
        default: false,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'PREMIUM',
            maxDevices: 10000,
            maxAssets: 5000,
            maxCustomers: 1000,
            maxUsers: 500,
            maxDashboards: 100,
            maxRuleChains: 50,
            maxResourcesInBytes: 1073741824,
            maxOtaPackagesInBytes: 536870912,
            transportTenantMsgRateLimit: '10000:1',
            transportTenantTelemetryMsgRateLimit: '5000:1',
            transportTenantTelemetryDataPointsRateLimit: '100000:1',
            transportDeviceMsgRateLimit: '1000:1',
            transportDeviceTelemetryMsgRateLimit: '500:1',
            transportDeviceTelemetryDataPointsRateLimit: '10000:1',
            tenantEntityExportRateLimit: '100:1',
            tenantEntityImportRateLimit: '50:1',
            tenantNotificationRequestsRateLimit: '1000:1',
            tenantNotificationRequestsPerRuleRateLimit: '100:1',
            maxTransportMessages: 1000000,
            maxTransportDataPoints: 10000000,
            maxREExecutions: 100000,
            maxJSExecutions: 50000,
            maxDPStorageDays: 365,
            maxRuleNodeExecutionsPerMessage: 100,
            maxEmails: 10000,
            maxSms: 1000,
            maxCreatedAlarms: 100000,
            tenantServerRestLimitsConfiguration: '1000:1',
            customerServerRestLimitsConfiguration: '500:1',
            maxWsSessionsPerTenant: 1000,
            maxWsSessionsPerCustomer: 100,
            maxWsSessionsPerRegularUser: 10,
            maxWsSessionsPerPublicUser: 5,
            wsMsgQueueLimitPerSession: 1000,
            maxWsSubscriptionsPerTenant: 10000,
            maxWsSubscriptionsPerCustomer: 1000,
            maxWsSubscriptionsPerRegularUser: 100,
            maxWsSubscriptionsPerPublicUser: 50,
            wsUpdatesPerSessionRateLimit: '100:1',
            cassandraQueryTenantRateLimitsConfiguration: '1000:1',
            defaultStorageTtlDays: 365,
            alarmsTtlDays: 90,
            rpcTtlDays: 30,
            warnThreshold: 0.8,
          },
          queueConfiguration: [
            {
              id: 'queue-1',
              name: 'Main Queue',
              topic: 'main-topic',
            },
          ],
        },
      };
      const testData: TenantProfile = {
        id: 'tenant-profile-1',
        createdTime: 1234567890,
        name: 'Premium Profile',
        description: 'Premium tenant profile with advanced features',
        default: false,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'PREMIUM',
            maxDevices: 10000,
            maxAssets: 5000,
            maxCustomers: 1000,
            maxUsers: 500,
            maxDashboards: 100,
            maxRuleChains: 50,
            maxResourcesInBytes: 1073741824,
            maxOtaPackagesInBytes: 536870912,
            transportTenantMsgRateLimit: '10000:1',
            transportTenantTelemetryMsgRateLimit: '5000:1',
            transportTenantTelemetryDataPointsRateLimit: '100000:1',
            transportDeviceMsgRateLimit: '1000:1',
            transportDeviceTelemetryMsgRateLimit: '500:1',
            transportDeviceTelemetryDataPointsRateLimit: '10000:1',
            tenantEntityExportRateLimit: '100:1',
            tenantEntityImportRateLimit: '50:1',
            tenantNotificationRequestsRateLimit: '1000:1',
            tenantNotificationRequestsPerRuleRateLimit: '100:1',
            maxTransportMessages: 1000000,
            maxTransportDataPoints: 10000000,
            maxREExecutions: 100000,
            maxJSExecutions: 50000,
            maxDPStorageDays: 365,
            maxRuleNodeExecutionsPerMessage: 100,
            maxEmails: 10000,
            maxSms: 1000,
            maxCreatedAlarms: 100000,
            tenantServerRestLimitsConfiguration: '1000:1',
            customerServerRestLimitsConfiguration: '500:1',
            maxWsSessionsPerTenant: 1000,
            maxWsSessionsPerCustomer: 100,
            maxWsSessionsPerRegularUser: 10,
            maxWsSessionsPerPublicUser: 5,
            wsMsgQueueLimitPerSession: 1000,
            maxWsSubscriptionsPerTenant: 10000,
            maxWsSubscriptionsPerCustomer: 1000,
            maxWsSubscriptionsPerRegularUser: 100,
            maxWsSubscriptionsPerPublicUser: 50,
            wsUpdatesPerSessionRateLimit: '100:1',
            cassandraQueryTenantRateLimitsConfiguration: '1000:1',
            defaultStorageTtlDays: 365,
            alarmsTtlDays: 90,
            rpcTtlDays: 30,
            warnThreshold: 0.8,
          },
          queueConfiguration: [
            {
              id: 'queue-1',
              name: 'Main Queue',
              topic: 'main-topic',
            },
          ],
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveTenantProfile(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/tenantProfile',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Profile', description: 'New tenant profile' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveTenantProfile(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/tenantProfile',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setTenantProfileDefault', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantProfile = {
        id: 'tenant-profile-1',
        createdTime: 1234567890,
        name: 'Premium Profile',
        description: 'Premium tenant profile with advanced features',
        default: true,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'PREMIUM',
            maxDevices: 10000,
            maxAssets: 5000,
            maxCustomers: 1000,
            maxUsers: 500,
            maxDashboards: 100,
            maxRuleChains: 50,
            maxResourcesInBytes: 1073741824,
            maxOtaPackagesInBytes: 536870912,
            transportTenantMsgRateLimit: '10000:1',
            transportTenantTelemetryMsgRateLimit: '5000:1',
            transportTenantTelemetryDataPointsRateLimit: '100000:1',
            transportDeviceMsgRateLimit: '1000:1',
            transportDeviceTelemetryMsgRateLimit: '500:1',
            transportDeviceTelemetryDataPointsRateLimit: '10000:1',
            tenantEntityExportRateLimit: '100:1',
            tenantEntityImportRateLimit: '50:1',
            tenantNotificationRequestsRateLimit: '1000:1',
            tenantNotificationRequestsPerRuleRateLimit: '100:1',
            maxTransportMessages: 1000000,
            maxTransportDataPoints: 10000000,
            maxREExecutions: 100000,
            maxJSExecutions: 50000,
            maxDPStorageDays: 365,
            maxRuleNodeExecutionsPerMessage: 100,
            maxEmails: 10000,
            maxSms: 1000,
            maxCreatedAlarms: 100000,
            tenantServerRestLimitsConfiguration: '1000:1',
            customerServerRestLimitsConfiguration: '500:1',
            maxWsSessionsPerTenant: 1000,
            maxWsSessionsPerCustomer: 100,
            maxWsSessionsPerRegularUser: 10,
            maxWsSessionsPerPublicUser: 5,
            wsMsgQueueLimitPerSession: 1000,
            maxWsSubscriptionsPerTenant: 10000,
            maxWsSubscriptionsPerCustomer: 1000,
            maxWsSubscriptionsPerRegularUser: 100,
            maxWsSubscriptionsPerPublicUser: 50,
            wsUpdatesPerSessionRateLimit: '100:1',
            cassandraQueryTenantRateLimitsConfiguration: '1000:1',
            defaultStorageTtlDays: 365,
            alarmsTtlDays: 90,
            rpcTtlDays: 30,
            warnThreshold: 0.8,
          },
          queueConfiguration: [],
        },
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await setTenantProfileDefault('tenant-profile-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/tenantProfile/tenant-profile-1/default',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantProfileById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantProfile = {
        id: 'tenant-profile-1',
        createdTime: 1234567890,
        name: 'Premium Profile',
        description: 'Premium tenant profile with advanced features',
        default: false,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'PREMIUM',
            maxDevices: 10000,
            maxAssets: 5000,
            maxCustomers: 1000,
            maxUsers: 500,
            maxDashboards: 100,
            maxRuleChains: 50,
            maxResourcesInBytes: 1073741824,
            maxOtaPackagesInBytes: 536870912,
            transportTenantMsgRateLimit: '10000:1',
            transportTenantTelemetryMsgRateLimit: '5000:1',
            transportTenantTelemetryDataPointsRateLimit: '100000:1',
            transportDeviceMsgRateLimit: '1000:1',
            transportDeviceTelemetryMsgRateLimit: '500:1',
            transportDeviceTelemetryDataPointsRateLimit: '10000:1',
            tenantEntityExportRateLimit: '100:1',
            tenantEntityImportRateLimit: '50:1',
            tenantNotificationRequestsRateLimit: '1000:1',
            tenantNotificationRequestsPerRuleRateLimit: '100:1',
            maxTransportMessages: 1000000,
            maxTransportDataPoints: 10000000,
            maxREExecutions: 100000,
            maxJSExecutions: 50000,
            maxDPStorageDays: 365,
            maxRuleNodeExecutionsPerMessage: 100,
            maxEmails: 10000,
            maxSms: 1000,
            maxCreatedAlarms: 100000,
            tenantServerRestLimitsConfiguration: '1000:1',
            customerServerRestLimitsConfiguration: '500:1',
            maxWsSessionsPerTenant: 1000,
            maxWsSessionsPerCustomer: 100,
            maxWsSessionsPerRegularUser: 10,
            maxWsSessionsPerPublicUser: 5,
            wsMsgQueueLimitPerSession: 1000,
            maxWsSubscriptionsPerTenant: 10000,
            maxWsSubscriptionsPerCustomer: 1000,
            maxWsSubscriptionsPerRegularUser: 100,
            maxWsSubscriptionsPerPublicUser: 50,
            wsUpdatesPerSessionRateLimit: '100:1',
            cassandraQueryTenantRateLimitsConfiguration: '1000:1',
            defaultStorageTtlDays: 365,
            alarmsTtlDays: 90,
            rpcTtlDays: 30,
            warnThreshold: 0.8,
          },
          queueConfiguration: [],
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantProfileById('tenant-profile-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfile/tenant-profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantProfiles', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantProfile[] = [
        {
          id: 'tenant-profile-1',
          createdTime: 1234567890,
          name: 'Premium Profile',
          description: 'Premium tenant profile with advanced features',
          default: false,
          isolatedTbRuleEngine: true,
          profileData: {
            configuration: {
              type: 'PREMIUM',
              maxDevices: 10000,
              maxAssets: 5000,
              maxCustomers: 1000,
              maxUsers: 500,
              maxDashboards: 100,
              maxRuleChains: 50,
              maxResourcesInBytes: 1073741824,
              maxOtaPackagesInBytes: 536870912,
              transportTenantMsgRateLimit: '10000:1',
              transportTenantTelemetryMsgRateLimit: '5000:1',
              transportTenantTelemetryDataPointsRateLimit: '100000:1',
              transportDeviceMsgRateLimit: '1000:1',
              transportDeviceTelemetryMsgRateLimit: '500:1',
              transportDeviceTelemetryDataPointsRateLimit: '10000:1',
              tenantEntityExportRateLimit: '100:1',
              tenantEntityImportRateLimit: '50:1',
              tenantNotificationRequestsRateLimit: '1000:1',
              tenantNotificationRequestsPerRuleRateLimit: '100:1',
              maxTransportMessages: 1000000,
              maxTransportDataPoints: 10000000,
              maxREExecutions: 100000,
              maxJSExecutions: 50000,
              maxDPStorageDays: 365,
              maxRuleNodeExecutionsPerMessage: 100,
              maxEmails: 10000,
              maxSms: 1000,
              maxCreatedAlarms: 100000,
              tenantServerRestLimitsConfiguration: '1000:1',
              customerServerRestLimitsConfiguration: '500:1',
              maxWsSessionsPerTenant: 1000,
              maxWsSessionsPerCustomer: 100,
              maxWsSessionsPerRegularUser: 10,
              maxWsSessionsPerPublicUser: 5,
              wsMsgQueueLimitPerSession: 1000,
              maxWsSubscriptionsPerTenant: 10000,
              maxWsSubscriptionsPerCustomer: 1000,
              maxWsSubscriptionsPerRegularUser: 100,
              maxWsSubscriptionsPerPublicUser: 50,
              wsUpdatesPerSessionRateLimit: '100:1',
              cassandraQueryTenantRateLimitsConfiguration: '1000:1',
              defaultStorageTtlDays: 365,
              alarmsTtlDays: 90,
              rpcTtlDays: 30,
              warnThreshold: 0.8,
            },
            queueConfiguration: [],
          },
        },
        {
          id: 'tenant-profile-2',
          createdTime: 1234567891,
          name: 'Standard Profile',
          description: 'Standard tenant profile for regular use',
          default: true,
          isolatedTbRuleEngine: false,
          profileData: {
            configuration: {
              type: 'STANDARD',
              maxDevices: 1000,
              maxAssets: 500,
              maxCustomers: 100,
              maxUsers: 50,
              maxDashboards: 10,
              maxRuleChains: 5,
              maxResourcesInBytes: 107374182,
              maxOtaPackagesInBytes: 53687091,
              transportTenantMsgRateLimit: '1000:1',
              transportTenantTelemetryMsgRateLimit: '500:1',
              transportTenantTelemetryDataPointsRateLimit: '10000:1',
              transportDeviceMsgRateLimit: '100:1',
              transportDeviceTelemetryMsgRateLimit: '50:1',
              transportDeviceTelemetryDataPointsRateLimit: '1000:1',
              tenantEntityExportRateLimit: '10:1',
              tenantEntityImportRateLimit: '5:1',
              tenantNotificationRequestsRateLimit: '100:1',
              tenantNotificationRequestsPerRuleRateLimit: '10:1',
              maxTransportMessages: 100000,
              maxTransportDataPoints: 1000000,
              maxREExecutions: 10000,
              maxJSExecutions: 5000,
              maxDPStorageDays: 90,
              maxRuleNodeExecutionsPerMessage: 10,
              maxEmails: 1000,
              maxSms: 100,
              maxCreatedAlarms: 10000,
              tenantServerRestLimitsConfiguration: '100:1',
              customerServerRestLimitsConfiguration: '50:1',
              maxWsSessionsPerTenant: 100,
              maxWsSessionsPerCustomer: 10,
              maxWsSessionsPerRegularUser: 5,
              maxWsSessionsPerPublicUser: 2,
              wsMsgQueueLimitPerSession: 100,
              maxWsSubscriptionsPerTenant: 1000,
              maxWsSubscriptionsPerCustomer: 100,
              maxWsSubscriptionsPerRegularUser: 10,
              maxWsSubscriptionsPerPublicUser: 5,
              wsUpdatesPerSessionRateLimit: '10:1',
              cassandraQueryTenantRateLimitsConfiguration: '100:1',
              defaultStorageTtlDays: 90,
              alarmsTtlDays: 30,
              rpcTtlDays: 7,
              warnThreshold: 0.9,
            },
            queueConfiguration: [],
          },
        },
      ];
      const ids = ['tenant-profile-1', 'tenant-profile-2'];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantProfiles(ids);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfiles',
        params: { ids },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantProfileList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'tenant-profile-1',
            createdTime: 1234567890,
            name: 'Premium Profile',
            description: 'Premium tenant profile with advanced features',
            default: false,
            isolatedTbRuleEngine: true,
            profileData: {
              configuration: {
                type: 'PREMIUM',
                maxDevices: 10000,
                maxAssets: 5000,
                maxCustomers: 1000,
                maxUsers: 500,
                maxDashboards: 100,
                maxRuleChains: 50,
                maxResourcesInBytes: 1073741824,
                maxOtaPackagesInBytes: 536870912,
                transportTenantMsgRateLimit: '10000:1',
                transportTenantTelemetryMsgRateLimit: '5000:1',
                transportTenantTelemetryDataPointsRateLimit: '100000:1',
                transportDeviceMsgRateLimit: '1000:1',
                transportDeviceTelemetryMsgRateLimit: '500:1',
                transportDeviceTelemetryDataPointsRateLimit: '10000:1',
                tenantEntityExportRateLimit: '100:1',
                tenantEntityImportRateLimit: '50:1',
                tenantNotificationRequestsRateLimit: '1000:1',
                tenantNotificationRequestsPerRuleRateLimit: '100:1',
                maxTransportMessages: 1000000,
                maxTransportDataPoints: 10000000,
                maxREExecutions: 100000,
                maxJSExecutions: 50000,
                maxDPStorageDays: 365,
                maxRuleNodeExecutionsPerMessage: 100,
                maxEmails: 10000,
                maxSms: 1000,
                maxCreatedAlarms: 100000,
                tenantServerRestLimitsConfiguration: '1000:1',
                customerServerRestLimitsConfiguration: '500:1',
                maxWsSessionsPerTenant: 1000,
                maxWsSessionsPerCustomer: 100,
                maxWsSessionsPerRegularUser: 10,
                maxWsSessionsPerPublicUser: 5,
                wsMsgQueueLimitPerSession: 1000,
                maxWsSubscriptionsPerTenant: 10000,
                maxWsSubscriptionsPerCustomer: 1000,
                maxWsSubscriptionsPerRegularUser: 100,
                maxWsSubscriptionsPerPublicUser: 50,
                wsUpdatesPerSessionRateLimit: '100:1',
                cassandraQueryTenantRateLimitsConfiguration: '1000:1',
                defaultStorageTtlDays: 365,
                alarmsTtlDays: 90,
                rpcTtlDays: 30,
                warnThreshold: 0.8,
              },
              queueConfiguration: [],
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
        textSearch: 'profile',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantProfileList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantProfiles',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteTenantProfile', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteTenantProfile('tenant-profile-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/tenantProfile/tenant-profile-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create TenantProfileConfiguration object with all fields', () => {
      const tenantProfileConfiguration: TenantProfileConfiguration = {
        type: 'PREMIUM',
        maxDevices: 10000,
        maxAssets: 5000,
        maxCustomers: 1000,
        maxUsers: 500,
        maxDashboards: 100,
        maxRuleChains: 50,
        maxResourcesInBytes: 1073741824,
        maxOtaPackagesInBytes: 536870912,
        transportTenantMsgRateLimit: '10000:1',
        transportTenantTelemetryMsgRateLimit: '5000:1',
        transportTenantTelemetryDataPointsRateLimit: '100000:1',
        transportDeviceMsgRateLimit: '1000:1',
        transportDeviceTelemetryMsgRateLimit: '500:1',
        transportDeviceTelemetryDataPointsRateLimit: '10000:1',
        tenantEntityExportRateLimit: '100:1',
        tenantEntityImportRateLimit: '50:1',
        tenantNotificationRequestsRateLimit: '1000:1',
        tenantNotificationRequestsPerRuleRateLimit: '100:1',
        maxTransportMessages: 1000000,
        maxTransportDataPoints: 10000000,
        maxREExecutions: 100000,
        maxJSExecutions: 50000,
        maxDPStorageDays: 365,
        maxRuleNodeExecutionsPerMessage: 100,
        maxEmails: 10000,
        maxSms: 1000,
        maxCreatedAlarms: 100000,
        tenantServerRestLimitsConfiguration: '1000:1',
        customerServerRestLimitsConfiguration: '500:1',
        maxWsSessionsPerTenant: 1000,
        maxWsSessionsPerCustomer: 100,
        maxWsSessionsPerRegularUser: 10,
        maxWsSessionsPerPublicUser: 5,
        wsMsgQueueLimitPerSession: 1000,
        maxWsSubscriptionsPerTenant: 10000,
        maxWsSubscriptionsPerCustomer: 1000,
        maxWsSubscriptionsPerRegularUser: 100,
        maxWsSubscriptionsPerPublicUser: 50,
        wsUpdatesPerSessionRateLimit: '100:1',
        cassandraQueryTenantRateLimitsConfiguration: '1000:1',
        defaultStorageTtlDays: 365,
        alarmsTtlDays: 90,
        rpcTtlDays: 30,
        warnThreshold: 0.8,
      };

      expect(tenantProfileConfiguration.type).toBe('PREMIUM');
      expect(tenantProfileConfiguration.maxDevices).toBe(10000);
      expect(tenantProfileConfiguration.maxAssets).toBe(5000);
      expect(tenantProfileConfiguration.maxCustomers).toBe(1000);
      expect(tenantProfileConfiguration.maxUsers).toBe(500);
      expect(tenantProfileConfiguration.maxDashboards).toBe(100);
      expect(tenantProfileConfiguration.maxRuleChains).toBe(50);
      expect(tenantProfileConfiguration.maxResourcesInBytes).toBe(1073741824);
      expect(tenantProfileConfiguration.maxOtaPackagesInBytes).toBe(536870912);
      expect(tenantProfileConfiguration.transportTenantMsgRateLimit).toBe('10000:1');
      expect(tenantProfileConfiguration.transportTenantTelemetryMsgRateLimit).toBe('5000:1');
      expect(tenantProfileConfiguration.transportTenantTelemetryDataPointsRateLimit).toBe('100000:1');
      expect(tenantProfileConfiguration.transportDeviceMsgRateLimit).toBe('1000:1');
      expect(tenantProfileConfiguration.transportDeviceTelemetryMsgRateLimit).toBe('500:1');
      expect(tenantProfileConfiguration.transportDeviceTelemetryDataPointsRateLimit).toBe('10000:1');
      expect(tenantProfileConfiguration.tenantEntityExportRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.tenantEntityImportRateLimit).toBe('50:1');
      expect(tenantProfileConfiguration.tenantNotificationRequestsRateLimit).toBe('1000:1');
      expect(tenantProfileConfiguration.tenantNotificationRequestsPerRuleRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.maxTransportMessages).toBe(1000000);
      expect(tenantProfileConfiguration.maxTransportDataPoints).toBe(10000000);
      expect(tenantProfileConfiguration.maxREExecutions).toBe(100000);
      expect(tenantProfileConfiguration.maxJSExecutions).toBe(50000);
      expect(tenantProfileConfiguration.maxDPStorageDays).toBe(365);
      expect(tenantProfileConfiguration.maxRuleNodeExecutionsPerMessage).toBe(100);
      expect(tenantProfileConfiguration.maxEmails).toBe(10000);
      expect(tenantProfileConfiguration.maxSms).toBe(1000);
      expect(tenantProfileConfiguration.maxCreatedAlarms).toBe(100000);
      expect(tenantProfileConfiguration.tenantServerRestLimitsConfiguration).toBe('1000:1');
      expect(tenantProfileConfiguration.customerServerRestLimitsConfiguration).toBe('500:1');
      expect(tenantProfileConfiguration.maxWsSessionsPerTenant).toBe(1000);
      expect(tenantProfileConfiguration.maxWsSessionsPerCustomer).toBe(100);
      expect(tenantProfileConfiguration.maxWsSessionsPerRegularUser).toBe(10);
      expect(tenantProfileConfiguration.maxWsSessionsPerPublicUser).toBe(5);
      expect(tenantProfileConfiguration.wsMsgQueueLimitPerSession).toBe(1000);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerTenant).toBe(10000);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerCustomer).toBe(1000);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerRegularUser).toBe(100);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerPublicUser).toBe(50);
      expect(tenantProfileConfiguration.wsUpdatesPerSessionRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.cassandraQueryTenantRateLimitsConfiguration).toBe('1000:1');
      expect(tenantProfileConfiguration.defaultStorageTtlDays).toBe(365);
      expect(tenantProfileConfiguration.alarmsTtlDays).toBe(90);
      expect(tenantProfileConfiguration.rpcTtlDays).toBe(30);
      expect(tenantProfileConfiguration.warnThreshold).toBe(0.8);
    });

    it('should create TenantProfileConfiguration object with minimal fields', () => {
      const tenantProfileConfiguration: TenantProfileConfiguration = {
        type: 'BASIC',
        maxDevices: 100,
        maxAssets: 50,
        maxCustomers: 10,
        maxUsers: 5,
        maxDashboards: 1,
        maxRuleChains: 1,
        maxResourcesInBytes: 10485760,
        maxOtaPackagesInBytes: 5242880,
        transportTenantMsgRateLimit: '100:1',
        transportTenantTelemetryMsgRateLimit: '50:1',
        transportTenantTelemetryDataPointsRateLimit: '1000:1',
        transportDeviceMsgRateLimit: '10:1',
        transportDeviceTelemetryMsgRateLimit: '5:1',
        transportDeviceTelemetryDataPointsRateLimit: '100:1',
        tenantEntityExportRateLimit: '10:1',
        tenantEntityImportRateLimit: '5:1',
        tenantNotificationRequestsRateLimit: '100:1',
        tenantNotificationRequestsPerRuleRateLimit: '10:1',
        maxTransportMessages: 10000,
        maxTransportDataPoints: 100000,
        maxREExecutions: 1000,
        maxJSExecutions: 500,
        maxDPStorageDays: 30,
        maxRuleNodeExecutionsPerMessage: 10,
        maxEmails: 100,
        maxSms: 10,
        maxCreatedAlarms: 1000,
        tenantServerRestLimitsConfiguration: '100:1',
        customerServerRestLimitsConfiguration: '50:1',
        maxWsSessionsPerTenant: 100,
        maxWsSessionsPerCustomer: 10,
        maxWsSessionsPerRegularUser: 5,
        maxWsSessionsPerPublicUser: 2,
        wsMsgQueueLimitPerSession: 100,
        maxWsSubscriptionsPerTenant: 1000,
        maxWsSubscriptionsPerCustomer: 100,
        maxWsSubscriptionsPerRegularUser: 10,
        maxWsSubscriptionsPerPublicUser: 5,
        wsUpdatesPerSessionRateLimit: '10:1',
        cassandraQueryTenantRateLimitsConfiguration: '100:1',
        defaultStorageTtlDays: 30,
        alarmsTtlDays: 7,
        rpcTtlDays: 1,
        warnThreshold: 0.9,
      };

      expect(tenantProfileConfiguration.type).toBe('BASIC');
      expect(tenantProfileConfiguration.maxDevices).toBe(100);
      expect(tenantProfileConfiguration.maxAssets).toBe(50);
      expect(tenantProfileConfiguration.maxCustomers).toBe(10);
      expect(tenantProfileConfiguration.maxUsers).toBe(5);
      expect(tenantProfileConfiguration.maxDashboards).toBe(1);
      expect(tenantProfileConfiguration.maxRuleChains).toBe(1);
      expect(tenantProfileConfiguration.maxResourcesInBytes).toBe(10485760);
      expect(tenantProfileConfiguration.maxOtaPackagesInBytes).toBe(5242880);
      expect(tenantProfileConfiguration.transportTenantMsgRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.transportTenantTelemetryMsgRateLimit).toBe('50:1');
      expect(tenantProfileConfiguration.transportTenantTelemetryDataPointsRateLimit).toBe('1000:1');
      expect(tenantProfileConfiguration.transportDeviceMsgRateLimit).toBe('10:1');
      expect(tenantProfileConfiguration.transportDeviceTelemetryMsgRateLimit).toBe('5:1');
      expect(tenantProfileConfiguration.transportDeviceTelemetryDataPointsRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.tenantEntityExportRateLimit).toBe('10:1');
      expect(tenantProfileConfiguration.tenantEntityImportRateLimit).toBe('5:1');
      expect(tenantProfileConfiguration.tenantNotificationRequestsRateLimit).toBe('100:1');
      expect(tenantProfileConfiguration.tenantNotificationRequestsPerRuleRateLimit).toBe('10:1');
      expect(tenantProfileConfiguration.maxTransportMessages).toBe(10000);
      expect(tenantProfileConfiguration.maxTransportDataPoints).toBe(100000);
      expect(tenantProfileConfiguration.maxREExecutions).toBe(1000);
      expect(tenantProfileConfiguration.maxJSExecutions).toBe(500);
      expect(tenantProfileConfiguration.maxDPStorageDays).toBe(30);
      expect(tenantProfileConfiguration.maxRuleNodeExecutionsPerMessage).toBe(10);
      expect(tenantProfileConfiguration.maxEmails).toBe(100);
      expect(tenantProfileConfiguration.maxSms).toBe(10);
      expect(tenantProfileConfiguration.maxCreatedAlarms).toBe(1000);
      expect(tenantProfileConfiguration.tenantServerRestLimitsConfiguration).toBe('100:1');
      expect(tenantProfileConfiguration.customerServerRestLimitsConfiguration).toBe('50:1');
      expect(tenantProfileConfiguration.maxWsSessionsPerTenant).toBe(100);
      expect(tenantProfileConfiguration.maxWsSessionsPerCustomer).toBe(10);
      expect(tenantProfileConfiguration.maxWsSessionsPerRegularUser).toBe(5);
      expect(tenantProfileConfiguration.maxWsSessionsPerPublicUser).toBe(2);
      expect(tenantProfileConfiguration.wsMsgQueueLimitPerSession).toBe(100);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerTenant).toBe(1000);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerCustomer).toBe(100);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerRegularUser).toBe(10);
      expect(tenantProfileConfiguration.maxWsSubscriptionsPerPublicUser).toBe(5);
      expect(tenantProfileConfiguration.wsUpdatesPerSessionRateLimit).toBe('10:1');
      expect(tenantProfileConfiguration.cassandraQueryTenantRateLimitsConfiguration).toBe('100:1');
      expect(tenantProfileConfiguration.defaultStorageTtlDays).toBe(30);
      expect(tenantProfileConfiguration.alarmsTtlDays).toBe(7);
      expect(tenantProfileConfiguration.rpcTtlDays).toBe(1);
      expect(tenantProfileConfiguration.warnThreshold).toBe(0.9);
    });

    it('should create TenantProfile object', () => {
      const tenantProfile: TenantProfile = {
        id: 'tenant-profile-1',
        createdTime: 1234567890,
        name: 'Premium Profile',
        description: 'Premium tenant profile with advanced features',
        default: false,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'PREMIUM',
            maxDevices: 10000,
            maxAssets: 5000,
            maxCustomers: 1000,
            maxUsers: 500,
            maxDashboards: 100,
            maxRuleChains: 50,
            maxResourcesInBytes: 1073741824,
            maxOtaPackagesInBytes: 536870912,
            transportTenantMsgRateLimit: '10000:1',
            transportTenantTelemetryMsgRateLimit: '5000:1',
            transportTenantTelemetryDataPointsRateLimit: '100000:1',
            transportDeviceMsgRateLimit: '1000:1',
            transportDeviceTelemetryMsgRateLimit: '500:1',
            transportDeviceTelemetryDataPointsRateLimit: '10000:1',
            tenantEntityExportRateLimit: '100:1',
            tenantEntityImportRateLimit: '50:1',
            tenantNotificationRequestsRateLimit: '1000:1',
            tenantNotificationRequestsPerRuleRateLimit: '100:1',
            maxTransportMessages: 1000000,
            maxTransportDataPoints: 10000000,
            maxREExecutions: 100000,
            maxJSExecutions: 50000,
            maxDPStorageDays: 365,
            maxRuleNodeExecutionsPerMessage: 100,
            maxEmails: 10000,
            maxSms: 1000,
            maxCreatedAlarms: 100000,
            tenantServerRestLimitsConfiguration: '1000:1',
            customerServerRestLimitsConfiguration: '500:1',
            maxWsSessionsPerTenant: 1000,
            maxWsSessionsPerCustomer: 100,
            maxWsSessionsPerRegularUser: 10,
            maxWsSessionsPerPublicUser: 5,
            wsMsgQueueLimitPerSession: 1000,
            maxWsSubscriptionsPerTenant: 10000,
            maxWsSubscriptionsPerCustomer: 1000,
            maxWsSubscriptionsPerRegularUser: 100,
            maxWsSubscriptionsPerPublicUser: 50,
            wsUpdatesPerSessionRateLimit: '100:1',
            cassandraQueryTenantRateLimitsConfiguration: '1000:1',
            defaultStorageTtlDays: 365,
            alarmsTtlDays: 90,
            rpcTtlDays: 30,
            warnThreshold: 0.8,
          },
          queueConfiguration: [
            {
              id: 'queue-1',
              name: 'Main Queue',
              topic: 'main-topic',
            },
            {
              id: 'queue-2',
              name: 'Secondary Queue',
              topic: 'secondary-topic',
            },
          ],
        },
      };

      expect(tenantProfile.id).toBe('tenant-profile-1');
      expect(tenantProfile.createdTime).toBe(1234567890);
      expect(tenantProfile.name).toBe('Premium Profile');
      expect(tenantProfile.description).toBe('Premium tenant profile with advanced features');
      expect(tenantProfile.default).toBe(false);
      expect(tenantProfile.isolatedTbRuleEngine).toBe(true);
      expect(tenantProfile.profileData.configuration.type).toBe('PREMIUM');
      expect(tenantProfile.profileData.configuration.maxDevices).toBe(10000);
      expect(tenantProfile.profileData.configuration.maxAssets).toBe(5000);
      expect(tenantProfile.profileData.configuration.maxCustomers).toBe(1000);
      expect(tenantProfile.profileData.configuration.maxUsers).toBe(500);
      expect(tenantProfile.profileData.configuration.maxDashboards).toBe(100);
      expect(tenantProfile.profileData.configuration.maxRuleChains).toBe(50);
      expect(tenantProfile.profileData.configuration.maxResourcesInBytes).toBe(1073741824);
      expect(tenantProfile.profileData.configuration.maxOtaPackagesInBytes).toBe(536870912);
      expect(tenantProfile.profileData.configuration.transportTenantMsgRateLimit).toBe('10000:1');
      expect(tenantProfile.profileData.configuration.transportTenantTelemetryMsgRateLimit).toBe('5000:1');
      expect(tenantProfile.profileData.configuration.transportTenantTelemetryDataPointsRateLimit).toBe('100000:1');
      expect(tenantProfile.profileData.configuration.transportDeviceMsgRateLimit).toBe('1000:1');
      expect(tenantProfile.profileData.configuration.transportDeviceTelemetryMsgRateLimit).toBe('500:1');
      expect(tenantProfile.profileData.configuration.transportDeviceTelemetryDataPointsRateLimit).toBe('10000:1');
      expect(tenantProfile.profileData.configuration.tenantEntityExportRateLimit).toBe('100:1');
      expect(tenantProfile.profileData.configuration.tenantEntityImportRateLimit).toBe('50:1');
      expect(tenantProfile.profileData.configuration.tenantNotificationRequestsRateLimit).toBe('1000:1');
      expect(tenantProfile.profileData.configuration.tenantNotificationRequestsPerRuleRateLimit).toBe('100:1');
      expect(tenantProfile.profileData.configuration.maxTransportMessages).toBe(1000000);
      expect(tenantProfile.profileData.configuration.maxTransportDataPoints).toBe(10000000);
      expect(tenantProfile.profileData.configuration.maxREExecutions).toBe(100000);
      expect(tenantProfile.profileData.configuration.maxJSExecutions).toBe(50000);
      expect(tenantProfile.profileData.configuration.maxDPStorageDays).toBe(365);
      expect(tenantProfile.profileData.configuration.maxRuleNodeExecutionsPerMessage).toBe(100);
      expect(tenantProfile.profileData.configuration.maxEmails).toBe(10000);
      expect(tenantProfile.profileData.configuration.maxSms).toBe(1000);
      expect(tenantProfile.profileData.configuration.maxCreatedAlarms).toBe(100000);
      expect(tenantProfile.profileData.configuration.tenantServerRestLimitsConfiguration).toBe('1000:1');
      expect(tenantProfile.profileData.configuration.customerServerRestLimitsConfiguration).toBe('500:1');
      expect(tenantProfile.profileData.configuration.maxWsSessionsPerTenant).toBe(1000);
      expect(tenantProfile.profileData.configuration.maxWsSessionsPerCustomer).toBe(100);
      expect(tenantProfile.profileData.configuration.maxWsSessionsPerRegularUser).toBe(10);
      expect(tenantProfile.profileData.configuration.maxWsSessionsPerPublicUser).toBe(5);
      expect(tenantProfile.profileData.configuration.wsMsgQueueLimitPerSession).toBe(1000);
      expect(tenantProfile.profileData.configuration.maxWsSubscriptionsPerTenant).toBe(10000);
      expect(tenantProfile.profileData.configuration.maxWsSubscriptionsPerCustomer).toBe(1000);
      expect(tenantProfile.profileData.configuration.maxWsSubscriptionsPerRegularUser).toBe(100);
      expect(tenantProfile.profileData.configuration.maxWsSubscriptionsPerPublicUser).toBe(50);
      expect(tenantProfile.profileData.configuration.wsUpdatesPerSessionRateLimit).toBe('100:1');
      expect(tenantProfile.profileData.configuration.cassandraQueryTenantRateLimitsConfiguration).toBe('1000:1');
      expect(tenantProfile.profileData.configuration.defaultStorageTtlDays).toBe(365);
      expect(tenantProfile.profileData.configuration.alarmsTtlDays).toBe(90);
      expect(tenantProfile.profileData.configuration.rpcTtlDays).toBe(30);
      expect(tenantProfile.profileData.configuration.warnThreshold).toBe(0.8);
      expect(tenantProfile.profileData.queueConfiguration).toHaveLength(2);
      expect(tenantProfile.profileData.queueConfiguration?.[0]?.id).toBe('queue-1');
      expect(tenantProfile.profileData.queueConfiguration?.[0]?.name).toBe('Main Queue');
      expect(tenantProfile.profileData.queueConfiguration?.[0]?.topic).toBe('main-topic');
      expect(tenantProfile.profileData.queueConfiguration?.[1]?.id).toBe('queue-2');
      expect(tenantProfile.profileData.queueConfiguration?.[1]?.name).toBe('Secondary Queue');
      expect(tenantProfile.profileData.queueConfiguration?.[1]?.topic).toBe('secondary-topic');
    });

    it('should handle different profile types', () => {
      const basicProfile: TenantProfile = {
        id: 'basic-profile',
        createdTime: 1234567890,
        name: 'Basic Profile',
        description: 'Basic tenant profile for small deployments',
        default: true,
        isolatedTbRuleEngine: false,
        profileData: {
          configuration: {
            type: 'BASIC',
            maxDevices: 100,
            maxAssets: 50,
            maxCustomers: 10,
            maxUsers: 5,
            maxDashboards: 1,
            maxRuleChains: 1,
            maxResourcesInBytes: 10485760,
            maxOtaPackagesInBytes: 5242880,
            transportTenantMsgRateLimit: '100:1',
            transportTenantTelemetryMsgRateLimit: '50:1',
            transportTenantTelemetryDataPointsRateLimit: '1000:1',
            transportDeviceMsgRateLimit: '10:1',
            transportDeviceTelemetryMsgRateLimit: '5:1',
            transportDeviceTelemetryDataPointsRateLimit: '100:1',
            tenantEntityExportRateLimit: '10:1',
            tenantEntityImportRateLimit: '5:1',
            tenantNotificationRequestsRateLimit: '100:1',
            tenantNotificationRequestsPerRuleRateLimit: '10:1',
            maxTransportMessages: 10000,
            maxTransportDataPoints: 100000,
            maxREExecutions: 1000,
            maxJSExecutions: 500,
            maxDPStorageDays: 30,
            maxRuleNodeExecutionsPerMessage: 10,
            maxEmails: 100,
            maxSms: 10,
            maxCreatedAlarms: 1000,
            tenantServerRestLimitsConfiguration: '100:1',
            customerServerRestLimitsConfiguration: '50:1',
            maxWsSessionsPerTenant: 100,
            maxWsSessionsPerCustomer: 10,
            maxWsSessionsPerRegularUser: 5,
            maxWsSessionsPerPublicUser: 2,
            wsMsgQueueLimitPerSession: 100,
            maxWsSubscriptionsPerTenant: 1000,
            maxWsSubscriptionsPerCustomer: 100,
            maxWsSubscriptionsPerRegularUser: 10,
            maxWsSubscriptionsPerPublicUser: 5,
            wsUpdatesPerSessionRateLimit: '10:1',
            cassandraQueryTenantRateLimitsConfiguration: '100:1',
            defaultStorageTtlDays: 30,
            alarmsTtlDays: 7,
            rpcTtlDays: 1,
            warnThreshold: 0.9,
          },
          queueConfiguration: [],
        },
      };

      const enterpriseProfile: TenantProfile = {
        id: 'enterprise-profile',
        createdTime: 1234567890,
        name: 'Enterprise Profile',
        description: 'Enterprise tenant profile for large deployments',
        default: false,
        isolatedTbRuleEngine: true,
        profileData: {
          configuration: {
            type: 'ENTERPRISE',
            maxDevices: 100000,
            maxAssets: 50000,
            maxCustomers: 10000,
            maxUsers: 5000,
            maxDashboards: 1000,
            maxRuleChains: 500,
            maxResourcesInBytes: 10737418240,
            maxOtaPackagesInBytes: 5368709120,
            transportTenantMsgRateLimit: '100000:1',
            transportTenantTelemetryMsgRateLimit: '50000:1',
            transportTenantTelemetryDataPointsRateLimit: '1000000:1',
            transportDeviceMsgRateLimit: '10000:1',
            transportDeviceTelemetryMsgRateLimit: '5000:1',
            transportDeviceTelemetryDataPointsRateLimit: '100000:1',
            tenantEntityExportRateLimit: '1000:1',
            tenantEntityImportRateLimit: '500:1',
            tenantNotificationRequestsRateLimit: '10000:1',
            tenantNotificationRequestsPerRuleRateLimit: '1000:1',
            maxTransportMessages: 10000000,
            maxTransportDataPoints: 100000000,
            maxREExecutions: 1000000,
            maxJSExecutions: 500000,
            maxDPStorageDays: 1095,
            maxRuleNodeExecutionsPerMessage: 1000,
            maxEmails: 100000,
            maxSms: 10000,
            maxCreatedAlarms: 1000000,
            tenantServerRestLimitsConfiguration: '10000:1',
            customerServerRestLimitsConfiguration: '5000:1',
            maxWsSessionsPerTenant: 10000,
            maxWsSessionsPerCustomer: 1000,
            maxWsSessionsPerRegularUser: 100,
            maxWsSessionsPerPublicUser: 50,
            wsMsgQueueLimitPerSession: 10000,
            maxWsSubscriptionsPerTenant: 100000,
            maxWsSubscriptionsPerCustomer: 10000,
            maxWsSubscriptionsPerRegularUser: 1000,
            maxWsSubscriptionsPerPublicUser: 500,
            wsUpdatesPerSessionRateLimit: '1000:1',
            cassandraQueryTenantRateLimitsConfiguration: '10000:1',
            defaultStorageTtlDays: 1095,
            alarmsTtlDays: 365,
            rpcTtlDays: 90,
            warnThreshold: 0.7,
          },
          queueConfiguration: [
            {
              id: 'queue-enterprise-1',
              name: 'Enterprise Queue 1',
              topic: 'enterprise-topic-1',
            },
            {
              id: 'queue-enterprise-2',
              name: 'Enterprise Queue 2',
              topic: 'enterprise-topic-2',
            },
            {
              id: 'queue-enterprise-3',
              name: 'Enterprise Queue 3',
              topic: 'enterprise-topic-3',
            },
          ],
        },
      };

      expect(basicProfile.profileData.configuration.type).toBe('BASIC');
      expect(basicProfile.profileData.configuration.maxDevices).toBe(100);
      expect(basicProfile.profileData.configuration.maxAssets).toBe(50);
      expect(basicProfile.profileData.configuration.maxCustomers).toBe(10);
      expect(basicProfile.profileData.configuration.maxUsers).toBe(5);
      expect(basicProfile.profileData.configuration.maxDashboards).toBe(1);
      expect(basicProfile.profileData.configuration.maxRuleChains).toBe(1);
      expect(basicProfile.profileData.configuration.maxResourcesInBytes).toBe(10485760);
      expect(basicProfile.profileData.configuration.maxOtaPackagesInBytes).toBe(5242880);
      expect(basicProfile.profileData.configuration.transportTenantMsgRateLimit).toBe('100:1');
      expect(basicProfile.profileData.configuration.transportTenantTelemetryMsgRateLimit).toBe('50:1');
      expect(basicProfile.profileData.configuration.transportTenantTelemetryDataPointsRateLimit).toBe('1000:1');
      expect(basicProfile.profileData.configuration.transportDeviceMsgRateLimit).toBe('10:1');
      expect(basicProfile.profileData.configuration.transportDeviceTelemetryMsgRateLimit).toBe('5:1');
      expect(basicProfile.profileData.configuration.transportDeviceTelemetryDataPointsRateLimit).toBe('100:1');
      expect(basicProfile.profileData.configuration.tenantEntityExportRateLimit).toBe('10:1');
      expect(basicProfile.profileData.configuration.tenantEntityImportRateLimit).toBe('5:1');
      expect(basicProfile.profileData.configuration.tenantNotificationRequestsRateLimit).toBe('100:1');
      expect(basicProfile.profileData.configuration.tenantNotificationRequestsPerRuleRateLimit).toBe('10:1');
      expect(basicProfile.profileData.configuration.maxTransportMessages).toBe(10000);
      expect(basicProfile.profileData.configuration.maxTransportDataPoints).toBe(100000);
      expect(basicProfile.profileData.configuration.maxREExecutions).toBe(1000);
      expect(basicProfile.profileData.configuration.maxJSExecutions).toBe(500);
      expect(basicProfile.profileData.configuration.maxDPStorageDays).toBe(30);
      expect(basicProfile.profileData.configuration.maxRuleNodeExecutionsPerMessage).toBe(10);
      expect(basicProfile.profileData.configuration.maxEmails).toBe(100);
      expect(basicProfile.profileData.configuration.maxSms).toBe(10);
      expect(basicProfile.profileData.configuration.maxCreatedAlarms).toBe(1000);
      expect(basicProfile.profileData.configuration.tenantServerRestLimitsConfiguration).toBe('100:1');
      expect(basicProfile.profileData.configuration.customerServerRestLimitsConfiguration).toBe('50:1');
      expect(basicProfile.profileData.configuration.maxWsSessionsPerTenant).toBe(100);
      expect(basicProfile.profileData.configuration.maxWsSessionsPerCustomer).toBe(10);
      expect(basicProfile.profileData.configuration.maxWsSessionsPerRegularUser).toBe(5);
      expect(basicProfile.profileData.configuration.maxWsSessionsPerPublicUser).toBe(2);
      expect(basicProfile.profileData.configuration.wsMsgQueueLimitPerSession).toBe(100);
      expect(basicProfile.profileData.configuration.maxWsSubscriptionsPerTenant).toBe(1000);
      expect(basicProfile.profileData.configuration.maxWsSubscriptionsPerCustomer).toBe(100);
      expect(basicProfile.profileData.configuration.maxWsSubscriptionsPerRegularUser).toBe(10);
      expect(basicProfile.profileData.configuration.maxWsSubscriptionsPerPublicUser).toBe(5);
      expect(basicProfile.profileData.configuration.wsUpdatesPerSessionRateLimit).toBe('10:1');
      expect(basicProfile.profileData.configuration.cassandraQueryTenantRateLimitsConfiguration).toBe('100:1');
      expect(basicProfile.profileData.configuration.defaultStorageTtlDays).toBe(30);
      expect(basicProfile.profileData.configuration.alarmsTtlDays).toBe(7);
      expect(basicProfile.profileData.configuration.rpcTtlDays).toBe(1);
      expect(basicProfile.profileData.configuration.warnThreshold).toBe(0.9);
      expect(basicProfile.profileData.queueConfiguration).toHaveLength(0);

      expect(enterpriseProfile.profileData.configuration.type).toBe('ENTERPRISE');
      expect(enterpriseProfile.profileData.configuration.maxDevices).toBe(100000);
      expect(enterpriseProfile.profileData.configuration.maxAssets).toBe(50000);
      expect(enterpriseProfile.profileData.configuration.maxCustomers).toBe(10000);
      expect(enterpriseProfile.profileData.configuration.maxUsers).toBe(5000);
      expect(enterpriseProfile.profileData.configuration.maxDashboards).toBe(1000);
      expect(enterpriseProfile.profileData.configuration.maxRuleChains).toBe(500);
      expect(enterpriseProfile.profileData.configuration.maxResourcesInBytes).toBe(10737418240);
      expect(enterpriseProfile.profileData.configuration.maxOtaPackagesInBytes).toBe(5368709120);
      expect(enterpriseProfile.profileData.configuration.transportTenantMsgRateLimit).toBe('100000:1');
      expect(enterpriseProfile.profileData.configuration.transportTenantTelemetryMsgRateLimit).toBe('50000:1');
      expect(enterpriseProfile.profileData.configuration.transportTenantTelemetryDataPointsRateLimit).toBe('1000000:1');
      expect(enterpriseProfile.profileData.configuration.transportDeviceMsgRateLimit).toBe('10000:1');
      expect(enterpriseProfile.profileData.configuration.transportDeviceTelemetryMsgRateLimit).toBe('5000:1');
      expect(enterpriseProfile.profileData.configuration.transportDeviceTelemetryDataPointsRateLimit).toBe('100000:1');
      expect(enterpriseProfile.profileData.configuration.tenantEntityExportRateLimit).toBe('1000:1');
      expect(enterpriseProfile.profileData.configuration.tenantEntityImportRateLimit).toBe('500:1');
      expect(enterpriseProfile.profileData.configuration.tenantNotificationRequestsRateLimit).toBe('10000:1');
      expect(enterpriseProfile.profileData.configuration.tenantNotificationRequestsPerRuleRateLimit).toBe('1000:1');
      expect(enterpriseProfile.profileData.configuration.maxTransportMessages).toBe(10000000);
      expect(enterpriseProfile.profileData.configuration.maxTransportDataPoints).toBe(100000000);
      expect(enterpriseProfile.profileData.configuration.maxREExecutions).toBe(1000000);
      expect(enterpriseProfile.profileData.configuration.maxJSExecutions).toBe(500000);
      expect(enterpriseProfile.profileData.configuration.maxDPStorageDays).toBe(1095);
      expect(enterpriseProfile.profileData.configuration.maxRuleNodeExecutionsPerMessage).toBe(1000);
      expect(enterpriseProfile.profileData.configuration.maxEmails).toBe(100000);
      expect(enterpriseProfile.profileData.configuration.maxSms).toBe(10000);
      expect(enterpriseProfile.profileData.configuration.maxCreatedAlarms).toBe(1000000);
      expect(enterpriseProfile.profileData.configuration.tenantServerRestLimitsConfiguration).toBe('10000:1');
      expect(enterpriseProfile.profileData.configuration.customerServerRestLimitsConfiguration).toBe('5000:1');
      expect(enterpriseProfile.profileData.configuration.maxWsSessionsPerTenant).toBe(10000);
      expect(enterpriseProfile.profileData.configuration.maxWsSessionsPerCustomer).toBe(1000);
      expect(enterpriseProfile.profileData.configuration.maxWsSessionsPerRegularUser).toBe(100);
      expect(enterpriseProfile.profileData.configuration.maxWsSessionsPerPublicUser).toBe(50);
      expect(enterpriseProfile.profileData.configuration.wsMsgQueueLimitPerSession).toBe(10000);
      expect(enterpriseProfile.profileData.configuration.maxWsSubscriptionsPerTenant).toBe(100000);
      expect(enterpriseProfile.profileData.configuration.maxWsSubscriptionsPerCustomer).toBe(10000);
      expect(enterpriseProfile.profileData.configuration.maxWsSubscriptionsPerRegularUser).toBe(1000);
      expect(enterpriseProfile.profileData.configuration.maxWsSubscriptionsPerPublicUser).toBe(500);
      expect(enterpriseProfile.profileData.configuration.wsUpdatesPerSessionRateLimit).toBe('1000:1');
      expect(enterpriseProfile.profileData.configuration.cassandraQueryTenantRateLimitsConfiguration).toBe('10000:1');
      expect(enterpriseProfile.profileData.configuration.defaultStorageTtlDays).toBe(1095);
      expect(enterpriseProfile.profileData.configuration.alarmsTtlDays).toBe(365);
      expect(enterpriseProfile.profileData.configuration.rpcTtlDays).toBe(90);
      expect(enterpriseProfile.profileData.configuration.warnThreshold).toBe(0.7);
      expect(enterpriseProfile.profileData.queueConfiguration).toHaveLength(3);
      expect(enterpriseProfile.profileData.queueConfiguration?.[0]?.id).toBe('queue-enterprise-1');
      expect(enterpriseProfile.profileData.queueConfiguration?.[0]?.name).toBe('Enterprise Queue 1');
      expect(enterpriseProfile.profileData.queueConfiguration?.[0]?.topic).toBe('enterprise-topic-1');
      expect(enterpriseProfile.profileData.queueConfiguration?.[1]?.id).toBe('queue-enterprise-2');
      expect(enterpriseProfile.profileData.queueConfiguration?.[1]?.name).toBe('Enterprise Queue 2');
      expect(enterpriseProfile.profileData.queueConfiguration?.[1]?.topic).toBe('enterprise-topic-2');
      expect(enterpriseProfile.profileData.queueConfiguration?.[2]?.id).toBe('queue-enterprise-3');
      expect(enterpriseProfile.profileData.queueConfiguration?.[2]?.name).toBe('Enterprise Queue 3');
      expect(enterpriseProfile.profileData.queueConfiguration?.[2]?.topic).toBe('enterprise-topic-3');
    });
  });
});