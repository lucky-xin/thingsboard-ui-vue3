import { describe, it, expect } from 'vitest';

// Test CollapseForm component index exports without mocks to get real coverage
describe('CollapseForm/index coverage', () => {
  it('should export CollapseForm component', async () => {
    const module = await import('/@/components/CollapseForm');

    expect(module.CollapseForm).toBeDefined();
  });

  it('should be valid Vue component', async () => {
    const { CollapseForm } = await import('/@/components/CollapseForm');

    expect(typeof CollapseForm).toBe('object');
  });

  it('should be importable as named export', async () => {
    const { CollapseForm } = await import('/@/components/CollapseForm');

    expect(CollapseForm).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/CollapseForm');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('CollapseForm');
    expect(exportKeys).toHaveLength(1);
  });
});
