import { describe, it, expect } from 'vitest';
import { rgbToHex, hexToRGB, colorIsDark } from '/@/utils/color';

describe('color comprehensive tests', () => {
  it('should convert hex to rgb', () => {
    expect(hexToRGB('#ffffff')).toBe('RGB(255,255,255)');
    expect(hexToRGB('#000000')).toBe('RGB(0,0,0)');
    expect(hexToRGB('#ff0000')).toBe('RGB(255,0,0)');
  });

  it('should convert rgb to hex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
  });

  it('should detect dark colors', () => {
    expect(colorIsDark('#000000')).toBe(true);
    expect(colorIsDark('#ffffff')).toBe(false);
    expect(colorIsDark('#ff0000')).toBe(true); // Red is considered dark based on luminance formula
  });

  it('should handle invalid hex input', () => {
    expect(hexToRGB('invalid')).toBe('invalid');
    expect(hexToRGB('#gggggg')).toBe('#gggggg');
    expect(hexToRGB('')).toBe('');
  });
});
