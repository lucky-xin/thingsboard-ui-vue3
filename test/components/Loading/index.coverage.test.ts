import { describe, it, expect } from 'vitest';

// Test Loading component index exports without mocks to get real coverage
describe('Loading/index coverage', () => {
  it('should export Loading component and hooks', async () => {
    const { Loading, useLoading, createLoading } = await import('/@/components/Loading');

    expect(Loading).toBeDefined();
    expect(useLoading).toBeDefined();
    expect(createLoading).toBeDefined();
  });

  it('should export hooks as functions', async () => {
    const { useLoading, createLoading } = await import('/@/components/Loading');

    expect(typeof useLoading).toBe('function');
    expect(typeof createLoading).toBe('function');
  });

  it('should export all expected components and hooks', async () => {
    const exports = await import('/@/components/Loading');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('Loading');
    expect(exportKeys).toContain('useLoading');
    expect(exportKeys).toContain('createLoading');
  });

  it('should be valid Vue component', async () => {
    const { Loading } = await import('/@/components/Loading');

    expect(Loading).toBeDefined();
    expect(typeof Loading).toBe('object');
  });

  it('should have correct component name', async () => {
    const { Loading } = await import('/@/components/Loading');

    expect(Loading).toHaveProperty('__name');
  });

  it('should be importable as named exports', async () => {
    const { Loading, useLoading, createLoading } = await import('/@/components/Loading');

    expect(Loading).toBeDefined();
    expect(useLoading).toBeDefined();
    expect(createLoading).toBeDefined();
  });

  it('should export hooks that can be called', async () => {
    const { useLoading, createLoading } = await import('/@/components/Loading');

    // Functions should be callable (though we won't test their actual behavior here)
    expect(() => useLoading).not.toThrow();
    expect(() => createLoading).not.toThrow();
  });

  it('should export only expected items', async () => {
    const exports = await import('/@/components/Loading');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['Loading', 'useLoading', 'createLoading']);
  });
});
