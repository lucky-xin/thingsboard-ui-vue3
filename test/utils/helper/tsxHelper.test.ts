import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSlot, extendSlots } from '/@/utils/helper/tsxHelper';
import { Slots } from 'vue';

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
      (isFunction as any).mockReturnValue(false);

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

    it('should handle complex slot data', () => {
      const mockSlotFn = vi.fn((data) => ({ rendered: true, data }));
      const slots = {
        complex: mockSlotFn,
      };
      const complexData = {
        user: { id: 1, name: 'John' },
        config: { theme: 'dark', lang: 'en' },
        actions: [{ type: 'click', handler: vi.fn() }]
      };

      const result = getSlot(slots, 'complex', complexData);

      expect(mockSlotFn).toHaveBeenCalledWith(complexData);
      expect(result).toEqual({ rendered: true, data: complexData });
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
      const slots: Slots = {};

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

    it('should create wrapper functions that call getSlot', () => {
      const mockSlot = vi.fn((data) => `rendered: ${data?.message}`);
      const slots = {
        test: mockSlot,
      };

      const result = extendSlots(slots);
      const wrappedFn = result.test;
      const testData = { message: 'hello' };

      const output = wrappedFn(testData);

      expect(mockSlot).toHaveBeenCalledWith(testData);
      expect(output).toBe('rendered: hello');
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

    it('should preserve original slot behavior through wrapper', () => {
      const originalSlot = vi.fn((data) => {
        if (!data) return 'no data';
        return `Hello ${data.name}`;
      });
      const slots = {
        greeting: originalSlot,
      };

      const result = extendSlots(slots);
      
      // Test with data
      const output1 = result.greeting({ name: 'World' });
      expect(output1).toBe('Hello World');
      
      // Test without data
      const output2 = result.greeting();
      expect(output2).toBe('no data');
      
      expect(originalSlot).toHaveBeenCalledTimes(2);
    });

    it('should handle slots that return complex objects', () => {
      const complexSlot = vi.fn((data) => ({
        type: 'component',
        props: data?.props || {},
        children: data?.children || []
      }));
      const slots = {
        complex: complexSlot,
      };

      const result = extendSlots(slots);
      const testData = {
        props: { class: 'test-class' },
        children: ['child1', 'child2']
      };
      
      const output = result.complex(testData);

      expect(output).toEqual({
        type: 'component',
        props: { class: 'test-class' },
        children: ['child1', 'child2']
      });
    });

    it('should handle edge case with null/undefined slots', () => {
      const slots = {
        valid: vi.fn(() => 'valid'),
        nullSlot: null as any,
        undefinedSlot: undefined as any,
      };

      const result = extendSlots(slots);

      expect(Object.keys(result)).toEqual(['valid', 'nullSlot', 'undefinedSlot']);
      expect(result.valid()).toBe('valid');
      expect(result.nullSlot()).toBeNull(); // getSlot returns null for null slots
      expect(result.undefinedSlot()).toBeNull(); // getSlot returns null for undefined slots
    });
  });

  describe('integration tests', () => {
    it('should work with real Vue-like slot structure', () => {
      const headerSlot = vi.fn(() => '<h1>Header</h1>');
      const contentSlot = vi.fn((data) => `<p>${data?.text || 'Default content'}</p>`);
      const footerSlot = vi.fn(() => '<footer>Footer</footer>');
      
      const slots = {
        header: headerSlot,
        default: contentSlot,
        footer: footerSlot,
      };

      // Test individual slot access
      expect(getSlot(slots, 'header')).toBe('<h1>Header</h1>');
      expect(getSlot(slots, 'default', { text: 'Custom content' })).toBe('<p>Custom content</p>');
      expect(getSlot(slots, 'footer')).toBe('<footer>Footer</footer>');

      // Test slot extension
      const extended = extendSlots(slots, ['footer']);
      expect(Object.keys(extended)).toEqual(['header', 'default']);
      expect(extended.header()).toBe('<h1>Header</h1>');
      expect(extended.default({ text: 'Extended content' })).toBe('<p>Extended content</p>');
    });
  });
});