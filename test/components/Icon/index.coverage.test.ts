import { describe, it, expect } from 'vitest';

// Test Icon component index exports without mocks to get real coverage
describe('Icon/index coverage', () => {
  it('should export Icon and IconPicker components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
  });

  it('should export Icon as default export', async () => {
    const module = await import('/@/components/Icon');

    expect(module.default).toBeDefined();
    expect(module.default).toBe(module.Icon);
  });

  it('should export all expected components', async () => {
    const exports = await import('/@/components/Icon');
    // Add timeout to prevent hanging
    await new Promise(resolve => setTimeout(resolve, 100));
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('Icon');
    expect(exportKeys).toContain('IconPicker');
    expect(exportKeys).toContain('default');
  });

  it('should be valid Vue components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
    expect(typeof Icon).toBe('object');
    expect(typeof IconPicker).toBe('object');
  });

  it('should have correct component names', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    expect(Icon).toHaveProperty('__name');
    expect(IconPicker).toHaveProperty('__name');
  });

  it('should export Icon as both named and default export', async () => {
    const { Icon } = await import('/@/components/Icon');
    const module = await import('/@/components/Icon');

    expect(Icon).toBe(module.default);
  });

  it('should be importable as default export', async () => {
    const Icon = await import('/@/components/Icon');

    expect(Icon.default).toBeDefined();
    expect(typeof Icon.default).toBe('object');
  });

  it('should be importable as named exports', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
  });
});
