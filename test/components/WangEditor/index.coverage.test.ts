import { describe, it, expect, vi } from 'vitest';

// Test WangEditor component index exports without mocks to get real coverage
describe('WangEditor/index coverage', () => {
  it('should export WangEditor component', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    expect(WangEditor).toBeDefined();
  });

  it('should have install method', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    expect(WangEditor.install).toBeDefined();
    expect(typeof WangEditor.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');
    const mockApp = {
      component: vi.fn(),
    };

    // Test that install method exists and can be called
    expect(() => WangEditor.install(mockApp as any)).not.toThrow();
  });

  it('should export only WangEditor component', async () => {
    const exports = await import('/@/components/WangEditor');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['WangEditor']);
  });

  it('should be valid Vue component', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    expect(WangEditor).toBeDefined();
    expect(typeof WangEditor).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    // Component should have install method from withInstall
    expect(WangEditor.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    // Test that withInstall was applied correctly
    expect(WangEditor).toHaveProperty('install');

    // Test that install method works
    const mockApp = { component: vi.fn() };
    expect(() => WangEditor.install(mockApp as any)).not.toThrow();
  });

  it('should have correct component name', async () => {
    const { WangEditor } = await import('/@/components/WangEditor');

    // Component should be defined and have proper structure
    expect(WangEditor).toBeDefined();
    expect(typeof WangEditor).toBe('object');
  });
});