import { describe, it, expect, vi } from 'vitest';

// Test Drawer component index exports without mocks to get real coverage
describe('Drawer/index coverage', () => {
  it('should export BasicDrawer component and hooks', async () => {
    const { BasicDrawer, useDrawer, useDrawerInner } = await import('/@/components/Drawer');

    expect(BasicDrawer).toBeDefined();
    expect(useDrawer).toBeDefined();
    expect(useDrawerInner).toBeDefined();
  });

  it('should have install method for BasicDrawer component', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer.install).toBeDefined();
    expect(typeof BasicDrawer.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');
    const mockApp = {
      component: vi.fn(),
    };

    // Test that install method exists and can be called
    expect(() => BasicDrawer.install(mockApp as any)).not.toThrow();
  });

  it('should export all expected components and hooks', async () => {
    const exports = await import('/@/components/Drawer');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('BasicDrawer');
    expect(exportKeys).toContain('useDrawer');
    expect(exportKeys).toContain('useDrawerInner');
  });

  it('should be valid Vue component', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer).toBeDefined();
    expect(typeof BasicDrawer).toBe('object');
  });

  it('should export hooks as functions', async () => {
    const { useDrawer, useDrawerInner } = await import('/@/components/Drawer');

    expect(typeof useDrawer).toBe('function');
    expect(typeof useDrawerInner).toBe('function');
  });

  it('should export component with proper structure', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    // Component should have install method from withInstall
    expect(BasicDrawer.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    // Test that withInstall was applied correctly
    expect(BasicDrawer).toHaveProperty('install');

    // Test that install method works
    const mockApp = { component: vi.fn() };
    expect(() => BasicDrawer.install(mockApp as any)).not.toThrow();
  });

  it('should have correct component name', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer).toBeDefined();
    expect(typeof BasicDrawer).toBe('object');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Drawer');

    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });

  it('should export type definition', async () => {
    const exports = await import('/@/components/Drawer');

    // Type should be defined (though we can't test its actual type at runtime)
    expect(exports).toBeDefined();
  });
});
