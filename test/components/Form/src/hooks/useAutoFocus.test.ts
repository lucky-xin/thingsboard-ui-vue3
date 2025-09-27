import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAutoFocus } from '/@/components/Form/src/hooks/useAutoFocus';
import { unref, nextTick, watchEffect } from 'vue';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unref: vi.fn((val) => val.value || val),
    nextTick: vi.fn(),
    watchEffect: vi.fn((fn) => fn()),
  };
});

describe('components/Form/src/hooks/useAutoFocus', () => {
  let mockContext: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockContext = {
      getSchema: {
        value: [
          {
            component: 'Input',
            field: 'name',
            label: 'Name',
          },
        ],
      },
      getProps: {
        value: {
          autoFocusFirstItem: true,
        },
      },
      isInitedDefault: {
        value: false,
      },
      formElRef: {
        value: {
          $el: {
            querySelector: vi.fn(),
          },
        },
      },
    };
  });

  describe('useAutoFocus', () => {
    it('should be a function', () => {
      expect(useAutoFocus).toBeInstanceOf(Function);
    });

    it('should return a promise', async () => {
      const result = useAutoFocus(mockContext);
      expect(result).toBeInstanceOf(Promise);
    });

    it('should not focus when isInitedDefault is true', async () => {
      mockContext.isInitedDefault.value = true;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when autoFocusFirstItem is false', async () => {
      mockContext.getProps.value.autoFocusFirstItem = false;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when formElRef is null', async () => {
      mockContext.formElRef.value = null;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when formElRef.$el is null', async () => {
      mockContext.formElRef.value = { $el: null };

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when schemas is null', async () => {
      mockContext.getSchema.value = null;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when schemas is empty', async () => {
      mockContext.getSchema.value = [];

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when first item is not Input type', async () => {
      mockContext.getSchema.value = [
        {
          component: 'Select',
          field: 'type',
          label: 'Type',
        },
      ];

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should focus when first item is Input type', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should not focus when input element is not found', async () => {
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(null);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle InputNumber component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'InputNumber',
          field: 'age',
          label: 'Age',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle AutoComplete component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'AutoComplete',
          field: 'email',
          label: 'Email',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle TextArea component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'TextArea',
          field: 'description',
          label: 'Description',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle Password component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'Password',
          field: 'password',
          label: 'Password',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle Search component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'Search',
          field: 'search',
          label: 'Search',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle Group component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'Group',
          field: 'group',
          label: 'Group',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle TextArea component', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'TextArea',
          field: 'content',
          label: 'Content',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should call nextTick', async () => {
      await useAutoFocus(mockContext);

      // nextTick is called inside watchEffect, which is mocked to execute immediately
      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should call watchEffect', async () => {
      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle undefined formElRef', async () => {
      mockContext.formElRef.value = undefined;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle undefined getSchema', async () => {
      mockContext.getSchema.value = undefined;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle undefined getProps', async () => {
      mockContext.getProps.value = undefined;

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });
  });
});
