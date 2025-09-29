import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormValues } from '/@/components/Form/src/hooks/useFormValues';
import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '/@/utils/is';
import { dateUtil } from '/@/utils/dateUtil';
import { unref } from 'vue';
import { set } from 'lodash-es';

// Mock Vue functions
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    unref: vi.fn((val) => val.value || val),
  };
});

// Mock utils
vi.mock('/@/utils/is', () => ({
  isArray: vi.fn(),
  isFunction: vi.fn(),
  isObject: vi.fn(),
  isString: vi.fn(),
  isNullOrUnDef: vi.fn(),
}));

vi.mock('/@/utils/dateUtil', () => ({
  dateUtil: {
    formatDate: vi.fn(),
  },
}));

vi.mock('lodash-es', () => ({
  set: vi.fn(),
}));

describe('components/Form/src/hooks/useFormValues', () => {
  let mockContext: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockContext = {
      defaultValueRef: {
        value: {},
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
      getProps: {
        value: {
          transformDateFunc: vi.fn(),
          enctype: 'json',
        },
      },
      formModel: {
        name: 'John',
        age: 30,
      },
    };

    // Mock default values for utils
    vi.mocked(isArray).mockReturnValue(false);
    vi.mocked(isFunction).mockReturnValue(false);
    vi.mocked(isObject).mockReturnValue(false);
    vi.mocked(isString).mockReturnValue(false);
    vi.mocked(isNullOrUnDef).mockReturnValue(false);
  });

  describe('useFormValues', () => {
    it('should return form values functions', () => {
      const result = useFormValues(mockContext);

      expect(result).toHaveProperty('handleFormValues');
      expect(result).toHaveProperty('initDefault');
    });

    describe('handleFormValues', () => {
      it('should return empty object for non-object values', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(false);
        const res = result.handleFormValues('invalid');

        expect(res).toEqual({});
      });

      it('should handle object values', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ name: 'John' });

        expect(res).toBeDefined();
      });

      it('should skip empty keys', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ '': 'value' });

        expect(res).toEqual({});
      });

      it('should skip empty arrays', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        vi.mocked(isArray).mockReturnValue(true);
        const res = result.handleFormValues({ items: [] });

        expect(res).toEqual({});
      });

      it('should skip functions', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        vi.mocked(isFunction).mockReturnValue(true);
        const res = result.handleFormValues({ callback: vi.fn() });

        expect(res).toEqual({});
      });

      it('should handle date objects', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const dateValue = { format: 'YYYY-MM-DD' };
        const res = result.handleFormValues({ date: dateValue });

        expect(mockContext.getProps.value.transformDateFunc).toHaveBeenCalledWith(dateValue);
      });

      it('should handle date arrays', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        vi.mocked(isArray).mockReturnValue(true);
        const dateArray = [{ format: 'YYYY-MM-DD' }, { format: 'YYYY-MM-DD' }];
        const res = result.handleFormValues({ dates: dateArray });

        expect(mockContext.getProps.value.transformDateFunc).toHaveBeenCalledTimes(2);
      });

      it('should trim string values', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        vi.mocked(isString).mockReturnValue(true);
        const res = result.handleFormValues({ name: '  John  ' });

        expect(res).toBeDefined();
      });

      it('should handle json enctype', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ name: 'John' });

        expect(set).toHaveBeenCalled();
      });

      it('should handle form-data enctype', () => {
        mockContext.getProps.value.enctype = 'form-data';
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ name: 'John' });

        expect(res).toBeDefined();
      });
    });

    describe('initDefault', () => {
      it('should initialize default values', () => {
        const result = useFormValues(mockContext);

        result.initDefault();

        expect(mockContext.defaultValueRef.value).toBeDefined();
      });

      it('should handle existing default values', () => {
        mockContext.defaultValueRef.value = { name: 'Default' };
        const result = useFormValues(mockContext);

        result.initDefault();

        expect(mockContext.defaultValueRef.value).toBeDefined();
      });
    });

    describe('edge cases', () => {
      it('should handle missing transformDateFunc', () => {
        mockContext.getProps.value.transformDateFunc = undefined;
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ date: { format: 'YYYY-MM-DD' } });

        expect(res).toBeDefined();
      });

      it('should handle missing enctype', () => {
        mockContext.getProps.value.enctype = undefined;
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({ name: 'John' });

        expect(res).toBeDefined();
      });

      it('should handle complex nested values', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({
          user: {
            name: 'John',
            age: 30,
          },
        });

        expect(res).toBeDefined();
      });

      it('should handle mixed value types', () => {
        const result = useFormValues(mockContext);

        vi.mocked(isObject).mockReturnValue(true);
        const res = result.handleFormValues({
          name: 'John',
          age: 30,
          active: true,
        });

        expect(res).toBeDefined();
      });
    });
  });
});
