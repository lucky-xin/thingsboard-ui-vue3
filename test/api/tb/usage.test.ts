import { describe, it, expect, vi } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

import { getUsage } from '/@/api/tb/usage';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/usage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsage', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const mockResponse = {
        sms: 100,
        emails: 200,
        devices: 50,
        assets: 75,
        alarms: 25,
        users: 10,
        customers: 5,
        dashboards: 15,
        jsExecutions: 1000,
        transportMessages: 5000,
        maxSms: 1000,
        maxEmails: 2000,
        maxDevices: 500,
        maxAssets: 750,
        maxAlarms: 250,
        maxUsers: 100,
        maxCustomers: 50,
        maxDashboards: 150,
        maxJsExecutions: 10000,
        maxTransportMessages: 50000,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUsage();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/usage',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty usage data', async () => {
      const mockResponse = {
        sms: 0,
        emails: 0,
        devices: 0,
        assets: 0,
        alarms: 0,
        users: 0,
        customers: 0,
        dashboards: 0,
        jsExecutions: 0,
        transportMessages: 0,
        maxSms: 0,
        maxEmails: 0,
        maxDevices: 0,
        maxAssets: 0,
        maxAlarms: 0,
        maxUsers: 0,
        maxCustomers: 0,
        maxDashboards: 0,
        maxJsExecutions: 0,
        maxTransportMessages: 0,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUsage();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/usage',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error response', async () => {
      const mockError = new Error('Usage data unavailable');
      mockDefHttp.get.mockRejectedValue(mockError);

      await expect(getUsage()).rejects.toThrow('Usage data unavailable');
    });

    it('should handle partial usage data', async () => {
      const mockResponse = {
        sms: 150,
        emails: 300,
        devices: 60,
        assets: 80,
        alarms: 30,
        users: 12,
        customers: 6,
        dashboards: 18,
        jsExecutions: 1200,
        transportMessages: 6000,
        maxSms: 1500,
        maxEmails: 3000,
        maxDevices: 600,
        maxAssets: 800,
        maxAlarms: 300,
        maxUsers: 120,
        maxCustomers: 60,
        maxDashboards: 180,
        maxJsExecutions: 12000,
        maxTransportMessages: 60000,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUsage();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/usage',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle usage data with limits reached', async () => {
      const mockResponse = {
        sms: 1000,
        emails: 2000,
        devices: 500,
        assets: 750,
        alarms: 250,
        users: 100,
        customers: 50,
        dashboards: 150,
        jsExecutions: 10000,
        transportMessages: 50000,
        maxSms: 1000,
        maxEmails: 2000,
        maxDevices: 500,
        maxAssets: 750,
        maxAlarms: 250,
        maxUsers: 100,
        maxCustomers: 50,
        maxDashboards: 150,
        maxJsExecutions: 10000,
        maxTransportMessages: 50000,
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getUsage();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/usage',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});