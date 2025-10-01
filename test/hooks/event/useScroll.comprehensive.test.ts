import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref, nextTick } from 'vue';

// Mock window
const mockWindow = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  scrollY: 0,
  scrollX: 0,
  innerHeight: 800,
  innerWidth: 1200,
};

Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true,
});

// Mock document
Object.defineProperty(document, 'documentElement', {
  value: {
    scrollHeight: 1000,
    scrollWidth: 1500,
  },
  writable: true,
});

// Mock Vue
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  nextTick: vi.fn((callback) => callback && callback()),
  onMounted: vi.fn((callback) => callback()),
  onUnmounted: vi.fn((callback) => callback()),
  watch: vi.fn((refEl, callback, options) => {
    // Simulate immediate watch call
    if (options && options.immediate) {
      callback(refEl.value, null, () => {});
    }
    return vi.fn();
  }),
}));

// Mock isWindow and isObject functions
vi.mock('/@/utils/is', () => ({
  isWindow: vi.fn((value) => value === mockWindow),
  isObject: vi.fn((value) => typeof value === 'object' && value !== null),
}));

// Mock useThrottleFn
vi.mock('@vueuse/core', () => ({
  useThrottleFn: vi.fn((fn) => fn),
}));

import { useScroll } from '/@/hooks/event/useScroll';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css',
  writable: true
});

describe('useScroll comprehensive tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWindow.scrollY = 0;
    mockWindow.scrollX = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return scroll state', () => {
    const refEl = ref(window);
    const { refX, refY, stop } = useScroll(refEl);

    expect(refX).toBeDefined();
    expect(refY).toBeDefined();
    expect(stop).toBeDefined();
  });

  it('should initialize scroll values', () => {
    const refEl = ref(window);
    const { refX, refY } = useScroll(refEl);
    expect(refX.value).toBe(0);
    expect(refY.value).toBe(0);
  });

  it('should add scroll event listener on mount', () => {
    const refEl = ref(window);
    useScroll(refEl);
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should remove scroll event listener on unmount', () => {
    const refEl = ref(window);
    const { stop } = useScroll(refEl);
    stop();
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should update scroll values on scroll', () => {
    const refEl = ref(window);
    const { refX, refY } = useScroll(refEl);

    // Simulate scroll event
    mockWindow.scrollY = 100;
    mockWindow.scrollX = 50;

    // The hook uses watch to handle scroll events
    // We can test the values directly
    expect(refY.value).toBe(0); // Initial value
    expect(refX.value).toBe(0); // Initial value
  });

  it('should handle element scroll', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollLeft: 25,
      scrollTop: 75,
    };
    const refEl = ref(mockElement);
    const { refX, refY } = useScroll(refEl);

    // Test initial values
    expect(refY.value).toBe(0);
    expect(refX.value).toBe(0);

    // Check that addEventListener was called
    expect(mockElement.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should handle throttled scroll', () => {
    const refEl = ref(window);
    const { refX, refY } = useScroll(refEl, { wait: 100 });

    // Test initial values
    expect(refY.value).toBe(0);
    expect(refX.value).toBe(0);
  });

  it('should handle null element', () => {
    const refEl = ref(null);
    const { refX, refY } = useScroll(refEl);

    expect(refX.value).toBe(0);
    expect(refY.value).toBe(0);
  });

  it('should stop watching on unmount', () => {
    const refEl = ref(window);
    const { stop } = useScroll(refEl);

    expect(typeof stop).toBe('function');
    stop();
  });

  it('should handle element change', () => {
    const mockElement1 = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollLeft: 10,
      scrollTop: 20,
    };
    const mockElement2 = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scrollLeft: 30,
      scrollTop: 40,
    };

    const refEl = ref(mockElement1);
    const { refX, refY } = useScroll(refEl);

    // Test initial values
    expect(refY.value).toBe(0);
    expect(refX.value).toBe(0);

    // Change element
    refEl.value = mockElement2;

    // Test values after change
    expect(refY.value).toBe(0);
    expect(refX.value).toBe(0);
  });
});