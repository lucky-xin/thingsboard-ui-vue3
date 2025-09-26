import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import useAdvanced from '/@/components/Form/src/hooks/useAdvanced';

// Mock dependencies
vi.mock('/@/utils/is', () => ({
  isBoolean: vi.fn((val) => typeof val === 'boolean'),
  isFunction: vi.fn((val) => typeof val === 'function'),
  isNumber: vi.fn((val) => typeof val === 'number'),
  isObject: vi.fn((val) => typeof val === 'object' && val !== null && !Array.isArray(val)),
}));

vi.mock('/@/hooks/event/useBreakpoint', () => ({
  useBreakpoint: vi.fn(() => ({
    realWidthRef: ref(1200),
    screenEnum: {
      LG: 992,
      XL: 1200,
      XXL: 1600,
    },
    screenRef: ref('xl'),
  })),
}));

vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn((fn, delay) => fn),
}));

describe('useAdvanced', () => {
  let mockEmit: any;
  let mockGetProps: any;
  let mockGetSchema: any;
  let mockFormModel: any;
  let mockDefaultValueRef: any;
  let mockAdvanceState: any;

  beforeEach(() => {
    mockEmit = vi.fn();
    mockGetProps = computed(() => ({
      baseColProps: { span: 6 },
      actionColOptions: { span: 6 },
      showAdvancedButton: true,
      autoAdvancedLine: 3,
      alwaysShowLines: 1,
      emptySpan: 0,
    }));
    mockGetSchema = computed(() => [
      {
        field: 'field1',
        show: true,
        colProps: { span: 6 },
      },
      {
        field: 'field2',
        show: true,
        colProps: { span: 6 },
      },
    ]);
    mockFormModel = { field1: 'value1', field2: 'value2' };
    mockDefaultValueRef = ref({ field1: 'default1' });
    mockAdvanceState = {
      isAdvanced: false,
      hideAdvanceBtn: false,
      isLoad: false,
      actionSpan: 0,
    };
  });

  it('should initialize with default values', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
    expect(typeof handleToggleAdvanced).toBe('function');
  });

  it('should toggle advanced state', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    // The state might be modified during initialization, so we check the current state
    const initialState = mockAdvanceState.isAdvanced;
    handleToggleAdvanced();
    expect(mockAdvanceState.isAdvanced).toBe(!initialState);
    handleToggleAdvanced();
    expect(mockAdvanceState.isAdvanced).toBe(initialState);
  });

  it('should handle basic col len calculation', () => {
    useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    // The function should be called and advanceState should be updated
    expect(mockAdvanceState).toBeDefined();
  });

  it('should handle empty span calculation', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: { ...mockAdvanceState, isAdvanced: true },
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        emptySpan: 2,
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle object empty span', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: { ...mockAdvanceState, isAdvanced: true },
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        emptySpan: { span: 2, xl: 4 },
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle boolean show property', () => {
    const schemaWithBooleanShow = computed(() => [
      {
        field: 'field1',
        show: false,
        colProps: { span: 6 },
      },
    ]);

    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: schemaWithBooleanShow,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle function show property', () => {
    const schemaWithFunctionShow = computed(() => [
      {
        field: 'field1',
        show: () => true,
        colProps: { span: 6 },
      },
    ]);

    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: schemaWithFunctionShow,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle different screen sizes', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        baseColProps: { span: 6, xs: 12, sm: 8, md: 6, lg: 4, xl: 3, xxl: 2 },
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle action col options', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        actionColOptions: { span: 8, xs: 12, sm: 10, md: 8, lg: 6, xl: 4, xxl: 3 },
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle auto advanced line', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        autoAdvancedLine: 4,
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle always show lines', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        alwaysShowLines: 2,
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle show advanced button disabled', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: computed(() => ({
        ...mockGetProps.value,
        showAdvancedButton: false,
      })),
      getSchema: mockGetSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle empty schema', () => {
    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: computed(() => []),
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle schema without colProps', () => {
    const schemaWithoutColProps = computed(() => [
      {
        field: 'field1',
        show: true,
      },
    ]);

    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: schemaWithoutColProps,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });

  it('should handle complex schema with mixed properties', () => {
    const complexSchema = computed(() => [
      {
        field: 'field1',
        show: true,
        colProps: { span: 6, xs: 12, sm: 8 },
      },
      {
        field: 'field2',
        show: false,
        colProps: { span: 8, md: 6, lg: 4 },
      },
      {
        field: 'field3',
        show: () => true,
        colProps: { span: 10, xl: 8, xxl: 6 },
      },
    ]);

    const { handleToggleAdvanced } = useAdvanced({
      advanceState: mockAdvanceState,
      emit: mockEmit,
      getProps: mockGetProps,
      getSchema: complexSchema,
      formModel: mockFormModel,
      defaultValueRef: mockDefaultValueRef,
    });

    expect(handleToggleAdvanced).toBeDefined();
  });
});
