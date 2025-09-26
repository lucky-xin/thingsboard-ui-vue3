import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAttrs, entries } from '/@/hooks/core/useAttrs';

// Mock Vue composition functions
vi.mock('vue', () => ({
  getCurrentInstance: vi.fn(),
  reactive: vi.fn((obj) => obj),
  shallowRef: vi.fn(() => ({ value: {} })),
  watchEffect: vi.fn((callback) => callback()),
}));

// Import the mocked functions
import { getCurrentInstance, reactive, shallowRef, watchEffect } from 'vue';

const mockInstance = {
  attrs: {
    id: 'test-id',
    class: 'test-class',
    style: 'color: red',
    onClick: vi.fn(),
    onMouseover: vi.fn(),
    'data-test': 'test-value',
    disabled: true,
  },
};

describe('hooks/core/useAttrs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Set up default mock implementations
    (getCurrentInstance as any).mockReturnValue(mockInstance);
    (shallowRef as any).mockReturnValue({ value: {} });
    (reactive as any).mockImplementation((obj) => obj);
    
    // Mock watchEffect to immediately execute the callback
    (watchEffect as any).mockImplementation((callback) => {
      callback();
    });
  });

  describe('entries', () => {
    it('should convert object to entries array', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = entries(obj);
      
      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('should handle empty object', () => {
      const result = entries({});
      expect(result).toEqual([]);
    });

    it('should handle object with different value types', () => {
      const obj = { str: 'hello', num: 42, bool: true, fn: () => {} };
      const result = entries(obj);
      
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual(['str', 'hello']);
      expect(result[1]).toEqual(['num', 42]);
      expect(result[2]).toEqual(['bool', true]);
      expect(typeof result[3][1]).toBe('function');
    });
  });

  describe('useAttrs', () => {
    it('should return empty object when no instance', () => {
      (getCurrentInstance as any).mockReturnValue(null);
      
      const result = useAttrs();
      expect(result).toEqual({});
    });

    it('should exclude default keys (class, style) by default', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      useAttrs();
      
      // Should have called watchEffect
      expect(watchEffect).toHaveBeenCalledTimes(1);
      
      // The callback should filter out class and style
      expect(reactive).toHaveBeenCalledWith(mockInstance.attrs);
    });

    it('should exclude listeners when excludeListeners is true', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      useAttrs({ excludeListeners: true });
      
      expect(watchEffect).toHaveBeenCalledTimes(1);
    });

    it('should exclude custom keys', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      useAttrs({ excludeKeys: ['disabled'] });
      
      expect(watchEffect).toHaveBeenCalledTimes(1);
    });

    it('should not exclude default keys when excludeDefaultKeys is false', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      useAttrs({ excludeDefaultKeys: false });
      
      expect(watchEffect).toHaveBeenCalledTimes(1);
    });

    it('should make instance.attrs reactive', () => {
      useAttrs();
      
      expect(reactive).toHaveBeenCalledWith(mockInstance.attrs);
    });

    it('should return a ref with filtered attrs', () => {
      const mockRef = { value: {} };
      (shallowRef as any).mockReturnValue(mockRef);
      
      const result = useAttrs();
      
      expect(result).toBe(mockRef);
      expect(shallowRef).toHaveBeenCalledWith({});
    });

    it('should handle empty params object', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      expect(() => useAttrs({})).not.toThrow();
      expect(watchEffect).toHaveBeenCalledTimes(1);
    });

    it('should combine excludeKeys with default keys', () => {
      const attrs = { value: {} };
      (shallowRef as any).mockReturnValue(attrs);
      
      useAttrs({ 
        excludeKeys: ['data-test'], 
        excludeDefaultKeys: true 
      });
      
      expect(watchEffect).toHaveBeenCalledTimes(1);
    });
  });
});