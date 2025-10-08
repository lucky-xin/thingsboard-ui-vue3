import { describe, it, expect } from 'vitest';

// Test Icon component index exports
describe('Icon/index', () => {
  it('should export Icon and IconPicker components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');
    // Add timeout to prevent hanging
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
    expect(typeof Icon).toBe('object');
    expect(typeof IconPicker).toBe('object');
  }, 15000);

  it('should export Icon as default export', async () => {
    const { default: DefaultIcon } = await import('/@/components/Icon');

    expect(DefaultIcon).toBeDefined();
    expect(typeof DefaultIcon).toBe('object');
  }, 15000);

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Icon');
    const exportKeys = Object.keys(exports);

    // Should export: Icon, IconPicker, and default
    expect(exportKeys).toEqual(expect.arrayContaining(['Icon', 'IconPicker', 'default']));
    expect(exportKeys.length).toBe(3);
  }, 15000);

  it('should have valid Vue components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    // Components should be defined
    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
  }, 15000);

  it('should have Icon and default export be the same', async () => {
    const { Icon, default: DefaultIcon } = await import('/@/components/Icon');

    expect(Icon).toBe(DefaultIcon);
  }, 15000);

  it('should be valid Vue components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');

    expect(typeof Icon).toBe('object');
    expect(typeof IconPicker).toBe('object');
  }, 15000);
});
