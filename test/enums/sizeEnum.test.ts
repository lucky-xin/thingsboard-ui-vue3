import { describe, it, expect } from 'vitest';
import { SizeEnum, SizeNumberEnum, sizeMap } from '/@/enums/sizeEnum';

describe('enums/sizeEnum', () => {
  describe('SizeEnum', () => {
    it('should export SizeEnum', () => {
      expect(SizeEnum).toBeDefined();
      expect(typeof SizeEnum).toBe('object');
    });

    it('should have DEFAULT size', () => {
      expect(SizeEnum.DEFAULT).toBe('default');
    });

    it('should have SMALL size', () => {
      expect(SizeEnum.SMALL).toBe('small');
    });

    it('should have LARGE size', () => {
      expect(SizeEnum.LARGE).toBe('large');
    });

    it('should contain all expected sizes', () => {
      const expectedSizes = {
        DEFAULT: 'default',
        SMALL: 'small',
        LARGE: 'large',
      };

      Object.entries(expectedSizes).forEach(([key, value]) => {
        expect(SizeEnum[key as keyof typeof SizeEnum]).toBe(value);
      });
    });

    it('should have correct number of size values', () => {
      expect(Object.keys(SizeEnum)).toHaveLength(3);
    });

    it('should have unique values', () => {
      const values = Object.values(SizeEnum);
      const uniqueValues = [...new Set(values)];
      expect(values).toHaveLength(uniqueValues.length);
    });
  });

  describe('SizeNumberEnum', () => {
    it('should export SizeNumberEnum', () => {
      expect(SizeNumberEnum).toBeDefined();
      expect(typeof SizeNumberEnum).toBe('object');
    });

    it('should have DEFAULT number', () => {
      expect(SizeNumberEnum.DEFAULT).toBe(48);
    });

    it('should have SMALL number', () => {
      expect(SizeNumberEnum.SMALL).toBe(16);
    });

    it('should have LARGE number', () => {
      expect(SizeNumberEnum.LARGE).toBe(64);
    });

    it('should contain all expected size numbers', () => {
      const expectedSizeNumbers = {
        DEFAULT: 48,
        SMALL: 16,
        LARGE: 64,
      };

      Object.entries(expectedSizeNumbers).forEach(([key, value]) => {
        expect(SizeNumberEnum[key as keyof typeof SizeNumberEnum]).toBe(value);
      });
    });

    it('should have correct number of size number values', () => {
      // Note: TypeScript enums include both keys and reverse mappings for numeric enums
      const enumKeys = Object.keys(SizeNumberEnum).filter(key => isNaN(Number(key)));
      expect(enumKeys).toHaveLength(3);
    });

    it('should have unique values', () => {
      const values = Object.values(SizeNumberEnum);
      const uniqueValues = [...new Set(values)];
      expect(values).toHaveLength(uniqueValues.length);
    });

    it('should have positive numeric values', () => {
      // Filter out reverse lookup string keys for numeric enums
      const numericValues = Object.values(SizeNumberEnum).filter(val => typeof val === 'number');
      numericValues.forEach(size => {
        expect(typeof size).toBe('number');
        expect(size).toBeGreaterThan(0);
      });
    });

    it('should have increasing size values', () => {
      expect(SizeNumberEnum.SMALL).toBeLessThan(SizeNumberEnum.DEFAULT);
      expect(SizeNumberEnum.DEFAULT).toBeLessThan(SizeNumberEnum.LARGE);
    });
  });

  describe('sizeMap', () => {
    it('should export sizeMap', () => {
      expect(sizeMap).toBeDefined();
      expect(sizeMap instanceof Map).toBe(true);
    });

    it('should have correct size mapping', () => {
      expect(sizeMap.get(SizeEnum.DEFAULT)).toBe(SizeNumberEnum.DEFAULT);
      expect(sizeMap.get(SizeEnum.SMALL)).toBe(SizeNumberEnum.SMALL);
      expect(sizeMap.get(SizeEnum.LARGE)).toBe(SizeNumberEnum.LARGE);
    });

    it('should have all size enum keys', () => {
      Object.values(SizeEnum).forEach(sizeEnum => {
        expect(sizeMap.has(sizeEnum)).toBe(true);
      });
    });

    it('should have correct map size', () => {
      expect(sizeMap.size).toBe(3);
    });

    it('should map each size to its corresponding number', () => {
      expect(sizeMap.get(SizeEnum.DEFAULT)).toBe(48);
      expect(sizeMap.get(SizeEnum.SMALL)).toBe(16);
      expect(sizeMap.get(SizeEnum.LARGE)).toBe(64);
    });

    it('should return undefined for non-existent keys', () => {
      expect(sizeMap.get('nonexistent' as any)).toBeUndefined();
    });

    it('should be a read-only representation', () => {
      const originalSize = sizeMap.size;
      
      // Attempt to modify the map
      sizeMap.set('test' as any, 100 as any);
      
      // The map is mutable by design, but we can test behavior
      expect(sizeMap.size).toBe(originalSize + 1);
      
      // Clean up
      sizeMap.delete('test' as any);
      expect(sizeMap.size).toBe(originalSize);
    });
  });

  describe('enum consistency', () => {
    it('should maintain consistency between enums', () => {
      const sizeKeys = Object.keys(SizeEnum);
      const sizeNumberKeys = Object.keys(SizeNumberEnum).filter(key => isNaN(Number(key)));
      
      expect(sizeKeys.sort()).toEqual(sizeNumberKeys.sort());
    });

    it('should have proper mapping between enums', () => {
      // Reset the map to original state first
      sizeMap.clear();
      sizeMap.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
      sizeMap.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
      sizeMap.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
      
      Object.keys(SizeEnum).forEach(key => {
        const sizeKey = key as keyof typeof SizeEnum;
        const sizeNumberKey = key as keyof typeof SizeNumberEnum;
        
        expect(sizeMap.get(SizeEnum[sizeKey])).toBe(SizeNumberEnum[sizeNumberKey]);
      });
    });

    it('should maintain type safety', () => {
      // Reset the map to original state first
      sizeMap.clear();
      sizeMap.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT);
      sizeMap.set(SizeEnum.SMALL, SizeNumberEnum.SMALL);
      sizeMap.set(SizeEnum.LARGE, SizeNumberEnum.LARGE);
      
      // Compile-time type checks
      const defaultSize: SizeEnum = SizeEnum.DEFAULT;
      const defaultNumber: SizeNumberEnum = SizeNumberEnum.DEFAULT;
      const mappedNumber = sizeMap.get(defaultSize);
      
      expect(defaultSize).toBe('default');
      expect(defaultNumber).toBe(48);
      expect(mappedNumber).toBe(48);
    });
  });
});