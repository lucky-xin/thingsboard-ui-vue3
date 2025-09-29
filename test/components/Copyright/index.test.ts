import { describe, it, expect } from 'vitest';

// Test Copyright component index exports
describe('Copyright/index', () => {
  it('should export Copyright component', async () => {
    const { Copyright } = await import('/@/components/Copyright');

    expect(Copyright).toBeDefined();
  });

  it('should be a valid Vue component', async () => {
    const { Copyright } = await import('/@/components/Copyright');

    expect(Copyright).toBeDefined();
    expect(typeof Copyright).toBe('object');
  });

  it('should export only Copyright', async () => {
    const exports = await import('/@/components/Copyright');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['Copyright']);
  });

  it('should have component structure', async () => {
    const { Copyright } = await import('/@/components/Copyright');

    expect(Copyright).toHaveProperty('__name');
  });
});
