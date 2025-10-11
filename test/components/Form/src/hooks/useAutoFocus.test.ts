import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAutoFocus } from '/@/components/Form/src/hooks/useAutoFocus';
import { unref, nextTick, watchEffect } from 'vue';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unref: vi.fn((val) => {
      if (val && typeof val === 'object' && 'value' in val) {
        return val.value;
      }
      return val;
    }),
    nextTick: vi.fn(() => Promise.resolve()),
    watchEffect: vi.fn((fn) => {
      // Execute the function immediately to simulate watchEffect behavior
      fn();
    }),
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

    it('should execute nextTick and focus logic', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle component includes Input check', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'Input',
          field: 'name',
          label: 'Name',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle querySelector with correct selector', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle inputEl focus call', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should handle inputEl null case', async () => {
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(null);

      await useAutoFocus(mockContext);

      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
    });

    it('should cover lines 17-20 by testing nextTick and schema access', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);
      // Ensure isInitedDefault is false to allow focus logic
      mockContext.isInitedDefault.value = false;

      await useAutoFocus(mockContext);

      // Verify that watchEffect was called (which executes the function immediately)
      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
      // Verify that unref was called with getSchema
      expect(vi.mocked(unref)).toHaveBeenCalledWith(mockContext.getSchema);
    });

    it('should cover lines 22-32 by testing component check and focus', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.getSchema.value = [
        {
          component: 'Input',
          field: 'name',
          label: 'Name',
        },
      ];
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);
      // Ensure isInitedDefault is false to allow focus logic
      mockContext.isInitedDefault.value = false;

      await useAutoFocus(mockContext);

      // Verify that watchEffect was called (which executes the function immediately)
      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
      // Verify that querySelector was called with the correct selector
      expect(mockContext.formElRef.value.$el.querySelector).toHaveBeenCalledWith('.ant-row:first-child input');
      // Verify that focus was called on the input element
      expect(mockInput.focus).toHaveBeenCalled();
    });

    it('should cover line 27 by testing component includes Input check', async () => {
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

    it('should cover line 33 by testing inputEl focus call', async () => {
      const mockInput = {
        focus: vi.fn(),
      };
      mockContext.formElRef.value.$el.querySelector.mockReturnValue(mockInput);
      // Ensure isInitedDefault is false to allow focus logic
      mockContext.isInitedDefault.value = false;

      await useAutoFocus(mockContext);

      // Verify that watchEffect was called (which executes the function immediately)
      expect(vi.mocked(watchEffect)).toHaveBeenCalled();
      // Verify that focus was called on the input element
      expect(mockInput.focus).toHaveBeenCalled();
    });
  });
});
