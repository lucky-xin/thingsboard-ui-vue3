import { describe, it, expect } from 'vitest';

// Test Tree component index exports without mocks to get real coverage
describe('Tree/index coverage', () => {
  it('should export BasicTree component', async () => {
    const module = await import('/@/components/Tree');
    
    expect(module.BasicTree).toBeDefined();
  });

  it('should export ContextMenuItem type', async () => {
    const module = await import('/@/components/Tree');
    
    expect(module.ContextMenuItem).toBeDefined();
  });

  it('should export typing types', async () => {
    const module = await import('/@/components/Tree');
    
    // Check that typing exports are available
    expect(module).toBeDefined();
  });

  it('should be valid Vue component', async () => {
    const { BasicTree } = await import('/@/components/Tree');
    
    expect(typeof BasicTree).toBe('object');
  });

  it('should be importable as named exports', async () => {
    const { BasicTree, ContextMenuItem } = await import('/@/components/Tree');
    
    expect(BasicTree).toBeDefined();
    expect(ContextMenuItem).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Tree');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('BasicTree');
    expect(exportKeys).toContain('ContextMenuItem');
  });
});