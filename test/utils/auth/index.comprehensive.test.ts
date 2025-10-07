import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the cache module
vi.mock('/@/utils/cache/persistent', () => ({
  Persistent: {
    getSession: vi.fn(),
    getLocal: vi.fn(),
    setSession: vi.fn(),
    setLocal: vi.fn(),
    removeSession: vi.fn(),
    removeLocal: vi.fn(),
    clearSession: vi.fn(),
    clearLocal: vi.fn(),
    clearAll: vi.fn(),
  },
  BasicKeys: {},
}));

// Mock project settings
vi.mock('/@/settings/projectSetting', () => ({
  default: {
    permissionCacheType: 'SESSION', // Use session storage by default
  },
}));

// Mock cache enums
vi.mock('/@/enums/cacheEnum', () => ({
  CacheTypeEnum: {
    LOCAL: 'LOCAL',
    SESSION: 'SESSION',
  },
  TOKEN_KEY: 'ACCESS_TOKEN',
  REFRESH_TOKEN_KEY: 'REFRESH_TOKEN',
}));

import { getToken, getRefreshToken } from '/@/utils/auth';
import * as persistentModule from '/@/utils/cache/persistent';

describe('auth comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get token from cache', () => {
    vi.mocked(persistentModule.Persistent.getSession).mockReturnValue('test-token');

    const token = getToken();
    expect(persistentModule.Persistent.getSession).toHaveBeenCalledWith('ACCESS_TOKEN');
    expect(token).toBe('test-token');
  });

  it('should get refresh token from cache', () => {
    vi.mocked(persistentModule.Persistent.getSession).mockReturnValue('refresh-token');

    const token = getRefreshToken();
    expect(persistentModule.Persistent.getSession).toHaveBeenCalledWith('REFRESH_TOKEN');
    expect(token).toBe('refresh-token');
  });

  it('should return undefined when token not found', () => {
    vi.mocked(persistentModule.Persistent.getSession).mockReturnValue(undefined);

    const token = getToken();
    expect(token).toBeUndefined();
  });

  it('should return undefined when refresh token not found', () => {
    vi.mocked(persistentModule.Persistent.getSession).mockReturnValue(undefined);

    const token = getRefreshToken();
    expect(token).toBeUndefined();
  });
});