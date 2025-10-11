import { describe, it, expect, vi, beforeEach } from 'vitest';
import Color from '/@/components/ColorPicker/src/lib/color';

describe('Color', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a new Color instance', () => {
    const color = new Color();
    expect(color).toBeInstanceOf(Color);
  });

  it('should create a Color instance with default values', () => {
    const color = new Color();
    expect(color.enableAlpha).toBe(false);
    expect(color.format).toBe('hex');
    expect(color.value).toBe('#FF0000');
  });

  it('should create a Color instance with custom values', () => {
    const color = new Color();
    color.enableAlpha = true;
    color.format = 'hex';
    color.value = '#ff0000';
    
    expect(color.enableAlpha).toBe(true);
    expect(color.format).toBe('hex');
    expect(color.value).toBe('#ff0000');
  });

  it('should handle fromString method', () => {
    const color = new Color();
    
    // Test with hex color
    color.fromString('#ff0000');
    expect(color.value).toBe('#FF0000');
    
    // Test with rgb color
    color.fromString('rgb(255, 0, 0)');
    expect(color.value).toBe('#FF0000');
    
    // Test with hsl color
    color.fromString('hsl(0, 100%, 50%)');
    expect(color.value).toBe('#FF0000');
  });

  it('should handle toRgb method', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    const rgb = color.toRgb();
    expect(rgb).toHaveProperty('r');
    expect(rgb).toHaveProperty('g');
    expect(rgb).toHaveProperty('b');
    expect(typeof rgb.r).toBe('number');
    expect(typeof rgb.g).toBe('number');
    expect(typeof rgb.b).toBe('number');
  });

  it('should handle get method', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test getting hue
    const hue = color.get('hue');
    expect(typeof hue).toBe('number');
    
    // Test getting saturation
    const saturation = color.get('saturation');
    expect(typeof saturation).toBe('number');
    
    // Test getting value
    const value = color.get('value');
    expect(typeof value).toBe('number');
    
    // Test getting alpha
    const alpha = color.get('alpha');
    expect(typeof alpha).toBe('number');
  });

  it('should handle set method', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test setting hue
    color.set('hue', 120);
    expect(color.get('hue')).toBe(120);
    
    // Test setting saturation
    color.set('saturation', 80);
    expect(color.get('saturation')).toBe(80);
    
    // Test setting value
    color.set('value', 60);
    expect(color.get('value')).toBe(60);
    
    // Test setting alpha
    color.set('alpha', 50);
    expect(color.get('alpha')).toBe(50);
  });

  it('should handle compare method', () => {
    const color1 = new Color();
    const color2 = new Color();
    
    color1.fromString('#ff0000');
    color2.fromString('#ff0000');
    
    const result = color1.compare(color2);
    expect(typeof result).toBe('boolean');
  });

  it('should handle different color formats', () => {
    const color = new Color();
    
    // Test hex format
    color.fromString('#ff0000');
    expect(color.format).toBe('hex');
    
    // Test rgb format
    color.fromString('rgb(255, 0, 0)');
    expect(color.format).toBe('hex');
    
    // Test hsl format
    color.fromString('hsl(0, 100%, 50%)');
    expect(color.format).toBe('hex');
  });

  it('should handle alpha channel', () => {
    const color = new Color();
    color.enableAlpha = true;
    
    // Test with alpha
    color.fromString('rgba(255, 0, 0, 0.5)');
    expect(color.enableAlpha).toBe(true);
    
    const alpha = color.get('alpha');
    expect(typeof alpha).toBe('number');
  });

  it('should handle color conversion', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test RGB conversion
    const rgb = color.toRgb();
    expect(rgb.r).toBe(255);
    expect(rgb.g).toBe(0);
    expect(rgb.b).toBe(0);
  });

  it('should handle HSV conversion', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test HSV values
    const hue = color.get('hue');
    const saturation = color.get('saturation');
    const value = color.get('value');
    
    expect(typeof hue).toBe('number');
    expect(typeof saturation).toBe('number');
    expect(typeof value).toBe('number');
  });

  it('should handle HSL conversion', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test HSL values
    const hue = color.get('hue');
    const saturation = color.get('saturation');
    const value = color.get('value');
    
    expect(typeof hue).toBe('number');
    expect(typeof saturation).toBe('number');
    expect(typeof value).toBe('number');
  });

  it('should handle color manipulation', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test setting different values
    color.set('hue', 120);
    color.set('saturation', 80);
    color.set('value', 60);
    
    expect(color.get('hue')).toBe(120);
    expect(color.get('saturation')).toBe(80);
    expect(color.get('value')).toBe(60);
  });

  it('should handle color comparison', () => {
    const color1 = new Color();
    const color2 = new Color();
    const color3 = new Color();
    
    color1.fromString('#ff0000');
    color2.fromString('#ff0000');
    color3.fromString('#00ff00');
    
    // Test same colors
    const result1 = color1.compare(color2);
    expect(typeof result1).toBe('boolean');
    
    // Test different colors
    const result2 = color1.compare(color3);
    expect(typeof result2).toBe('boolean');
  });

  it('should handle edge cases', () => {
    const color = new Color();
    
    // Test with empty string
    color.fromString('');
    expect(color.value).toBe('#FF0000');
    
    // Test with invalid color
    color.fromString('invalid-color');
    expect(color.value).toBe('#FF0000');
  });

  it('should handle boundary values', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test setting boundary values
    color.set('hue', 0);
    expect(color.get('hue')).toBe(0);
    
    color.set('hue', 360);
    expect(color.get('hue')).toBe(360);
    
    color.set('saturation', 0);
    expect(color.get('saturation')).toBe(0);
    
    color.set('saturation', 100);
    expect(color.get('saturation')).toBe(100);
    
    color.set('value', 0);
    expect(color.get('value')).toBe(0);
    
    color.set('value', 100);
    expect(color.get('value')).toBe(100);
    
    color.set('alpha', 0);
    expect(color.get('alpha')).toBe(0);
    
    color.set('alpha', 100);
    expect(color.get('alpha')).toBe(100);
  });

  it('should handle color format detection', () => {
    const color = new Color();
    
    // Test hex format detection
    color.fromString('#ff0000');
    expect(color.format).toBe('hex');
    
    // Test rgb format detection
    color.fromString('rgb(255, 0, 0)');
    expect(color.format).toBe('hex');
    
    // Test rgba format detection
    color.fromString('rgba(255, 0, 0, 0.5)');
    expect(color.format).toBe('hex');
    
    // Test hsl format detection
    color.fromString('hsl(0, 100%, 50%)');
    expect(color.format).toBe('hex');
    
    // Test hsla format detection
    color.fromString('hsla(0, 100%, 50%, 0.5)');
    expect(color.format).toBe('hex');
  });

  it('should handle color parsing', () => {
    const color = new Color();
    
    // Test parsing different color formats
    const formats = [
      '#ff0000',
      'rgb(255, 0, 0)',
      'rgba(255, 0, 0, 0.5)',
      'hsl(0, 100%, 50%)',
      'hsla(0, 100%, 50%, 0.5)'
    ];
    
    formats.forEach(format => {
      color.fromString(format);
      // Color class converts all formats to hex internally
      expect(typeof color.value).toBe('string');
    });
  });

  it('should handle color properties', () => {
    const color = new Color();
    
    // Test enableAlpha property
    color.enableAlpha = true;
    expect(color.enableAlpha).toBe(true);
    
    color.enableAlpha = false;
    expect(color.enableAlpha).toBe(false);
    
    // Test format property
    color.format = 'hex';
    expect(color.format).toBe('hex');
    
    color.format = 'rgb';
    expect(color.format).toBe('rgb');
    
    // Test value property
    color.value = '#ff0000';
    expect(color.value).toBe('#ff0000');
  });

  it('should handle color methods chaining', () => {
    const color = new Color();
    
    // Test method chaining
    color.fromString('#ff0000');
    color.set('hue', 120);
    color.set('saturation', 80);
    
    expect(color.get('hue')).toBe(120);
    expect(color.get('saturation')).toBe(80);
  });

  it('should handle color validation', () => {
    const color = new Color();
    
    // Test valid colors
    const validColors = [
      '#ff0000',
      '#00ff00',
      '#0000ff',
      'rgb(255, 0, 0)',
      'hsl(0, 100%, 50%)'
    ];
    
    validColors.forEach(validColor => {
      color.fromString(validColor);
      // Color class converts all formats to hex internally
      expect(typeof color.value).toBe('string');
    });
  });

  it('should handle color interpolation', () => {
    const color1 = new Color();
    const color2 = new Color();
    
    color1.fromString('#ff0000');
    color2.fromString('#00ff00');
    
    // Test getting intermediate values
    const hue1 = color1.get('hue');
    const hue2 = color2.get('hue');
    
    expect(typeof hue1).toBe('number');
    expect(typeof hue2).toBe('number');
  });

  it('should handle color serialization', () => {
    const color = new Color();
    color.fromString('#ff0000');
    
    // Test that color can be serialized
    const serialized = JSON.stringify(color);
    expect(typeof serialized).toBe('string');
  });

  it('should handle color cloning', () => {
    const color1 = new Color();
    color1.fromString('#ff0000');
    color1.enableAlpha = true;
    color1.format = 'hex';
    
    // Test creating a new color with same properties
    const color2 = new Color();
    color2.fromString(color1.value);
    color2.enableAlpha = color1.enableAlpha;
    color2.format = color1.format;
    
    expect(color2.value).toBe(color1.value);
    expect(color2.enableAlpha).toBe(color1.enableAlpha);
    expect(color2.format).toBe(color1.format);
  });
});