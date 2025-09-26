import { describe, it, expect } from 'vitest';
import { hexToRgb, rgbToHex, getRandomColor, colorIsLight } from '/@/utils/color';

describe.skip('color comprehensive tests', () => {
  it('should convert hex to rgb', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should convert rgb to hex', () => {
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
  });

  it('should generate random color', () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    expect(color1).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(color2).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(color1).not.toBe(color2);
  });

  it('should detect light colors', () => {
    expect(colorIsLight('#ffffff')).toBe(true);
    expect(colorIsLight('#000000')).toBe(false);
    expect(colorIsLight('#ff0000')).toBe(false);
    expect(colorIsLight('#ffff00')).toBe(true);
  });

  it('should handle invalid hex input', () => {
    expect(hexToRgb('invalid')).toBeNull();
    expect(hexToRgb('#gggggg')).toBeNull();
    expect(hexToRgb('')).toBeNull();
  });

  it('should handle invalid rgb input', () => {
    expect(rgbToHex(-1, 0, 0)).toBe('#000000');
    expect(rgbToHex(256, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, -1, 0)).toBe('#000000');
    expect(rgbToHex(0, 256, 0)).toBe('#00ff00');
  });
});
