import { describe, it, expect, vi } from 'vitest';

// 最小 mock 其内部复杂依赖，避免导入超时
vi.mock('/@/components/Preview/src/Preview.vue', () => ({
  default: { name: 'MockImagePreview', render() { return null; } },
}));
vi.mock('/@/components/Preview/src/functional', () => ({
  createImgPreview: vi.fn(() => ({ destroy: () => {} })),
}));

describe('Preview/index', () => {
  it('should export ImagePreview component', async () => {
    const { ImagePreview } = await import('/@/components/Preview/index');
    expect(ImagePreview).toBeDefined();
  });

  it('should export createImgPreview function', async () => {
    const { createImgPreview } = await import('/@/components/Preview/index');
    expect(createImgPreview).toBeDefined();
  });
});