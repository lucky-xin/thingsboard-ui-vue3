import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => ({
    ...component,
    install: vi.fn(),
  })),
  deepMerge: vi.fn((target, source) => ({ ...target, ...source })),
}));

// Test Authority component index exports
describe('Authority/index', () => {
  it('should export Authority component with withInstall', async () => {
    const { Authority } = await import('/@/components/Authority');
    
    expect(Authority).toBeDefined();
    expect(Authority.install).toBeDefined();
  });

  it('should have install method for Authority', async () => {
    const { Authority } = await import('/@/components/Authority');
    
    expect(Authority.install).toBeDefined();
    expect(typeof Authority.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { Authority } = await import('/@/components/Authority');
    const mockApp = {
      component: vi.fn(),
    };
    
    Authority.install(mockApp as any);
    expect(mockApp.component).toHaveBeenCalled();
  });

  it('should have correct component name', async () => {
    const { Authority } = await import('/@/components/Authority');
    
    expect(Authority).toHaveProperty('__name');
  });

  it('should export only Authority', async () => {
    const exports = await import('/@/components/Authority');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toEqual(['Authority']);
  });

  it('should be valid Vue component', async () => {
    const { Authority } = await import('/@/components/Authority');
    
    expect(Authority).toBeDefined();
    expect(typeof Authority).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { Authority } = await import('/@/components/Authority');
    
    // Component should have install method from withInstall
    expect(Authority.install).toBeInstanceOf(Function);
  });
});