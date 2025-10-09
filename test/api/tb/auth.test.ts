import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  changePassword,
  activateUser,
} from '/@/api/tb/auth';
import type {
  ChangePasswordParams,
  ActivateUserParams,
} from '/@/api/tb/auth';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    postJson: vi.fn(),
  },
}));

// Mock JwtPair type
vi.mock('/#/store', () => ({
  JwtPair: {
    token: 'string',
    refreshToken: 'string',
  },
}));

describe('api/tb/auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('changePassword', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'new-jwt-token',
        refreshToken: 'new-refresh-token',
      };
      const testData: ChangePasswordParams = {
        currentPassword: 'old-password',
        newPassword: 'new-password',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await changePassword(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/auth/changePassword',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
      };
      const testData = {
        currentPassword: 'old-password',
        newPassword: 'new-password',
        confirmPassword: 'new-password',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await changePassword(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/auth/changePassword',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different password formats', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
      };
      const testData: ChangePasswordParams = {
        currentPassword: 'CurrentPassword123!',
        newPassword: 'NewPassword456@',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await changePassword(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/auth/changePassword',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('activateUser', () => {
    it('should call defHttp.postJson with correct URL, data, and options', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'activation-jwt-token',
        refreshToken: 'activation-refresh-token',
      };
      const testData: ActivateUserParams = {
        activateToken: 'activation-token-123',
        password: 'new-user-password',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await activateUser(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/noauth/activate',
          data: testData,
        },
        { withToken: false }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle different activation tokens', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
      };
      const testData: ActivateUserParams = {
        activateToken: 'very-long-activation-token-with-special-chars-123456789',
        password: 'secure-password-123!',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await activateUser(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/noauth/activate',
          data: testData,
        },
        { withToken: false }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle minimal password requirements', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
      };
      const testData: ActivateUserParams = {
        activateToken: 'token-123',
        password: '123456',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await activateUser(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/noauth/activate',
          data: testData,
        },
        { withToken: false }
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create ChangePasswordParams object', () => {
      const changePasswordParams: ChangePasswordParams = {
        currentPassword: 'current-password-123',
        newPassword: 'new-password-456',
      };

      expect(changePasswordParams.currentPassword).toBe('current-password-123');
      expect(changePasswordParams.newPassword).toBe('new-password-456');
    });

    it('should create ActivateUserParams object', () => {
      const activateUserParams: ActivateUserParams = {
        activateToken: 'activation-token-123456',
        password: 'user-password-789',
      };

      expect(activateUserParams.activateToken).toBe('activation-token-123456');
      expect(activateUserParams.password).toBe('user-password-789');
    });

    it('should handle empty strings in ChangePasswordParams', () => {
      const changePasswordParams: ChangePasswordParams = {
        currentPassword: '',
        newPassword: '',
      };

      expect(changePasswordParams.currentPassword).toBe('');
      expect(changePasswordParams.newPassword).toBe('');
    });

    it('should handle empty strings in ActivateUserParams', () => {
      const activateUserParams: ActivateUserParams = {
        activateToken: '',
        password: '',
      };

      expect(activateUserParams.activateToken).toBe('');
      expect(activateUserParams.password).toBe('');
    });

    it('should handle special characters in passwords', () => {
      const changePasswordParams: ChangePasswordParams = {
        currentPassword: 'P@ssw0rd!@#$%^&*()',
        newPassword: 'N3wP@ssw0rd!@#$%^&*()',
      };

      expect(changePasswordParams.currentPassword).toBe('P@ssw0rd!@#$%^&*()');
      expect(changePasswordParams.newPassword).toBe('N3wP@ssw0rd!@#$%^&*()');
    });

    it('should handle special characters in activation token', () => {
      const activateUserParams: ActivateUserParams = {
        activateToken: 'token-123-abc-def-456-ghi-789',
        password: 'P@ssw0rd123!',
      };

      expect(activateUserParams.activateToken).toBe('token-123-abc-def-456-ghi-789');
      expect(activateUserParams.password).toBe('P@ssw0rd123!');
    });

    it('should handle unicode characters in passwords', () => {
      const changePasswordParams: ChangePasswordParams = {
        currentPassword: '密码123',
        newPassword: '新密码456',
      };

      expect(changePasswordParams.currentPassword).toBe('密码123');
      expect(changePasswordParams.newPassword).toBe('新密码456');
    });

    it('should handle unicode characters in activation token', () => {
      const activateUserParams: ActivateUserParams = {
        activateToken: '激活令牌-123-abc',
        password: '用户密码789',
      };

      expect(activateUserParams.activateToken).toBe('激活令牌-123-abc');
      expect(activateUserParams.password).toBe('用户密码789');
    });
  });

  describe('Function behavior', () => {
    it('should verify changePassword uses correct endpoint', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { token: 'token', refreshToken: 'refresh' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      await changePassword({ currentPassword: 'old', newPassword: 'new' });

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/auth/changePassword',
        data: { currentPassword: 'old', newPassword: 'new' },
      });
    });

    it('should verify activateUser uses correct endpoint and options', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { token: 'token', refreshToken: 'refresh' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      await activateUser({ activateToken: 'token', password: 'password' });

      expect(defHttp.postJson).toHaveBeenCalledWith(
        {
          url: '/api/noauth/activate',
          data: { activateToken: 'token', password: 'password' },
        },
        { withToken: false }
      );
    });

    it('should handle API errors gracefully', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const error = new Error('API Error');
      vi.mocked(defHttp.postJson).mockRejectedValue(error);

      await expect(changePassword({ currentPassword: 'old', newPassword: 'new' }))
        .rejects.toThrow('API Error');

      await expect(activateUser({ activateToken: 'token', password: 'password' }))
        .rejects.toThrow('API Error');
    });
  });
});