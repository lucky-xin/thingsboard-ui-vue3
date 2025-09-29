import { describe, it, expect } from 'vitest';

// Test Menu component index exports without mocks to get real coverage
describe('Menu/index coverage', () => {
  it('should export BasicMenu component', async () => {
    const { BasicMenu } = await import('/@/components/Menu');

    expect(BasicMenu).toBeDefined();
  });

  it('should export only BasicMenu component', async () => {
    const exports = await import('/@/components/Menu');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['BasicMenu']);
  });

  it('should be valid Vue component', async () => {
    const { BasicMenu } = await import('/@/components/Menu');

    expect(BasicMenu).toBeDefined();
    expect(typeof BasicMenu).toBe('object');
  });

  it('should have correct component name', async () => {
    const { BasicMenu } = await import('/@/components/Menu');

    expect(BasicMenu).toHaveProperty('__name');
  });

  it('should be importable as named export', async () => {
    const module = await import('/@/components/Menu');

    expect(module.BasicMenu).toBeDefined();
  });

  it('should export the component directly', async () => {
    const { BasicMenu } = await import('/@/components/Menu');

    // Should be a Vue component
    expect(BasicMenu).toBeDefined();
    expect(typeof BasicMenu).toBe('object');
  });
});
