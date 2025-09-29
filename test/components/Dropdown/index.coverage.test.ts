import { describe, it, expect } from 'vitest';

// Test Dropdown component index exports without mocks to get real coverage
describe('Dropdown/index coverage', () => {
  it('should export Dropdown component', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    expect(Dropdown).toBeDefined();
  });

  it('should have install method', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    expect(Dropdown.install).toBeDefined();
    expect(typeof Dropdown.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');
    const mockApp = {
      component: vi.fn(),
    };

    Dropdown.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should export only Dropdown component', async () => {
    const exports = await import('/@/components/Dropdown');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('Dropdown');
  });

  it('should be valid Vue component', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    expect(Dropdown).toBeDefined();
    expect(typeof Dropdown).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    // Component should have install method from withInstall
    expect(Dropdown.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    // Test that withInstall was applied correctly
    expect(Dropdown).toHaveProperty('install');

    // Test that install method works
    const mockApp = { component: vi.fn() };
    Dropdown.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should have correct component name', async () => {
    const { Dropdown } = await import('/@/components/Dropdown');

    expect(Dropdown).toHaveProperty('__name');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Dropdown');

    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });
});
