import { describe, it, expect } from 'vitest';

describe('SimpleMenu/index', () => {
  it('should export SimpleMenu component', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    
    expect(module).toBeDefined();
    expect(module.SimpleMenu).toBeDefined();
  });

  it('should export SimpleMenuTag component', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    
    expect(module.SimpleMenuTag).toBeDefined();
  });

  it('should be valid Vue components', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    const { SimpleMenu, SimpleMenuTag } = module;
    
    expect(typeof SimpleMenu).toBe('object');
    expect(typeof SimpleMenuTag).toBe('object');
  });

  it('should have correct exports', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('SimpleMenu');
    expect(exports).toContain('SimpleMenuTag');
    expect(exports.length).toBe(2);
  });
});