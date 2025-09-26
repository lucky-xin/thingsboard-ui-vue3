import { describe, it, expect } from 'vitest';

describe('store/index', () => {
  it('should export store configuration', async () => {
    const module = await import('/@/store/index');
    
    expect(module).toBeDefined();
    expect(module.store).toBeDefined();
  });

  it('should export setupStore function', async () => {
    const module = await import('/@/store/index');
    
    expect(module.setupStore).toBeDefined();
    expect(typeof module.setupStore).toBe('function');
  });

  it('should be a valid store module', async () => {
    const module = await import('/@/store/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});