import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Input: {
    TextArea: 'InputTextArea',
  },
  Checkbox: 'Checkbox',
  InputNumber: 'InputNumber',
  Switch: 'Switch',
  DatePicker: 'DatePicker',
  TimePicker: 'TimePicker',
  AutoComplete: 'AutoComplete',
}));

// Mock Form components
vi.mock('/@/components/Form', () => ({
  Select: 'Select',
  TreeSelect: 'TreeSelect',
  RadioButtonGroup: 'RadioButtonGroup',
  RadioGroup: 'RadioGroup',
  CheckboxGroup: 'CheckboxGroup',
}));

import { add, del, componentMap } from '/@/components/Table/src/componentMap';
import type { ComponentType } from '/@/components/Table/src/types/componentType';

describe('componentMap coverage', () => {
  beforeEach(() => {
    // Clear any existing custom components
    const keysToDelete: ComponentType[] = [];
    componentMap.forEach((_, key) => {
      if (!isDefaultComponent(key)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => componentMap.delete(key));
  });

  function isDefaultComponent(key: ComponentType): boolean {
    const defaultComponents: ComponentType[] = [
      'Input',
      'InputTextArea',
      'InputNumber',
      'Select',
      'TreeSelect',
      'RadioButtonGroup',
      'RadioGroup',
      'CheckboxGroup',
      'Switch',
      'Checkbox',
      'DatePicker',
      'TimePicker',
      'AutoComplete',
    ];
    return defaultComponents.includes(key);
  }

  it('should have all default components registered', () => {
    expect(componentMap.get('Input')).toEqual({ TextArea: 'InputTextArea' });
    expect(componentMap.get('InputTextArea')).toBe('InputTextArea');
    expect(componentMap.get('InputNumber')).toBe('InputNumber');
    expect(componentMap.get('Select')).toBe('Select');
    expect(componentMap.get('TreeSelect')).toBe('TreeSelect');
    expect(componentMap.get('RadioButtonGroup')).toBe('RadioButtonGroup');
    expect(componentMap.get('RadioGroup')).toBe('RadioGroup');
    expect(componentMap.get('CheckboxGroup')).toBe('CheckboxGroup');
    expect(componentMap.get('Switch')).toBe('Switch');
    expect(componentMap.get('Checkbox')).toBe('Checkbox');
    expect(componentMap.get('DatePicker')).toBe('DatePicker');
    expect(componentMap.get('TimePicker')).toBe('TimePicker');
    expect(componentMap.get('AutoComplete')).toBe('AutoComplete');
  });

  it('should add custom component', () => {
    const customComponent = { name: 'CustomComponent' } as any;

    add('CustomComponent' as ComponentType, customComponent);

    expect(componentMap.get('CustomComponent' as ComponentType)).toBe(customComponent);
  });

  it('should delete custom component', () => {
    const customComponent = { name: 'CustomComponent' } as any;

    add('CustomComponent' as ComponentType, customComponent);
    expect(componentMap.has('CustomComponent' as ComponentType)).toBe(true);

    del('CustomComponent' as ComponentType);
    expect(componentMap.has('CustomComponent' as ComponentType)).toBe(false);
  });

  it('should handle adding multiple custom components', () => {
    const component1 = { name: 'Component1' } as any;
    const component2 = { name: 'Component2' } as any;

    add('Component1' as ComponentType, component1);
    add('Component2' as ComponentType, component2);

    expect(componentMap.get('Component1' as ComponentType)).toBe(component1);
    expect(componentMap.get('Component2' as ComponentType)).toBe(component2);
  });

  it('should handle deleting non-existent component', () => {
    expect(() => {
      del('NonExistentComponent' as ComponentType);
    }).not.toThrow();

    expect(componentMap.has('NonExistentComponent' as ComponentType)).toBe(false);
  });

  it('should handle overwriting existing component', () => {
    const originalComponent = componentMap.get('Input');
    const newComponent = { name: 'NewInput' } as any;

    add('Input', newComponent);

    expect(componentMap.get('Input')).toBe(newComponent);
    expect(componentMap.get('Input')).not.toBe(originalComponent);
  });

  it('should handle different component types', () => {
    const testComponents = [
      { name: 'StringComponent', type: 'StringComponent' as ComponentType },
      { name: 'NumberComponent', type: 'NumberComponent' as ComponentType },
      { name: 'BooleanComponent', type: 'BooleanComponent' as ComponentType },
    ];

    testComponents.forEach(({ name, type }) => {
      const component = { name } as any;
      add(type, component);
      expect(componentMap.get(type)).toBe(component);
    });
  });

  it('should handle null and undefined components', () => {
    add('NullComponent' as ComponentType, null as any);
    add('UndefinedComponent' as ComponentType, undefined as any);

    expect(componentMap.get('NullComponent' as ComponentType)).toBeNull();
    expect(componentMap.get('UndefinedComponent' as ComponentType)).toBeUndefined();
  });

  it('should handle function components', () => {
    const functionComponent = () => 'Function Component';

    add('FunctionComponent' as ComponentType, functionComponent);

    expect(componentMap.get('FunctionComponent' as ComponentType)).toBe(functionComponent);
  });

  it('should handle object components with render method', () => {
    const objectComponent = {
      name: 'ObjectComponent',
      render: () => 'Object Component',
    };

    add('ObjectComponent' as ComponentType, objectComponent);

    expect(componentMap.get('ObjectComponent' as ComponentType)).toBe(objectComponent);
  });

  it('should maintain map size correctly', () => {
    const initialSize = componentMap.size;

    add('TestComponent' as ComponentType, {} as any);
    expect(componentMap.size).toBe(initialSize + 1);

    del('TestComponent' as ComponentType);
    expect(componentMap.size).toBe(initialSize);
  });

  it('should handle case sensitivity', () => {
    const component1 = { name: 'Component1' } as any;
    const component2 = { name: 'Component2' } as any;

    add('component1' as ComponentType, component1);
    add('Component1' as ComponentType, component2);

    expect(componentMap.get('component1' as ComponentType)).toBe(component1);
    expect(componentMap.get('Component1' as ComponentType)).toBe(component2);
    expect(componentMap.size).toBeGreaterThan(13); // 13 default + 2 custom
  });

  it('should handle special characters in component names', () => {
    const specialComponent = { name: 'Special-Component' } as any;

    add('Special-Component' as ComponentType, specialComponent);

    expect(componentMap.get('Special-Component' as ComponentType)).toBe(specialComponent);
  });

  it('should handle empty string component name', () => {
    const emptyComponent = { name: 'Empty' } as any;

    add('' as ComponentType, emptyComponent);

    expect(componentMap.get('' as ComponentType)).toBe(emptyComponent);
  });

  it('should export componentMap as Map instance', () => {
    expect(componentMap).toBeInstanceOf(Map);
    expect(typeof componentMap.set).toBe('function');
    expect(typeof componentMap.get).toBe('function');
    expect(typeof componentMap.has).toBe('function');
    expect(typeof componentMap.delete).toBe('function');
  });
});
