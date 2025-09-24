import { describe, it, expect } from 'vitest';
import { isHexColor, rgbToHex, hexToRGB, colorIsDark, darken, lighten, calculateBestTextColor } from '/@/utils/color';

describe('utils/color', () => {
  describe('isHexColor', () => {
    it('should validate hex colors correctly', () => {
      expect(isHexColor('#fff')).toBe(true);
      expect(isHexColor('#ffffff')).toBe(true);
      expect(isHexColor('#000000')).toBe(true);
      expect(isHexColor('#123abc')).toBe(true);
      expect(isHexColor('#xyz')).toBe(false);
      expect(isHexColor('ffffff')).toBe(false);
      expect(isHexColor('#')).toBe(false);
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to hex correctly', () => {
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
    });
  });

  describe('hexToRGB', () => {
    it('should convert hex to RGB correctly', () => {
      expect(hexToRGB('#ffffff')).toBe('RGB(255,255,255)');
      expect(hexToRGB('#000000')).toBe('RGB(0,0,0)');
      expect(hexToRGB('#ff0000')).toBe('RGB(255,0,0)');
      expect(hexToRGB('#00ff00')).toBe('RGB(0,255,0)');
      expect(hexToRGB('#0000ff')).toBe('RGB(0,0,255)');
      expect(hexToRGB('#fff')).toBe('RGB(255,255,255)');
      expect(hexToRGB('#000')).toBe('RGB(0,0,0)');
    });

    it('should return original string for invalid hex colors', () => {
      expect(hexToRGB('invalid')).toBe('invalid');
    });
  });

  describe('colorIsDark', () => {
    it('should determine if color is dark correctly', () => {
      expect(colorIsDark('#000000')).toBe(true); // Black
      expect(colorIsDark('#ffffff')).toBe(false); // White
      expect(colorIsDark('#ff0000')).toBe(true); // Red
      expect(colorIsDark('#00ff00')).toBe(false); // Green
    });

    it('should return undefined for invalid hex colors', () => {
      expect(colorIsDark('invalid')).toBeUndefined();
    });
  });

  describe('darken', () => {
    it('should darken colors correctly', () => {
      expect(darken('#ffffff', 10)).toBe('#e6e6e6');
      expect(darken('#000000', 10)).toBe('#000000');
    });
  });

  describe('lighten', () => {
    it('should lighten colors correctly', () => {
      expect(lighten('#000000', 10)).toBe('#191919');
      expect(lighten('#ffffff', 10)).toBe('#ffffff');
    });
  });

  describe('calculateBestTextColor', () => {
    it('should calculate best text color correctly', () => {
      expect(calculateBestTextColor('#000000')).toBe('#FFFFFF'); // Black background -> White text
      expect(calculateBestTextColor('#ffffff')).toBe('#000000'); // White background -> Black text
    });
  });
});
