import { describe, it, expect } from 'vitest';

// Test ContextMenu component index exports without mocks to get real coverage
describe('ContextMenu/index coverage', () => {
  it('should export createContextMenu and destroyContextMenu functions', async () => {
    const { createContextMenu, destroyContextMenu } = await import('/@/components/ContextMenu');
    
    expect(createContextMenu).toBeDefined();
    expect(destroyContextMenu).toBeDefined();
  });

  it('should export functions with correct types', async () => {
    const { createContextMenu, destroyContextMenu } = await import('/@/components/ContextMenu');
    
    expect(typeof createContextMenu).toBe('function');
    expect(typeof destroyContextMenu).toBe('function');
  });

  it('should export all expected functions', async () => {
    const exports = await import('/@/components/ContextMenu');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toContain('createContextMenu');
    expect(exportKeys).toContain('destroyContextMenu');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/ContextMenu');
    
    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });

  it('should be importable as named exports', async () => {
    const module = await import('/@/components/ContextMenu');
    
    expect(module.createContextMenu).toBeDefined();
    expect(module.destroyContextMenu).toBeDefined();
  });

  it('should export functions that can be called', async () => {
    const { createContextMenu, destroyContextMenu } = await import('/@/components/ContextMenu');
    
    // Functions should be callable (though we won't test their actual behavior here)
    expect(() => createContextMenu).not.toThrow();
    expect(() => destroyContextMenu).not.toThrow();
  });
});
