import { describe, it, expect } from 'vitest';

describe('settings/siteSetting', () => {
  it('should export site settings', async () => {
    const module = await import('/@/settings/siteSetting');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have GITHUB_URL configuration', async () => {
    const settings = await import('/@/settings/siteSetting');
    
    expect(settings.GITHUB_URL).toBeDefined();
    expect(typeof settings.GITHUB_URL).toBe('string');
  });

  it('should have GITEE_URL configuration', async () => {
    const settings = await import('/@/settings/siteSetting');
    
    expect(settings.GITEE_URL).toBeDefined();
    expect(typeof settings.GITEE_URL).toBe('string');
  });

  it('should have DOC_URL configuration', async () => {
    const settings = await import('/@/settings/siteSetting');
    
    expect(settings.DOC_URL).toBeDefined();
    expect(typeof settings.DOC_URL).toBe('string');
  });

  it('should have SITE_URL configuration', async () => {
    const settings = await import('/@/settings/siteSetting');
    
    expect(settings.SITE_URL).toBeDefined();
    expect(typeof settings.SITE_URL).toBe('string');
  });
});