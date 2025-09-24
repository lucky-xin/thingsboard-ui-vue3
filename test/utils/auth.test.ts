import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as authUtils from '/@/utils/auth/index';
import { Persistent } from '/@/utils/cache/persistent';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '/@/enums/cacheEnum';

// Mock the project setting
vi.mock('/@/settings/projectSetting', () => ({
  default: {
    permissionCacheType: 'SESSION',
  },
}));

// Mock the Persistent class
vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    getLocal: vi.fn(),
    getSession: vi.fn(),
    setLocal: vi.fn(),
    setSession: vi.fn(),
    clearLocal: vi.fn(),
    clearSession: vi.fn(),
  },
}));

describe('utils/auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getToken', () => {
    it('should get token from auth cache', () => {
      const mockToken = 'test-token';
      vi.mocked(Persistent.getSession).mockReturnValue(mockToken);

      const token = authUtils.getToken();

      expect(Persistent.getSession).toHaveBeenCalledWith(TOKEN_KEY as any);
      expect(token).toBe(mockToken);
    });
  });

  describe('getRefreshToken', () => {
    it('should get refresh token from auth cache', () => {
      const mockRefreshToken = 'test-refresh-token';
      vi.mocked(Persistent.getSession).mockReturnValue(mockRefreshToken);

      const refreshToken = authUtils.getRefreshToken();

      expect(Persistent.getSession).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
      expect(refreshToken).toBe(mockRefreshToken);
    });
  });

  describe('getAuthCache', () => {
    it('should get value from session storage when permissionCacheType is SESSION', () => {
      const mockValue = 'test-value';
      vi.mocked(Persistent.getSession).mockReturnValue(mockValue);

      const value = authUtils.getAuthCache(TOKEN_KEY);

      expect(Persistent.getSession).toHaveBeenCalledWith(TOKEN_KEY);
      expect(value).toBe(mockValue);
    });
  });

  describe('setAuthCache', () => {
    it('should set value in session storage when permissionCacheType is SESSION', () => {
      authUtils.setAuthCache(TOKEN_KEY, 'test-value');

      expect(Persistent.setSession).toHaveBeenCalledWith(TOKEN_KEY, 'test-value', true);
    });
  });

  describe('clearAuthCache', () => {
    it('should clear session cache when permissionCacheType is SESSION', () => {
      authUtils.clearAuthCache(true);

      expect(Persistent.clearSession).toHaveBeenCalledWith(true);
    });
  });
});
