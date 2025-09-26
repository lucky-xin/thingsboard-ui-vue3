import { describe, it, expect } from 'vitest';

describe('components/Table/src/hooks/useRowSelection', () => {
  it('should export useRowSelection hook', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');
    
    expect(module).toBeDefined();
    expect(module.useRowSelection).toBeDefined();
    expect(typeof module.useRowSelection).toBe('function');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export additional utilities', async () => {
    const module = await import('/@/components/Table/src/hooks/useRowSelection');
    
    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });
});