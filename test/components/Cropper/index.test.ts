import { describe, it, expect } from 'vitest';

describe('Cropper/index', () => {
  it('should export CropperImage component', async () => {
    const { CropperImage } = await import('/@/components/Cropper/index');
    expect(CropperImage).toBeDefined();
  });

  it('should export CropperAvatar component', async () => {
    const { CropperAvatar } = await import('/@/components/Cropper/index');
    expect(CropperAvatar).toBeDefined();
  });
});