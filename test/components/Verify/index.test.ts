import { describe, it, expect, vi } from 'vitest';

// Mock the Verify components  
vi.mock('./src/DragVerify.vue', () => ({
  default: {
    __name: 'DragVerify',
    setup() {
      return {};
    },
  },
}));

vi.mock('./src/ImgRotate.vue', () => ({
  default: {
    __name: 'ImgRotate',
    setup() {
      return {};
    },
  },
}));

describe('Verify/index', () => {
  it('should export verification components', async () => {
    const module = await import('/@/components/Verify/index');
    
    expect(module).toBeDefined();
    expect(module.BasicDragVerify).toBeDefined();
    expect(module.RotateDragVerify).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Verify/index');
    const { BasicDragVerify, RotateDragVerify } = module;
    
    expect(BasicDragVerify).toBeDefined();
    expect(RotateDragVerify).toBeDefined();
    expect(typeof BasicDragVerify).toBe('object');
    expect(typeof RotateDragVerify).toBe('object');
  });

  it('should export typing definitions', async () => {
    const module = await import('/@/components/Verify/index');
    
    // Just check that the module imports without error
    expect(module).toBeDefined();
  });
});
