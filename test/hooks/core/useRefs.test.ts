import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRefs } from '/@/hooks/core/useRefs';

// Mock Vue functions
vi.mock('vue', () => ({
  onBeforeUpdate: vi.fn(),
  shallowRef: vi.fn(() => ({ value: [] })),
}));

import { onBeforeUpdate, shallowRef } from 'vue';

describe('hooks/core/useRefs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return refs and setRefs function', () => {
    const result = useRefs();

    expect(result).toHaveProperty('refs');
    expect(result).toHaveProperty('setRefs');
    expect(typeof result.setRefs).toBe('function');
  });

  it('should initialize with empty array', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { refs } = useRefs();

    expect(shallowRef).toHaveBeenCalledWith([]);
    expect(refs.value).toEqual([]);
  });

  it('should register onBeforeUpdate hook', () => {
    useRefs();

    expect(onBeforeUpdate).toHaveBeenCalledTimes(1);
    expect(typeof (onBeforeUpdate as any).mock.calls[0][0]).toBe('function');
  });

  it('should clear refs array on before update', () => {
    const mockRef = { value: ['existing', 'elements'] };
    (shallowRef as any).mockReturnValue(mockRef);

    useRefs();

    // Get the onBeforeUpdate callback and execute it
    const beforeUpdateCallback = (onBeforeUpdate as any).mock.calls[0][0];
    beforeUpdateCallback();

    expect(mockRef.value).toEqual([]);
  });

  it('should set element at specific index', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();
    const mockElement = document.createElement('div');

    const setRefAtIndex = setRefs(2);
    setRefAtIndex(mockElement);

    expect(mockRef.value[2]).toBe(mockElement);
  });

  it('should handle null elements', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();

    const setRefAtIndex = setRefs(0);
    setRefAtIndex(null);

    expect(mockRef.value[0]).toBeNull();
  });

  it('should handle ComponentPublicInstance', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();
    const mockComponent = { $el: document.createElement('div') };

    const setRefAtIndex = setRefs(1);
    setRefAtIndex(mockComponent as any);

    expect(mockRef.value[1]).toBe(mockComponent);
  });

  it('should handle multiple elements at different indices', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();
    const element1 = document.createElement('div');
    const element2 = document.createElement('span');
    const element3 = document.createElement('button');

    setRefs(0)(element1);
    setRefs(5)(element2);
    setRefs(10)(element3);

    expect(mockRef.value[0]).toBe(element1);
    expect(mockRef.value[5]).toBe(element2);
    expect(mockRef.value[10]).toBe(element3);
  });

  it('should overwrite existing element at same index', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();
    const element1 = document.createElement('div');
    const element2 = document.createElement('span');

    const setRefAtIndex = setRefs(0);
    setRefAtIndex(element1);
    setRefAtIndex(element2);

    expect(mockRef.value[0]).toBe(element2);
  });

  it('should work with TypeScript generic type', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    // Test with HTMLDivElement type
    const { refs, setRefs } = useRefs<HTMLDivElement>();
    const divElement = document.createElement('div');

    setRefs(0)(divElement);

    expect(refs.value[0]).toBe(divElement);
  });

  it('should create new setRef function for each index', () => {
    const { setRefs } = useRefs();

    const setRef0 = setRefs(0);
    const setRef1 = setRefs(1);
    const setRef0Again = setRefs(0);

    expect(setRef0).not.toBe(setRef1);
    expect(setRef0).not.toBe(setRef0Again);
    expect(typeof setRef0).toBe('function');
    expect(typeof setRef1).toBe('function');
  });

  it('should handle sparse arrays correctly', () => {
    const mockRef = { value: [] };
    (shallowRef as any).mockReturnValue(mockRef);

    const { setRefs } = useRefs();
    const element = document.createElement('div');

    // Set element at index 100
    setRefs(100)(element);

    expect(mockRef.value[100]).toBe(element);
    expect(mockRef.value.length).toBeGreaterThan(100);
  });
});