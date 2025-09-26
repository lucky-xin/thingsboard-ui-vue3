import { describe, it, expect, vi } from 'vitest';

// Mock the WangEditor component
vi.mock('./src/WangEditor.vue', () => ({
  default: {
    __name: 'WangEditor',
    setup() {
      return {};
    },
  },
}));

describe('WangEditor/index', () => {
  it('should export WangEditor component', async () => {
    const module = await import('/@/components/WangEditor/index');
    
    expect(module).toBeDefined();
    expect(module.WangEditor).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/WangEditor/index');
    const { WangEditor } = module;
    
    expect(WangEditor).toBeDefined();
    expect(typeof WangEditor).toBe('object');
  });
});