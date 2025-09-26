import { describe, it, expect } from 'vitest';

describe('settings/projectSetting', () => {
  it('should export project settings', async () => {
    const module = await import('/@/settings/projectSetting');
    
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('object');
  });

  it('should have permission cache type', async () => {
    const settings = await import('/@/settings/projectSetting');
    
    expect(settings.default.permissionCacheType).toBeDefined();
  });

  it('should have theme color configuration', async () => {
    const settings = await import('/@/settings/projectSetting');
    
    expect(settings.default.themeColor).toBeDefined();
  });
});