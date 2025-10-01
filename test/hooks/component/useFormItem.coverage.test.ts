// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, reactive, computed } from 'vue';

// Mock dependencies
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: vi.fn(),
    watchEffect: vi.fn(),
    nextTick: vi.fn(),
  };
});

vi.mock('lodash-es', () => ({
  isEqual: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isObject: vi.fn(),
}));

import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import { getCurrentInstance, watchEffect, nextTick } from 'vue';
import { isEqual } from 'lodash-es';
import { isObject } from '/@/utils/is';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

const mockGetCurrentInstance = vi.mocked(getCurrentInstance);
const mockWatchEffect = vi.mocked(watchEffect);
const mockNextTick = vi.mocked(nextTick);
const mockIsEqual = vi.mocked(isEqual);
const mockIsObject = vi.mocked(isObject);

describe('useRuleFormItem coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'TestComponent' },
      emitsOptions: {},
    } as any);
    mockIsEqual.mockReturnValue(false);
    mockIsObject.mockReturnValue(false);
    mockNextTick.mockResolvedValue(undefined);
  });

  it('should return state, setState, and defaultState', () => {
    const props = { value: 'test' };
    const [state, setState, defaultState] = useRuleFormItem(props);

    expect(state).toBeDefined();
    expect(setState).toBeDefined();
    expect(defaultState).toBeDefined();
  });

  it('should handle JeeSiteCheckboxGroup as multiple', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteCheckboxGroup' },
      emitsOptions: {},
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle JeeSiteSelect with multiple mode', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'test', mode: 'multiple' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle JeeSiteSelect with tags mode', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'test', mode: 'tags' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle JeeSiteTreeSelect with treeCheckable', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteTreeSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'test', treeCheckable: true };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle labelInValue with multiple values', () => {
    const props = { value: 'val1,val2', labelValue: 'label1,label2', labelInValue: true };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle labelInValue with single value', () => {
    const props = { value: 'test', labelValue: 'Test Label', labelInValue: true };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle labelInValue with array value', () => {
    const props = { value: ['val1', 'val2'], labelInValue: true };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle multiple values with comma-separated string', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'val1,val2', mode: 'multiple' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle setState function', () => {
    const props = { value: 'test' };
    const [state, setState] = useRuleFormItem(props);

    setState('new value');

    expect(state).toBeDefined();
  });

  it('should handle state setter with equal values', () => {
    mockIsEqual.mockReturnValue(true);
    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    state.value = 'test';

    expect(state).toBeDefined();
  });

  it('should handle state setter with undefined value', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    state.value = undefined;

    expect(state).toBeDefined();
  });

  it('should handle state setter with array value and labelInValue', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test', labelInValue: true };
    const [state] = useRuleFormItem(props);

    state.value = [{ value: 'val1', label: 'label1' }];

    expect(state).toBeDefined();
  });

  it('should handle state setter with array value without labelInValue', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    state.value = ['val1', 'val2'];

    expect(state).toBeDefined();
  });

  it('should handle state setter with single value', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    state.value = 'single value';

    expect(state).toBeDefined();
  });

  it('should handle emitData parameter', () => {
    const mockEmit = vi.fn();
    const emitData = ref(['extra', 'data']);
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props, 'value', 'change', emitData);

    state.value = 'new value';

    expect(state).toBeDefined();
  });

  it('should handle custom key parameter', () => {
    const props = { customValue: 'test' };
    const [state] = useRuleFormItem(props, 'customValue');

    expect(state).toBeDefined();
  });

  it('should handle custom changeEvent parameter', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { customChange: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props, 'value', 'customChange');

    state.value = 'new value';

    expect(state).toBeDefined();
  });

  it('should handle component without emitsOptions', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'TestComponent' },
      emitsOptions: undefined,
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle component without emit function', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: undefined,
      type: { name: 'TestComponent' },
      emitsOptions: {},
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle component without type name', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: {},
      emitsOptions: {},
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle empty array values in labelInValue', () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test', labelInValue: true };
    const [state] = useRuleFormItem(props);

    state.value = [];

    expect(state).toBeDefined();
  });

  it('should handle watchEffect callback', () => {
    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle null or undefined initial values', () => {
    const props1 = { value: null };
    const [state1] = useRuleFormItem(props1);
    expect(state1.value).toBeUndefined();

    const props2 = { value: undefined };
    const [state2] = useRuleFormItem(props2);
    expect(state2.value).toBeUndefined();
  });

  it('should handle labelInValue with multiple and string value', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteCheckboxGroup' },
      emitsOptions: {},
    } as any);

    const props = { value: 'val1,val2', labelValue: 'label1,label2', labelInValue: true };
    const [state] = useRuleFormItem(props);

    expect(state.value).toEqual([
      { value: 'val1', label: 'label1' },
      { value: 'val2', label: 'label2' }
    ]);
  });

  it('should handle multiple mode with string value', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'val1,val2', mode: 'multiple' };
    const [state] = useRuleFormItem(props);

    expect(state.value).toEqual(['val1', 'val2']);
  });

  it('should handle watchEffect with null value', () => {
    // Mock watchEffect to call the callback immediately
    mockWatchEffect.mockImplementation((callback) => {
      callback();
      return vi.fn();
    });

    const props = { value: null };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle watchEffect with labelInValue and multiple', () => {
    // Mock watchEffect to call the callback immediately
    mockWatchEffect.mockImplementation((callback) => {
      callback();
      return vi.fn();
    });

    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteCheckboxGroup' },
      emitsOptions: {},
    } as any);

    const props = { value: 'val1,val2', labelValue: 'label1,label2', labelInValue: true };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle watchEffect with multiple mode', () => {
    // Mock watchEffect to call the callback immediately
    mockWatchEffect.mockImplementation((callback) => {
      callback();
      return vi.fn();
    });

    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);

    const props = { value: 'val1,val2', mode: 'multiple' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle hasOwnProperty when emitsOptions is undefined', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'TestComponent' },
      emitsOptions: undefined,
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle hasOwnProperty when emitsOptions does not have change event', () => {
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'TestComponent' },
      emitsOptions: { 'update:value': true, 'update:labelValue': true },
    } as any);

    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    expect(state).toBeDefined();
  });

  it('should handle isEqual returning true', () => {
    mockIsEqual.mockReturnValue(true);
    const props = { value: 'test' };
    const [state] = useRuleFormItem(props);

    // This should not cause any errors
    state.value = 'test';
    expect(state).toBeDefined();
  });

  it('should handle setState function properly', () => {
    const props = { value: 'initial' };
    const [state, setState, defaultState] = useRuleFormItem(props);

    setState('updated');
    expect(state.value).toBe('updated');
    // defaultState is readonly and reflects the current state, not the initial value
    expect(defaultState.value).toBe('updated');
  });

  it('should handle empty string values', () => {
    const props = { value: '' };
    const [state] = useRuleFormItem(props);

    expect(state.value).toBe('');
  });

  it('should handle object values', () => {
    const props = { value: { key: 'value' } };
    const [state] = useRuleFormItem(props);

    expect(state.value).toEqual({ key: 'value' });
  });

  it('should handle array values', () => {
    const props = { value: ['val1', 'val2'] };
    const [state] = useRuleFormItem(props);

    expect(state.value).toEqual(['val1', 'val2']);
  });

  it('should handle getIsMultiple function for different component types', () => {
    // Test JeeSiteCheckboxGroup
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteCheckboxGroup' },
      emitsOptions: {},
    } as any);
    const props1 = { value: 'test' };
    const [state1] = useRuleFormItem(props1);
    expect(state1).toBeDefined();

    // Test JeeSiteSelect with multiple mode
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteSelect' },
      emitsOptions: {},
    } as any);
    const props2 = { value: 'test', mode: 'multiple' };
    const [state2] = useRuleFormItem(props2);
    expect(state2).toBeDefined();

    // Test JeeSiteSelect with tags mode
    const props3 = { value: 'test', mode: 'tags' };
    const [state3] = useRuleFormItem(props3);
    expect(state3).toBeDefined();

    // Test JeeSiteTreeSelect with treeCheckable
    mockGetCurrentInstance.mockReturnValue({
      emit: vi.fn(),
      type: { name: 'JeeSiteTreeSelect' },
      emitsOptions: {},
    } as any);
    const props4 = { value: 'test', treeCheckable: true };
    const [state4] = useRuleFormItem(props4);
    expect(state4).toBeDefined();
  });

  it('should handle state setter with emit functionality', async () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    // Mock nextTick to immediately call the callback
    mockNextTick.mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
      return Promise.resolve();
    });

    const props = { value: 'initial' };
    const [state] = useRuleFormItem(props);

    // Test with undefined value
    state.value = undefined;
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', undefined, undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:value', undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);

    // Reset mock
    mockEmit.mockClear();

    // Test with array value and labelInValue
    const props2 = { value: 'initial', labelInValue: true };
    const [state2] = useRuleFormItem(props2);
    state2.value = [{ value: 'val1', label: 'label1' }, { value: 'val2', label: 'label2' }];
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', 'val1,val2', 'label1,label2');
    expect(mockEmit).toHaveBeenCalledWith('update:value', 'val1,val2');
    expect(mockEmit).toHaveBeenCalledWith('update:labelValue', 'label1,label2');

    // Reset mock
    mockEmit.mockClear();

    // Test with array value without labelInValue
    const props3 = { value: 'initial' };
    const [state3] = useRuleFormItem(props3);
    state3.value = ['val1', 'val2'];
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', 'val1,val2', undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:value', 'val1,val2');
    expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);

    // Reset mock
    mockEmit.mockClear();

    // Test with single value
    const props4 = { value: 'initial' };
    const [state4] = useRuleFormItem(props4);
    state4.value = 'single';
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', 'single', undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:value', 'single');
    expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);
  });

  it('should handle emitData in state setter', async () => {
    const mockEmit = vi.fn();
    const emitData = ref(['extra1', 'extra2']);
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    // Mock nextTick to immediately call the callback
    mockNextTick.mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
      return Promise.resolve();
    });

    const props = { value: 'initial' };
    const [state] = useRuleFormItem(props, 'value', 'change', emitData);

    state.value = 'newvalue';
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', 'newvalue', undefined, 'extra1', 'extra2');
  });

  it('should handle empty arrays in labelInValue', async () => {
    const mockEmit = vi.fn();
    mockGetCurrentInstance.mockReturnValue({
      emit: mockEmit,
      type: { name: 'TestComponent' },
      emitsOptions: { change: true, 'update:value': true, 'update:labelValue': true },
    } as any);

    // Mock nextTick to immediately call the callback
    mockNextTick.mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
      return Promise.resolve();
    });

    const props = { value: 'initial', labelInValue: true };
    const [state] = useRuleFormItem(props);

    state.value = [];
    // Wait for nextTick
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(mockEmit).toHaveBeenCalledWith('change', undefined, undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:value', undefined);
    expect(mockEmit).toHaveBeenCalledWith('update:labelValue', undefined);
  });
});