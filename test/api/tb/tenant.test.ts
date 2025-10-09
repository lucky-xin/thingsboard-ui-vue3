import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  tenantSave,
  tenantById,
  tenantInfoById,
  tenantDelete,
  tenantList,
  tenantInfoList,
} from '/@/api/tb/tenant';
import type {
  Tenant,
  TenantInfo,
} from '/@/api/tb/tenant';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock DashboardInfo
vi.mock('/@/api/tb/dashboard', () => ({
  DashboardInfo: {
    id: 'string',
    title: 'string',
    createdTime: 'number',
  },
}));

describe('api/tb/tenant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('tenantSave', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Tenant = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      const testData: Tenant = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await tenantSave(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/tenant',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { title: 'New Tenant', country: 'United States' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await tenantSave(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/tenant',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await tenantSave();

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/tenant',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantById', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Tenant = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      const params = { includeProfile: true };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantById('tenant-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/tenant-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without additional params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Tenant = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantById('tenant-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/tenant-1',
        params: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantInfoById', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantInfo = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        tenantProfileName: 'Premium Profile',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      const params = { includeProfile: true };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantInfoById('tenant-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/info/tenant-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without additional params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: TenantInfo = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        tenantProfileName: 'Premium Profile',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantInfoById('tenant-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/info/tenant-1',
        params: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantDelete', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await tenantDelete('tenant-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/tenant/tenant-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'tenant-1',
            createdTime: 1234567890,
            title: 'Acme Corporation',
            region: 'North America',
            country: 'United States',
            state: 'California',
            city: 'San Francisco',
            address: '123 Main Street',
            address2: 'Suite 100',
            zip: '94105',
            phone: '+1-555-123-4567',
            email: 'contact@acme.com',
            tenantProfileId: 'tenant-profile-1',
            additionalInfo: {
              description: 'Leading technology company',
              homeDashboardId: {
                id: 'dashboard-1',
                title: 'Main Dashboard',
                createdTime: 1234567890,
              },
              homeDashboardHideToolbar: false,
            },
          },
          {
            id: 'tenant-2',
            createdTime: 1234567891,
            title: 'Tech Solutions Inc',
            region: 'Europe',
            country: 'United Kingdom',
            state: 'England',
            city: 'London',
            address: '456 Business Avenue',
            address2: 'Floor 5',
            zip: 'SW1A 1AA',
            phone: '+44-20-1234-5678',
            email: 'info@techsolutions.com',
            tenantProfileId: 'tenant-profile-2',
            additionalInfo: {
              description: 'Innovative tech solutions provider',
              homeDashboardId: {
                id: 'dashboard-2',
                title: 'Business Dashboard',
                createdTime: 1234567891,
              },
              homeDashboardHideToolbar: true,
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
        textSearch: 'tenant',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenants',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'tenant-1',
            createdTime: 1234567890,
            title: 'Acme Corporation',
            region: 'North America',
            country: 'United States',
            state: 'California',
            city: 'San Francisco',
            address: '123 Main Street',
            address2: 'Suite 100',
            zip: '94105',
            phone: '+1-555-123-4567',
            email: 'contact@acme.com',
            tenantProfileId: 'tenant-profile-1',
            tenantProfileName: 'Premium Profile',
            additionalInfo: {
              description: 'Leading technology company',
              homeDashboardId: {
                id: 'dashboard-1',
                title: 'Main Dashboard',
                createdTime: 1234567890,
              },
              homeDashboardHideToolbar: false,
            },
          },
          {
            id: 'tenant-2',
            createdTime: 1234567891,
            title: 'Tech Solutions Inc',
            region: 'Europe',
            country: 'United Kingdom',
            state: 'England',
            city: 'London',
            address: '456 Business Avenue',
            address2: 'Floor 5',
            zip: 'SW1A 1AA',
            phone: '+44-20-1234-5678',
            email: 'info@techsolutions.com',
            tenantProfileId: 'tenant-profile-2',
            tenantProfileName: 'Standard Profile',
            additionalInfo: {
              description: 'Innovative tech solutions provider',
              homeDashboardId: {
                id: 'dashboard-2',
                title: 'Business Dashboard',
                createdTime: 1234567891,
              },
              homeDashboardHideToolbar: true,
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
        textSearch: 'tenant',
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenantInfos',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create Tenant object with all fields', () => {
      const tenant: Tenant = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };

      expect(tenant.id).toBe('tenant-1');
      expect(tenant.createdTime).toBe(1234567890);
      expect(tenant.title).toBe('Acme Corporation');
      expect(tenant.region).toBe('North America');
      expect(tenant.country).toBe('United States');
      expect(tenant.state).toBe('California');
      expect(tenant.city).toBe('San Francisco');
      expect(tenant.address).toBe('123 Main Street');
      expect(tenant.address2).toBe('Suite 100');
      expect(tenant.zip).toBe('94105');
      expect(tenant.phone).toBe('+1-555-123-4567');
      expect(tenant.email).toBe('contact@acme.com');
      expect(tenant.tenantProfileId).toBe('tenant-profile-1');
      expect(tenant.additionalInfo?.description).toBe('Leading technology company');
      expect(tenant.additionalInfo?.homeDashboardId?.id).toBe('dashboard-1');
      expect(tenant.additionalInfo?.homeDashboardId?.title).toBe('Main Dashboard');
      expect(tenant.additionalInfo?.homeDashboardId?.createdTime).toBe(1234567890);
      expect(tenant.additionalInfo?.homeDashboardHideToolbar).toBe(false);
    });

    it('should create Tenant object with minimal fields', () => {
      const tenant: Tenant = {
        id: 'tenant-minimal',
        createdTime: 1234567890,
        title: 'Minimal Tenant',
        additionalInfo: {
          homeDashboardHideToolbar: true,
        },
      };

      expect(tenant.id).toBe('tenant-minimal');
      expect(tenant.createdTime).toBe(1234567890);
      expect(tenant.title).toBe('Minimal Tenant');
      expect(tenant.additionalInfo?.homeDashboardHideToolbar).toBe(true);
      expect(tenant.region).toBeUndefined();
      expect(tenant.country).toBeUndefined();
      expect(tenant.state).toBeUndefined();
      expect(tenant.city).toBeUndefined();
      expect(tenant.address).toBeUndefined();
      expect(tenant.address2).toBeUndefined();
      expect(tenant.zip).toBeUndefined();
      expect(tenant.phone).toBeUndefined();
      expect(tenant.email).toBeUndefined();
      expect(tenant.tenantProfileId).toBeUndefined();
      expect(tenant.additionalInfo?.description).toBeUndefined();
      expect(tenant.additionalInfo?.homeDashboardId).toBeUndefined();
    });

    it('should create TenantInfo object', () => {
      const tenantInfo: TenantInfo = {
        id: 'tenant-1',
        createdTime: 1234567890,
        title: 'Acme Corporation',
        region: 'North America',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        address: '123 Main Street',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'contact@acme.com',
        tenantProfileId: 'tenant-profile-1',
        tenantProfileName: 'Premium Profile',
        additionalInfo: {
          description: 'Leading technology company',
          homeDashboardId: {
            id: 'dashboard-1',
            title: 'Main Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
        },
      };

      expect(tenantInfo.id).toBe('tenant-1');
      expect(tenantInfo.createdTime).toBe(1234567890);
      expect(tenantInfo.title).toBe('Acme Corporation');
      expect(tenantInfo.region).toBe('North America');
      expect(tenantInfo.country).toBe('United States');
      expect(tenantInfo.state).toBe('California');
      expect(tenantInfo.city).toBe('San Francisco');
      expect(tenantInfo.address).toBe('123 Main Street');
      expect(tenantInfo.address2).toBe('Suite 100');
      expect(tenantInfo.zip).toBe('94105');
      expect(tenantInfo.phone).toBe('+1-555-123-4567');
      expect(tenantInfo.email).toBe('contact@acme.com');
      expect(tenantInfo.tenantProfileId).toBe('tenant-profile-1');
      expect(tenantInfo.tenantProfileName).toBe('Premium Profile');
      expect(tenantInfo.additionalInfo?.description).toBe('Leading technology company');
      expect(tenantInfo.additionalInfo?.homeDashboardId?.id).toBe('dashboard-1');
      expect(tenantInfo.additionalInfo?.homeDashboardId?.title).toBe('Main Dashboard');
      expect(tenantInfo.additionalInfo?.homeDashboardId?.createdTime).toBe(1234567890);
      expect(tenantInfo.additionalInfo?.homeDashboardHideToolbar).toBe(false);
    });

    it('should handle different regions and countries', () => {
      const northAmericaTenant: Tenant = {
        id: 'tenant-na',
        createdTime: 1234567890,
        title: 'North America Tenant',
        region: 'North America',
        country: 'United States',
        state: 'New York',
        city: 'New York City',
        address: '789 Broadway',
        zip: '10001',
        phone: '+1-212-555-0123',
        email: 'na@example.com',
        additionalInfo: {
          homeDashboardHideToolbar: false,
        },
      };

      const europeTenant: Tenant = {
        id: 'tenant-eu',
        createdTime: 1234567890,
        title: 'Europe Tenant',
        region: 'Europe',
        country: 'Germany',
        state: 'Bavaria',
        city: 'Munich',
        address: '456 Hauptstraße',
        zip: '80331',
        phone: '+49-89-12345678',
        email: 'eu@example.com',
        additionalInfo: {
          homeDashboardHideToolbar: false,
        },
      };

      const asiaTenant: Tenant = {
        id: 'tenant-asia',
        createdTime: 1234567890,
        title: 'Asia Tenant',
        region: 'Asia',
        country: 'Japan',
        state: 'Tokyo',
        city: 'Tokyo',
        address: '123 Shibuya Street',
        zip: '150-0002',
        phone: '+81-3-1234-5678',
        email: 'asia@example.com',
        additionalInfo: {
          homeDashboardHideToolbar: false,
        },
      };

      expect(northAmericaTenant.region).toBe('North America');
      expect(northAmericaTenant.country).toBe('United States');
      expect(northAmericaTenant.state).toBe('New York');
      expect(northAmericaTenant.city).toBe('New York City');
      expect(northAmericaTenant.address).toBe('789 Broadway');
      expect(northAmericaTenant.zip).toBe('10001');
      expect(northAmericaTenant.phone).toBe('+1-212-555-0123');
      expect(northAmericaTenant.email).toBe('na@example.com');

      expect(europeTenant.region).toBe('Europe');
      expect(europeTenant.country).toBe('Germany');
      expect(europeTenant.state).toBe('Bavaria');
      expect(europeTenant.city).toBe('Munich');
      expect(europeTenant.address).toBe('456 Hauptstraße');
      expect(europeTenant.zip).toBe('80331');
      expect(europeTenant.phone).toBe('+49-89-12345678');
      expect(europeTenant.email).toBe('eu@example.com');

      expect(asiaTenant.region).toBe('Asia');
      expect(asiaTenant.country).toBe('Japan');
      expect(asiaTenant.state).toBe('Tokyo');
      expect(asiaTenant.city).toBe('Tokyo');
      expect(asiaTenant.address).toBe('123 Shibuya Street');
      expect(asiaTenant.zip).toBe('150-0002');
      expect(asiaTenant.phone).toBe('+81-3-1234-5678');
      expect(asiaTenant.email).toBe('asia@example.com');
    });

    it('should handle complex additional info', () => {
      const tenant: Tenant = {
        id: 'tenant-complex',
        createdTime: 1234567890,
        title: 'Complex Tenant',
        region: 'Global',
        country: 'Multi-National',
        state: 'Various',
        city: 'Multiple',
        address: 'Global Headquarters',
        address2: 'Suite 1000',
        zip: '00000',
        phone: '+1-800-123-4567',
        email: 'global@example.com',
        tenantProfileId: 'tenant-profile-complex',
        additionalInfo: {
          description: 'Complex multi-national tenant with advanced configuration',
          homeDashboardId: {
            id: 'dashboard-complex',
            title: 'Global Dashboard',
            createdTime: 1234567890,
          },
          homeDashboardHideToolbar: false,
          settings: {
            timezone: 'UTC',
            language: 'en',
            currency: 'USD',
            dateFormat: 'MM/DD/YYYY',
            numberFormat: 'en-US',
          },
          features: {
            advancedAnalytics: true,
            customReports: true,
            apiAccess: true,
            whiteLabeling: true,
            sso: true,
          },
          limits: {
            maxDevices: 10000,
            maxUsers: 1000,
            maxDashboards: 100,
            maxRuleChains: 50,
            storageQuota: '1TB',
          },
          branding: {
            logo: 'https://example.com/logo.png',
            favicon: 'https://example.com/favicon.ico',
            primaryColor: '#1976d2',
            secondaryColor: '#dc004e',
            customCss: 'https://example.com/custom.css',
          },
          integrations: {
            slack: {
              enabled: true,
              webhookUrl: 'https://hooks.slack.com/services/...',
            },
            email: {
              enabled: true,
              smtpHost: 'smtp.example.com',
              smtpPort: 587,
              smtpUser: 'noreply@example.com',
            },
            webhook: {
              enabled: true,
              url: 'https://api.example.com/webhook',
              secret: 'webhook-secret',
            },
          },
          security: {
            passwordPolicy: {
              minLength: 8,
              requireUppercase: true,
              requireLowercase: true,
              requireNumbers: true,
              requireSpecialChars: true,
            },
            sessionTimeout: 3600,
            maxLoginAttempts: 5,
            lockoutDuration: 900,
            twoFactorAuth: true,
          },
          monitoring: {
            enabled: true,
            metrics: ['cpu', 'memory', 'disk', 'network'],
            alerts: {
              highCpu: 80,
              highMemory: 85,
              lowDisk: 10,
            },
            retention: '30d',
          },
        },
      };

      expect(tenant.id).toBe('tenant-complex');
      expect(tenant.createdTime).toBe(1234567890);
      expect(tenant.title).toBe('Complex Tenant');
      expect(tenant.region).toBe('Global');
      expect(tenant.country).toBe('Multi-National');
      expect(tenant.state).toBe('Various');
      expect(tenant.city).toBe('Multiple');
      expect(tenant.address).toBe('Global Headquarters');
      expect(tenant.address2).toBe('Suite 1000');
      expect(tenant.zip).toBe('00000');
      expect(tenant.phone).toBe('+1-800-123-4567');
      expect(tenant.email).toBe('global@example.com');
      expect(tenant.tenantProfileId).toBe('tenant-profile-complex');
      expect(tenant.additionalInfo?.description).toBe('Complex multi-national tenant with advanced configuration');
      expect(tenant.additionalInfo?.homeDashboardId?.id).toBe('dashboard-complex');
      expect(tenant.additionalInfo?.homeDashboardId?.title).toBe('Global Dashboard');
      expect(tenant.additionalInfo?.homeDashboardId?.createdTime).toBe(1234567890);
      expect(tenant.additionalInfo?.homeDashboardHideToolbar).toBe(false);
      expect(tenant.additionalInfo?.settings?.timezone).toBe('UTC');
      expect(tenant.additionalInfo?.settings?.language).toBe('en');
      expect(tenant.additionalInfo?.settings?.currency).toBe('USD');
      expect(tenant.additionalInfo?.settings?.dateFormat).toBe('MM/DD/YYYY');
      expect(tenant.additionalInfo?.settings?.numberFormat).toBe('en-US');
      expect(tenant.additionalInfo?.features?.advancedAnalytics).toBe(true);
      expect(tenant.additionalInfo?.features?.customReports).toBe(true);
      expect(tenant.additionalInfo?.features?.apiAccess).toBe(true);
      expect(tenant.additionalInfo?.features?.whiteLabeling).toBe(true);
      expect(tenant.additionalInfo?.features?.sso).toBe(true);
      expect(tenant.additionalInfo?.limits?.maxDevices).toBe(10000);
      expect(tenant.additionalInfo?.limits?.maxUsers).toBe(1000);
      expect(tenant.additionalInfo?.limits?.maxDashboards).toBe(100);
      expect(tenant.additionalInfo?.limits?.maxRuleChains).toBe(50);
      expect(tenant.additionalInfo?.limits?.storageQuota).toBe('1TB');
      expect(tenant.additionalInfo?.branding?.logo).toBe('https://example.com/logo.png');
      expect(tenant.additionalInfo?.branding?.favicon).toBe('https://example.com/favicon.ico');
      expect(tenant.additionalInfo?.branding?.primaryColor).toBe('#1976d2');
      expect(tenant.additionalInfo?.branding?.secondaryColor).toBe('#dc004e');
      expect(tenant.additionalInfo?.branding?.customCss).toBe('https://example.com/custom.css');
      expect(tenant.additionalInfo?.integrations?.slack?.enabled).toBe(true);
      expect(tenant.additionalInfo?.integrations?.slack?.webhookUrl).toBe('https://hooks.slack.com/services/...');
      expect(tenant.additionalInfo?.integrations?.email?.enabled).toBe(true);
      expect(tenant.additionalInfo?.integrations?.email?.smtpHost).toBe('smtp.example.com');
      expect(tenant.additionalInfo?.integrations?.email?.smtpPort).toBe(587);
      expect(tenant.additionalInfo?.integrations?.email?.smtpUser).toBe('noreply@example.com');
      expect(tenant.additionalInfo?.integrations?.webhook?.enabled).toBe(true);
      expect(tenant.additionalInfo?.integrations?.webhook?.url).toBe('https://api.example.com/webhook');
      expect(tenant.additionalInfo?.integrations?.webhook?.secret).toBe('webhook-secret');
      expect(tenant.additionalInfo?.security?.passwordPolicy?.minLength).toBe(8);
      expect(tenant.additionalInfo?.security?.passwordPolicy?.requireUppercase).toBe(true);
      expect(tenant.additionalInfo?.security?.passwordPolicy?.requireLowercase).toBe(true);
      expect(tenant.additionalInfo?.security?.passwordPolicy?.requireNumbers).toBe(true);
      expect(tenant.additionalInfo?.security?.passwordPolicy?.requireSpecialChars).toBe(true);
      expect(tenant.additionalInfo?.security?.sessionTimeout).toBe(3600);
      expect(tenant.additionalInfo?.security?.maxLoginAttempts).toBe(5);
      expect(tenant.additionalInfo?.security?.lockoutDuration).toBe(900);
      expect(tenant.additionalInfo?.security?.twoFactorAuth).toBe(true);
      expect(tenant.additionalInfo?.monitoring?.enabled).toBe(true);
      expect(tenant.additionalInfo?.monitoring?.metrics).toEqual(['cpu', 'memory', 'disk', 'network']);
      expect(tenant.additionalInfo?.monitoring?.alerts?.highCpu).toBe(80);
      expect(tenant.additionalInfo?.monitoring?.alerts?.highMemory).toBe(85);
      expect(tenant.additionalInfo?.monitoring?.alerts?.lowDisk).toBe(10);
      expect(tenant.additionalInfo?.monitoring?.retention).toBe('30d');
    });
  });
});