import { describe, it, expect } from 'vitest';

describe('utils/auth/index', () => {
  it('should export auth utilities', async () => {
    const module = await import('/@/utils/auth/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

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