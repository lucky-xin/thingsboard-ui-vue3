import { describe, it, expect, vi } from 'vitest';
import { createBreakpointListen, useBreakpoint } from '/@/hooks/event/useBreakpoint';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

describe('hooks/event/useBreakpoint more', () => {
  const setWidth = (w: number) => {
    Object.defineProperty(document, 'body', { value: { clientWidth: w }, writable: true } as any);
  };

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

  // 增加测试用例以提高覆盖率
  it('should handle different screen sizes with useBreakpoint hook', () => {
    setWidth(800);
    const breakpoint = useBreakpoint();
    expect(breakpoint.screenRef).toBeDefined();
    expect(breakpoint.widthRef).toBeDefined();
    expect(breakpoint.realWidthRef).toBeDefined();
    expect(breakpoint.screenEnum).toBeDefined();
  });

  it('should handle resize events correctly', async () => {
    const callback = vi.fn();
    setWidth(800);

    // Create breakpoint listener
    const result = createBreakpointListen(callback);

    // Change width and trigger resize
    setWidth(1200);
    window.dispatchEvent(new Event('resize'));

    // Wait a bit for the callback to be called
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(callback).toHaveBeenCalled();
  });

  it('should handle edge screen sizes', () => {
    // Test edge cases
    setWidth(0); // Very small
    const result1 = createBreakpointListen();
    expect(result1.realWidthRef.value).toBe(0);

    // Create a new instance for the second test
    setWidth(5000); // Very large
    const result2 = createBreakpointListen();
    expect(result2.realWidthRef.value).toBe(5000);
  });
});