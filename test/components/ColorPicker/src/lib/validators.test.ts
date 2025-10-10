import { describe, it, expect } from 'vitest';
import { isValidComponentSize } from '/@/components/ColorPicker/src/lib/validators';

describe('validators', () => {
  describe('isValidComponentSize', () => {
    it('should return true for valid component sizes', () => {
      expect(isValidComponentSize('')).toBe(true);
      expect(isValidComponentSize('large')).toBe(true);
      expect(isValidComponentSize('default')).toBe(true);
      expect(isValidComponentSize('small')).toBe(true);
    });

    it('should return false for invalid component sizes', () => {
      expect(isValidComponentSize('invalid')).toBe(false);
      expect(isValidComponentSize('medium')).toBe(false);
      expect(isValidComponentSize('extra-large')).toBe(false);
      expect(isValidComponentSize('tiny')).toBe(false);
      expect(isValidComponentSize('x-large')).toBe(false);
    });

    it('should handle case sensitivity', () => {
      expect(isValidComponentSize('Large')).toBe(false);
      expect(isValidComponentSize('DEFAULT')).toBe(false);
      expect(isValidComponentSize('Small')).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(isValidComponentSize(null as any)).toBe(false);
      expect(isValidComponentSize(undefined as any)).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(isValidComponentSize(123 as any)).toBe(false);
      expect(isValidComponentSize({} as any)).toBe(false);
      expect(isValidComponentSize([] as any)).toBe(false);
      expect(isValidComponentSize(true as any)).toBe(false);
    });
  });
});
