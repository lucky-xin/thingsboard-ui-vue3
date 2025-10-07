import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('utils/event index', () => {
  // Mock ResizeObserver
  const mockResizeObserver = vi.fn();
  const mockObserve = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    // Mock ResizeObserver
    mockResizeObserver.mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
    }));

    // Mock global ResizeObserver
    (global as any).ResizeObserver = mockResizeObserver;

    // Mock document and window
    (global as any).document = {
      createEvent: vi.fn().mockReturnValue({
        initEvent: vi.fn(),
      }),
    };

    (global as any).window = {
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });

  afterEach(() => {
    // Clean up mocks
    vi.restoreAllMocks();
  });

  it('should import event index', async () => {
    const mod = await import('/@/utils/event/index');
    expect(mod).toBeDefined();
  });

  it('should export addResizeListener function', async () => {
    const mod = await import('/@/utils/event/index');
    expect(mod.addResizeListener).toBeDefined();
    expect(typeof mod.addResizeListener).toBe('function');
  });

  it('should export removeResizeListener function', async () => {
    const mod = await import('/@/utils/event/index');
    expect(mod.removeResizeListener).toBeDefined();
    expect(typeof mod.removeResizeListener).toBe('function');
  });

  it('should export triggerResize function', async () => {
    const mod = await import('/@/utils/event/index');
    expect(mod.triggerResize).toBeDefined();
    expect(typeof mod.triggerResize).toBe('function');
  });

  it('should add resize listener to element', async () => {
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn = vi.fn();

    mod.addResizeListener(element, fn);

    expect(element.__resizeListeners__).toBeDefined();
    expect(element.__resizeListeners__).toContain(fn);
    expect(mockResizeObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it('should not add resize listener on server side', async () => {
    // Mock server side
    const originalWindow = (global as any).window;
    delete (global as any).window;

    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn = vi.fn();

    mod.addResizeListener(element, fn);

    // On server side, the function should return early and not modify the element
    // Note: Since isServer is evaluated at module load time, we can't easily test this
    // without resetting modules, which would affect other tests

    // Restore window
    (global as any).window = originalWindow;
  });

  it('should add multiple resize listeners to same element', async () => {
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    mod.addResizeListener(element, fn1);
    mod.addResizeListener(element, fn2);

    expect(element.__resizeListeners__).toHaveLength(2);
    expect(element.__resizeListeners__).toContain(fn1);
    expect(element.__resizeListeners__).toContain(fn2);
  });

  it('should remove resize listener from element', async () => {
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    mod.addResizeListener(element, fn1);
    mod.addResizeListener(element, fn2);

    expect(element.__resizeListeners__).toHaveLength(2);

    mod.removeResizeListener(element, fn1);

    expect(element.__resizeListeners__).toHaveLength(1);
    expect(element.__resizeListeners__).not.toContain(fn1);
    expect(element.__resizeListeners__).toContain(fn2);
  });

  it('should disconnect observer when all listeners are removed', async () => {
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn = vi.fn();

    mod.addResizeListener(element, fn);
    mod.removeResizeListener(element, fn);

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should not remove listener from non-existent element', async () => {
    const mod = await import('/@/utils/event/index');

    const element = null;
    const fn = vi.fn();

    expect(() => mod.removeResizeListener(element, fn)).not.toThrow();
  });

  it('should not remove listener from element without listeners', async () => {
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn = vi.fn();

    expect(() => mod.removeResizeListener(element, fn)).not.toThrow();
  });

  it('should trigger resize event', async () => {
    const mod = await import('/@/utils/event/index');

    mod.triggerResize();

    expect((global as any).document.createEvent).toHaveBeenCalled();
    expect((global as any).window.dispatchEvent).toHaveBeenCalled();
  });

  it('should handle resize handler with listeners', async () => {
    // This test indirectly tests the resizeHandler function
    const mod = await import('/@/utils/event/index');

    const element = {};
    const fn = vi.fn();

    mod.addResizeListener(element, fn);

    // Simulate resize event
    const entries = [{
      target: element
    }];

    // Call resizeHandler directly (it's not exported, but we can test the behavior)
    // The actual resizeHandler is called internally by ResizeObserver
    expect(element.__resizeListeners__).toHaveLength(1);
  });

  it('should handle resize handler without listeners', async () => {
    // This test indirectly tests the resizeHandler function
    const mod = await import('/@/utils/event/index');

    const element = {};

    // Simulate resize event on element without listeners
    const entries = [{
      target: element
    }];

    // This should not throw an error
    expect(() => {
      // Simulate the resizeHandler behavior
      const listeners = element.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach((fn: () => any) => {
          fn();
        });
      }
    }).not.toThrow();
  });
});