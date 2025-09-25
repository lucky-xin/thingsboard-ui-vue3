import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addResizeListener, removeResizeListener, triggerResize } from '/@/utils/event/index';

// Mock ResizeObserver
vi.mock('resize-observer-polyfill', () => ({
  default: vi.fn().mockImplementation((callback) => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    callback,
  })),
}));

describe('utils/event/index', () => {
  let mockElement: any;
  let mockWindow: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    mockElement = {
      __resizeListeners__: undefined,
      __ro__: undefined,
    };
    
    mockWindow = {
      dispatchEvent: vi.fn(),
    };
    
    global.window = mockWindow as any;
    global.document = {
      createEvent: vi.fn(() => ({
        initEvent: vi.fn(),
        eventType: undefined,
      })),
    } as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('addResizeListener', () => {
    it('should add resize listener to element', () => {
      const mockFn = vi.fn();
      
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__resizeListeners__).toEqual([mockFn]);
      expect(mockElement.__ro__).toBeDefined();
      expect(mockResizeObserver).toHaveBeenCalled();
    });

    it('should add multiple listeners to same element', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      
      addResizeListener(mockElement, mockFn1);
      addResizeListener(mockElement, mockFn2);
      
      expect(mockElement.__resizeListeners__).toEqual([mockFn1, mockFn2]);
      expect(mockResizeObserver).toHaveBeenCalledTimes(1);
    });

    it('should not add listener on server side', () => {
      const originalWindow = global.window;
      delete (global as any).window;
      
      const mockFn = vi.fn();
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__resizeListeners__).toBeUndefined();
      
      global.window = originalWindow;
    });
  });

  describe('removeResizeListener', () => {
    it('should remove resize listener from element', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      const mockObserver = { disconnect: vi.fn() };
      
      mockElement.__resizeListeners__ = [mockFn1, mockFn2];
      mockElement.__ro__ = mockObserver;
      
      removeResizeListener(mockElement, mockFn1);
      
      expect(mockElement.__resizeListeners__).toEqual([mockFn2]);
      expect(mockObserver.disconnect).not.toHaveBeenCalled();
    });

    it('should disconnect observer when no listeners left', () => {
      const mockFn = vi.fn();
      const mockObserver = { disconnect: vi.fn() };
      
      mockElement.__resizeListeners__ = [mockFn];
      mockElement.__ro__ = mockObserver;
      
      removeResizeListener(mockElement, mockFn);
      
      expect(mockElement.__resizeListeners__).toEqual([]);
      expect(mockObserver.disconnect).toHaveBeenCalled();
    });

    it('should handle element without listeners', () => {
      const mockFn = vi.fn();
      
      expect(() => removeResizeListener(mockElement, mockFn)).not.toThrow();
    });

    it('should handle null element', () => {
      const mockFn = vi.fn();
      
      expect(() => removeResizeListener(null, mockFn)).not.toThrow();
    });
  });

  describe('triggerResize', () => {
    it('should trigger resize event', () => {
      const mockEvent = {
        initEvent: vi.fn(),
        eventType: undefined,
      };
      (global.document.createEvent as any).mockReturnValue(mockEvent);
      
      triggerResize();
      
      expect(global.document.createEvent).toHaveBeenCalledWith('HTMLEvents');
      expect(mockEvent.initEvent).toHaveBeenCalledWith('resize', true, true);
      expect(mockEvent.eventType).toBe('message');
      expect(mockWindow.dispatchEvent).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('resizeHandler', () => {
    it('should call all listeners when element resizes', async () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      const mockObserver = { observe: vi.fn() };
      
      mockElement.__resizeListeners__ = [mockFn1, mockFn2];
      mockElement.__ro__ = mockObserver;
      
      addResizeListener(mockElement, mockFn1);
      addResizeListener(mockElement, mockFn2);
      
      // Get the callback passed to ResizeObserver
      const ResizeObserverMock = await import('resize-observer-polyfill');
      const resizeCallback = (ResizeObserverMock.default as any).mock.calls[0][0];
      
      // Simulate resize
      resizeCallback([{ target: mockElement }]);
      
      expect(mockFn1).toHaveBeenCalled();
      expect(mockFn2).toHaveBeenCalled();
    });

    it('should handle element without listeners', async () => {
      const mockObserver = { observe: vi.fn() };
      
      mockElement.__resizeListeners__ = undefined;
      mockElement.__ro__ = mockObserver;
      
      addResizeListener(mockElement, vi.fn());
      
      // Get the callback passed to ResizeObserver
      const ResizeObserverMock = await import('resize-observer-polyfill');
      const resizeCallback = (ResizeObserverMock.default as any).mock.calls[0][0];
      
      // Simulate resize with element that has no listeners
      const elementWithoutListeners = { __resizeListeners__: undefined };
      resizeCallback([{ target: elementWithoutListeners }]);
      
      // Should not throw
      expect(true).toBe(true);
    });

    it('should handle empty listeners array', async () => {
      const mockObserver = { observe: vi.fn() };
      
      mockElement.__resizeListeners__ = [];
      mockElement.__ro__ = mockObserver;
      
      addResizeListener(mockElement, vi.fn());
      
      // Get the callback passed to ResizeObserver
      const ResizeObserverMock = await import('resize-observer-polyfill');
      const resizeCallback = (ResizeObserverMock.default as any).mock.calls[0][0];
      
      // Simulate resize with element that has empty listeners
      const elementWithEmptyListeners = { __resizeListeners__: [] };
      resizeCallback([{ target: elementWithEmptyListeners }]);
      
      // Should not throw
      expect(true).toBe(true);
    });
  });
});
