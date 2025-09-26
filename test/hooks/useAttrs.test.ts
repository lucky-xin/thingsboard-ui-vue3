import { describe, it, expect, vi, beforeEach } from 'vitest';
import { entries } from '/@/hooks/core/useAttrs';

// Mock Vue functions
let mockCurrentInstance: any = null;

vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    getCurrentInstance: () => mockCurrentInstance,
    reactive: vi.fn((obj) => obj),
    shallowRef: vi.fn((value) => ({ value })),
    watchEffect: vi.fn((fn) => {
      // Execute the function immediately for testing
      if (typeof fn === 'function') {
        try {
          fn();
        } catch (e) {
          // Ignore errors in test mocks
        }
      }
    }),
  };
});

describe('hooks/useAttrs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentInstance = null;
  });

  describe('useAttrs function', () => {
    it('should handle module import', async () => {
      // Test that the module can be imported
      const module = await import('/@/hooks/core/useAttrs');
      expect(module.useAttrs).toBeDefined();
      expect(typeof module.useAttrs).toBe('function');
    });

    it('should return empty object when no instance', async () => {
      const { useAttrs } = await import('/@/hooks/core/useAttrs');
      mockCurrentInstance = null;
      
      const result = useAttrs();
      expect(result).toEqual({});
    });

    it('should handle basic functionality with instance', async () => {
      const { useAttrs } = await import('/@/hooks/core/useAttrs');
      mockCurrentInstance = {
        attrs: {
          id: 'test',
          customProp: 'value',
        },
      };

      const result = useAttrs();
      
      // Should return some kind of result (ref or object)
      expect(result).toBeDefined();
    });

    it('should accept configuration parameters', async () => {
      const { useAttrs } = await import('/@/hooks/core/useAttrs');
      mockCurrentInstance = {
        attrs: { id: 'test' },
      };

      // Should not throw with various parameter combinations  
      expect(() => useAttrs()).not.toThrow();
      expect(() => useAttrs({})).not.toThrow();
      expect(() => useAttrs({ excludeListeners: true })).not.toThrow();
      expect(() => useAttrs({ excludeKeys: ['test'] })).not.toThrow();
      expect(() => useAttrs({ excludeDefaultKeys: false })).not.toThrow();
    });

    it('should handle complex parameters', async () => {
      const { useAttrs } = await import('/@/hooks/core/useAttrs');
      mockCurrentInstance = {
        attrs: {
          id: 'test',
          class: 'test-class',
          onClick: vi.fn(),
        },
      };

      // Should handle all parameter combinations
      expect(() => {
        useAttrs({
          excludeListeners: true,
          excludeKeys: ['id'],
          excludeDefaultKeys: true,
        });
      }).not.toThrow();
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
      const obj = {};
      const result = entries(obj);
      expect(result).toEqual([]);
    });

    it('should handle object with string values', () => {
      const obj = { name: 'test', type: 'input', value: 'hello' };
      const result = entries(obj);
      expect(result).toEqual([
        ['name', 'test'],
        ['type', 'input'],
        ['value', 'hello'],
      ]);
    });

    it('should handle object with mixed value types', () => {
      const testFn = vi.fn();
      const obj = { 
        string: 'text', 
        number: 42, 
        boolean: true, 
        func: testFn,
        obj: { nested: 'value' }
      };
      const result = entries(obj);
      expect(result).toHaveLength(5);
      expect(result[0]).toEqual(['string', 'text']);
      expect(result[1]).toEqual(['number', 42]);
      expect(result[2]).toEqual(['boolean', true]);
      expect(result[3]).toEqual(['func', testFn]);
      expect(result[4]).toEqual(['obj', { nested: 'value' }]);
    });

    it('should preserve insertion order of object keys', () => {
      const obj = { z: 1, a: 2, m: 3 };
      const result = entries(obj);
      expect(result.map(([key]) => key)).toEqual(['z', 'a', 'm']);
    });

    it('should handle null and undefined values', () => {
      const obj = { a: null, b: undefined, c: 0, d: '' };
      const result = entries(obj);
      expect(result).toEqual([
        ['a', null],
        ['b', undefined],
        ['c', 0],
        ['d', ''],
      ]);
    });

    it('should work with objects with symbol keys', () => {
      const symbolKey = Symbol('test');
      const obj = { [symbolKey]: 'symbol-value', regular: 'regular-value' };
      const result = entries(obj);
      
      // Object.keys doesn't include symbol keys, so only regular key should be present
      expect(result).toEqual([['regular', 'regular-value']]);
    });

    it('should handle objects with prototype properties correctly', () => {
      function TestConstructor(this: any) {
        this.instanceProp = 'instance';
      }
      TestConstructor.prototype.prototypeProp = 'prototype';
      
      const obj = new (TestConstructor as any)();
      const result = entries(obj);
      
      // Should only include own properties, not prototype properties
      expect(result).toEqual([['instanceProp', 'instance']]);
    });
  });
});
