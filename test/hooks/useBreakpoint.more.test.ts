import { describe, it, expect, vi } from 'vitest';
import { createBreakpointListen } from '/@/hooks/event/useBreakpoint';

describe('hooks/event/useBreakpoint more', () => {
  it('should listen resize and call provided callback on change', () => {
    const spy = vi.fn();
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const res = createBreakpointListen(spy);
    expect(res).toBeDefined();
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function), undefined);
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
    // cleanup
    removeSpy.mockRestore();
    addSpy.mockRestore();
  });
});


