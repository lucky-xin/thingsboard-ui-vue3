import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSlot, extendSlots } from '/@/utils/helper/tsxHelper';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

// Mock console.error
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('utils/helper/tsxHelper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleSpy.mockClear();
  });

  describe('getSlot', () => {
    it('should return slot function result when slot exists', () => {
      const mockSlotFn = vi.fn((data) => `rendered with ${data?.value || 'no data'}`);
      const slots = {
        default: mockSlotFn,
      };

      const result = getSlot(slots, 'default', { value: 'test' });

      expect(mockSlotFn).toHaveBeenCalledWith({ value: 'test' });
      expect(result).toBe('rendered with test');
    });

    it('should return null when slots is falsy', () => {
      const result = getSlot(null as any, 'default');
      expect(result).toBeNull();

      const result2 = getSlot(undefined as any, 'default');
      expect(result2).toBeNull();
    });

    it('should return null when slot does not exist', () => {
      const slots = {
        default: vi.fn(),
      };

      const result = getSlot(slots, 'nonexistent');
      expect(result).toBeNull();
    });

    it('should use default slot when no slot name provided', () => {
      const mockSlotFn = vi.fn(() => 'default content');
      const slots = {
        default: mockSlotFn,
      };

      const result = getSlot(slots);
      expect(mockSlotFn).toHaveBeenCalled();
      expect(result).toBe('default content');
    });

    it('should pass data to slot function', () => {
      const mockSlotFn = vi.fn((data) => data);
      const slots = {
        custom: mockSlotFn,
      };
      const testData = { id: 1, name: 'test' };

      const result = getSlot(slots, 'custom', testData);
      expect(mockSlotFn).toHaveBeenCalledWith(testData);
      expect(result).toBe(testData);
    });

    it('should handle slot function that returns null/undefined', () => {
      const mockSlotFn = vi.fn(() => null);
      const slots = {
        empty: mockSlotFn,
      };

      const result = getSlot(slots, 'empty');
      expect(mockSlotFn).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null and log error when slot is not a function', async () => {
      const { isFunction } = await import('/@/utils/is');
      isFunction.mockReturnValue(false);

      const slots = {
        invalid: 'not a function' as any,
      };

      const result = getSlot(slots, 'invalid');
      expect(console.error).toHaveBeenCalledWith('invalid is not a function!');
      expect(result).toBeNull();
    });

    it('should return null when slot function is null/undefined', () => {
      const slots = {
        nullSlot: null as any,
        undefinedSlot: undefined as any,
      };

      const result1 = getSlot(slots, 'nullSlot');
      const result2 = getSlot(slots, 'undefinedSlot');

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe('extendSlots', () => {
    it('should extend all slots when no excludeKeys provided', () => {
      const mockSlot1 = vi.fn(() => 'slot1');
      const mockSlot2 = vi.fn(() => 'slot2');
      const slots = {
        default: mockSlot1,
        custom: mockSlot2,
      };

      const result = extendSlots(slots);
      expect(Object.keys(result)).toEqual(['default', 'custom']);
      expect(typeof result.default).toBe('function');
      expect(typeof result.custom).toBe('function');
    });

    it('should exclude specified keys', () => {
      const mockSlot1 = vi.fn(() => 'slot1');
      const mockSlot2 = vi.fn(() => 'slot2');
      const mockSlot3 = vi.fn(() => 'slot3');
      const slots = {
        default: mockSlot1,
        custom: mockSlot2,
        excluded: mockSlot3,
      };

      const result = extendSlots(slots, ['excluded']);
      expect(Object.keys(result)).toEqual(['default', 'custom']);
      expect(result.excluded).toBeUndefined();
    });

    it('should handle empty slots object', () => {
      const slots = {};
      const result = extendSlots(slots);
      expect(result).toEqual({});
    });

    it('should handle empty excludeKeys array', () => {
      const mockSlot = vi.fn(() => 'content');
      const slots = {
        test: mockSlot,
      };

      const result = extendSlots(slots, []);
      expect(Object.keys(result)).toEqual(['test']);
      expect(typeof result.test).toBe('function');
    });

    it('should handle multiple exclude keys', () => {
      const slots = {
        slot1: vi.fn(),
        slot2: vi.fn(),
        slot3: vi.fn(),
        slot4: vi.fn(),
      };

      const result = extendSlots(slots, ['slot2', 'slot4']);
      expect(Object.keys(result)).toEqual(['slot1', 'slot3']);
    });

    it('should handle non-existent exclude keys gracefully', () => {
      const slots = {
        existing: vi.fn(() => 'content'),
      };

      const result = extendSlots(slots, ['nonexistent']);
      expect(Object.keys(result)).toEqual(['existing']);
      expect(typeof result.existing).toBe('function');
    });
  });
});