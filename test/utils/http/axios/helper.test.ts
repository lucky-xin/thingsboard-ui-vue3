import { describe, it, expect, vi, beforeEach } from 'vitest';
import { joinTimestamp, formatRequestDate } from '/@/utils/http/axios/helper';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isObject: vi.fn((value) => typeof value === 'object' && value !== null && !Array.isArray(value)),
  isString: vi.fn((value) => typeof value === 'string'),
}));

describe('utils/http/axios/helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('joinTimestamp', () => {
    it('should return empty string when join is false and restful is true', () => {
      const result = joinTimestamp(false, true);
      expect(result).toBe('');
    });

    it('should return empty object when join is false and restful is false', () => {
      const result = joinTimestamp(false, false);
      expect(result).toEqual({});
    });

    it('should return timestamp query string when join is true and restful is true', () => {
      const result = joinTimestamp(true, true);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^\?_t=\d+$/);
    });

    it('should return timestamp object when join is true and restful is false', () => {
      const result = joinTimestamp(true, false);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('_t');
      expect(typeof (result as any)._t).toBe('number');
    });

    it('should handle default restful parameter', () => {
      const result = joinTimestamp(true);
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('_t');
    });
  });

  describe('formatRequestDate', () => {
    it('should return undefined for non-object parameters', () => {
      const result1 = formatRequestDate('string');
      const result2 = formatRequestDate(123);
      const result3 = formatRequestDate(null);
      const result4 = formatRequestDate(undefined);

      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
      expect(result3).toBeUndefined();
      expect(result4).toBeUndefined();
    });

    it('should format date objects with format method', () => {
      const mockFormat = vi.fn(() => '2023-01-01 12:00');
      const params = {
        date: {
          format: mockFormat,
        },
      };

      formatRequestDate(params);

      expect(mockFormat).toHaveBeenCalledWith('YYYY-MM-DD HH:mm');
      expect(params.date).toBe('2023-01-01 12:00');
    });

    it('should trim string values', () => {
      const params = {
        name: '  test  ',
        description: '  description  ',
      };

      formatRequestDate(params);

      expect(params.name).toBe('test');
      expect(params.description).toBe('description');
    });

    it('should handle nested objects', () => {
      const params = {
        user: {
          name: '  test  ',
        },
      };

      formatRequestDate(params);

      // Just verify the function handles nested objects without throwing
      expect(() => formatRequestDate(params)).not.toThrow();
    });

    it('should handle empty values', () => {
      const params = {
        name: '',
        description: null,
        count: 0,
      };

      formatRequestDate(params);

      expect(params.name).toBe('');
      expect(params.description).toBe(null);
      expect(params.count).toBe(0);
    });

    it('should handle non-string keys', () => {
      const params = {
        123: 'test',
        true: 'value',
      };

      // Should not throw error
      expect(() => formatRequestDate(params)).not.toThrow();
    });

    it('should handle error in string trimming', () => {
      const params = {
        name: '  test  ',
      };

      // Just verify the function handles the input without throwing
      expect(() => formatRequestDate(params)).not.toThrow();
      expect(params.name).toBe('test');
    });
  });
});
