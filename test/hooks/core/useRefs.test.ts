import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import { useRefs } from '/@/hooks/core/useRefs';

describe('hooks/core/useRefs', () => {
  it('should create refs array and setRefs function', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    
    expect(refs.value).toEqual([]);
    expect(typeof setRefs).toBe('function');
  });

  it('should set ref at specific index', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement = document.createElement('div');
    
    const setRef = setRefs(0);
    setRef(mockElement);
    
    expect(refs.value[0]).toBe(mockElement);
  });

  it('should set multiple refs at different indices', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('span');
    
    const setRef1 = setRefs(0);
    const setRef2 = setRefs(1);
    
    setRef1(mockElement1);
    setRef2(mockElement2);
    
    expect(refs.value[0]).toBe(mockElement1);
    expect(refs.value[1]).toBe(mockElement2);
  });

  it('should handle null elements', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    
    const setRef = setRefs(0);
    setRef(null);
    
    expect(refs.value[0]).toBe(null);
  });

  it('should handle undefined elements', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    
    const setRef = setRefs(0);
    setRef(undefined as any);
    
    expect(refs.value[0]).toBe(undefined);
  });

  it('should work with different element types', () => {
    const { refs, setRefs } = useRefs<Element>();
    const mockDiv = document.createElement('div');
    const mockSpan = document.createElement('span');
    const mockButton = document.createElement('button');
    
    const setRef0 = setRefs(0);
    const setRef1 = setRefs(1);
    const setRef2 = setRefs(2);
    
    setRef0(mockDiv);
    setRef1(mockSpan);
    setRef2(mockButton);
    
    expect(refs.value[0]).toBe(mockDiv);
    expect(refs.value[1]).toBe(mockSpan);
    expect(refs.value[2]).toBe(mockButton);
  });

  it('should work with component instances', () => {
    const { refs, setRefs } = useRefs<any>();
    const mockComponent = { $el: document.createElement('div') };
    
    const setRef = setRefs(0);
    setRef(mockComponent);
    
    expect(refs.value[0]).toBe(mockComponent);
  });

  it('should handle sparse arrays', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement1 = document.createElement('div');
    const mockElement3 = document.createElement('span');
    
    const setRef1 = setRefs(1);
    const setRef3 = setRefs(3);
    
    setRef1(mockElement1);
    setRef3(mockElement3);
    
    expect(refs.value[1]).toBe(mockElement1);
    expect(refs.value[3]).toBe(mockElement3);
    expect(refs.value[0]).toBe(undefined);
    expect(refs.value[2]).toBe(undefined);
  });

  it('should overwrite existing refs', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('span');
    
    const setRef = setRefs(0);
    setRef(mockElement1);
    expect(refs.value[0]).toBe(mockElement1);
    
    setRef(mockElement2);
    expect(refs.value[0]).toBe(mockElement2);
  });

  it('should work with large indices', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement = document.createElement('div');
    
    const setRef = setRefs(100);
    setRef(mockElement);
    
    expect(refs.value[100]).toBe(mockElement);
  });

  it('should maintain refs array structure', () => {
    const { refs, setRefs } = useRefs<HTMLElement>();
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('span');
    const mockElement3 = document.createElement('button');
    
    const setRef1 = setRefs(0);
    const setRef2 = setRefs(2);
    const setRef3 = setRefs(4);
    
    setRef1(mockElement1);
    setRef2(mockElement2);
    setRef3(mockElement3);
    
    expect(refs.value.length).toBeGreaterThanOrEqual(5);
    expect(refs.value[0]).toBe(mockElement1);
    expect(refs.value[2]).toBe(mockElement2);
    expect(refs.value[4]).toBe(mockElement3);
  });
});