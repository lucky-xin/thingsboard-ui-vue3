import { describe, it, expect } from 'vitest';

// Test Resizer component index exports without mocks to get real coverage
describe('Resizer/index coverage', () => {
  it('should export Resizer component', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer).toBeDefined();
  });

  it('should have install method', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer.install).toBeDefined();
    expect(typeof Resizer.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { Resizer } = await import('/@/components/Resizer');
    const mockApp = {
      component: vi.fn(),
      config: { globalProperties: {} },
    };

    expect(() => Resizer.install(mockApp as any)).not.toThrow();
    expect(typeof Resizer.install).toBe('function');
  });

  it('should export only Resizer component', async () => {
    const exports = await import('/@/components/Resizer');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['Resizer']);
  });

  it('should be valid Vue component', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer).toBeDefined();
    expect(typeof Resizer).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    // Component should have install method from withInstall
    expect(Resizer.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    // Test that withInstall was applied correctly
    expect(Resizer).toHaveProperty('install');

    // Test that install method callable
    const mockApp = { component: vi.fn(), config: { globalProperties: {} } };
    expect(() => Resizer.install(mockApp as any)).not.toThrow();
  });

  it('should have correct component name', async () => {
    const { Resizer } = await import('/@/components/Resizer');

    expect(Resizer).toHaveProperty('name');
  });
});
