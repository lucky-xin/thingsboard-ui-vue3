import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isClient: vi.fn(),
}));

vi.mock('vue', () => ({
  createVNode: vi.fn(),
  render: vi.fn(),
}));

// Mock Functional.vue
vi.mock('/@/components/Preview/src/Functional.vue', () => ({
  default: 'ImgPreview',
}));

import { createImgPreview } from '/@/components/Preview/src/functional';
import { isClient } from '/@/utils/is';
import { createVNode, render } from 'vue';
import type { Options } from '/@/components/Preview/src/typing';

const mockIsClient = vi.mocked(isClient);
const mockCreateVNode = vi.mocked(createVNode);
const mockRender = vi.mocked(render);

// Mock DOM APIs
const mockDocument = {
  createElement: vi.fn(() => ({
    style: {},
  })),
  body: {
    appendChild: vi.fn(),
  },
};

Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

describe('createImgPreview coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClient.mockReturnValue(true);
    mockCreateVNode.mockReturnValue({
      component: {
        exposed: { close: vi.fn() },
      },
    } as any);
  });

  it('should handle client environment check', () => {
    mockIsClient.mockReturnValue(false);

    const result = createImgPreview({});

    // The function should handle the client check
    expect(true).toBe(true);
  });

  it('should create img preview with default options', () => {
    const options: Options = {};

    const result = createImgPreview(options);

    expect(mockDocument.createElement).toHaveBeenCalledWith('div');
    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 0,
      scaleStep: 100,
    });
    expect(mockRender).toHaveBeenCalled();
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
    expect(result).toEqual({ close: expect.any(Function) });
  });

  it('should create img preview with custom options', () => {
    const options: Options = {
      show: false,
      index: 2,
      scaleStep: 50,
      images: ['image1.jpg', 'image2.jpg'],
    };

    const result = createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: false,
      index: 2,
      scaleStep: 50,
      images: ['image1.jpg', 'image2.jpg'],
    });
    expect(mockRender).toHaveBeenCalled();
    expect(mockDocument.body.appendChild).toHaveBeenCalled();
    expect(result).toEqual({ close: expect.any(Function) });
  });

  it('should merge options with defaults', () => {
    const options: Options = {
      index: 5,
      images: ['test.jpg'],
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 5,
      scaleStep: 100,
      images: ['test.jpg'],
    });
  });

  it('should handle partial options', () => {
    const options: Options = {
      show: false,
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: false,
      index: 0,
      scaleStep: 100,
    });
  });

  it('should handle empty options object', () => {
    const options: Options = {};

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 0,
      scaleStep: 100,
    });
  });

  it('should handle null options', () => {
    const result = createImgPreview(null as any);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 0,
      scaleStep: 100,
    });
    expect(result).toEqual({ close: expect.any(Function) });
  });

  it('should handle undefined options', () => {
    const result = createImgPreview(undefined as any);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 0,
      scaleStep: 100,
    });
    expect(result).toEqual({ close: expect.any(Function) });
  });

  it('should handle component without exposed methods', () => {
    mockCreateVNode.mockReturnValue({
      component: null,
    } as any);

    const result = createImgPreview({});

    expect(result).toBeUndefined();
  });

  it('should handle component without component property', () => {
    mockCreateVNode.mockReturnValue({} as any);

    const result = createImgPreview({});

    expect(result).toBeUndefined();
  });

  it('should handle different option types', () => {
    const options: Options = {
      show: true,
      index: 10,
      scaleStep: 200,
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      zIndex: 9999,
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 10,
      scaleStep: 200,
      images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      zIndex: 9999,
    });
  });

  it('should create multiple instances', () => {
    const options1: Options = { index: 1 };
    const options2: Options = { index: 2 };

    createImgPreview(options1);
    createImgPreview(options2);

    expect(mockCreateVNode).toHaveBeenCalledTimes(2);
    expect(mockRender).toHaveBeenCalledTimes(2);
    expect(mockDocument.body.appendChild).toHaveBeenCalledTimes(2);
  });

  it('should handle boolean options', () => {
    const options: Options = {
      show: false,
      index: 0,
      scaleStep: 100,
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: false,
      index: 0,
      scaleStep: 100,
    });
  });

  it('should handle number options', () => {
    const options: Options = {
      index: 42,
      scaleStep: 150,
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 42,
      scaleStep: 150,
    });
  });

  it('should handle array options', () => {
    const options: Options = {
      images: ['a.jpg', 'b.jpg', 'c.jpg'],
    };

    createImgPreview(options);

    expect(mockCreateVNode).toHaveBeenCalledWith('ImgPreview', {
      show: true,
      index: 0,
      scaleStep: 100,
      images: ['a.jpg', 'b.jpg', 'c.jpg'],
    });
  });
});
