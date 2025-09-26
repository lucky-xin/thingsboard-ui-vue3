import { describe, it, expect } from 'vitest';

describe('directives/ripple/index', () => {
  it('should export ripple directive', async () => {
    const module = await import('/@/directives/ripple/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export default directive', async () => {
    const module = await import('/@/directives/ripple/index');
    
    expect(module.default).toBeDefined();
  });
});