import { describe, it, expect, vi } from 'vitest';
import { useAttrs, entries } from '/@/hooks/core/useAttrs';

describe('hooks/useAttrs', () => {
  describe('useAttrs', () => {
    it('should return empty object when no instance', () => {
      // Mock getCurrentInstance to return null
      vi.mock('vue', async (importOriginal) => {
        const actual = (await importOriginal()) as any;
        return {
          ...actual,
          getCurrentInstance: () => null,
        };
      });

      const result = useAttrs();
      expect(result).toEqual({});
    });
  });

  describe('entries', () => {
    it('should convert object to entries', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = entries(obj);
      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('should handle empty object', () => {
      const obj = {};
      const result = entries(obj);
      expect(result).toEqual([]);
    });
  });
});
