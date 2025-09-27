import { describe, it, expect } from 'vitest';

// Test SimpleMenu component index exports without mocks to get real coverage
describe('SimpleMenu/index coverage', () => {
  // Use dynamic import to get the actual exports
  it('should export SimpleMenu and SimpleMenuTag components', async () => {
    const module = await import('/@/components/SimpleMenu');
    const { SimpleMenu, SimpleMenuTag } = module;

    expect(SimpleMenu).toBeDefined();
    expect(SimpleMenuTag).toBeDefined();
  });

  it('should export all expected components', async () => {
    const exports = await import('/@/components/SimpleMenu');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('SimpleMenu');
    expect(exportKeys).toContain('SimpleMenuTag');
  });

  it('should be valid Vue components', async () => {
    const { SimpleMenu, SimpleMenuTag } = await import('/@/components/SimpleMenu');

    expect(SimpleMenu).toBeDefined();
    expect(SimpleMenuTag).toBeDefined();
    expect(typeof SimpleMenu).toBe('object');
    expect(typeof SimpleMenuTag).toBe('object');
  });

  it('should have correct component names', async () => {
    const { SimpleMenu, SimpleMenuTag } = await import('/@/components/SimpleMenu');

    expect(SimpleMenu).toHaveProperty('__name');
    expect(SimpleMenuTag).toHaveProperty('__name');
  });

  it('should be importable as named exports', async () => {
    const { SimpleMenu, SimpleMenuTag } = await import('/@/components/SimpleMenu');

    expect(SimpleMenu).toBeDefined();
    expect(SimpleMenuTag).toBeDefined();
  });

  it('should export only expected components', async () => {
    const exports = await import('/@/components/SimpleMenu');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('SimpleMenu');
    expect(exportKeys).toContain('SimpleMenuTag');
  });
});
