import { describe, it, expect } from 'vitest';

// Test Authority component index exports without mocks to get real coverage
describe('Authority/index coverage', () => {
  it('should export Authority component', async () => {
    const module = await import('/@/components/Authority');

    expect(module.Authority).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { Authority } = await import('/@/components/Authority');

    // Check that component is wrapped with withInstall
    expect(Authority).toHaveProperty('install');
  });

  it('should be valid Vue component', async () => {
    const { Authority } = await import('/@/components/Authority');

    expect(typeof Authority).toBe('object');
  });

  it('should be importable as named export', async () => {
    const { Authority } = await import('/@/components/Authority');

    expect(Authority).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Authority');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('Authority');
    expect(exportKeys).toHaveLength(1);
  });
});
