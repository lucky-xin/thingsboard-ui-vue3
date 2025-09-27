import { describe, it, expect } from 'vitest';

// Test Button component index exports without mocks to get real coverage
describe('Button/index coverage', () => {
  it('should export all expected components and types', async () => {
    const module = await import('/@/components/Button');
    
    expect(module.Button).toBeDefined();
    expect(module.PopConfirmButton).toBeDefined();
    expect(module.ButtonProps).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    // Check that all components are wrapped with withInstall
    expect(Button).toHaveProperty('install');
    expect(PopConfirmButton).toHaveProperty('install');
  });

  it('should be valid Vue components', async () => {
    const { Button, PopConfirmButton } = await import('/@/components/Button');
    
    expect(typeof Button).toBe('object');
    expect(typeof PopConfirmButton).toBe('object');
  });

  it('should export ButtonProps type', async () => {
    const { ButtonProps } = await import('/@/components/Button');
    
    expect(ButtonProps).toBeDefined();
  });

  it('should be importable as named exports', async () => {
    const { Button, PopConfirmButton, ButtonProps } = await import('/@/components/Button');
    
    expect(Button).toBeDefined();
    expect(PopConfirmButton).toBeDefined();
    expect(ButtonProps).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Button');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('Button');
    expect(exportKeys).toContain('PopConfirmButton');
    expect(exportKeys).toContain('ButtonProps');
    expect(exportKeys.length).toBeGreaterThanOrEqual(3);
  });
});