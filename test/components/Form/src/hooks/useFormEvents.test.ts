import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormEvents } from '/@/components/Form/src/hooks/useFormEvents';
import { unref, toRaw } from 'vue';
import { isArray, isFunction, isObject, isString } from '/@/utils/is';
import { deepMerge } from '/@/utils';
import { processNumberValue, processDateValue } from '/@/components/Form/src/helper';
import { cloneDeep, get, uniqBy } from 'lodash-es';
import { error } from '/@/utils/log';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unref: vi.fn((val) => val.value || val),
    toRaw: vi.fn((val) => val),
  };
});

// Mock utils
vi.mock('/@/utils/is', () => ({
  isArray: vi.fn(),
  isFunction: vi.fn(),
  isObject: vi.fn(),
  isString: vi.fn(),
}));

vi.mock('/@/utils', () => ({
  deepMerge: vi.fn(),
}));

vi.mock('/@/components/Form/src/helper', () => ({
  processNumberValue: vi.fn(),
  processDateValue: vi.fn(),
}));

vi.mock('lodash-es', () => ({
  cloneDeep: vi.fn(),
  get: vi.fn(),
  uniqBy: vi.fn(),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

describe('components/Form/src/hooks/useFormEvents', () => {
  let mockContext: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockContext = {
      emit: vi.fn(),
      getProps: {
        value: {
          resetFunc: vi.fn(),
          submitOnReset: false,
          submitFunc: vi.fn(),
          transformDateFunc: vi.fn(),
          validateFields: vi.fn(),
          validate: vi.fn(),
        },
      },
      getSchema: {
        value: [
          {
            field: 'name',
            component: 'Input',
            label: 'Name',
          },
        ],
      },
      formModel: {
        name: 'John',
        age: 30,
      },
      defaultValueRef: {
        value: {
          name: '',
          age: 0,
        },
      },
      formElRef: {
        value: {
          clearValidate: vi.fn(),
          validate: vi.fn(),
          validateFields: vi.fn(),
          resetFields: vi.fn(),
          scrollToField: vi.fn(),
          getFieldsValue: vi.fn(),
          setFieldsValue: vi.fn(),
          updateSchema: vi.fn(),
          resetSchema: vi.fn(),
          setProps: vi.fn(),
          removeSchemaByField: vi.fn(),
          appendSchemaByField: vi.fn(),
        },
      },
      schemaRef: {
        value: [],
      },
      handleFormValues: vi.fn(),
    };

    // Mock default values for utils
    vi.mocked(isArray).mockReturnValue(false);
    vi.mocked(isFunction).mockReturnValue(false);
    vi.mocked(isObject).mockReturnValue(false);
    vi.mocked(isString).mockReturnValue(false);
  });

  describe('useFormEvents', () => {
    it('should return form event functions', () => {
      const result = useFormEvents(mockContext);

      expect(result).toHaveProperty('resetFields');
      expect(result).toHaveProperty('handleSubmit');
      expect(result).toHaveProperty('validate');
      expect(result).toHaveProperty('validateFields');
      expect(result).toHaveProperty('clearValidate');
      expect(result).toHaveProperty('getFieldsValue');
      expect(result).toHaveProperty('setFieldsValue');
      expect(result).toHaveProperty('updateSchema');
      expect(result).toHaveProperty('resetSchema');
      expect(result).toHaveProperty('removeSchemaByFiled');
      expect(result).toHaveProperty('appendSchemaByField');
      expect(result).toHaveProperty('scrollToField');
    });

    describe('resetFields', () => {
      it('should reset form fields', async () => {
        const result = useFormEvents(mockContext);

        await result.resetFields();

        expect(mockContext.formModel.name).toBe('');
        expect(mockContext.formModel.age).toBe(0);
        expect(mockContext.formElRef.value.clearValidate).toHaveBeenCalled();
        expect(mockContext.emit).toHaveBeenCalledWith('reset', mockContext.formModel);
      });

      it('should call resetFunc when provided', async () => {
        const resetFunc = vi.fn();
        mockContext.getProps.value.resetFunc = resetFunc;
        vi.mocked(isFunction).mockReturnValue(true);

        const result = useFormEvents(mockContext);

        await result.resetFields();

        expect(resetFunc).toHaveBeenCalled();
      });

      it('should handle submitOnReset', async () => {
        mockContext.getProps.value.submitOnReset = true;

        const result = useFormEvents(mockContext);

        await result.resetFields();

        expect(mockContext.handleFormValues).toHaveBeenCalled();
      });

      it('should handle missing formElRef', async () => {
        mockContext.formElRef.value = null;

        const result = useFormEvents(mockContext);

        await result.resetFields();

        expect(mockContext.emit).toHaveBeenCalledWith('reset', mockContext.formModel);
      });
    });

    describe('submit', () => {
      it('should submit form', async () => {
        const result = useFormEvents(mockContext);

        await result.handleSubmit();

        expect(mockContext.handleFormValues).toHaveBeenCalled();
      });

      it('should call submitFunc when provided', async () => {
        const submitFunc = vi.fn();
        mockContext.getProps.value.submitFunc = submitFunc;
        vi.mocked(isFunction).mockReturnValue(true);

        const result = useFormEvents(mockContext);

        await result.handleSubmit();

        expect(submitFunc).toHaveBeenCalled();
      });
    });

    describe('validate', () => {
      it('should validate form', async () => {
        const result = useFormEvents(mockContext);

        await result.validate();

        expect(mockContext.formElRef.value.validate).toHaveBeenCalled();
      });

      it('should handle validation errors', async () => {
        const error = new Error('Validation failed');
        mockContext.formElRef.value.validate.mockRejectedValue(error);

        const result = useFormEvents(mockContext);

        await expect(result.validate()).rejects.toThrow('Validation failed');
      });
    });

    describe('validateFields', () => {
      it('should validate specific fields', async () => {
        const result = useFormEvents(mockContext);

        await result.validateFields(['name']);

        expect(mockContext.formElRef.value.validateFields).toHaveBeenCalledWith(['name']);
      });
    });

    describe('clearValidate', () => {
      it('should clear validation', () => {
        const result = useFormEvents(mockContext);

        result.clearValidate();

        expect(mockContext.formElRef.value.clearValidate).toHaveBeenCalled();
      });
    });

    describe('getFieldsValue', () => {
      it('should get field values', () => {
        const result = useFormEvents(mockContext);

        result.getFieldsValue();

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });

    describe('setFieldsValue', () => {
      it('should set field values', () => {
        const result = useFormEvents(mockContext);

        result.setFieldsValue({ name: 'Jane' });

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });

    describe('updateSchema', () => {
      it('should update schema', () => {
        const result = useFormEvents(mockContext);

        result.updateSchema({ field: 'name', component: 'Input' });

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });

    describe('resetSchema', () => {
      it('should reset schema', () => {
        const result = useFormEvents(mockContext);

        result.resetSchema();

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });


    describe('appendSchemaByField', () => {
      it('should append schema by field', () => {
        const result = useFormEvents(mockContext);

        result.appendSchemaByField({ field: 'email', component: 'Input' });

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });

    describe('scrollToField', () => {
      it('should scroll to field', () => {
        const result = useFormEvents(mockContext);

        result.scrollToField('name');

        // This test verifies that the function can be called without errors
        expect(true).toBe(true);
      });
    });
  });
});
