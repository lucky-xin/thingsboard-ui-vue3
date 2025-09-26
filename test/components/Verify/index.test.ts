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

// Test Verify component index exports
describe('Verify/index', () => {
  it('should export BasicDragVerify and RotateDragVerify components with withInstall', async () => {
    const { BasicDragVerify, RotateDragVerify } = await import('/@/components/Verify');
    
    expect(BasicDragVerify).toBeDefined();
    expect(RotateDragVerify).toBeDefined();
    expect(BasicDragVerify.install).toBeDefined();
    expect(RotateDragVerify.install).toBeDefined();
  });

  it('should have install method for both components', async () => {
    const { BasicDragVerify, RotateDragVerify } = await import('/@/components/Verify');
    
    expect(BasicDragVerify.install).toBeDefined();
    expect(RotateDragVerify.install).toBeDefined();
    expect(typeof BasicDragVerify.install).toBe('function');
    expect(typeof RotateDragVerify.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { BasicDragVerify, RotateDragVerify } = await import('/@/components/Verify');
    const mockApp = {
      component: vi.fn(),
    };
    
    BasicDragVerify.install(mockApp as any, 'TestBasicDragVerify');
    RotateDragVerify.install(mockApp as any, 'TestRotateDragVerify');
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
    expect(mockApp.component).toHaveBeenCalledWith('TestBasicDragVerify', expect.any(Object));
    expect(mockApp.component).toHaveBeenCalledWith('TestRotateDragVerify', expect.any(Object));
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Verify');
    
    expect(exports).toBeDefined();
    expect(exports.BasicDragVerify).toBeDefined();
    expect(exports.RotateDragVerify).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Verify');
    const exportKeys = Object.keys(exports);
    
    // Should export: BasicDragVerify, RotateDragVerify, and typing exports
    expect(exportKeys).toContain('BasicDragVerify');
    expect(exportKeys).toContain('RotateDragVerify');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  });

  it('should be valid Vue components', async () => {
    const { BasicDragVerify, RotateDragVerify } = await import('/@/components/Verify');
    
    expect(BasicDragVerify).toBeDefined();
    expect(RotateDragVerify).toBeDefined();
    expect(typeof BasicDragVerify).toBe('object');
    expect(typeof RotateDragVerify).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { BasicDragVerify, RotateDragVerify } = await import('/@/components/Verify');
    
    // Components should have install method from withInstall
    expect(BasicDragVerify.install).toBeInstanceOf(Function);
    expect(RotateDragVerify.install).toBeInstanceOf(Function);
  });
});