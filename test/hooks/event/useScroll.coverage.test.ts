// Mock state management and global dependencies
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

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';

// Mock dependencies
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    onMounted: vi.fn((callback) => callback()),
    watch: vi.fn((refEl, callback, options) => {
      // Simulate immediate watch call
      if (options && options.immediate) {
        callback(refEl.value, null, () => {});
      }
      return vi.fn();
    }),
    onUnmounted: vi.fn((callback) => callback()),
  };
});

vi.mock('/@/utils/is', () => ({
  isWindow: vi.fn(),
  isObject: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  useThrottleFn: vi.fn(),
}));

import { useScroll } from '/@/hooks/event/useScroll';
import { onMounted, watch, onUnmounted } from 'vue';
import { isWindow, isObject } from '/@/utils/is';
import { useThrottleFn } from '@vueuse/core';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

const mockOnMounted = vi.mocked(onMounted);
const mockWatch = vi.mocked(watch);
const mockOnUnmounted = vi.mocked(onUnmounted);
const mockIsWindow = vi.mocked(isWindow);
const mockIsObject = vi.mocked(isObject);
const mockUseThrottleFn = vi.mocked(useThrottleFn);

describe('useScroll coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsWindow.mockReturnValue(false);
    mockIsObject.mockReturnValue(false);
    mockUseThrottleFn.mockImplementation((fn) => fn);
  });

  it('should return refX, refY, and stop function', () => {
    const refEl = ref<Element | Window | null>(null);
    const { refX, refY, stop } = useScroll(refEl);

    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
    expect(stop).toBeDefined();
    expect(typeof stop).toBe('function');
  });

  it('should handle window element', () => {
    const mockWindow = {
      scrollX: 100,
      scrollY: 200,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockWindow);

    mockIsWindow.mockReturnValue(true);

    const { refX, refY } = useScroll(refEl);

    expect(refX.value).toBe(0);
    expect(refY.value).toBe(0);
  });

  it('should handle element with scrollLeft and scrollTop', () => {
    const mockElement = {
      scrollLeft: 50,
      scrollTop: 75,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    mockIsWindow.mockReturnValue(false);

    const { refX, refY } = useScroll(refEl);

    expect(refX.value).toBe(0);
    expect(refY.value).toBe(0);
  });

  it('should handle null element', () => {
    const refEl = ref<Element | Window | null>(null);

    const { refX, refY } = useScroll(refEl);

    expect(refX.value).toBe(0);
    expect(refY.value).toBe(0);
  });

  it('should handle options with wait', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { wait: 100 };

    mockIsObject.mockReturnValue(true);
    mockUseThrottleFn.mockReturnValue(vi.fn());

    const { refX, refY } = useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 100);
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should handle options without wait', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { leading: true, trailing: false };

    mockIsObject.mockReturnValue(true);
    mockUseThrottleFn.mockReturnValue(vi.fn());

    const { refX, refY } = useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should handle options with wait 0', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { wait: 0 };

    mockIsObject.mockReturnValue(true);
    mockUseThrottleFn.mockReturnValue(vi.fn());

    const { refX, refY } = useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should handle options with negative wait', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { wait: -10 };

    mockIsObject.mockReturnValue(true);
    mockUseThrottleFn.mockReturnValue(vi.fn());

    const { refX, refY } = useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should handle options without wait property', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { leading: true };

    mockIsObject.mockReturnValue(true);
    mockUseThrottleFn.mockReturnValue(vi.fn());

    const { refX, refY } = useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 0);
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should handle no options', () => {
    const refEl = ref<Element | Window | null>(null);

    mockIsObject.mockReturnValue(false);

    const { refX, refY } = useScroll(refEl);

    expect(mockUseThrottleFn).not.toHaveBeenCalled();
    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
  });

  it('should call onMounted', () => {
    const refEl = ref<Element | Window | null>(null);

    useScroll(refEl);

    expect(mockOnMounted).toHaveBeenCalled();
  });

  it('should call watch with correct parameters', () => {
    const refEl = ref<Element | Window | null>(null);

    useScroll(refEl);

    expect(mockWatch).toHaveBeenCalled();
  });

  it('should call onUnmounted', () => {
    const refEl = ref<Element | Window | null>(null);

    useScroll(refEl);

    expect(mockOnUnmounted).toHaveBeenCalled();
  });

  it('should handle stop function', () => {
    const mockStopWatch = vi.fn();
    mockWatch.mockReturnValue(mockStopWatch);

    const refEl = ref<Element | Window | null>(null);
    const { stop } = useScroll(refEl);

    stop();

    expect(stop).toBeDefined();
    expect(mockStopWatch).toHaveBeenCalled();
  });

  it('should handle stop function when stopWatch is undefined', () => {
    mockWatch.mockReturnValue(undefined);

    const refEl = ref<Element | Window | null>(null);
    const { stop } = useScroll(refEl);

    expect(() => stop()).not.toThrow();
  });

  it('should handle watch callback with element', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    // Mock watch to properly handle the element
    mockWatch.mockImplementation((refEl, callback, options) => {
      // Simulate immediate watch call
      if (options && options.immediate) {
        callback(refEl.value, null, () => {});
      }
      return vi.fn();
    });

    useScroll(refEl);

    expect(mockElement.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle watch callback with null element and previous element', () => {
    const mockPrevElement = {
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(null);

    // Mock watch to simulate previous element
    mockWatch.mockImplementation((refEl, callback, options) => {
      // Simulate immediate watch call with previous element
      if (options && options.immediate) {
        callback(null, mockPrevElement, () => {});
      }
      return vi.fn();
    });

    useScroll(refEl);

    expect(mockPrevElement.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle watch callback cleanup', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    let cleanupCallback: Function;
    mockWatch.mockImplementation((refEl, callback, options) => {
      // Simulate immediate watch call
      if (options && options.immediate) {
        callback(refEl.value, null, (cleanup) => {
          cleanupCallback = cleanup;
        });
      }
      return vi.fn();
    });

    useScroll(refEl);

    // Simulate cleanup
    cleanupCallback && cleanupCallback();

    expect(mockElement.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle onUnmounted callback', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    useScroll(refEl);

    expect(mockElement.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle onUnmounted callback with null element', () => {
    const refEl = ref<Element | Window | null>(null);

    useScroll(refEl);

    expect(() => useScroll(refEl)).not.toThrow();
  });

  // 增加测试用例以提高覆盖率
  it('should handle scroll event with window element', () => {
    const mockWindow = {
      scrollX: 100,
      scrollY: 200,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockWindow);

    mockIsWindow.mockReturnValue(true);

    useScroll(refEl);

    expect(mockWindow.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle scroll event with element', () => {
    const mockElement = {
      scrollLeft: 50,
      scrollTop: 75,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    mockIsWindow.mockReturnValue(false);

    useScroll(refEl);

    expect(mockElement.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle throttle function with options', () => {
    const refEl = ref<Element | Window | null>(null);
    const options = { wait: 100, leading: true, trailing: true };

    mockIsObject.mockReturnValue(true);

    const mockThrottledFn = vi.fn();
    mockUseThrottleFn.mockReturnValue(mockThrottledFn);

    useScroll(refEl, options);

    expect(mockUseThrottleFn).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  it('should handle refX and refY updates', () => {
    const mockElement = {
      scrollLeft: 100,
      scrollTop: 200,
      addEventListener: vi.fn((event, handler) => {
        // Simulate scroll event
        handler();
      }),
      removeEventListener: vi.fn(),
    } as any;
    const refEl = ref<Element | Window | null>(mockElement);

    mockIsWindow.mockReturnValue(false);

    const { refX, refY } = useScroll(refEl);

    expect(refX.value).toBe(100);
    expect(refY.value).toBe(200);
  });
});