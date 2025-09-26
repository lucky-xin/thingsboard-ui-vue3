import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, nextTick } from 'vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';

// Mock getCurrentInstance
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

    it('should handle multiple component types', () => {
      mockInstance.type.name = 'JeeSiteCheckboxGroup';
      const props = { value: 'test1,test2' };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual(['test1', 'test2']);
    });

    it('should handle JeeSiteSelect with multiple mode', () => {
      mockInstance.type.name = 'JeeSiteSelect';
      const props = { value: 'test1,test2', mode: 'multiple' };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual(['test1', 'test2']);
    });

    it('should handle JeeSiteTreeSelect with treeCheckable', () => {
      mockInstance.type.name = 'JeeSiteTreeSelect';
      const props = { value: 'test1,test2', treeCheckable: true };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual(['test1', 'test2']);
    });

    it('should handle labelInValue for single value', () => {
      const props = { value: 'testValue', labelInValue: true, labelValue: 'testLabel' };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual({
        value: 'testValue',
        label: 'testLabel',
      });
    });

    it('should handle labelInValue for multiple values', () => {
      mockInstance.type.name = 'JeeSiteCheckboxGroup';
      const props = {
        value: 'val1,val2',
        labelInValue: true,
        labelValue: 'label1,label2',
      };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual([
        { value: 'val1', label: 'label1' },
        { value: 'val2', label: 'label2' },
      ]);
    });

    it('should handle array values with labelInValue', () => {
      const props = {
        value: ['val1', 'val2'],
        labelInValue: true,
      };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual([
        { value: 'val1' },
        { value: 'val2' },
      ]);
    });

    it('should emit change events when value is set', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props);

      setState('newValue');
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('change', 'newValue', undefined);
      expect(mockEmit).toHaveBeenCalledWith('update:value', 'newValue');
      expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);
    });

    it('should emit change events with labelInValue', async () => {
      const props = { value: 'initial', labelInValue: true };
      const [state, setState] = useRuleFormItem(props);

      setState([{ value: 'val1', label: 'label1' }]);
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('change', 'val1', 'label1');
      expect(mockEmit).toHaveBeenCalledWith('update:value', 'val1');
      expect(mockEmit).toHaveBeenCalledWith('update:labelValue', 'label1');
    });

    it('should handle undefined values', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props);

      setState(undefined);
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('change', undefined, undefined);
      expect(mockEmit).toHaveBeenCalledWith('update:value', undefined);
      expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);
    });

    it('should handle empty string values', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props);

      setState('');
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('change', undefined, undefined);
    });

    it('should handle custom key parameter', () => {
      const props = { customValue: 'test' };
      const [state] = useRuleFormItem(props, 'customValue');

      expect(state.value).toBe('test');
    });

    it('should handle custom change event', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props, 'value', 'customChange');

      // Mock custom change event in emitsOptions
      mockInstance.emitsOptions.customChange = null;

      setState('newValue');
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('customChange', 'newValue', undefined);
    });

    it('should handle emitData parameter', async () => {
      const emitData = ref(['extra1', 'extra2']);
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props, 'value', 'change', emitData);

      setState('newValue');
      await nextTick();

      expect(mockEmit).toHaveBeenCalledWith('change', 'newValue', undefined, 'extra1', 'extra2');
    });

    it('should not emit when value is equal to default', async () => {
      const props = { value: 'initial' };
      const [state, setState] = useRuleFormItem(props);

      // Clear previous calls
      mockEmit.mockClear();

      setState('initial');
      await nextTick();

      expect(mockEmit).not.toHaveBeenCalled();
    });

    it('should handle object values correctly', () => {
      const props = { value: { key: 'value' } };
      const [state] = useRuleFormItem(props);

      expect(state.value).toEqual({ key: 'value' });
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
  });
});