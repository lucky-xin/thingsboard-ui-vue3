import { describe, it, expect } from 'vitest';

// Test Basic component index exports without mocks to get real coverage
describe('Basic/index coverage', () => {
  it('should export all expected components', { timeout: 30000 }, async () => {
    const module = await import('/@/components/Basic');
    // Add timeout to prevent hanging
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(module.BasicArrow).toBeDefined();
    expect(module.BasicTitle).toBeDefined();
    expect(module.BasicHelp).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');
    // Add timeout to prevent hanging
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check that all components are wrapped with withInstall
    expect(BasicArrow).toHaveProperty('install');
    expect(BasicTitle).toHaveProperty('install');
    expect(BasicHelp).toHaveProperty('install');
  });

  it('should be valid Vue components', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');

    expect(typeof BasicArrow).toBe('object');
    expect(typeof BasicTitle).toBe('object');
    expect(typeof BasicHelp).toBe('object');
  });

  it('should be importable as named exports', async () => {
    const { BasicArrow, BasicTitle, BasicHelp } = await import('/@/components/Basic');

    expect(BasicArrow).toBeDefined();
    expect(BasicTitle).toBeDefined();
    expect(BasicHelp).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Basic');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('BasicArrow');
    expect(exportKeys).toContain('BasicTitle');
    expect(exportKeys).toContain('BasicHelp');
    expect(exportKeys).toHaveLength(3);
  });
});
