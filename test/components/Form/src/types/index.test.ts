import { describe, it, expect } from 'vitest';
import type { ColEx, ComponentType } from '/@/components/Form/src/types/index';

describe('components/Form/src/types/index', () => {
  describe('ColEx interface', () => {
    it('should define ColEx with all optional properties', () => {
      const colEx: ColEx = {
        span: 12,
        order: 1,
        flex: 'auto',
        offset: 2,
        push: 1,
        pull: 0,
        style: { color: 'red' },
      };

      expect(colEx.span).toBe(12);
      expect(colEx.order).toBe(1);
      expect(colEx.flex).toBe('auto');
      expect(colEx.offset).toBe(2);
      expect(colEx.push).toBe(1);
      expect(colEx.pull).toBe(0);
      expect(colEx.style).toEqual({ color: 'red' });
    });

    it('should support string values for span, order, flex, offset, push, pull', () => {
      const colEx: ColEx = {
        span: '12',
        order: '1',
        flex: '1 1 auto',
        offset: '2',
        push: '1',
        pull: '0',
      };

      expect(typeof colEx.span).toBe('string');
      expect(typeof colEx.order).toBe('string');
      expect(typeof colEx.flex).toBe('string');
      expect(typeof colEx.offset).toBe('string');
      expect(typeof colEx.push).toBe('string');
      expect(typeof colEx.pull).toBe('string');
    });

    it('should support number values for span, order, flex, offset, push, pull', () => {
      const colEx: ColEx = {
        span: 24,
        order: 2,
        flex: 1,
        offset: 4,
        push: 2,
        pull: 1,
      };

      expect(typeof colEx.span).toBe('number');
      expect(typeof colEx.order).toBe('number');
      expect(typeof colEx.flex).toBe('number');
      expect(typeof colEx.offset).toBe('number');
      expect(typeof colEx.push).toBe('number');
      expect(typeof colEx.pull).toBe('number');
    });

    it('should support responsive breakpoint properties with span value', () => {
      const colEx: ColEx = {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 6,
        xl: 4,
        xxl: 3,
      };

      expect(colEx.xs).toBe(24);
      expect(colEx.sm).toBe(12);
      expect(colEx.md).toBe(8);
      expect(colEx.lg).toBe(6);
      expect(colEx.xl).toBe(4);
      expect(colEx.xxl).toBe(3);
    });

    it('should support responsive breakpoint properties with object values', () => {
      const colEx: ColEx = {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 6 },
        md: { span: 8, offset: 8 },
        lg: { span: 6, offset: 9 },
        xl: { span: 4, offset: 10 },
        xxl: { span: 3, offset: 10.5 },
      };

      expect(colEx.xs).toEqual({ span: 24, offset: 0 });
      expect(colEx.sm).toEqual({ span: 12, offset: 6 });
      expect(colEx.md).toEqual({ span: 8, offset: 8 });
      expect(colEx.lg).toEqual({ span: 6, offset: 9 });
      expect(colEx.xl).toEqual({ span: 4, offset: 10 });
      expect(colEx.xxl).toEqual({ span: 3, offset: 10.5 });
    });

    it('should support mixed responsive properties', () => {
      const colEx: ColEx = {
        xs: 24,
        sm: { span: 12, offset: 0 },
        md: 8,
        lg: { span: 6, offset: 3 },
        xl: 4,
        xxl: { span: 3, offset: 0 },
      };

      expect(typeof colEx.xs).toBe('number');
      expect(typeof colEx.sm).toBe('object');
      expect(typeof colEx.md).toBe('number');
      expect(typeof colEx.lg).toBe('object');
      expect(typeof colEx.xl).toBe('number');
      expect(typeof colEx.xxl).toBe('object');
    });

    it('should support empty ColEx object', () => {
      const colEx: ColEx = {};

      expect(Object.keys(colEx)).toHaveLength(0);
    });

    it('should support zero values', () => {
      const colEx: ColEx = {
        span: 0,
        order: 0,
        flex: 0,
        offset: 0,
        push: 0,
        pull: 0,
      };

      expect(colEx.span).toBe(0);
      expect(colEx.order).toBe(0);
      expect(colEx.flex).toBe(0);
      expect(colEx.offset).toBe(0);
      expect(colEx.push).toBe(0);
      expect(colEx.pull).toBe(0);
    });

    it('should support complex style objects', () => {
      const colEx: ColEx = {
        style: {
          backgroundColor: '#f0f0f0',
          padding: '10px',
          margin: '5px 0',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
        },
      };

      expect(colEx.style).toHaveProperty('backgroundColor', '#f0f0f0');
      expect(colEx.style).toHaveProperty('padding', '10px');
      expect(colEx.style).toHaveProperty('borderRadius', '4px');
    });
  });

  describe('ComponentType union type', () => {
    it('should support Input component type', () => {
      const componentType: ComponentType = 'Input';
      expect(componentType).toBe('Input');
    });

    it('should support InputGroup component type', () => {
      const componentType: ComponentType = 'InputGroup';
      expect(componentType).toBe('InputGroup');
    });

    it('should support InputPassword component type', () => {
      const componentType: ComponentType = 'InputPassword';
      expect(componentType).toBe('InputPassword');
    });

    it('should support InputSearch component type', () => {
      const componentType: ComponentType = 'InputSearch';
      expect(componentType).toBe('InputSearch');
    });

    it('should support InputTextArea component type', () => {
      const componentType: ComponentType = 'InputTextArea';
      expect(componentType).toBe('InputTextArea');
    });

    it('should support InputNumber component type', () => {
      const componentType: ComponentType = 'InputNumber';
      expect(componentType).toBe('InputNumber');
    });

    it('should support InputCountDown component type', () => {
      const componentType: ComponentType = 'InputCountDown';
      expect(componentType).toBe('InputCountDown');
    });

    it('should support Text component type', () => {
      const componentType: ComponentType = 'Text';
      expect(componentType).toBe('Text');
    });

    it('should support Select component type', () => {
      const componentType: ComponentType = 'Select';
      expect(componentType).toBe('Select');
    });

    it('should support TreeSelect component type', () => {
      const componentType: ComponentType = 'TreeSelect';
      expect(componentType).toBe('TreeSelect');
    });

    it('should support RadioButtonGroup component type', () => {
      const componentType: ComponentType = 'RadioButtonGroup';
      expect(componentType).toBe('RadioButtonGroup');
    });

    it('should support RadioGroup component type', () => {
      const componentType: ComponentType = 'RadioGroup';
      expect(componentType).toBe('RadioGroup');
    });

    it('should support Checkbox component type', () => {
      const componentType: ComponentType = 'Checkbox';
      expect(componentType).toBe('Checkbox');
    });

    it('should support CheckboxGroup component type', () => {
      const componentType: ComponentType = 'CheckboxGroup';
      expect(componentType).toBe('CheckboxGroup');
    });

    it('should support AutoComplete component type', () => {
      const componentType: ComponentType = 'AutoComplete';
      expect(componentType).toBe('AutoComplete');
    });

    it('should support Cascader component type', () => {
      const componentType: ComponentType = 'Cascader';
      expect(componentType).toBe('Cascader');
    });

    it('should support DatePicker component type', () => {
      const componentType: ComponentType = 'DatePicker';
      expect(componentType).toBe('DatePicker');
    });

    it('should support MonthPicker component type', () => {
      const componentType: ComponentType = 'MonthPicker';
      expect(componentType).toBe('MonthPicker');
    });

    it('should support RangePicker component type', () => {
      const componentType: ComponentType = 'RangePicker';
      expect(componentType).toBe('RangePicker');
    });

    it('should support WeekPicker component type', () => {
      const componentType: ComponentType = 'WeekPicker';
      expect(componentType).toBe('WeekPicker');
    });

    it('should support TimePicker component type', () => {
      const componentType: ComponentType = 'TimePicker';
      expect(componentType).toBe('TimePicker');
    });

    it('should support Switch component type', () => {
      const componentType: ComponentType = 'Switch';
      expect(componentType).toBe('Switch');
    });

    it('should support StrengthMeter component type', () => {
      const componentType: ComponentType = 'StrengthMeter';
      expect(componentType).toBe('StrengthMeter');
    });

    it('should support IconPicker component type', () => {
      const componentType: ComponentType = 'IconPicker';
      expect(componentType).toBe('IconPicker');
    });

    it('should support Render component type', () => {
      const componentType: ComponentType = 'Render';
      expect(componentType).toBe('Render');
    });

    it('should support Slider component type', () => {
      const componentType: ComponentType = 'Slider';
      expect(componentType).toBe('Slider');
    });

    it('should support Rate component type', () => {
      const componentType: ComponentType = 'Rate';
      expect(componentType).toBe('Rate');
    });

    it('should support None component type', () => {
      const componentType: ComponentType = 'None';
      expect(componentType).toBe('None');
    });

    it('should support Divider component type', () => {
      const componentType: ComponentType = 'Divider';
      expect(componentType).toBe('Divider');
    });

    it('should support FormGroup component type', () => {
      const componentType: ComponentType = 'FormGroup';
      expect(componentType).toBe('FormGroup');
    });

    it('should support array of component types', () => {
      const componentTypes: ComponentType[] = ['Input', 'Select', 'DatePicker', 'Switch', 'Checkbox'];

      expect(componentTypes).toHaveLength(5);
      expect(componentTypes).toContain('Input');
      expect(componentTypes).toContain('Select');
      expect(componentTypes).toContain('DatePicker');
      expect(componentTypes).toContain('Switch');
      expect(componentTypes).toContain('Checkbox');
    });

    it('should support function that accepts ComponentType', () => {
      function processComponent(type: ComponentType): string {
        return `Processing ${type} component`;
      }

      expect(processComponent('Input')).toBe('Processing Input component');
      expect(processComponent('DatePicker')).toBe('Processing DatePicker component');
      expect(processComponent('FormGroup')).toBe('Processing FormGroup component');
    });
  });
});
