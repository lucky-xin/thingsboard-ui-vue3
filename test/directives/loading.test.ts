import { describe, it, expect } from 'vitest';

describe('directives/loading', () => {
  it('should export loading directive', async () => {
    const module = await import('/@/directives/loading');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have directive implementation', async () => {
    const module = await import('/@/directives/loading');
    
    expect(module.default).toBeDefined();
  });

  it('should be a valid Vue directive', async () => {
    const module = await import('/@/directives/loading');
    const directive = module.default;
    
    // Vue directives can be functions or objects
    expect(['object', 'function']).toContain(typeof directive);
  });
});