import { describe, it, expect } from 'vitest';
import type { Options, ComponentSize } from '/@/components/ColorPicker/src/types';

describe('components/ColorPicker/src/types', () => {
  describe('Options interface', () => {
    it('should define all properties correctly', () => {
      const options: Options = {
        enableAlpha: true,
        format: 'hex',
        value: '#ff0000',
      };

      expect(options.enableAlpha).toBe(true);
      expect(options.format).toBe('hex');
      expect(options.value).toBe('#ff0000');
    });

    it('should allow optional value property', () => {
      const options: Options = {
        enableAlpha: false,
        format: 'rgb',
      };

      expect(options.enableAlpha).toBe(false);
      expect(options.format).toBe('rgb');
      expect(options.value).toBeUndefined();
    });

    it('should handle different format values', () => {
      const formats = ['hex', 'rgb', 'hsl', 'hsv'];
      
      formats.forEach(format => {
        const options: Options = {
          enableAlpha: true,
          format,
        };
        expect(options.format).toBe(format);
      });
    });

    it('should handle boolean enableAlpha values', () => {
      const trueOptions: Options = {
        enableAlpha: true,
        format: 'hex',
      };
      expect(trueOptions.enableAlpha).toBe(true);

      const falseOptions: Options = {
        enableAlpha: false,
        format: 'hex',
      };
      expect(falseOptions.enableAlpha).toBe(false);
    });
  });

  describe('ComponentSize type', () => {
    it('should accept valid size values', () => {
      const sizes: ComponentSize[] = ['large', 'default', 'small'];
      
      sizes.forEach(size => {
        const componentSize: ComponentSize = size;
        expect(componentSize).toBe(size);
      });
    });

    it('should handle large size', () => {
      const size: ComponentSize = 'large';
      expect(size).toBe('large');
    });

    it('should handle default size', () => {
      const size: ComponentSize = 'default';
      expect(size).toBe('default');
    });

    it('should handle small size', () => {
      const size: ComponentSize = 'small';
      expect(size).toBe('small');
    });
  });
});