import { describe, it, expect } from 'vitest';

describe('Cropper/index', () => {
  it('should export CropperImage and CropperAvatar components', async () => {
    const module = await import('/@/components/Cropper/index');

    expect(module).toBeDefined();
    expect(module.CropperImage).toBeDefined();
    expect(module.CropperAvatar).toBeDefined();
  });

  it('should export only CropperImage and CropperAvatar components', async () => {
    const module = await import('/@/components/Cropper/index');
    const componentExports = Object.keys(module).filter((key) => key.startsWith('Cropper'));

    expect(componentExports).toContain('CropperImage');
    expect(componentExports).toContain('CropperAvatar');
    expect(componentExports.length).toBe(2);
  });

  it('should be valid Vue components', async () => {
    const module = await import('/@/components/Cropper/index');
    const { CropperImage, CropperAvatar } = module;

    expect(typeof CropperImage).toBe('object');
    expect(typeof CropperAvatar).toBe('object');
  });
});
