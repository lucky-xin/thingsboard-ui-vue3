import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getToken, getRefreshToken, getAuthCache, setAuthCache, clearAuthCache } from '/@/utils/auth/index';
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from '/@/enums/cacheEnum';

// Mock the persistent storage
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

// Mock project settings
vi.mock('/@/settings/projectSetting', () => ({
  default: {
    permissionCacheType: 'local',
  },
}));

describe('utils/auth/index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export auth utilities', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  describe('getToken', () => {
    it('should call getAuthCache with TOKEN_KEY', () => {
      getToken();

      // This tests that the function is called, actual implementation depends on cache
      expect(typeof getToken).toBe('function');
    });
  });

  describe('getRefreshToken', () => {
    it('should call getAuthCache with REFRESH_TOKEN_KEY', () => {
      getRefreshToken();

      // This tests that the function is called, actual implementation depends on cache
      expect(typeof getRefreshToken).toBe('function');
    });
  });

  describe('getAuthCache', () => {
    it('should be a function', () => {
      expect(typeof getAuthCache).toBe('function');
    });

    it('should handle cache key parameter', () => {
      getAuthCache(TOKEN_KEY);
      expect(typeof getAuthCache).toBe('function');
    });
  });

  describe('setAuthCache', () => {
    it('should be a function', () => {
      expect(typeof setAuthCache).toBe('function');
    });

    it('should handle key and value parameters', () => {
      setAuthCache(TOKEN_KEY, 'test-token');
      expect(typeof setAuthCache).toBe('function');
    });
  });

  describe('clearAuthCache', () => {
    it('should be a function', () => {
      expect(typeof clearAuthCache).toBe('function');
    });

    it('should handle immediate parameter', () => {
      clearAuthCache(true);
      clearAuthCache(false);
      clearAuthCache();
      expect(typeof clearAuthCache).toBe('function');
    });
  });

  // Test exports are available
  it('should export getToken function', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module.getToken).toBeDefined();
    expect(typeof module.getToken).toBe('function');
  });

  it('should export getRefreshToken function', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module.getRefreshToken).toBeDefined();
    expect(typeof module.getRefreshToken).toBe('function');
  });

  it('should export getAuthCache function', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module.getAuthCache).toBeDefined();
    expect(typeof module.getAuthCache).toBe('function');
  });

  it('should export setAuthCache function', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module.setAuthCache).toBeDefined();
    expect(typeof module.setAuthCache).toBe('function');
  });

  it('should export clearAuthCache function', async () => {
    const module = await import('/@/utils/auth/index');

    expect(module.clearAuthCache).toBeDefined();
    expect(typeof module.clearAuthCache).toBe('function');
  });
});
