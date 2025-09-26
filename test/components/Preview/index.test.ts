import { describe, it, expect, vi } from 'vitest';

// Mock the Preview component
vi.mock('./src/Preview.vue', () => ({
  default: {
    __name: 'Preview',
    setup() {
      return {};
    },
  },
}));

describe('Preview/index', () => {
  it('should export ImagePreview component', async () => {
    const module = await import('/@/components/Preview/index');
    
    expect(module).toBeDefined();
    expect(module.ImagePreview).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Preview/index');
    const { ImagePreview } = module;
    
    expect(ImagePreview).toBeDefined();
    expect(typeof ImagePreview).toBe('object');
  });
});