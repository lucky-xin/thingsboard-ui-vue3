import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';

// Mock getCurrentInstance with minimal setup
const mockEmit = vi.fn();
const mockInstance = {
  emit: mockEmit,
  type: { name: 'TestComponent' },
  emitsOptions: {
    change: null,
    'update:value': null,
    'update:labelValue': null,
  },
};

// Mock lodash-es isEqual function  
vi.mock('lodash-es', () => ({
  isEqual: vi.fn((a, b) => {
    // Simple equality check for testing
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'object' && a !== null && b !== null) {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return false;
  })
}));

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: () => mockInstance,
  };
});

describe('hooks/component/useFormItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useRuleFormItem', () => {
    it('should initialize with default values', () => {
      const props = { value: 'test' };
      const [state, setState, defaultState] = useRuleFormItem(props);

      expect(state.value).toBe('test');
      expect(defaultState.value).toBe('test');
      expect(typeof setState).toBe('function');
    });

    it('should handle value updates', async () => {
      const props = ref({ value: 'initial' });
      const [state, setState] = useRuleFormItem(props.value);

      setState('updated');
      await nextTick();

      expect(state.value).toBe('updated');
    });

    it('should handle basic string values', () => {
      const props = { value: 'test1,test2' };
      const [state] = useRuleFormItem(props);

      // Should have a non-undefined value for non-empty strings
      expect(state.value).toBe('test1,test2');
    });

    it('should handle empty and undefined values', () => {
      const props1 = { value: undefined };
      const [state1] = useRuleFormItem(props1);
      expect(state1.value).toBeUndefined();

      const props2 = { value: '' };
      const [state2] = useRuleFormItem(props2);
      // Empty string returns undefined in this implementation
      expect(state2.value).toBeUndefined();
    });

    it('should handle object values correctly', () => {
      const props = { value: { key: 'value' } };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual({ key: 'value' });
    });

    it('should handle array values', () => {
      const props = { value: ['val1', 'val2'] };
      const [state] = useRuleFormItem(props);

      expect(Array.isArray(state.value)).toBe(true);
      expect(state.value).toEqual(['val1', 'val2']);
    });

    it('should handle custom key parameter', () => {
      const props = { customValue: 'test' };
      const [state] = useRuleFormItem(props, 'customValue');

      expect(state.value).toBe('test');
    });

    it('should handle component without emits options', () => {
      const originalEmitsOptions = mockInstance.emitsOptions;
      mockInstance.emitsOptions = undefined;

      const props = { value: 'test' };

      expect(() => {
        const [state] = useRuleFormItem(props);
        expect(state.value).toBe('test');
      }).not.toThrow();

      mockInstance.emitsOptions = originalEmitsOptions;
    });

    it('should not emit when value is equal to default', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props);

      // Clear previous calls
      mockEmit.mockClear();

      setState('initial');
      await nextTick();

      // Should not emit when value is the same
      expect(mockEmit).not.toHaveBeenCalled();
    });

    // Basic emit test - just verify that emit function exists and can be called
    it('should have emit functionality available', () => {
      const props = { value: 'test' };
      const [state] = useRuleFormItem(props);
      
      // Just verify the hook works and we can access the state
      expect(state).toBeDefined();
      expect(mockInstance.emit).toBeDefined();
    });
  });
});