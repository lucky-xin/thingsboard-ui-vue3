import { describe, it, expect } from 'vitest';

describe('Menu/index', () => {
  it('should export BasicMenu component', async () => {
    const module = await import('/@/components/Menu/index');
    
    expect(module).toBeDefined();
    expect(module.BasicMenu).toBeDefined();
  });

  it('should be valid Vue component', async () => {
    const module = await import('/@/components/Menu/index');
    const { BasicMenu } = module;
    
    expect(typeof BasicMenu).toBe('object');
  });

  it('should export only BasicMenu', async () => {
    const module = await import('/@/components/Menu/index');
    const exports = Object.keys(module);
    
    expect(exports).toEqual(['BasicMenu']);
  });

  it('should have component structure', async () => {
    const module = await import('/@/components/Menu/index');
    const { BasicMenu } = module;
    
    expect(BasicMenu).toBeDefined();
    expect(typeof BasicMenu).toBe('object');
  });
});