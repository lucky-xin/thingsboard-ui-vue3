import { describe, it, expect, vi } from 'vitest';

// Mock ColorPicker.vue component
vi.mock('/@/components/ColorPicker/src/ColorPicker.vue', () => ({
  default: {
    name: 'ColorPicker',
    template: '<div class="mock-color-picker"><slot /></div>',
  },
}));

describe('components/ColorPicker/index', () => {
  it('should export ColorPicker component', async () => {
    const { ColorPicker } = await import('/@/components/ColorPicker/index');
    
    expect(ColorPicker).toBeDefined();
    expect(ColorPicker.name).toBe('ColorPicker');
  });

  it('should have correct component structure', async () => {
    const { ColorPicker } = await import('/@/components/ColorPicker/index');
    
    expect(ColorPicker).toHaveProperty('name');
    expect(ColorPicker).toHaveProperty('template');
  });

  it('should export ColorPicker as named export', async () => {
    const colorPickerModule = await import('/@/components/ColorPicker/index');
    
    expect(colorPickerModule.ColorPicker).toBeDefined();
    expect(colorPickerModule.ColorPicker.name).toBe('ColorPicker');
  });
});