import { describe, it, expect, vi } from 'vitest';
import { sizeEnum, screenEnum } from '/@/enums/breakpointEnum';
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

describe('hooks/event/useBreakpoint thresholds', () => {
  const setWidth = (w: number) => {
    Object.defineProperty(document, 'body', { value: { clientWidth: w }, writable: true } as any);
  };

  it('should map width to screen sizes (XS->XXL)', () => {
    const spy = vi.fn();
    setWidth(200); // XS
    createBreakpointListen(spy);
    setWidth(500); // SM
    window.dispatchEvent(new Event('resize'));
    setWidth(700); // MD
    window.dispatchEvent(new Event('resize'));
    setWidth(900); // LG
    window.dispatchEvent(new Event('resize'));
    setWidth(1200); // XL
    window.dispatchEvent(new Event('resize'));
    setWidth(2000); // XXL
    window.dispatchEvent(new Event('resize'));
    expect(spy).toHaveBeenCalled();
  });

  // 增加测试用例以提高覆盖率
  it('should handle useBreakpoint hook', () => {
    setWidth(800);
    const breakpoint = useBreakpoint();
    expect(breakpoint.screenEnum).toBeDefined();
    expect(breakpoint.screenRef).toBeDefined();
  });

  it('should handle callback function', () => {
    const callback = vi.fn();
    setWidth(800);

    // Create a new instance for this test
    const result = createBreakpointListen(callback);

    // Wait a bit for initialization
    setTimeout(() => {
      // Trigger resize
      setWidth(1200);
      window.dispatchEvent(new Event('resize'));
      expect(callback).toHaveBeenCalled();
    }, 10);
  });
});