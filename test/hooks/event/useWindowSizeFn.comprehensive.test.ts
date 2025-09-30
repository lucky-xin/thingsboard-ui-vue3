import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';

// Mock window
const mockWindow = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
});

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

describe('useWindowSizeFn comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return start and stop functions', () => {
    const fn = vi.fn();
    const [start, stop] = useWindowSizeFn(fn);

    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
  });

  it('should add resize event listener on start', () => {
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn);
    start();
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should remove resize event listener on stop', () => {
    const fn = vi.fn();
    const [start, stop] = useWindowSizeFn(fn);
    start();
    stop();
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('should call handler immediately when immediate option is true', () => {
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn, 0, { immediate: true });
    start();
    expect(fn).toHaveBeenCalled();
  });

  it('should debounce calls but respond to resize event', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn, 50);
    start();

    // trigger resize
    const resizeEvent = new Event('resize');
    mockWindow.addEventListener.mock.calls[0][1](resizeEvent);

    // Advance time to flush debounce
    vi.advanceTimersByTime(60);

    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('should handle multiple resize events with debouncing', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const [start] = useWindowSizeFn(fn, 100);
    start();

    // Get the handler function
    const handler = mockWindow.addEventListener.mock.calls[0][1];

    // trigger multiple resize events
    handler(new Event('resize'));
    handler(new Event('resize'));
    handler(new Event('resize'));

    // Advance time to flush debounce
    vi.advanceTimersByTime(110);

    // Should only call once due to debouncing
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});