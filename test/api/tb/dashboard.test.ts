import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getDashboardInfoById,
  currentTenantDashboardList,
  tenantDashboardList,
  customerDashboardList,
  userDashboardList,
} from '/@/api/tb/dashboard';
import type {
  DashboardInfo,
  UserDashboard,
} from '/@/api/tb/dashboard';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

describe('api/tb/dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDashboardInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: DashboardInfo = {
        id: 'dashboard-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'Test Dashboard',
        image: 'dashboard-image.jpg',
        mobileHide: false,
        mobileOrder: 1,
        assignedCustomers: [
          {
            customerId: 'customer-1',
            title: 'Customer 1',
            public: false,
          },
        ],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getDashboardInfoById('dashboard-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/dashboard/info/dashboard-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('currentTenantDashboardList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'dashboard-1',
            createdTime: 1234567890,
            title: 'Dashboard 1',
            tenantId: 'tenant-1',
            image: 'image1.jpg',
            mobileHide: false,
            mobileOrder: 1,
            assignedCustomers: [],
          },
          {
            id: 'dashboard-2',
            createdTime: 1234567891,
            title: 'Dashboard 2',
            tenantId: 'tenant-1',
            image: 'image2.jpg',
            mobileHide: true,
            mobileOrder: 2,
            assignedCustomers: [],
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
        sortProperty: 'title',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await currentTenantDashboardList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/dashboards',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('tenantDashboardList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'dashboard-1',
            createdTime: 1234567890,
            title: 'Tenant Dashboard 1',
            tenantId: 'tenant-1',
            image: 'tenant-image1.jpg',
            mobileHide: false,
            mobileOrder: 1,
            assignedCustomers: [
              {
                customerId: 'customer-1',
                title: 'Customer 1',
                public: false,
              },
            ],
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'tenant',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await tenantDashboardList(params, 'tenant-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/tenant-1/dashboards',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('customerDashboardList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'dashboard-1',
            createdTime: 1234567890,
            title: 'Customer Dashboard 1',
            tenantId: 'tenant-1',
            image: 'customer-image1.jpg',
            mobileHide: false,
            mobileOrder: 1,
            assignedCustomers: [
              {
                customerId: 'customer-1',
                title: 'Customer 1',
                public: true,
              },
            ],
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
        sortProperty: 'mobileOrder',
        sortOrder: 'ASC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await customerDashboardList(params, 'customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/dashboards',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('userDashboardList', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: UserDashboard = {
        last: [
          {
            id: 'dashboard-1',
            lastVisited: 1234567890,
            starred: true,
            title: 'Recently Visited Dashboard 1',
          },
          {
            id: 'dashboard-2',
            lastVisited: 1234567891,
            starred: false,
            title: 'Recently Visited Dashboard 2',
          },
        ],
        starred: [
          {
            id: 'dashboard-1',
            starredAt: 1234567890,
            title: 'Starred Dashboard 1',
          },
          {
            id: 'dashboard-3',
            starredAt: 1234567892,
            title: 'Starred Dashboard 3',
          },
        ],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await userDashboardList();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/user/dashboards',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create DashboardInfo object with all fields', () => {
      const dashboardInfo: DashboardInfo = {
        id: 'dashboard-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        title: 'Test Dashboard',
        image: 'dashboard-image.jpg',
        mobileHide: false,
        mobileOrder: 1,
        assignedCustomers: [
          {
            customerId: 'customer-1',
            title: 'Customer 1',
            public: false,
          },
          {
            customerId: 'customer-2',
            title: 'Customer 2',
            public: true,
          },
        ],
      };

      expect(dashboardInfo.id).toBe('dashboard-1');
      expect(dashboardInfo.createdTime).toBe(1234567890);
      expect(dashboardInfo.tenantId).toBe('tenant-1');
      expect(dashboardInfo.title).toBe('Test Dashboard');
      expect(dashboardInfo.image).toBe('dashboard-image.jpg');
      expect(dashboardInfo.mobileHide).toBe(false);
      expect(dashboardInfo.mobileOrder).toBe(1);
      expect(dashboardInfo.assignedCustomers).toHaveLength(2);
      expect(dashboardInfo.assignedCustomers?.[0].customerId).toBe('customer-1');
      expect(dashboardInfo.assignedCustomers?.[0].title).toBe('Customer 1');
      expect(dashboardInfo.assignedCustomers?.[0].public).toBe(false);
      expect(dashboardInfo.assignedCustomers?.[1].customerId).toBe('customer-2');
      expect(dashboardInfo.assignedCustomers?.[1].title).toBe('Customer 2');
      expect(dashboardInfo.assignedCustomers?.[1].public).toBe(true);
    });

    it('should create DashboardInfo object with minimal fields', () => {
      const dashboardInfo: DashboardInfo = {
        id: 'dashboard-minimal',
        createdTime: 1234567890,
        title: 'Minimal Dashboard',
      };

      expect(dashboardInfo.id).toBe('dashboard-minimal');
      expect(dashboardInfo.createdTime).toBe(1234567890);
      expect(dashboardInfo.title).toBe('Minimal Dashboard');
      expect(dashboardInfo.tenantId).toBeUndefined();
      expect(dashboardInfo.image).toBeUndefined();
      expect(dashboardInfo.mobileHide).toBeUndefined();
      expect(dashboardInfo.mobileOrder).toBeUndefined();
      expect(dashboardInfo.assignedCustomers).toBeUndefined();
    });

    it('should create UserDashboard object', () => {
      const userDashboard: UserDashboard = {
        last: [
          {
            id: 'dashboard-1',
            lastVisited: 1234567890,
            starred: true,
            title: 'Recently Visited Dashboard 1',
          },
          {
            id: 'dashboard-2',
            lastVisited: 1234567891,
            starred: false,
            title: 'Recently Visited Dashboard 2',
          },
        ],
        starred: [
          {
            id: 'dashboard-1',
            starredAt: 1234567890,
            title: 'Starred Dashboard 1',
          },
          {
            id: 'dashboard-3',
            starredAt: 1234567892,
            title: 'Starred Dashboard 3',
          },
        ],
      };

      expect(userDashboard.last).toHaveLength(2);
      expect(userDashboard.last[0].id).toBe('dashboard-1');
      expect(userDashboard.last[0].lastVisited).toBe(1234567890);
      expect(userDashboard.last[0].starred).toBe(true);
      expect(userDashboard.last[0].title).toBe('Recently Visited Dashboard 1');
      expect(userDashboard.last[1].id).toBe('dashboard-2');
      expect(userDashboard.last[1].lastVisited).toBe(1234567891);
      expect(userDashboard.last[1].starred).toBe(false);
      expect(userDashboard.last[1].title).toBe('Recently Visited Dashboard 2');

      expect(userDashboard.starred).toHaveLength(2);
      expect(userDashboard.starred[0].id).toBe('dashboard-1');
      expect(userDashboard.starred[0].starredAt).toBe(1234567890);
      expect(userDashboard.starred[0].title).toBe('Starred Dashboard 1');
      expect(userDashboard.starred[1].id).toBe('dashboard-3');
      expect(userDashboard.starred[1].starredAt).toBe(1234567892);
      expect(userDashboard.starred[1].title).toBe('Starred Dashboard 3');
    });

    it('should create UserDashboard object with empty arrays', () => {
      const userDashboard: UserDashboard = {
        last: [],
        starred: [],
      };

      expect(userDashboard.last).toHaveLength(0);
      expect(userDashboard.starred).toHaveLength(0);
    });

    it('should handle mobile-specific dashboard settings', () => {
      const dashboardInfo: DashboardInfo = {
        id: 'mobile-dashboard',
        createdTime: 1234567890,
        title: 'Mobile Dashboard',
        mobileHide: true,
        mobileOrder: 5,
      };

      expect(dashboardInfo.mobileHide).toBe(true);
      expect(dashboardInfo.mobileOrder).toBe(5);
    });

    it('should handle dashboard with multiple assigned customers', () => {
      const dashboardInfo: DashboardInfo = {
        id: 'multi-customer-dashboard',
        createdTime: 1234567890,
        title: 'Multi-Customer Dashboard',
        assignedCustomers: [
          {
            customerId: 'customer-1',
            title: 'Customer 1',
            public: false,
          },
          {
            customerId: 'customer-2',
            title: 'Customer 2',
            public: true,
          },
          {
            customerId: 'customer-3',
            title: 'Customer 3',
            public: false,
          },
        ],
      };

      expect(dashboardInfo.assignedCustomers).toHaveLength(3);
      expect(dashboardInfo.assignedCustomers?.[0].customerId).toBe('customer-1');
      expect(dashboardInfo.assignedCustomers?.[1].customerId).toBe('customer-2');
      expect(dashboardInfo.assignedCustomers?.[2].customerId).toBe('customer-3');
    });
  });
});