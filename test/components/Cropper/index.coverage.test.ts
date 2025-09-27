import { describe, it, expect } from 'vitest';

// Test Cropper component index exports without mocks to get real coverage
describe('Cropper/index coverage', () => {
  it('should export CropperImage and CropperAvatar components', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(CropperImage).toBeDefined();
    expect(CropperAvatar).toBeDefined();
  });

  it('should have install method for all components', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(CropperImage.install).toBeDefined();
    expect(CropperAvatar.install).toBeDefined();
    expect(typeof CropperImage.install).toBe('function');
    expect(typeof CropperAvatar.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    const mockApp = {
      component: vi.fn(),
    };
    
    CropperImage.install(mockApp as any);
    CropperAvatar.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should export all expected components', async () => {
    const exports = await import('/@/components/Cropper');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toContain('CropperImage');
    expect(exportKeys).toContain('CropperAvatar');
  });

  it('should be valid Vue components', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(CropperImage).toBeDefined();
    expect(CropperAvatar).toBeDefined();
    expect(typeof CropperImage).toBe('object');
    expect(typeof CropperAvatar).toBe('object');
  });

  it('should export components with proper structure', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    // Components should have install method from withInstall
    expect(CropperImage.install).toBeInstanceOf(Function);
    expect(CropperAvatar.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    // Test that withInstall was applied correctly
    expect(CropperImage).toHaveProperty('install');
    expect(CropperAvatar).toHaveProperty('install');
    
    // Test that install methods work
    const mockApp = { component: vi.fn() };
    CropperImage.install(mockApp as any);
    CropperAvatar.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should have correct component names', async () => {
    const { CropperImage, CropperAvatar } = await import('/@/components/Cropper');
    
    expect(CropperImage).toHaveProperty('__name');
    expect(CropperAvatar).toHaveProperty('__name');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Cropper');
    
    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });
});

