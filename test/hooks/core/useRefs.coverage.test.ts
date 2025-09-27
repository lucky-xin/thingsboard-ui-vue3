import { describe, it, expect, vi } from 'vitest';
import { useRefs } from '/@/hooks/core/useRefs';

describe('useRefs coverage', () => {
  it('should return refs and setRefs function', () => {
    const { refs, setRefs } = useRefs();

    expect(refs).toBeDefined();
    expect(setRefs).toBeDefined();
    expect(typeof setRefs).toBe('function');
  });

  it('should initialize with empty array', () => {
    const { refs } = useRefs();

    expect(Array.isArray(refs.value)).toBe(true);
    expect(refs.value).toHaveLength(0);
  });

  it('should create setRefs function that accepts index', () => {
    const { setRefs } = useRefs();
    const setRef = setRefs(0);

    expect(typeof setRef).toBe('function');
  });

  it('should set element at correct index', () => {
    const { refs, setRefs } = useRefs();
    const mockElement = document.createElement('div');
    const setRef = setRefs(0);

    setRef(mockElement);

    expect(refs.value[0]).toBe(mockElement);
  });

  it('should handle multiple elements', () => {
    const { refs, setRefs } = useRefs();
    const element1 = document.createElement('div');
    const element2 = document.createElement('span');

    const setRef1 = setRefs(0);
    const setRef2 = setRefs(1);

    setRef1(element1);
    setRef2(element2);

    expect(refs.value[0]).toBe(element1);
    expect(refs.value[1]).toBe(element2);
  });

  it('should handle null elements', () => {
    const { refs, setRefs } = useRefs();
    const setRef = setRefs(0);

    setRef(null);

    expect(refs.value[0]).toBeNull();
  });

  it('should work with different types', () => {
    const { refs, setRefs } = useRefs<string>();
    const setRef = setRefs(0);

    setRef('test' as any);

    expect(refs.value[0]).toBe('test');
  });
});

