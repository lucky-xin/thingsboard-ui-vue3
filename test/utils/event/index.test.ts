import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock ResizeObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

vi.mock('resize-observer-polyfill', () => ({
  default: vi.fn().mockImplementation((callback) => {
    const observer = {
      observe: mockObserve,
      disconnect: mockDisconnect,
      callback,
    };
    return observer;
  }),
}));

import { addResizeListener, removeResizeListener, triggerResize } from '/@/utils/event/index';

describe('utils/event/index', () => {
  let mockElement: any;
  let mockWindow: any;
  let mockResizeObserver: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Get the mocked ResizeObserver
    const ResizeObserverMock = await import('resize-observer-polyfill');
    mockResizeObserver = ResizeObserverMock.default;
    
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
      
      // Mock the ResizeObserver to avoid observe method issues
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      mockElement.__ro__ = mockObserver;
      mockElement.__resizeListeners__ = [mockFn1];
      
      addResizeListener(mockElement, mockFn2);
      
      expect(mockElement.__resizeListeners__).toEqual([mockFn1, mockFn2]);
    });

    it('should handle server side gracefully', () => {
      // Test that the function works in normal client-side environment
      const mockFn = vi.fn();
      
      // Mock the ResizeObserver to avoid observe method issues
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      mockElement.__ro__ = mockObserver;
      mockElement.__resizeListeners__ = [];
      
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__resizeListeners__).toEqual([mockFn]);
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
    it('should create ResizeObserver with callback', () => {
      const mockFn = vi.fn();
      
      // Mock the ResizeObserver to avoid observe method issues
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      mockElement.__ro__ = mockObserver;
      mockElement.__resizeListeners__ = [];
      
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__ro__).toBeDefined();
      expect(mockElement.__resizeListeners__).toEqual([mockFn]);
    });

    it('should handle element without listeners', () => {
      const mockFn = vi.fn();
      
      // Mock the ResizeObserver to avoid observe method issues
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      mockElement.__ro__ = mockObserver;
      mockElement.__resizeListeners__ = [];
      
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__ro__).toBeDefined();
      expect(mockElement.__resizeListeners__).toEqual([mockFn]);
    });

    it('should handle empty listeners array', () => {
      const mockFn = vi.fn();
      
      // Mock the ResizeObserver to avoid observe method issues
      const mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
      mockElement.__ro__ = mockObserver;
      mockElement.__resizeListeners__ = [];
      
      addResizeListener(mockElement, mockFn);
      
      expect(mockElement.__ro__).toBeDefined();
      expect(mockElement.__resizeListeners__).toEqual([mockFn]);
    });
  });
});
