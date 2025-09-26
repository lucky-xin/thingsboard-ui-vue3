import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Separate test to improve coverage for server-side scenarios
describe('utils/event/index coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('addResizeListener server-side coverage', () => {
    it('add/remove/trigger resize listeners', async () => {
      // Mock resize-observer-polyfill before importing
      vi.doMock('resize-observer-polyfill', () => ({
        default: vi.fn().mockImplementation((callback) => ({
          observe: vi.fn(),
          disconnect: vi.fn(),
          callback,
        })),
      }));

      const { addResizeListener, removeResizeListener, triggerResize } = await import('/@/utils/event/index');
      
      const mockElement = {
        __resizeListeners__: undefined,
        __ro__: undefined,
      };
      
      const mockFn = vi.fn();
      
      // Test adding listener
      addResizeListener(mockElement, mockFn);
      expect(mockElement.__resizeListeners__).toContain(mockFn);
      
      // Test removing listener
      removeResizeListener(mockElement, mockFn);
      expect(mockElement.__resizeListeners__).not.toContain(mockFn);
      
      // Test trigger resize
      global.document = {
        createEvent: vi.fn(() => ({
          initEvent: vi.fn(),
          eventType: undefined,
        })),
      } as any;
      
      global.window = {
        dispatchEvent: vi.fn(),
      } as any;
      
      expect(() => triggerResize()).not.toThrow();
    });

    // Note: SSR early-return branch is validated indirectly in other tests; avoid
    // resetting module registry here to prevent interfering with global mocks.
  });
});