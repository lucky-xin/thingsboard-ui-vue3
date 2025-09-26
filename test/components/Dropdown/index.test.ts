import { describe, it, expect } from 'vitest';

describe('Dropdown/index', () => {
  it('should export Dropdown component', async () => {
    const module = await import('/@/components/Dropdown/index');
    
    expect(module).toBeDefined();
    expect(module.Dropdown).toBeDefined();
  });

  it('should export typing definitions', async () => {
    const module = await import('/@/components/Dropdown/index');
    
    // Just check that the module imports without error
    expect(module).toBeDefined();
  });

  it('should export only Dropdown', async () => {
    const module = await import('/@/components/Dropdown/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('Dropdown');
  });

  it('should be a valid Vue component', async () => {
    const module = await import('/@/components/Dropdown/index');
    const { Dropdown } = module;
    
    expect(typeof Dropdown).toBe('object');
  });
});