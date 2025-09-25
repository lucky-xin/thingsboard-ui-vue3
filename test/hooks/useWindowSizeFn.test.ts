import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';

describe('hooks/event/useWindowSizeFn', () => {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

  beforeEach(() => {
    addEventListenerSpy.mockClear();
    removeEventListenerSpy.mockClear();
  });

  afterEach(() => {
    // cleanup any pending listeners
    // Note: spies are cleared in beforeEach
  });

  it('should register resize listener on start and remove on stop', () => {
    const fn = vi.fn();
    const [start, stop] = useWindowSizeFn(fn, 0);
    start();
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    stop();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should call handler immediately when immediate option is true', () => {
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn, 0, { immediate: true });
    start();
    expect(fn).toHaveBeenCalled();
  });

  it('should debounce calls but respond to resize event', async () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn, 50);
    start();

    // trigger resize
    window.dispatchEvent(new Event('resize'));
    // advance timers to flush debounce
    vi.advanceTimersByTime(60);

    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});


