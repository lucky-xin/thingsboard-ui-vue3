import { describe, it, expect, vi } from 'vitest';

// Mock the Scrollbar component
vi.mock('./src/Scrollbar.vue', () => ({
  default: {
    __name: 'Scrollbar',
    setup() {
      return {};
    },
  },
}));

describe('Scrollbar/index', () => {
  it('should export Scrollbar component', async () => {
    const module = await import('/@/components/Scrollbar/index');
    
    expect(module).toBeDefined();
    expect(module.Scrollbar).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/Scrollbar/index');
    const { Scrollbar } = module;
    
    expect(Scrollbar).toBeDefined();
    expect(typeof Scrollbar).toBe('object');
  });
});