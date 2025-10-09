import { describe, it, expect, vi } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
  },
}));

import { getTwoFaSettings, saveTwoFaSettings } from '/@/api/tb/twoFaSetting';
import { defHttp } from '/@/utils/http/axios';

const mockDefHttp = defHttp as any;

describe('api/tb/twoFaSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getTwoFaSettings', () => {
    it('should call defHttp.get with correct parameters', async () => {
      const mockResponse = {
        providers: [{ providerType: 'TOTP' }],
        minVerificationCodeSendPeriod: 30,
        maxVerificationFailuresBeforeUserLockout: 5,
        totalAllowedTimeForVerification: 300,
        verificationCodeCheckRateLimit: '10/minute',
      };

      mockDefHttp.get.mockResolvedValue(mockResponse);

      const result = await getTwoFaSettings();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty response', async () => {
      mockDefHttp.get.mockResolvedValue({});

      const result = await getTwoFaSettings();

      expect(mockDefHttp.get).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
      });
      expect(result).toEqual({});
    });

    it('should handle error response', async () => {
      const mockError = new Error('Network error');
      mockDefHttp.get.mockRejectedValue(mockError);

      await expect(getTwoFaSettings()).rejects.toThrow('Network error');
    });
  });

  describe('saveTwoFaSettings', () => {
    it('should call defHttp.postJson with correct parameters', async () => {
      const mockData = {
        providers: [{ providerType: 'SMS' }],
        minVerificationCodeSendPeriod: 60,
        maxVerificationFailuresBeforeUserLockout: 3,
        totalAllowedTimeForVerification: 600,
        verificationCodeCheckRateLimit: '5/minute',
      };

      const mockResponse = { success: true };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveTwoFaSettings(mockData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
        data: mockData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle empty data', async () => {
      const mockResponse = { success: true };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveTwoFaSettings({});

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
        data: {},
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle null data', async () => {
      const mockResponse = { success: true };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveTwoFaSettings(null);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
        data: null,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle error response', async () => {
      const mockData = { providers: [{ providerType: 'EMAIL' }] };
      const mockError = new Error('Validation error');
      mockDefHttp.postJson.mockRejectedValue(mockError);

      await expect(saveTwoFaSettings(mockData)).rejects.toThrow('Validation error');
    });

    it('should handle different provider types', async () => {
      const mockData = {
        providers: [
          { providerType: 'TOTP' },
          { providerType: 'SMS' },
          { providerType: 'EMAIL' },
          { providerType: 'BACKUP_CODE' },
        ],
      };

      const mockResponse = { success: true };
      mockDefHttp.postJson.mockResolvedValue(mockResponse);

      const result = await saveTwoFaSettings(mockData);

      expect(mockDefHttp.postJson).toHaveBeenCalledWith({
        url: '/api/2fa/settings',
        data: mockData,
      });
      expect(result).toEqual(mockResponse);
    });
  });
});