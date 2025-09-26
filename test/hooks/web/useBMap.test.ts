import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useBMap } from '/@/hooks/web/useBMap';

// Mock Vue composition API
vi.mock('vue', () => ({
  onMounted: vi.fn((callback) => callback()),
  onUnmounted: vi.fn((callback) => {
    // Store callback for later use
    (global as any).onUnmountedCallback = callback;
  }),
  ref: vi.fn((value) => ({ value })),
}));

// Mock DOM APIs
const mockScript = {
  type: '',
  onerror: null as any,
  src: '',
  remove: vi.fn(),
};

const mockDocument = {
  createElement: vi.fn(() => mockScript),
  head: {
    appendChild: vi.fn(),
  },
};

describe('hooks/web/useBMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.document = mockDocument as any;
    global.window = {} as any;
    mockScript.type = '';
    mockScript.src = '';
    mockScript.onerror = null;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct default values', () => {
    const result = useBMap('test-ak');

    expect(result.error.value).toBe(false);
    expect(result.success.value).toBe(false);
    expect(result.BMapGL.value).toBeUndefined();
    expect(result.toPromise).toBeInstanceOf(Function);
  });

  it('should create script element with correct attributes', () => {
    useBMap('test-ak');

    expect(mockDocument.createElement).toHaveBeenCalledWith('script');
    expect(mockScript.type).toBe('text/javascript');
    expect(mockScript.src).toBe('https://api.map.baidu.com/api?type=webgl&v=1.0&ak=test-ak&callback=onBmapCallback');
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockScript);
  });

  it('should handle successful callback', async () => {
    const mockBMapGL = { test: 'value' };
    global.window = { BMapGL: mockBMapGL } as any;

    const result = useBMap('test-ak');
    const promise = result.toPromise();

    // Simulate successful callback
    (global.window as any).onBmapCallback();

    const resolvedValue = await promise;

    expect(result.success.value).toBe(true);
    expect(result.error.value).toBe(false);
    expect(result.BMapGL.value).toBe(mockBMapGL);
    expect(resolvedValue).toBe(mockBMapGL);
  });

  it('should handle script error', async () => {
    const result = useBMap('test-ak');
    const promise = result.toPromise();

    // Simulate script error
    const mockError = new Error('Script load failed');
    mockScript.onerror(mockError);

    await expect(promise).rejects.toThrow('Script load failed');
    expect(result.success.value).toBe(false);
    expect(result.error.value).toBe(true);
  });

  it('should remove script on unmount', () => {
    useBMap('test-ak');

    // Simulate unmount
    if ((global as any).onUnmountedCallback) {
      (global as any).onUnmountedCallback();
    }

    expect(mockScript.remove).toHaveBeenCalled();
  });

  it('should handle unmount without script', () => {
    useBMap('test-ak');

    // Simulate unmount
    if ((global as any).onUnmountedCallback) {
      (global as any).onUnmountedCallback();
    }

    // Should not throw error
    expect(mockScript.remove).toHaveBeenCalled();
  });
});
