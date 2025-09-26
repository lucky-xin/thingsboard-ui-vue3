import { describe, it, expect } from 'vitest';

describe('utils/cache/index', () => {
  it('should export cache utilities', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export WebStorage', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module.WebStorage).toBeDefined();
    expect(typeof module.WebStorage).toBe('object');
  });

  it('should export createStorage function', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module.createStorage).toBeDefined();
    expect(typeof module.createStorage).toBe('function');
  });

  it('should export createSessionStorage function', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module.createSessionStorage).toBeDefined();
    expect(typeof module.createSessionStorage).toBe('function');
  });

  it('should export createLocalStorage function', async () => {
    const module = await import('/@/utils/cache/index');
    
    expect(module.createLocalStorage).toBeDefined();
    expect(typeof module.createLocalStorage).toBe('function');
  });
});