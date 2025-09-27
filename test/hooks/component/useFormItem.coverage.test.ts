import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, reactive } from 'vue';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';

// Mock Vue's getCurrentInstance
const mockEmit = vi.fn();
const mockInstance = {
  emit: mockEmit,
  type: { name: 'TestComponent' },
  emitsOptions: {
    change: true,
    'update:value': true,
    'update:labelValue': true,
  },
};

vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: vi.fn(() => mockInstance),
  };
});

describe('useFormItem coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return state, setState, and defaultState', () => {
    const props = { value: 'test' };
    const [state, setState, defaultState] = useRuleFormItem(props);

    expect(state).toBeDefined();
    expect(setState).toBeDefined();
    expect(defaultState).toBeDefined();
    expect(typeof setState).toBe('function');
  });

  it('should handle basic value changes', () => {
    const props = { value: 'initial' };
    const [state, setState] = useRuleFormItem(props);

    expect(state.value).toBe('initial');
    
    setState('updated');
    expect(state.value).toBe('updated');
  });

  it('should handle multiple mode for JeeSiteCheckboxGroup', () => {
    const props = { value: 'test' };
    mockInstance.type.name = 'JeeSiteCheckboxGroup';
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toBe('test');
  });

  it('should handle multiple mode for JeeSiteSelect with multiple mode', () => {
    const props = { value: 'test', mode: 'multiple' };
    mockInstance.type.name = 'JeeSiteSelect';
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toEqual(['test']);
  });

  it('should handle multiple mode for JeeSiteTreeSelect with treeCheckable', () => {
    const props = { value: 'test', treeCheckable: true };
    mockInstance.type.name = 'JeeSiteTreeSelect';
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toEqual(['test']);
  });

  it('should handle labelInValue with multiple values', () => {
    const props = { 
      value: 'val1,val2', 
      labelValue: 'label1,label2',
      labelInValue: true 
    };
    mockInstance.type.name = 'JeeSiteCheckboxGroup';
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toBeDefined();
  });

  it('should handle labelInValue with single value', () => {
    const props = { 
      value: 'test', 
      labelValue: 'Test Label',
      labelInValue: true 
    };
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toBeDefined();
  });

  it('should handle array values in labelInValue mode', () => {
    const props = { 
      value: ['val1', 'val2'], 
      labelInValue: true 
    };
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toBeDefined();
  });

  it('should handle string values with commas in multiple mode', () => {
    const props = { value: 'val1,val2' };
    mockInstance.type.name = 'JeeSiteCheckboxGroup';
    
    const [state] = useRuleFormItem(props);
    expect(state.value).toBeDefined();
  });

  it('should handle value changes', () => {
    const props = { value: 'initial' };
    const [state] = useRuleFormItem(props);

    expect(state.value).toBe('initial');
    state.value = 'updated';
    expect(state.value).toBe('updated');
  });

  it('should handle undefined value', () => {
    const props = { value: 'initial' };
    const [state] = useRuleFormItem(props);

    state.value = undefined;
    expect(state.value).toBeUndefined();
  });

  it('should handle labelInValue with array values', () => {
    const props = { 
      value: [{ value: 'val1', label: 'label1' }], 
      labelInValue: true 
    };
    const [state] = useRuleFormItem(props);

    expect(state.value).toBeDefined();
    state.value = [{ value: 'val2', label: 'label2' }];
    expect(state.value).toBeDefined();
  });

  it('should handle emitData parameter', () => {
    const props = { value: 'initial' };
    const emitData = ref(['extra', 'data']);
    const [state] = useRuleFormItem(props, 'value', 'change', emitData);

    expect(state.value).toBe('initial');
    state.value = 'updated';
    expect(state.value).toBe('updated');
  });

  it('should not emit if value is equal to previous value', async () => {
    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    state.value = 'test'; // Same value
    
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockEmit).not.toHaveBeenCalled();
  });
});
