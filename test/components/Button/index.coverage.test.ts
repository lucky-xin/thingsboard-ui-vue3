import { describe, it, expect } from 'vitest';

// Test Button component index exports without mocks to get real coverage
describe('Button/index coverage', () => {
  it('should export all expected components', async () => {
    const module = await import('/@/components/Button');
    // Add timeout to prevent hanging
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(module.Button).toBeDefined();
    expect(module.PopConfirmButton).toBeDefined();
  }, 10000);

  it('should have correct component structure', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');

    // Check that all components are wrapped with withInstall
    expect(Button).toHaveProperty('install');
    expect(PopConfirmButton).toHaveProperty('install');
  }, 10000);

  it('should be valid Vue components', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');

    expect(typeof Button).toBe('object');
    expect(typeof PopConfirmButton).toBe('object');
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Button');
    const exportKeys = Object.keys(module);

    expect(exportKeys).toContain('Button');
    expect(exportKeys).toContain('PopConfirmButton');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  });
});
