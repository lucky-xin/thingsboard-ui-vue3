import { describe, it, expect, vi, beforeEach } from 'vitest';
import Color from '/@/components/ColorPicker/src/lib/color';

describe('Color', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create Color instance with default values', () => {
      const color = new Color();
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
      expect(color.get('alpha')).toBe(100);
      expect(color.enableAlpha).toBe(false);
      expect(color.format).toBe('hex');
    });

    it('should create Color instance with custom options', () => {
      const options = {
        enableAlpha: true,
        format: 'rgb',
        value: '#ff0000',
      };
      const color = new Color(options);
      expect(color.enableAlpha).toBe(true);
      expect(color.format).toBe('rgb');
      // The value will be processed by fromString and doOnChange
      expect(color.value).toMatch(/^rgba\(/);
    });

    it('should handle empty options object', () => {
      const color = new Color({});
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
      expect(color.get('alpha')).toBe(100);
    });
  });

  describe('set method', () => {
    it('should set single property', () => {
      const color = new Color();
      color.set('hue', 180);
      expect(color.get('hue')).toBe(180);
    });

    it('should set multiple properties with object', () => {
      const color = new Color();
      color.set({
        hue: 180,
        saturation: 50,
        value: 75,
      });
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
    });

    it('should handle alpha property', () => {
      const color = new Color();
      color.set('alpha', 80);
      expect(color.get('alpha')).toBe(80);
    });
  });

  describe('get method', () => {
    it('should get hue property', () => {
      const color = new Color();
      color.set('hue', 180);
      expect(color.get('hue')).toBe(180);
    });

    it('should get saturation property', () => {
      const color = new Color();
      color.set('saturation', 50);
      expect(color.get('saturation')).toBe(50);
    });

    it('should get value property', () => {
      const color = new Color();
      color.set('value', 75);
      expect(color.get('value')).toBe(75);
    });

    it('should get alpha property as integer', () => {
      const color = new Color();
      color.set('alpha', 80.7);
      expect(color.get('alpha')).toBe(80);
    });
  });

  describe('toRgb method', () => {
    it('should convert HSV to RGB', () => {
      const color = new Color();
      color.set({ hue: 0, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should convert HSV to RGB for green', () => {
      const color = new Color();
      color.set({ hue: 120, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should convert HSV to RGB for blue', () => {
      const color = new Color();
      color.set({ hue: 240, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('should convert HSV to RGB for white', () => {
      const color = new Color();
      color.set({ hue: 0, saturation: 0, value: 100 });
      const rgb = color.toRgb();
      expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should convert HSV to RGB for black', () => {
      const color = new Color();
      color.set({ hue: 0, saturation: 0, value: 0 });
      const rgb = color.toRgb();
      expect(rgb).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe('fromString method', () => {
    it('should handle empty string', () => {
      const color = new Color();
      color.fromString('');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should handle null value', () => {
      const color = new Color();
      color.fromString(null);
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should handle undefined value', () => {
      const color = new Color();
      color.fromString(undefined);
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should parse HSL string', () => {
      const color = new Color();
      color.fromString('hsl(180, 50%, 75%)');
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBeGreaterThan(0);
      expect(color.get('value')).toBeGreaterThan(0);
    });

    it('should parse HSLA string', () => {
      const color = new Color();
      color.fromString('hsla(180, 50%, 75%, 0.8)');
      expect(color.get('hue')).toBe(180);
      expect(color.get('alpha')).toBe(80);
    });

    it('should parse HSV string', () => {
      const color = new Color();
      color.fromString('hsv(180, 50%, 75%)');
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
    });

    it('should parse HSVA string', () => {
      const color = new Color();
      color.fromString('hsva(180, 50%, 75%, 0.8)');
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
      expect(color.get('alpha')).toBe(80);
    });

    it('should parse RGB string', () => {
      const color = new Color();
      color.fromString('rgb(255, 0, 0)');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should parse RGBA string', () => {
      const color = new Color();
      color.fromString('rgba(255, 0, 0, 0.8)');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
      expect(color.get('alpha')).toBe(80);
    });

    it('should parse hex string (3 digits)', () => {
      const color = new Color();
      color.fromString('#f00');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should parse hex string (6 digits)', () => {
      const color = new Color();
      color.fromString('#ff0000');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should parse hex string (8 digits)', () => {
      const color = new Color();
      color.fromString('#ff0000ff');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
      expect(color.get('alpha')).toBe(100);
    });

    it('should handle invalid hex string', () => {
      const color = new Color();
      color.set({ hue: 180, saturation: 50, value: 75 });
      color.fromString('#invalid');
      // Should not change values for invalid hex
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
    });

    it('should handle HSL with spaces', () => {
      const color = new Color();
      color.fromString('hsl( 180 , 50% , 75% )');
      expect(color.get('hue')).toBe(180);
    });

    it('should handle RGB with spaces', () => {
      const color = new Color();
      color.fromString('rgb( 255 , 0 , 0 )');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should handle HSL with commas', () => {
      const color = new Color();
      color.fromString('hsl(180,50%,75%)');
      expect(color.get('hue')).toBe(180);
    });

    it('should handle RGB with commas', () => {
      const color = new Color();
      color.fromString('rgb(255,0,0)');
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });
  });

  describe('compare method', () => {
    it('should return true for identical colors', () => {
      const color1 = new Color();
      color1.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      const color2 = new Color();
      color2.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      expect(color1.compare(color2)).toBe(true);
    });

    it('should return false for different colors', () => {
      const color1 = new Color();
      color1.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      const color2 = new Color();
      color2.set({ hue: 0, saturation: 100, value: 100, alpha: 100 });
      expect(color1.compare(color2)).toBe(false);
    });

    it('should return true for colors within tolerance', () => {
      const color1 = new Color();
      color1.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      const color2 = new Color();
      color2.set({ hue: 181, saturation: 50.5, value: 75.5, alpha: 80.5 });
      expect(color1.compare(color2)).toBe(true);
    });

    it('should return false for colors outside tolerance', () => {
      const color1 = new Color();
      color1.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      const color2 = new Color();
      color2.set({ hue: 185, saturation: 55, value: 80, alpha: 85 });
      expect(color1.compare(color2)).toBe(false);
    });
  });

  describe('doOnChange method', () => {
    it('should generate hex value by default', () => {
      const color = new Color();
      color.set({ hue: 0, saturation: 100, value: 100 });
      expect(color.value).toMatch(/^#[0-9a-fA-F]{6}$/);
    });

    it('should generate HSL value when format is hsl', () => {
      const color = new Color({ format: 'hsl' });
      color.set({ hue: 180, saturation: 50, value: 75 });
      expect(color.value).toMatch(/^hsl\(/);
    });

    it('should generate HSV value when format is hsv', () => {
      const color = new Color({ format: 'hsv' });
      color.set({ hue: 180, saturation: 50, value: 75 });
      expect(color.value).toMatch(/^hsv\(/);
    });

    it('should generate RGB value when format is rgb', () => {
      const color = new Color({ format: 'rgb' });
      color.set({ hue: 180, saturation: 50, value: 75 });
      expect(color.value).toMatch(/^rgb\(/);
    });

    it('should generate HSLA value when enableAlpha is true and format is hsl', () => {
      const color = new Color({ enableAlpha: true, format: 'hsl' });
      color.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      expect(color.value).toMatch(/^hsla\(/);
    });

    it('should generate HSVA value when enableAlpha is true and format is hsv', () => {
      const color = new Color({ enableAlpha: true, format: 'hsv' });
      color.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      expect(color.value).toMatch(/^hsva\(/);
    });

    it('should generate RGBA value when enableAlpha is true and format is rgb', () => {
      const color = new Color({ enableAlpha: true, format: 'rgb' });
      color.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      expect(color.value).toMatch(/^rgba\(/);
    });

    it('should generate hex with alpha when enableAlpha is true and format is hex', () => {
      const color = new Color({ enableAlpha: true, format: 'hex' });
      color.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      expect(color.value).toMatch(/^#[0-9a-fA-F]{8}$/);
    });

    it('should generate hex with alpha when enableAlpha is true and format is default', () => {
      const color = new Color({ enableAlpha: true });
      color.set({ hue: 180, saturation: 50, value: 75, alpha: 80 });
      // Default format is 'hex', so with enableAlpha it generates hex with alpha
      expect(color.value).toMatch(/^#[0-9a-fA-F]{8}$/);
    });
  });

  describe('edge cases', () => {
    it('should handle hue values outside 0-360 range', () => {
      const color = new Color();
      color.fromString('hsl(450, 50%, 75%)');
      expect(color.get('hue')).toBeGreaterThanOrEqual(0);
      expect(color.get('hue')).toBeLessThanOrEqual(360);
    });

    it('should handle saturation values outside 0-100 range', () => {
      const color = new Color();
      color.fromString('hsl(180, 150%, 75%)');
      expect(color.get('saturation')).toBeGreaterThanOrEqual(0);
      expect(color.get('saturation')).toBeLessThanOrEqual(100);
    });

    it('should handle value values outside 0-100 range', () => {
      const color = new Color();
      color.fromString('hsl(180, 50%, 150%)');
      expect(color.get('value')).toBeGreaterThanOrEqual(0);
      expect(color.get('value')).toBeLessThanOrEqual(100);
    });

    it('should handle alpha values outside 0-100 range', () => {
      const color = new Color();
      color.fromString('hsla(180, 50%, 75%, 1.5)');
      // Alpha values are not clamped in fromString, so 1.5 * 100 = 150
      expect(color.get('alpha')).toBe(150);
    });

    it('should handle malformed HSL string', () => {
      const color = new Color();
      color.set({ hue: 180, saturation: 50, value: 75 });
      color.fromString('hsl(invalid)');
      // Should not change values for malformed string
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
    });

    it('should handle malformed RGB string', () => {
      const color = new Color();
      color.set({ hue: 180, saturation: 50, value: 75 });
      color.fromString('rgb(invalid)');
      // Should not change values for malformed string
      expect(color.get('hue')).toBe(180);
      expect(color.get('saturation')).toBe(50);
      expect(color.get('value')).toBe(75);
    });

    it('should handle HSL with only hue', () => {
      const color = new Color();
      color.fromString('hsl(180)');
      // Should not change values for incomplete HSL
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });

    it('should handle RGB with only red', () => {
      const color = new Color();
      color.fromString('rgb(255)');
      // Should not change values for incomplete RGB
      expect(color.get('hue')).toBe(0);
      expect(color.get('saturation')).toBe(100);
      expect(color.get('value')).toBe(100);
    });
  });

  describe('color conversion accuracy', () => {
    it('should convert red correctly', () => {
      const color = new Color();
      color.set({ hue: 0, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(0);
    });

    it('should convert green correctly', () => {
      const color = new Color();
      color.set({ hue: 120, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(0);
    });

    it('should convert blue correctly', () => {
      const color = new Color();
      color.set({ hue: 240, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(255);
    });

    it('should convert yellow correctly', () => {
      const color = new Color();
      color.set({ hue: 60, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(0);
    });

    it('should convert cyan correctly', () => {
      const color = new Color();
      color.set({ hue: 180, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(0);
      expect(rgb.g).toBe(255);
      expect(rgb.b).toBe(255);
    });

    it('should convert magenta correctly', () => {
      const color = new Color();
      color.set({ hue: 300, saturation: 100, value: 100 });
      const rgb = color.toRgb();
      expect(rgb.r).toBe(255);
      expect(rgb.g).toBe(0);
      expect(rgb.b).toBe(255);
    });
  });
});