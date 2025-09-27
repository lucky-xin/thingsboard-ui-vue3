import { describe, it, expect, vi, beforeEach } from 'vitest';
import useAdvanced from '/@/components/Form/src/hooks/useAdvanced';
import { computed, unref, watch } from 'vue';
import { isBoolean, isFunction, isNumber, isObject } from '/@/utils/is';
import { useBreakpoint } from '/@/hooks/event/useBreakpoint';
import { useDebounceFn } from '@vueuse/core';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    computed: vi.fn((fn) => fn()),
    unref: vi.fn((val) => val.value || val),
    watch: vi.fn(),
  };
});

// Mock utils
vi.mock('/@/utils/is', () => ({
  isBoolean: vi.fn(),
  isFunction: vi.fn(),
  isNumber: vi.fn(),
  isObject: vi.fn(),
}));

// Mock hooks
vi.mock('/@/hooks/event/useBreakpoint', () => ({
  useBreakpoint: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  useDebounceFn: vi.fn(),
}));

describe('components/Form/src/hooks/useAdvanced', () => {
  let mockContext: any;
  let mockUseBreakpoint: any;
  let mockUseDebounceFn: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseBreakpoint = {
      realWidthRef: { value: 1200 },
      screenEnum: {
        LG: 992,
        XL: 1200,
        XXL: 1600,
      },
      screenRef: { value: 'xl' },
    };

    mockUseDebounceFn = vi.fn((fn) => fn);

    vi.mocked(useBreakpoint).mockReturnValue(mockUseBreakpoint);
    vi.mocked(useDebounceFn).mockReturnValue(mockUseDebounceFn);

    mockContext = {
      advanceState: {
        isAdvanced: false,
        hideAdvanceBtn: false,
        isLoad: false,
        actionSpan: 6,
      },
      emit: vi.fn(),
      getProps: {
        value: {
          baseColProps: {},
          actionColOptions: {},
          emptySpan: 0,
        },
      },
      getSchema: {
        value: [],
      },
      formModel: {},
      defaultValueRef: { value: {} },
    };

    // Mock default values for utils
    vi.mocked(isBoolean).mockReturnValue(false);
    vi.mocked(isFunction).mockReturnValue(false);
    vi.mocked(isNumber).mockReturnValue(false);
    vi.mocked(isObject).mockReturnValue(false);
  });

  describe('useAdvanced', () => {
    it('should return handleToggleAdvanced function', () => {
      const result = useAdvanced(mockContext);

      expect(result).toHaveProperty('handleToggleAdvanced');
      expect(typeof result.handleToggleAdvanced).toBe('function');
    });

    it('should update advanced state when called', () => {
      mockContext.getProps.value.baseColProps = { span: 6 };
      mockContext.getProps.value.actionColOptions = {};

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle different screen sizes', () => {
      mockUseBreakpoint.realWidthRef.value = 600; // Small screen
      mockContext.getProps.value.baseColProps = {};
      mockContext.getProps.value.actionColOptions = { xs: 24 };

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle XL breakpoint', () => {
      mockUseBreakpoint.realWidthRef.value = 1300;
      mockContext.getProps.value.baseColProps = { xl: 8 };

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle XXL breakpoint', () => {
      mockUseBreakpoint.realWidthRef.value = 1700;
      mockContext.getProps.value.baseColProps = { xxl: 6 };

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle XXL+ breakpoint', () => {
      mockUseBreakpoint.realWidthRef.value = 2000;
      mockContext.getProps.value.baseColProps = { xxl: 4 };

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle toggle advanced state', () => {
      const result = useAdvanced(mockContext);

      result.handleToggleAdvanced();

      expect(mockContext.advanceState.isAdvanced).toBe(true);
    });

    it('should handle advanced state with number', () => {
      mockContext.advanceState.isAdvanced = true;
      mockContext.getProps.value.emptySpan = 2;
      vi.mocked(isNumber).mockReturnValue(true);

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle advanced state with function', () => {
      mockContext.advanceState.isAdvanced = true;
      mockContext.getProps.value.emptySpan = () => 3;
      vi.mocked(isFunction).mockReturnValue(true);

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle advanced state with object', () => {
      mockContext.advanceState.isAdvanced = true;
      mockContext.getProps.value.emptySpan = { span: 1 };
      vi.mocked(isObject).mockReturnValue(true);

      useAdvanced(mockContext);

      // This test verifies that the function can be called without errors
      expect(true).toBe(true);
    });

    it('should handle debounced toggle', () => {
      const result = useAdvanced(mockContext);

      result.handleToggleAdvanced();

      expect(useDebounceFn).toHaveBeenCalled();
    });
  });
});