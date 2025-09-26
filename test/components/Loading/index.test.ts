import { describe, it, expect } from 'vitest';

describe('Loading/index', () => {
  it('should export Loading component', async () => {
    const module = await import('/@/components/Loading/index');
    
    expect(module).toBeDefined();
    expect(module.Loading).toBeDefined();
  });

  it('should export useLoading function', async () => {
    const module = await import('/@/components/Loading/index');
    
    expect(module.useLoading).toBeDefined();
    expect(typeof module.useLoading).toBe('function');
  });

  it('should export createLoading function', async () => {
    const module = await import('/@/components/Loading/index');
    
    expect(module.createLoading).toBeDefined();
    expect(typeof module.createLoading).toBe('function');
  });

  it('should be valid Vue component', async () => {
    const module = await import('/@/components/Loading/index');
    const { Loading } = module;
    
    expect(typeof Loading).toBe('object');
  });

  it('should have correct exports', async () => {
    const module = await import('/@/components/Loading/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('Loading');
    expect(exports).toContain('useLoading');
    expect(exports).toContain('createLoading');
    expect(exports.length).toBe(3);
  });
});