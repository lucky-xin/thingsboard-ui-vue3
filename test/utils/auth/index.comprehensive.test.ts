import { describe, it, expect, vi } from 'vitest';

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

import { getToken, setToken, clearToken, getRefreshToken, setRefreshToken, clearRefreshToken } from '/@/utils/auth';

describe.skipIf(false, 'auth comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get token from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('test-token');
    const token = getToken();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('ACCESS_TOKEN');
    expect(token).toBe('test-token');
  });

  it('should set token to localStorage', () => {
    setToken('new-token');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('ACCESS_TOKEN', 'new-token');
  });

  it('should clear token from localStorage', () => {
    clearToken();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('ACCESS_TOKEN');
  });

  it('should get refresh token from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('refresh-token');
    const token = getRefreshToken();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('REFRESH_TOKEN');
    expect(token).toBe('refresh-token');
  });

  it('should set refresh token to localStorage', () => {
    setRefreshToken('new-refresh-token');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('REFRESH_TOKEN', 'new-refresh-token');
  });

  it('should clear refresh token from localStorage', () => {
    clearRefreshToken();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('REFRESH_TOKEN');
  });

  it('should return null when token not found', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const token = getToken();
    expect(token).toBeNull();
  });

  it('should return null when refresh token not found', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const token = getRefreshToken();
    expect(token).toBeNull();
  });
});
