import { describe, it, expect } from 'vitest';

// Test StrengthMeter component index exports without mocks to get real coverage
describe('StrengthMeter/index coverage', () => {
  it('should export StrengthMeter component', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    expect(StrengthMeter).toBeDefined();
  });

  it('should have install method', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    expect(StrengthMeter.install).toBeDefined();
    expect(typeof StrengthMeter.install).toBe('function');
  });

  it('should install component correctly', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');
    const mockApp = {
      component: vi.fn(),
    };

    StrengthMeter.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should export only StrengthMeter component', async () => {
    const exports = await import('/@/components/StrengthMeter');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['StrengthMeter']);
  });

  it('should be valid Vue component', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    expect(StrengthMeter).toBeDefined();
    expect(typeof StrengthMeter).toBe('object');
  });

  it('should export component with proper structure', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    // Component should have install method from withInstall
    expect(StrengthMeter.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    // Test that withInstall was applied correctly
    expect(StrengthMeter).toHaveProperty('install');

    // Test that install method works
    const mockApp = { component: vi.fn() };
    StrengthMeter.install(mockApp as any);

    expect(mockApp.component).toHaveBeenCalledTimes(1);
  });

  it('should have correct component name', async () => {
    const { StrengthMeter } = await import('/@/components/StrengthMeter');

    expect(StrengthMeter).toHaveProperty('__name');
  });
});
