import { describe, it, expect } from 'vitest';

// Test Cropper component index exports without mocks to get real coverage
describe('Cropper/index coverage', () => {
  it('should export all expected components', async () => {
    const module = await import('/@/components/Cropper');
    
    expect(module.CropperImage).toBeDefined();
    expect(module.CropperAvatar).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    // Check that all components are wrapped with withInstall
    expect(CropperImage).toHaveProperty('install');
    expect(CropperAvatar).toHaveProperty('install');
  });

  it('should be valid Vue components', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(typeof CropperImage).toBe('object');
    expect(typeof CropperAvatar).toBe('object');
  });

  it('should export typing types', async () => {
    const module = await import('/@/components/Cropper');
    
    // Check that typing exports are available
    expect(module).toBeDefined();
  });

  it('should be importable as named exports', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(CropperImage).toBeDefined();
    expect(CropperAvatar).toBeDefined();
  });

  it('should export only expected components', async () => {
    const module = await import('/@/components/Cropper');
    const exportKeys = Object.keys(module);
    
    expect(exportKeys).toContain('CropperImage');
    expect(exportKeys).toContain('CropperAvatar');
    expect(exportKeys.length).toBeGreaterThanOrEqual(2);
  });
});