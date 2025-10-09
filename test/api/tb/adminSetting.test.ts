import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAdminSetting,
  saveAdminSetting,
  sendTestMail,
  sendTestSms,
  getJwtSetting,
  saveJwtSetting,
  getSecuritySettings,
  saveSecuritySettings,
} from '/@/api/tb/adminSetting';
import type {
  AdminSetting,
  SmsRequest,
  JwtSetting,
  PasswordPolicy,
  SecuritySettings,
  SystemInfo,
} from '/@/api/tb/adminSetting';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
  },
}));

describe('api/tb/adminSetting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAdminSetting', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { id: '1', key: 'test-key', jsonValue: 'test-value' };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAdminSetting('test-key');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/admin/settings/test-key',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different keys', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { id: '2', key: 'mail-config', jsonValue: {} };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAdminSetting('mail-config');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/admin/settings/mail-config',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAdminSetting', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { id: '1', key: 'test-key', jsonValue: 'test-value' };
      const testData: AdminSetting = {
        id: '1',
        key: 'test-key',
        jsonValue: 'test-value',
        createdTime: 1234567890,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAdminSetting(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { key: 'test', value: 'data' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAdminSetting(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendTestMail', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const testData: AdminSetting = {
        id: '1',
        key: 'mail-config',
        jsonValue: { host: 'smtp.test.com' },
        createdTime: 1234567890,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await sendTestMail(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings/testMail',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const testData = { smtp: { host: 'test.com' } };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await sendTestMail(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings/testMail',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('sendTestSms', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const testData: SmsRequest = {
        providerConfiguration: { apiKey: 'test-key' },
        numberTo: '+1234567890',
        message: 'Test message',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await sendTestSms(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings/testSms',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      const testData = { phone: '+1234567890', text: 'Test' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await sendTestSms(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/settings/testSms',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getJwtSetting', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: JwtSetting = {
        tokenExpirationTime: 3600,
        refreshTokenExpTime: 7200,
        tokenIssuer: 'test-issuer',
        tokenSigningKey: 'test-key',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getJwtSetting();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/admin/jwtSettings',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveJwtSetting', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: JwtSetting = {
        tokenExpirationTime: 3600,
        refreshTokenExpTime: 7200,
        tokenIssuer: 'test-issuer',
        tokenSigningKey: 'test-key',
      };
      const testData: JwtSetting = {
        tokenExpirationTime: 1800,
        refreshTokenExpTime: 3600,
        tokenIssuer: 'new-issuer',
        tokenSigningKey: 'new-key',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveJwtSetting(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/jwtSettings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { jwt: { expires: 3600 } };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveJwtSetting(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/jwtSettings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSecuritySettings', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: SecuritySettings = {
        passwordPolicy: {
          minimumLength: 8,
          minimumDigits: 1,
          minimumUppercaseLetters: 1,
          minimumLowercaseLetters: 1,
          minimumSpecialCharacters: 1,
        },
        maxFailedLoginAttempts: 5,
        mobileSecretKeyLength: 16,
        userLockoutNotificationEmail: 'admin@test.com',
        userActivationTokenTtl: 86400,
        passwordResetTokenTtl: 3600,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getSecuritySettings();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/admin/securitySettings',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveSecuritySettings', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData: SecuritySettings = {
        passwordPolicy: {
          minimumLength: 12,
          minimumDigits: 2,
          minimumUppercaseLetters: 2,
          minimumLowercaseLetters: 2,
          minimumSpecialCharacters: 2,
          allowWhitespaces: false,
          forceUserToResetPasswordIfNotValid: true,
          maximumLength: 128,
          passwordExpirationPeriodDays: 90,
          passwordReuseFrequencyDays: 30,
        },
        maxFailedLoginAttempts: 3,
        mobileSecretKeyLength: 32,
        userLockoutNotificationEmail: 'security@test.com',
        userActivationTokenTtl: 172800,
        passwordResetTokenTtl: 7200,
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveSecuritySettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/securitySettings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { security: { policy: 'strict' } };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveSecuritySettings(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/admin/securitySettings',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create AdminSetting object', () => {
      const adminSetting: AdminSetting = {
        id: '1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        key: 'test-key',
        jsonValue: { config: 'value' },
      };

      expect(adminSetting.id).toBe('1');
      expect(adminSetting.createdTime).toBe(1234567890);
      expect(adminSetting.tenantId).toBe('tenant-1');
      expect(adminSetting.key).toBe('test-key');
      expect(adminSetting.jsonValue).toEqual({ config: 'value' });
    });

    it('should create SmsRequest object', () => {
      const smsRequest: SmsRequest = {
        providerConfiguration: { apiKey: 'key', secret: 'secret' },
        numberTo: '+1234567890',
        message: 'Test SMS message',
      };

      expect(smsRequest.providerConfiguration).toEqual({ apiKey: 'key', secret: 'secret' });
      expect(smsRequest.numberTo).toBe('+1234567890');
      expect(smsRequest.message).toBe('Test SMS message');
    });

    it('should create JwtSetting object', () => {
      const jwtSetting: JwtSetting = {
        tokenExpirationTime: 3600,
        refreshTokenExpTime: 7200,
        tokenIssuer: 'test-issuer',
        tokenSigningKey: 'test-signing-key',
      };

      expect(jwtSetting.tokenExpirationTime).toBe(3600);
      expect(jwtSetting.refreshTokenExpTime).toBe(7200);
      expect(jwtSetting.tokenIssuer).toBe('test-issuer');
      expect(jwtSetting.tokenSigningKey).toBe('test-signing-key');
    });

    it('should create PasswordPolicy object', () => {
      const passwordPolicy: PasswordPolicy = {
        allowWhitespaces: false,
        forceUserToResetPasswordIfNotValid: true,
        maximumLength: 128,
        minimumDigits: 2,
        minimumLength: 8,
        minimumLowercaseLetters: 1,
        minimumSpecialCharacters: 1,
        minimumUppercaseLetters: 1,
        passwordExpirationPeriodDays: 90,
        passwordReuseFrequencyDays: 30,
      };

      expect(passwordPolicy.allowWhitespaces).toBe(false);
      expect(passwordPolicy.forceUserToResetPasswordIfNotValid).toBe(true);
      expect(passwordPolicy.maximumLength).toBe(128);
      expect(passwordPolicy.minimumDigits).toBe(2);
      expect(passwordPolicy.minimumLength).toBe(8);
      expect(passwordPolicy.minimumLowercaseLetters).toBe(1);
      expect(passwordPolicy.minimumSpecialCharacters).toBe(1);
      expect(passwordPolicy.minimumUppercaseLetters).toBe(1);
      expect(passwordPolicy.passwordExpirationPeriodDays).toBe(90);
      expect(passwordPolicy.passwordReuseFrequencyDays).toBe(30);
    });

    it('should create SecuritySettings object', () => {
      const passwordPolicy: PasswordPolicy = {
        minimumLength: 8,
        minimumDigits: 1,
      };
      const securitySettings: SecuritySettings = {
        passwordPolicy,
        maxFailedLoginAttempts: 5,
        mobileSecretKeyLength: 16,
        userLockoutNotificationEmail: 'admin@test.com',
        userActivationTokenTtl: 86400,
        passwordResetTokenTtl: 3600,
      };

      expect(securitySettings.passwordPolicy).toEqual(passwordPolicy);
      expect(securitySettings.maxFailedLoginAttempts).toBe(5);
      expect(securitySettings.mobileSecretKeyLength).toBe(16);
      expect(securitySettings.userLockoutNotificationEmail).toBe('admin@test.com');
      expect(securitySettings.userActivationTokenTtl).toBe(86400);
      expect(securitySettings.passwordResetTokenTtl).toBe(3600);
    });

    it('should create SystemInfo object', () => {
      const systemInfo: SystemInfo = {
        isMonolith: true,
        systemData: [
          {
            serviceId: 'service-1',
            serviceType: 'core',
            cpuUsage: 50.5,
            cpuCount: 4,
            memoryUsage: 2048,
            totalMemory: 4096,
            discUsage: 100,
            totalDiscSpace: 500,
          },
        ],
      };

      expect(systemInfo.isMonolith).toBe(true);
      expect(systemInfo.systemData).toHaveLength(1);
      expect(systemInfo.systemData[0].serviceId).toBe('service-1');
      expect(systemInfo.systemData[0].serviceType).toBe('core');
      expect(systemInfo.systemData[0].cpuUsage).toBe(50.5);
      expect(systemInfo.systemData[0].cpuCount).toBe(4);
      expect(systemInfo.systemData[0].memoryUsage).toBe(2048);
      expect(systemInfo.systemData[0].totalMemory).toBe(4096);
      expect(systemInfo.systemData[0].discUsage).toBe(100);
      expect(systemInfo.systemData[0].totalDiscSpace).toBe(500);
    });
  });
});