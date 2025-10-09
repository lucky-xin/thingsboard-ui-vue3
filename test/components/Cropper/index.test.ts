import { describe, it, expect, vi } from 'vitest';

// Mock withInstall utility
const mockWithInstall = vi.fn((component) => ({
  ...component,
  install: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  withInstall: mockWithInstall,
}));

// Mock Vue components
vi.mock('/@/components/Cropper/src/Cropper.vue', () => ({
  default: {
    name: 'CropperImage',
    template: '<div class="mock-cropper-image"><slot /></div>',
  },
}));

vi.mock('/@/components/Cropper/src/CropperAvatar.vue', () => ({
  default: {
    name: 'CropperAvatar',
    template: '<div class="mock-cropper-avatar"><slot /></div>',
  },
}));

// Mock typing exports
vi.mock('/@/components/Cropper/src/typing', () => ({
  CropperProps: {},
  CropperAvatarProps: {},
}));

describe('components/Cropper/index', () => {
  it('should export CropperImage component with install method', async () => {
    const { CropperImage } = await import('/@/components/Cropper/index');
    
    expect(CropperImage).toBeDefined();
    expect(CropperImage.name).toBe('CropperImage');
    expect(CropperImage.install).toBeDefined();
    expect(typeof CropperImage.install).toBe('function');
  });

  it('should export CropperAvatar component with install method', async () => {
    const { CropperAvatar } = await import('/@/components/Cropper/index');
    
    expect(CropperAvatar).toBeDefined();
    expect(CropperAvatar.name).toBe('CropperAvatar');
    expect(CropperAvatar.install).toBeDefined();
    expect(typeof CropperAvatar.install).toBe('function');
  });

  it('should have all expected component exports', async () => {
    const cropperModule = await import('/@/components/Cropper/index');
    
    expect(cropperModule.CropperImage).toBeDefined();
    expect(cropperModule.CropperAvatar).toBeDefined();
  });
});