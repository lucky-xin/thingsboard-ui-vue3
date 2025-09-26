import { describe, it, expect } from 'vitest';

describe('locales/useLocale', () => {
  it('should export useLocale function', async () => {
    const module = await import('/@/locales/useLocale');
    
    expect(module.useLocale).toBeDefined();
    expect(typeof module.useLocale).toBe('function');
  });

  it('should be importable', async () => {
    const module = await import('/@/locales/useLocale');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have useLocale as main export', async () => {
    const { useLocale } = await import('/@/locales/useLocale');
    
    expect(useLocale).toBeDefined();
    expect(typeof useLocale).toBe('function');
  });
});