import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn(),
}));

vi.mock('/@/components/Form/src/componentMap', () => ({
  add: vi.fn(),
  del: vi.fn(),
}));

import { useComponentRegister } from '/@/components/Form/src/hooks/useComponentRegister';
import { tryOnUnmounted } from '@vueuse/core';
import { add, del } from '/@/components/Form/src/componentMap';
import type { ComponentType } from '/@/components/Form/src/types/index';

const mockTryOnUnmounted = vi.mocked(tryOnUnmounted);
const mockAdd = vi.mocked(add);
const mockDel = vi.mocked(del);

describe('useComponentRegister coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should register component and set up cleanup', () => {
    const compName: ComponentType = 'Input';
    const comp = { name: 'TestComponent' } as any;

    useComponentRegister(compName, comp);

    expect(mockAdd).toHaveBeenCalledWith(compName, comp);
    expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call del when component is unmounted', () => {
    const compName: ComponentType = 'Select';
    const comp = { name: 'TestSelect' } as any;

    useComponentRegister(compName, comp);

    // Get the cleanup function passed to tryOnUnmounted
    const cleanupFunction = mockTryOnUnmounted.mock.calls[0][0];

    // Call the cleanup function
    cleanupFunction();

    expect(mockDel).toHaveBeenCalledWith(compName);
  });

  it('should work with different component types', () => {
    const testCases: Array<{ name: ComponentType; comp: any }> = [
      { name: 'Input', comp: { name: 'Input' } },
      { name: 'Select', comp: { name: 'Select' } },
      { name: 'DatePicker', comp: { name: 'DatePicker' } },
      { name: 'TimePicker', comp: { name: 'TimePicker' } },
    ];

    testCases.forEach(({ name, comp }) => {
      vi.clearAllMocks();

      useComponentRegister(name, comp);

      expect(mockAdd).toHaveBeenCalledWith(name, comp);
      expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should handle null component', () => {
    const compName: ComponentType = 'Input';
    const comp = null as any;

    useComponentRegister(compName, comp);

    expect(mockAdd).toHaveBeenCalledWith(compName, comp);
    expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle undefined component', () => {
    const compName: ComponentType = 'Select';
    const comp = undefined as any;

    useComponentRegister(compName, comp);

    expect(mockAdd).toHaveBeenCalledWith(compName, comp);
    expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle function component', () => {
    const compName: ComponentType = 'Input';
    const comp = () => 'Test Component';

    useComponentRegister(compName, comp);

    expect(mockAdd).toHaveBeenCalledWith(compName, comp);
    expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle object component with render function', () => {
    const compName: ComponentType = 'Select';
    const comp = {
      name: 'TestSelect',
      render: () => 'Test Select Component',
    };

    useComponentRegister(compName, comp);

    expect(mockAdd).toHaveBeenCalledWith(compName, comp);
    expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should handle multiple registrations', () => {
    const comp1: ComponentType = 'Input';
    const comp2: ComponentType = 'Select';
    const component1 = { name: 'Input' };
    const component2 = { name: 'Select' };

    useComponentRegister(comp1, component1);
    useComponentRegister(comp2, component2);

    expect(mockAdd).toHaveBeenCalledTimes(2);
    expect(mockAdd).toHaveBeenNthCalledWith(1, comp1, component1);
    expect(mockAdd).toHaveBeenNthCalledWith(2, comp2, component2);
    expect(mockTryOnUnmounted).toHaveBeenCalledTimes(2);
  });

  it('should handle cleanup function being called multiple times', () => {
    const compName: ComponentType = 'Input';
    const comp = { name: 'TestComponent' } as any;

    useComponentRegister(compName, comp);

    const cleanupFunction = mockTryOnUnmounted.mock.calls[0][0];

    // Call cleanup multiple times
    cleanupFunction();
    cleanupFunction();
    cleanupFunction();

    expect(mockDel).toHaveBeenCalledTimes(3);
    expect(mockDel).toHaveBeenCalledWith(compName);
  });

  it('should handle different component name types', () => {
    const comp = { name: 'TestComponent' } as any;

    // Test with string literal types
    const componentTypes: ComponentType[] = [
      'Input',
      'Select',
      'DatePicker',
      'TimePicker',
      'RadioGroup',
      'CheckboxGroup',
      'Switch',
      'Slider',
      'Rate',
      'Upload',
      'Cascader',
      'TreeSelect',
      'Transfer',
      'Mention',
      'AutoComplete',
      'InputNumber',
      'InputPassword',
      'InputSearch',
      'Textarea',
      'ColorPicker',
    ];

    componentTypes.forEach((compName, index) => {
      vi.clearAllMocks();

      useComponentRegister(compName, comp);

      expect(mockAdd).toHaveBeenCalledWith(compName, comp);
      expect(mockTryOnUnmounted).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
