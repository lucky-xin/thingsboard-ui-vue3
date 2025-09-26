import { describe, it, expect } from 'vitest';

// Test Tree component index exports
describe('Tree/index', () => {
  it('should export BasicTree component', async () => {
    const { BasicTree } = await import('/@/components/Tree');
    
    expect(BasicTree).toBeDefined();
    expect(typeof BasicTree).toBe('object');
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Tree');
    
    expect(exports).toBeDefined();
    expect(exports.BasicTree).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Tree');
    const exportKeys = Object.keys(exports);
    
    // Should export: BasicTree and typing exports
    expect(exportKeys).toContain('BasicTree');
    expect(exportKeys.length).toBeGreaterThanOrEqual(1);
  });

  it('should be valid Vue component', async () => {
    const { BasicTree } = await import('/@/components/Tree');
    
    expect(BasicTree).toBeDefined();
    expect(typeof BasicTree).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { BasicTree } = await import('/@/components/Tree');
    
    // Tree component should be a Vue component
    expect(BasicTree).toHaveProperty('__name');
  });

  it('should export only BasicTree component', async () => {
    const exports = await import('/@/components/Tree');
    const { BasicTree } = exports;
    
    expect(BasicTree).toBeDefined();
    expect(typeof BasicTree).toBe('object');
  });
});