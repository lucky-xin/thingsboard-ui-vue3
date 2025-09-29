import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const wrappedComponent = { ...component, install: vi.fn() };
    return wrappedComponent;
  }),
  deepMerge: vi.fn((target, source) => {
    if (!target) return source;
    if (!source) return target;
    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = { ...(target[key] || {}), ...source[key] };
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }),
  setObjToUrlParams: vi.fn(),
  openWindow: vi.fn(),
  noop: vi.fn(),
  sleep: vi.fn(),
  getPopupContainer: vi.fn(() => document.body),
  convertBytesToSize: vi.fn(),
}));,
}));

// Mock drawer hooks
vi.mock('/@/components/Drawer/src/useDrawer', () => ({
  useDrawer: vi.fn(),
  useDrawerInner: vi.fn(),
}));

// Test Drawer component index exports
describe('Drawer/index', () => {
  it('should export BasicDrawer component with withInstall', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer).toBeDefined();
    expect(BasicDrawer.install).toBeDefined();
  });

  it('should export useDrawer and useDrawerInner hooks', async () => {
    const { useDrawer, useDrawerInner } = await import('/@/components/Drawer');

    expect(useDrawer).toBeDefined();
    expect(useDrawerInner).toBeDefined();
    expect(typeof useDrawer).toBe('function');
    expect(typeof useDrawerInner).toBe('function');
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Drawer');

    expect(exports).toBeDefined();
    expect(exports.BasicDrawer).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Drawer');
    const exportKeys = Object.keys(exports);

    // Should export: BasicDrawer, useDrawer, useDrawerInner, and typing exports
    expect(exportKeys.length).toBeGreaterThanOrEqual(3);
    expect(exportKeys).toContain('BasicDrawer');
    expect(exportKeys).toContain('useDrawer');
    expect(exportKeys).toContain('useDrawerInner');
  });

  it('should have install method for BasicDrawer', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer.install).toBeDefined();
    expect(typeof BasicDrawer.install).toBe('function');
  });

  it('should be valid Vue component', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');

    expect(BasicDrawer).toBeDefined();
    expect(typeof BasicDrawer).toBe('object');
  });

  it('should install component correctly', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer');
    const mockApp = {
      component: vi.fn(),
    };

    BasicDrawer.install(mockApp as any);
    expect(mockApp.component).toHaveBeenCalled();
  });
});
