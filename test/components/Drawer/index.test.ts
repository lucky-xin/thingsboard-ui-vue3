import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock BasicDrawer.vue component
vi.mock('/@/components/Drawer/src/BasicDrawer.vue', () => ({
  default: {
    name: 'BasicDrawer',
    template: '<div class="mock-basic-drawer"><slot /></div>',
  },
}));

// Mock typing exports
vi.mock('/@/components/Drawer/src/typing', () => ({
  DrawerProps: {},
  DrawerInstance: {},
}));

// Mock useDrawer hooks
vi.mock('/@/components/Drawer/src/useDrawer', () => ({
  useDrawer: vi.fn(),
  useDrawerInner: vi.fn(),
}));

describe('components/Drawer/index', () => {
  it('should export BasicDrawer component with install method', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer/index');
    
    expect(BasicDrawer).toBeDefined();
    expect(BasicDrawer.name).toBe('BasicDrawer');
    expect(BasicDrawer.install).toBeDefined();
    expect(typeof BasicDrawer.install).toBe('function');
  });

  it('should export BasicDrawerInstance type', async () => {
    const drawerModule = await import('/@/components/Drawer/index');
    
    // Check that the type export exists (types don't exist at runtime)
    expect(drawerModule).toHaveProperty('BasicDrawerInstance');
  });

  it('should export useDrawer hook', async () => {
    const { useDrawer } = await import('/@/components/Drawer/index');
    
    expect(useDrawer).toBeDefined();
    expect(typeof useDrawer).toBe('function');
  });

  it('should export useDrawerInner hook', async () => {
    const { useDrawerInner } = await import('/@/components/Drawer/index');
    
    expect(useDrawerInner).toBeDefined();
    expect(typeof useDrawerInner).toBe('function');
  });

  it('should have all expected exports', async () => {
    const drawerModule = await import('/@/components/Drawer/index');
    
    expect(drawerModule.BasicDrawer).toBeDefined();
    expect(drawerModule.useDrawer).toBeDefined();
    expect(drawerModule.useDrawerInner).toBeDefined();
    expect(drawerModule).toHaveProperty('BasicDrawerInstance');
  });
});