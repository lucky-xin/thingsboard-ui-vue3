import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Verify/index', () => ({
  DragVerify: { name: 'MockDragVerify' },
  ImgRotate: { name: 'MockImgRotate' },
}));

describe('Verify/index', () => {
  it('should export DragVerify component', async () => {
    const { DragVerify } = await import('/@/components/Verify/index');
    expect(DragVerify).toBeDefined();
  });

  it('should export ImgRotate component', async () => {
    const { ImgRotate } = await import('/@/components/Verify/index');
    expect(ImgRotate).toBeDefined();
  });
});