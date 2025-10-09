import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveCustomer,
  getCustomerById,
  getCustomerTitleById,
  getCustomerShortInfoById,
  getTenantCustomer,
  customerList,
  deleteCustomer,
} from '/@/api/tb/customer';
import type {
  Customer,
  CustomerShortInfo,
} from '/@/api/tb/customer';

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
  },
}));

describe('api/tb/customer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveCustomer', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Customer = {
        id: 'customer-1',
        createdTime: 1234567890,
        title: 'Test Customer',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
        address: '123 Main St',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'test@example.com',
        additionalInfo: {
          isPublic: false,
          description: 'Test customer description',
          homeDashboardId: { id: 'dashboard-1', title: 'Home Dashboard' } as any,
          homeDashboardHideToolbar: false,
        },
      };
      const testData: Customer = {
        id: 'customer-1',
        createdTime: 1234567890,
        title: 'Test Customer',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
        address: '123 Main St',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'test@example.com',
        additionalInfo: {
          isPublic: false,
          description: 'Test customer description',
          homeDashboardId: { id: 'dashboard-1', title: 'Home Dashboard' } as any,
          homeDashboardHideToolbar: false,
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveCustomer(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/customer',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { title: 'New Customer', email: 'new@example.com' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveCustomer(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/customer',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveCustomer();

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/customer',
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Customer = {
        id: 'customer-1',
        createdTime: 1234567890,
        title: 'Test Customer',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
        address: '123 Main St',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'test@example.com',
        additionalInfo: {
          isPublic: false,
          description: 'Test customer description',
          homeDashboardId: { id: 'dashboard-1', title: 'Home Dashboard' } as any,
          homeDashboardHideToolbar: false,
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerById('customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerTitleById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = 'Test Customer Title';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerTitleById('customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/title',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCustomerShortInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: CustomerShortInfo = {
        title: 'Test Customer',
        isPublic: false,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getCustomerShortInfoById('customer-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customer/customer-1/shortInfo',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getTenantCustomer', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Customer = {
        id: 'customer-1',
        createdTime: 1234567890,
        title: 'Test Customer',
        tenantId: 'tenant-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getTenantCustomer('Test Customer');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/tenant/customers',
        params: { customerTitle: 'Test Customer' },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('customerList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'customer-1',
            createdTime: 1234567890,
            title: 'Customer 1',
            tenantId: 'tenant-1',
          },
          {
            id: 'customer-2',
            createdTime: 1234567891,
            title: 'Customer 2',
            tenantId: 'tenant-1',
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

      const result = await customerList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/customers',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteCustomer', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteCustomer('customer-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/customer/customer-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create Customer object with all fields', () => {
      const customer: Customer = {
        id: 'customer-1',
        createdTime: 1234567890,
        title: 'Test Customer',
        tenantId: 'tenant-1',
        externalId: 'ext-1',
        country: 'US',
        state: 'CA',
        city: 'San Francisco',
        address: '123 Main St',
        address2: 'Suite 100',
        zip: '94105',
        phone: '+1-555-123-4567',
        email: 'test@example.com',
        additionalInfo: {
          isPublic: false,
          description: 'Test customer description',
          homeDashboardId: { id: 'dashboard-1', title: 'Home Dashboard' } as any,
          homeDashboardHideToolbar: false,
        },
      };

      expect(customer.id).toBe('customer-1');
      expect(customer.createdTime).toBe(1234567890);
      expect(customer.title).toBe('Test Customer');
      expect(customer.tenantId).toBe('tenant-1');
      expect(customer.externalId).toBe('ext-1');
      expect(customer.country).toBe('US');
      expect(customer.state).toBe('CA');
      expect(customer.city).toBe('San Francisco');
      expect(customer.address).toBe('123 Main St');
      expect(customer.address2).toBe('Suite 100');
      expect(customer.zip).toBe('94105');
      expect(customer.phone).toBe('+1-555-123-4567');
      expect(customer.email).toBe('test@example.com');
      expect(customer.additionalInfo?.isPublic).toBe(false);
      expect(customer.additionalInfo?.description).toBe('Test customer description');
      expect(customer.additionalInfo?.homeDashboardId).toEqual({ id: 'dashboard-1', title: 'Home Dashboard' });
      expect(customer.additionalInfo?.homeDashboardHideToolbar).toBe(false);
    });

    it('should create Customer object with minimal fields', () => {
      const customer: Customer = {
        id: 'customer-minimal',
        createdTime: 1234567890,
        title: 'Minimal Customer',
      };

      expect(customer.id).toBe('customer-minimal');
      expect(customer.createdTime).toBe(1234567890);
      expect(customer.title).toBe('Minimal Customer');
      expect(customer.tenantId).toBeUndefined();
      expect(customer.externalId).toBeUndefined();
      expect(customer.country).toBeUndefined();
      expect(customer.state).toBeUndefined();
      expect(customer.city).toBeUndefined();
      expect(customer.address).toBeUndefined();
      expect(customer.address2).toBeUndefined();
      expect(customer.zip).toBeUndefined();
      expect(customer.phone).toBeUndefined();
      expect(customer.email).toBeUndefined();
      expect(customer.additionalInfo).toBeUndefined();
    });

    it('should create CustomerShortInfo object', () => {
      const customerShortInfo: CustomerShortInfo = {
        title: 'Short Customer Info',
        isPublic: true,
      };

      expect(customerShortInfo.title).toBe('Short Customer Info');
      expect(customerShortInfo.isPublic).toBe(true);
    });

    it('should create CustomerShortInfo object with minimal fields', () => {
      const customerShortInfo: CustomerShortInfo = {
        title: 'Minimal Short Info',
      };

      expect(customerShortInfo.title).toBe('Minimal Short Info');
      expect(customerShortInfo.isPublic).toBeUndefined();
    });

    it('should handle international addresses', () => {
      const customer: Customer = {
        id: 'customer-intl',
        createdTime: 1234567890,
        title: 'International Customer',
        country: 'CN',
        state: 'Beijing',
        city: 'Beijing',
        address: '北京市朝阳区',
        zip: '100000',
        phone: '+86-10-1234-5678',
        email: 'test@example.cn',
      };

      expect(customer.country).toBe('CN');
      expect(customer.state).toBe('Beijing');
      expect(customer.city).toBe('Beijing');
      expect(customer.address).toBe('北京市朝阳区');
      expect(customer.zip).toBe('100000');
      expect(customer.phone).toBe('+86-10-1234-5678');
      expect(customer.email).toBe('test@example.cn');
    });

    it('should handle public customer with dashboard', () => {
      const customer: Customer = {
        id: 'customer-public',
        createdTime: 1234567890,
        title: 'Public Customer',
        additionalInfo: {
          isPublic: true,
          description: 'Public customer description',
          homeDashboardId: { id: 'public-dashboard', title: 'Public Dashboard' } as any,
          homeDashboardHideToolbar: true,
        },
      };

      expect(customer.additionalInfo?.isPublic).toBe(true);
      expect(customer.additionalInfo?.description).toBe('Public customer description');
      expect(customer.additionalInfo?.homeDashboardId).toEqual({ id: 'public-dashboard', title: 'Public Dashboard' });
      expect(customer.additionalInfo?.homeDashboardHideToolbar).toBe(true);
    });
  });
});