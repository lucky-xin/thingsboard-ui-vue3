import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getUserPasswordPolicy,
} from '/@/api/tb/noauth';
import type { PasswordPolicy } from '/@/api/tb/adminSetting';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

describe('api/tb/noauth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserPasswordPolicy', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: PasswordPolicy = {
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
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getUserPasswordPolicy();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/noauth/userPasswordPolicy',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle minimal password policy', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: PasswordPolicy = {
        minimumLength: 6,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getUserPasswordPolicy();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/noauth/userPasswordPolicy',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle strict password policy', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: PasswordPolicy = {
        allowWhitespaces: false,
        forceUserToResetPasswordIfNotValid: true,
        maximumLength: 64,
        minimumDigits: 3,
        minimumLength: 12,
        minimumLowercaseLetters: 2,
        minimumSpecialCharacters: 2,
        minimumUppercaseLetters: 2,
        passwordExpirationPeriodDays: 60,
        passwordReuseFrequencyDays: 15,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getUserPasswordPolicy();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/noauth/userPasswordPolicy',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle lenient password policy', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: PasswordPolicy = {
        allowWhitespaces: true,
        forceUserToResetPasswordIfNotValid: false,
        maximumLength: 256,
        minimumDigits: 0,
        minimumLength: 4,
        minimumLowercaseLetters: 0,
        minimumSpecialCharacters: 0,
        minimumUppercaseLetters: 0,
        passwordExpirationPeriodDays: 365,
        passwordReuseFrequencyDays: 0,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getUserPasswordPolicy();

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/noauth/userPasswordPolicy',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create PasswordPolicy object with all fields', () => {
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

    it('should create PasswordPolicy object with minimal fields', () => {
      const passwordPolicy: PasswordPolicy = {
        minimumLength: 6,
      };

      expect(passwordPolicy.minimumLength).toBe(6);
      expect(passwordPolicy.allowWhitespaces).toBeUndefined();
      expect(passwordPolicy.forceUserToResetPasswordIfNotValid).toBeUndefined();
      expect(passwordPolicy.maximumLength).toBeUndefined();
      expect(passwordPolicy.minimumDigits).toBeUndefined();
      expect(passwordPolicy.minimumLowercaseLetters).toBeUndefined();
      expect(passwordPolicy.minimumSpecialCharacters).toBeUndefined();
      expect(passwordPolicy.minimumUppercaseLetters).toBeUndefined();
      expect(passwordPolicy.passwordExpirationPeriodDays).toBeUndefined();
      expect(passwordPolicy.passwordReuseFrequencyDays).toBeUndefined();
    });

    it('should handle different password policy configurations', () => {
      const strictPolicy: PasswordPolicy = {
        allowWhitespaces: false,
        forceUserToResetPasswordIfNotValid: true,
        maximumLength: 64,
        minimumDigits: 3,
        minimumLength: 12,
        minimumLowercaseLetters: 2,
        minimumSpecialCharacters: 2,
        minimumUppercaseLetters: 2,
        passwordExpirationPeriodDays: 60,
        passwordReuseFrequencyDays: 15,
      };

      const lenientPolicy: PasswordPolicy = {
        allowWhitespaces: true,
        forceUserToResetPasswordIfNotValid: false,
        maximumLength: 256,
        minimumDigits: 0,
        minimumLength: 4,
        minimumLowercaseLetters: 0,
        minimumSpecialCharacters: 0,
        minimumUppercaseLetters: 0,
        passwordExpirationPeriodDays: 365,
        passwordReuseFrequencyDays: 0,
      };

      expect(strictPolicy.minimumLength).toBe(12);
      expect(strictPolicy.minimumDigits).toBe(3);
      expect(strictPolicy.minimumUppercaseLetters).toBe(2);
      expect(strictPolicy.minimumLowercaseLetters).toBe(2);
      expect(strictPolicy.minimumSpecialCharacters).toBe(2);
      expect(strictPolicy.maximumLength).toBe(64);
      expect(strictPolicy.allowWhitespaces).toBe(false);
      expect(strictPolicy.forceUserToResetPasswordIfNotValid).toBe(true);
      expect(strictPolicy.passwordExpirationPeriodDays).toBe(60);
      expect(strictPolicy.passwordReuseFrequencyDays).toBe(15);

      expect(lenientPolicy.minimumLength).toBe(4);
      expect(lenientPolicy.minimumDigits).toBe(0);
      expect(lenientPolicy.minimumUppercaseLetters).toBe(0);
      expect(lenientPolicy.minimumLowercaseLetters).toBe(0);
      expect(lenientPolicy.minimumSpecialCharacters).toBe(0);
      expect(lenientPolicy.maximumLength).toBe(256);
      expect(lenientPolicy.allowWhitespaces).toBe(true);
      expect(lenientPolicy.forceUserToResetPasswordIfNotValid).toBe(false);
      expect(lenientPolicy.passwordExpirationPeriodDays).toBe(365);
      expect(lenientPolicy.passwordReuseFrequencyDays).toBe(0);
    });
  });
});