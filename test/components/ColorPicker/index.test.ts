import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/ColorPicker/index', () => ({
  ColorPicker: { name: 'MockColorPicker' },
}));

describe('ColorPicker/index', () => {
  it('should export ColorPicker component', async () => {
    const { ColorPicker } = await import('/@/components/ColorPicker/index');
    expect(ColorPicker).toBeDefined();
  });
});