import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const mockComponent = {
      ...component,
      install: vi.fn((app, name) => {
        app.component(name || component.name || 'MockComponent', component);
      }),
    };
    return mockComponent;
  }),
}));

// Test Popover component index exports
describe('Popover/index', () => {
  it('should export Popover component with withInstall', async () => {
    const { Popover } = await import('/@/components/Popover');
    
    expect(Popover).toBeDefined();
    expect(Popover.install).toBeDefined();
  });

  it('should have install method for Popover', async () => {
    const { Popover } = await import('/@/components/Popover');
    
    expect(Popover.install).toBeDefined();
    expect(typeof Popover.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { Popover } = await import('/@/components/Popover');
    const mockApp = {
      component: vi.fn(),
    };
    
    Popover.install(mockApp as any, 'TestPopover');
    expect(mockApp.component).toHaveBeenCalledWith('TestPopover', expect.any(Object));
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Popover');
    
    expect(exports).toBeDefined();
    expect(exports.Popover).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Popover');
    const exportKeys = Object.keys(exports);
    
    // Should export: Popover and typing exports
    expect(exportKeys).toContain('Popover');
    expect(exportKeys.length).toBeGreaterThanOrEqual(1);
  });

  it('should be valid Vue component', async () => {
    const { Popover } = await import('/@/components/Popover');
    
    expect(Popover).toBeDefined();
    expect(typeof Popover).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { Popover } = await import('/@/components/Popover');
    
    // Component should have install method from withInstall
    expect(Popover.install).toBeInstanceOf(Function);
  });
});