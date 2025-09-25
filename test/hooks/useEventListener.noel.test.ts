import { describe, it, expect, vi } from 'vitest';
import { useEventListener } from '/@/hooks/event/useEventListener';

describe('hooks/event/useEventListener default params', () => {
  it('should use window by default and call listener when wait is 0 (no debounce/throttle)', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const listener = vi.fn();
    const { removeEvent } = useEventListener({ name: 'resize', listener, autoRemove: false, wait: 0 });
    window.dispatchEvent(new Event('resize'));
    expect(addSpy).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
    removeEvent();
    expect(removeSpy).toHaveBeenCalled();
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});


