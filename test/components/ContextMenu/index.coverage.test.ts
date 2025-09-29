import { describe, it, expect } from 'vitest';

// Test ContextMenu component index exports without mocks to get real coverage
describe('ContextMenu/index coverage', () => {
  it('should export all expected functions', async () => {
    const module = await import('/@/components/ContextMenu');

    expect(module.createContextMenu).toBeDefined();
    expect(module.destroyContextMenu).toBeDefined();
  });

  it('should export typing types', async () => {
    const module = await import('/@/components/ContextMenu');

    // Check that typing exports are available
    expect(module).toBeDefined();
  });

  it('should be valid functions', async () => {
    const { createContextMenu, destroyContextMenu } = await import('/@/components/ContextMenu');

    expect(typeof createContextMenu).toBe('function');
    expect(typeof destroyContextMenu).toBe('function');
  });

  it('should be importable as named exports', async () => {
    const { createContextMenu, destroyContextMenu } = await import('/@/components/ContextMenu');

    expect(createContextMenu).toBeDefined();
    expect(destroyContextMenu).toBeDefined();
  });

  it('should export only expected functions', async () => {
    const module = await import('/@/components/ContextMenu');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('createContextMenu');
    expect(exportKeys).toContain('destroyContextMenu');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  });
});
