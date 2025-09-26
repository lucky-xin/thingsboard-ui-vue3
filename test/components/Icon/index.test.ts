import { describe, it, expect } from 'vitest';

// Test Icon component index exports
describe('Icon/index', () => {
  it('should export Icon and IconPicker components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');
    
    expect(Icon).toBeDefined();
    expect(IconPicker).toBeDefined();
    expect(typeof Icon).toBe('object');
    expect(typeof IconPicker).toBe('object');
  });

  it('should export Icon as default export', async () => {
    const { default: DefaultIcon } = await import('/@/components/Icon');
    
    expect(DefaultIcon).toBeDefined();
    expect(typeof DefaultIcon).toBe('object');
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Icon');
    const exportKeys = Object.keys(exports);
    
    // Should export: Icon, IconPicker, and default
    expect(exportKeys).toEqual(expect.arrayContaining(['Icon', 'IconPicker', 'default']));
    expect(exportKeys.length).toBe(3);
  });

  it('should have valid Vue components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');
    
    expect(Icon).toHaveProperty('__name');
    expect(IconPicker).toHaveProperty('__name');
  });

  it('should have Icon and default export be the same', async () => {
    const { Icon, default: DefaultIcon } = await import('/@/components/Icon');
    
    expect(Icon).toBe(DefaultIcon);
  });

  it('should be valid Vue components', async () => {
    const { Icon, IconPicker } = await import('/@/components/Icon');
    
    expect(typeof Icon).toBe('object');
    expect(typeof IconPicker).toBe('object');
  });
});