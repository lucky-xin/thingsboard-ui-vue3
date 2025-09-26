import { describe, it, expect, vi } from 'vitest';

// Mock the ColorPicker component
vi.mock('./src/ColorPicker.vue', () => ({
  default: {
    __name: 'ColorPicker',
    setup() {
      return {};
    },
  },
}));

describe('ColorPicker/index', () => {
  it('should export ColorPicker component', async () => {
    const module = await import('/@/components/ColorPicker/index');
    
    expect(module).toBeDefined();
    expect(module.ColorPicker).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/ColorPicker/index');
    const { ColorPicker } = module;
    
    expect(ColorPicker).toBeDefined();
    // Vue components can have either name or __name
    expect(ColorPicker.__name || ColorPicker.name).toBeTruthy();
  });

  it('should export only ColorPicker', async () => {
    const module = await import('/@/components/ColorPicker/index');
    const exports = Object.keys(module);
    
    expect(exports).toEqual(['ColorPicker']);
  });

  it('should be a valid component', async () => {
    const module = await import('/@/components/ColorPicker/index');
    const { ColorPicker } = module;
    
    expect(ColorPicker).toBeDefined();
    expect(typeof ColorPicker).toBe('object');
  });
});