import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  createPlaceholderMessage,
  dateItemType,
  setComponentRuleType,
  processDateValue,
  processNumberValue,
} from '/@/components/Form/src/helper';
import { useI18n } from '/@/hooks/web/useI18n';
import { dateUtil } from '/@/utils/dateUtil';
import { isNumber } from '/@/utils/is';

// Mock dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        'common.inputText': 'Please input',
        'common.chooseText': 'Please choose',
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock('/@/utils/dateUtil', () => {
  const mockDateInstance = {
    format: vi.fn(() => '2023-09-27'),
  };

  const mockDateUtil = vi.fn(() => mockDateInstance);
  mockDateUtil.formatDate = vi.fn(() => '2023-09-27');
  mockDateUtil.mockReturnValue = vi.fn();

  return {
    dateUtil: mockDateUtil,
  };
});

vi.mock('/@/utils/is', () => ({
  isNumber: vi.fn(),
}));

describe('components/Form/src/helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createPlaceholderMessage', () => {
    it('should return input text for Input components', () => {
      const result = createPlaceholderMessage('Input');
      expect(result).toBe('Please input');
    });

    it('should return input text for Complete components', () => {
      const result = createPlaceholderMessage('AutoComplete');
      expect(result).toBe('Please input');
    });

    it('should return choose text for Picker components', () => {
      const result = createPlaceholderMessage('DatePicker');
      expect(result).toBe('Please choose');
    });

    it('should return choose text for Select components', () => {
      const result = createPlaceholderMessage('Select');
      expect(result).toBe('Please choose');
    });

    it('should return choose text for Cascader components', () => {
      const result = createPlaceholderMessage('Cascader');
      expect(result).toBe('Please choose');
    });

    it('should return choose text for Checkbox components', () => {
      const result = createPlaceholderMessage('Checkbox');
      expect(result).toBe('Please choose');
    });

    it('should return choose text for Radio components', () => {
      const result = createPlaceholderMessage('Radio');
      expect(result).toBe('Please choose');
    });

    it('should return choose text for Switch components', () => {
      const result = createPlaceholderMessage('Switch');
      expect(result).toBe('Please choose');
    });

    it('should return empty string for unknown components', () => {
      const result = createPlaceholderMessage('UnknownComponent');
      expect(result).toBe('');
    });

    it('should handle case sensitivity', () => {
      const result = createPlaceholderMessage('input');
      expect(result).toBe('');
    });

    it('should handle multiple keywords', () => {
      const result = createPlaceholderMessage('InputNumber');
      expect(result).toBe('Please input');
    });
  });

  describe('dateItemType', () => {
    it('should include all date picker types', () => {
      expect(dateItemType).toContain('DatePicker');
      expect(dateItemType).toContain('MonthPicker');
      expect(dateItemType).toContain('WeekPicker');
      expect(dateItemType).toContain('TimePicker');
      expect(dateItemType).toContain('RangePicker');
    });

    it('should have correct length', () => {
      expect(dateItemType).toHaveLength(5);
    });

    it('should be an array', () => {
      expect(Array.isArray(dateItemType)).toBe(true);
    });
  });

  describe('setComponentRuleType', () => {
    it('should set string type for DatePicker with valueFormat', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'DatePicker', 'YYYY-MM-DD');
      expect(rule.type).toBe('string');
    });

    it('should set object type for DatePicker without valueFormat', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'DatePicker', '');
      expect(rule.type).toBe('object');
    });

    it('should set object type for MonthPicker without valueFormat', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'MonthPicker', '');
      expect(rule.type).toBe('object');
    });

    it('should set object type for WeekPicker without valueFormat', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'WeekPicker', '');
      expect(rule.type).toBe('object');
    });

    it('should set object type for TimePicker without valueFormat', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'TimePicker', '');
      expect(rule.type).toBe('object');
    });

    it('should set array type for RangePicker', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'RangePicker', '');
      expect(rule.type).toBe('array');
    });

    it('should set array type for Upload', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'Upload', '');
      expect(rule.type).toBe('array');
    });

    it('should set array type for CheckboxGroup', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'CheckboxGroup', '');
      expect(rule.type).toBe('array');
    });

    it('should set object type for TimePicker', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'TimePicker', '');
      expect(rule.type).toBe('object');
    });

    it('should set number type for InputNumber', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'InputNumber', '');
      expect(rule.type).toBe('number');
    });

    it('should not modify rule for unknown components', () => {
      const rule: any = {};
      setComponentRuleType(rule, 'UnknownComponent', '');
      expect(rule.type).toBeUndefined();
    });
  });

  describe('processDateValue', () => {
    it('should process date value for date components', () => {
      const mockDateInstance = {
        format: vi.fn(() => '2023-09-27'),
      };
      dateUtil.mockReturnValue(mockDateInstance);

      const value = new Date('2023-09-27');
      const component = 'DatePicker';
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      expect(dateUtil).toHaveBeenCalledWith(value);
      expect(result).toBe('2023-09-27');
    });

    it('should return original value for non-date components', () => {
      const value = 'test value';
      const component = 'Input';
      const componentProps = {};

      const result = processDateValue(value, component, componentProps);

      expect(result).toBe(value);
    });

    it('should handle null value', () => {
      const value = null;
      const component = 'DatePicker';
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      expect(result).toBeNull();
    });

    it('should handle undefined value', () => {
      const value = undefined;
      const component = 'DatePicker';
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      expect(result).toBeUndefined();
    });

    it('should handle empty string value', () => {
      const value = '';
      const component = 'DatePicker';
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      expect(result).toBe('');
    });

    it('should handle array value for RangePicker', () => {
      const mockDateInstance = {
        format: vi.fn(() => '2023-09-27'),
      };
      vi.mocked(dateUtil).mockReturnValue(mockDateInstance);

      const value = [new Date('2023-09-27'), new Date('2023-09-28')];
      const component = 'RangePicker';
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      expect(dateUtil).toHaveBeenCalledTimes(2);
      expect(result).toEqual(['2023-09-27', '2023-09-27']);
    });

    it('should handle object value', () => {
      const value = { date: new Date('2023-09-27') };
      const component = 'Input'; // Use non-date component to test original value return
      const componentProps = { valueFormat: 'YYYY-MM-DD' };

      const result = processDateValue(value, component, componentProps);

      // For non-date components, should return the original value
      expect(result).toEqual(value);
    });

    it('should handle array value without valueFormat', () => {
      const mockDateInstance = {
        format: vi.fn(() => '2023-09-27'),
      };
      dateUtil.mockReturnValue(mockDateInstance);

      const value = [new Date('2023-09-27'), new Date('2023-09-28')];
      const component = 'RangePicker';
      const componentProps = {};
      const result = processDateValue(value, component, componentProps);
      
      expect(dateUtil).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('format');
      expect(result[1]).toHaveProperty('format');
    });

    it('should handle single value without valueFormat', () => {
      const mockDateInstance = {
        format: vi.fn(() => '2023-09-27'),
      };
      dateUtil.mockReturnValue(mockDateInstance);

      const value = new Date('2023-09-27');
      const component = 'DatePicker';
      const componentProps = {};
      const result = processDateValue(value, component, componentProps);
      
      expect(dateUtil).toHaveBeenCalledWith(value);
      expect(result).toHaveProperty('format');
    });

    it('should handle array value with null values', () => {
      const mockDateInstance = {
        format: vi.fn(() => '2023-09-27'),
      };
      dateUtil.mockReturnValue(mockDateInstance);

      const value = [new Date('2023-09-27'), null, new Date('2023-09-28')];
      const component = 'RangePicker';
      const componentProps = {};
      const result = processDateValue(value, component, componentProps);
      
      expect(dateUtil).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('format');
      expect(result[1]).toBe(null);
      expect(result[2]).toHaveProperty('format');
    });
  });

  describe('processNumberValue', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should return original value for non-input components', () => {
      const value = 123;
      const component = 'Select';
      const result = processNumberValue(value, component);
      expect(result).toBe(value);
    });

    it('should return original value when value is null', () => {
      const value = null;
      const component = 'Input';
      const result = processNumberValue(value, component);
      expect(result).toBe(value);
    });

    it('should return original value when component is null', () => {
      const value = 123;
      const component = null;
      const result = processNumberValue(value, component);
      expect(result).toBe(value);
    });

    it('should convert number to string for Input components', () => {
      isNumber.mockReturnValue(true);
      const value = 123;
      const component = 'Input';
      const result = processNumberValue(value, component);
      expect(result).toBe('123');
    });

    it('should convert number to string for InputPassword components', () => {
      isNumber.mockReturnValue(true);
      const value = 456;
      const component = 'InputPassword';
      const result = processNumberValue(value, component);
      expect(result).toBe('456');
    });

    it('should convert number to string for InputSearch components', () => {
      isNumber.mockReturnValue(true);
      const value = 789;
      const component = 'InputSearch';
      const result = processNumberValue(value, component);
      expect(result).toBe('789');
    });

    it('should convert number to string for InputTextArea components', () => {
      isNumber.mockReturnValue(true);
      const value = 999;
      const component = 'InputTextArea';
      const result = processNumberValue(value, component);
      expect(result).toBe('999');
    });

    it('should return original value for non-number input', () => {
      isNumber.mockReturnValue(false);
      const value = 'not a number';
      const component = 'Input';
      const result = processNumberValue(value, component);
      expect(result).toBe(value);
    });
  });
});
