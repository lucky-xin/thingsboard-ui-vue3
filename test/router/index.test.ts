import { describe, it, expect } from 'vitest';

describe('router/index', () => {
  it('should export router configuration', async () => {
    const module = await import('/@/router/index');
    
    expect(module).toBeDefined();
    expect(module.router).toBeDefined();
  });

  it('should export setupRouter function', async () => {
    const module = await import('/@/router/index');
    
    expect(module.setupRouter).toBeDefined();
    expect(typeof module.setupRouter).toBe('function');
  });

  it('should be a valid router module', async () => {
    const module = await import('/@/router/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});