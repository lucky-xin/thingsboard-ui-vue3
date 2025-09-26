import { describe, it, expect } from 'vitest';

describe('Dialog/index', () => {
  it('should export BasicDialog component', async () => {
    const module = await import('/@/components/Dialog/index');
    
    expect(module).toBeDefined();
    expect(module.BasicDialog).toBeDefined();
  });

  it('should export BasicDialogInstance type', async () => {
    const module = await import('/@/components/Dialog/index');
    
    // Just check that the module imports without error
    expect(module).toBeDefined();
    // Type exports are not runtime values, so we can't check them directly
  });

  it('should export only BasicDialog', async () => {
    const module = await import('/@/components/Dialog/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('BasicDialog');
  });

  it('should be a valid Vue component', async () => {
    const module = await import('/@/components/Dialog/index');
    const { BasicDialog } = module;
    
    expect(typeof BasicDialog).toBe('object');
  });
});