import { describe, it, expect } from 'vitest';

describe('components/Drawer/src/useDrawer', () => {
  it('should export useDrawer hook', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
    expect(module.useDrawer).toBeDefined();
    expect(typeof module.useDrawer).toBe('function');
    expect(module.useDrawerInner).toBeDefined();
    expect(typeof module.useDrawerInner).toBe('function');
  });

  it('should have drawer hook functions', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
    expect(exportKeys).toContain('useDrawer');
    expect(exportKeys).toContain('useDrawerInner');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });
});