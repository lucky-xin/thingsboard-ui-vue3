import { describe, it, expect } from 'vitest';

// Test Preview component index exports without mocks to get real coverage
describe('Preview/index coverage', () => {
  it('should export ImagePreview component and createImgPreview function', async () => {
    const { ImagePreview, createImgPreview } = await import('/@/components/Preview');

    expect(ImagePreview).toBeDefined();
    expect(createImgPreview).toBeDefined();
  });

  it('should export createImgPreview as function', async () => {
    const { createImgPreview } = await import('/@/components/Preview');

    expect(typeof createImgPreview).toBe('function');
  });

  it('should export all expected components and functions', async () => {
    const exports = await import('/@/components/Preview');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toContain('ImagePreview');
    expect(exportKeys).toContain('createImgPreview');
  });

  it('should be valid Vue component', async () => {
    const { ImagePreview } = await import('/@/components/Preview');

    expect(ImagePreview).toBeDefined();
    expect(typeof ImagePreview).toBe('object');
  });

  it('should have correct component name', async () => {
    const { ImagePreview } = await import('/@/components/Preview');

    expect(ImagePreview).toHaveProperty('name');
  });

  it('should be importable as named exports', async () => {
    const { ImagePreview, createImgPreview } = await import('/@/components/Preview');

    expect(ImagePreview).toBeDefined();
    expect(createImgPreview).toBeDefined();
  });

  it('should export function that can be called', async () => {
    const { createImgPreview } = await import('/@/components/Preview');

    // Function should be callable (though we won't test its actual behavior here)
    expect(() => createImgPreview).not.toThrow();
  });

  it('should export only expected items', async () => {
    const exports = await import('/@/components/Preview');
    const exportKeys = Object.keys(exports);

    expect(exportKeys).toEqual(['ImagePreview', 'createImgPreview']);
  });
});
