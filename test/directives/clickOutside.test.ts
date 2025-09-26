import { describe, it, expect } from 'vitest';

describe('directives/clickOutside', () => {
  it('should export clickOutside directive', async () => {
    const module = await import('/@/directives/clickOutside');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have directive implementation', async () => {
    const module = await import('/@/directives/clickOutside');
    
    expect(module.default).toBeDefined();
  });

  it('should be a valid Vue directive', async () => {
    const module = await import('/@/directives/clickOutside');
    const directive = module.default;
    
    // Vue directives can be functions or objects
    expect(['object', 'function']).toContain(typeof directive);
  });
});