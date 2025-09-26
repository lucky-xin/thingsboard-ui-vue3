import { describe, it, expect } from 'vitest';

describe('Preview/index', () => {
  it('should export ImagePreview component', async () => {
    const module = await import('/@/components/Preview/index');
    
    expect(module).toBeDefined();
    expect(module.ImagePreview).toBeDefined();
  });

  it('should export createImgPreview function', async () => {
    const module = await import('/@/components/Preview/index');
    
    expect(module.createImgPreview).toBeDefined();
    expect(typeof module.createImgPreview).toBe('function');
  });

  it('should be valid Vue component', async () => {
    const module = await import('/@/components/Preview/index');
    const { ImagePreview } = module;
    
    expect(typeof ImagePreview).toBe('object');
  });

  it('should have correct exports', async () => {
    const module = await import('/@/components/Preview/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('ImagePreview');
    expect(exports).toContain('createImgPreview');
    expect(exports.length).toBe(2);
  });
});