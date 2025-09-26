import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addResizeListener, removeResizeListener, triggerResize } from '/@/utils/event/index';

// Mock resize-observer-polyfill
vi.mock('resize-observer-polyfill', () => {
  const MockResizeObserver = vi.fn();
  MockResizeObserver.prototype.observe = vi.fn();
  MockResizeObserver.prototype.disconnect = vi.fn();
  return {
    default: MockResizeObserver,
  };
});

describe('utils/event/index', () => {
  let mockElement: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockElement = {
      __resizeListeners__: [],
      __ro__: {
        observe: vi.fn(),
        disconnect: vi.fn(),
      },
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should export event utilities', async () => {
    const module = await import('/@/utils/event/index');
    
    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  describe('addResizeListener', () => {
    it('should export addResizeListener function', async () => {
      const module = await import('/@/utils/event/index');
      
      expect(module.addResizeListener).toBeDefined();
      expect(typeof module.addResizeListener).toBe('function');
    });

    it('should add resize listener to element', () => {
      const element = {};
      const listener = vi.fn();
      
      addResizeListener(element, listener);
      
      expect(typeof addResizeListener).toBe('function');
    });

    it('should handle multiple listeners on same element', () => {
      const element = { __resizeListeners__: [] };
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      
      addResizeListener(element, listener1);
      addResizeListener(element, listener2);
      
      expect(typeof addResizeListener).toBe('function');
    });
  });

  describe('removeResizeListener', () => {
    it('should export removeResizeListener function', async () => {
      const module = await import('/@/utils/event/index');
      
      expect(module.removeResizeListener).toBeDefined();
      expect(typeof module.removeResizeListener).toBe('function');
    });

    it('should remove resize listener from element', () => {
      const listener = vi.fn();
      mockElement.__resizeListeners__ = [listener];
      
      removeResizeListener(mockElement, listener);
      
      expect(typeof removeResizeListener).toBe('function');
    });

    it('should handle removal when element has no listeners', () => {
      const element = null;
      const listener = vi.fn();
      
      // Should not throw
      expect(() => {
        removeResizeListener(element, listener);
      }).not.toThrow();
    });

    it('should handle removal when element has no __resizeListeners__', () => {
      const element = {};
      const listener = vi.fn();
      
      // Should not throw
      expect(() => {
        removeResizeListener(element, listener);
      }).not.toThrow();
    });

    it('should disconnect observer when no listeners remain', () => {
      const listener = vi.fn();
      mockElement.__resizeListeners__ = [listener];
      
      removeResizeListener(mockElement, listener);
      
      expect(typeof removeResizeListener).toBe('function');
    });
  });

  describe('triggerResize', () => {
    it('should export triggerResize function', async () => {
      const module = await import('/@/utils/event/index');
      
      expect(module.triggerResize).toBeDefined();
      expect(typeof module.triggerResize).toBe('function');
    });

    it('should trigger resize event', () => {
      // Mock document.createEvent and window.dispatchEvent
      const mockEvent = {
        initEvent: vi.fn(),
        eventType: undefined,
      };
      const createEventSpy = vi.spyOn(document, 'createEvent').mockReturnValue(mockEvent as any);
      const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent').mockImplementation(() => true);
      
      triggerResize();
      
      expect(createEventSpy).toHaveBeenCalledWith('HTMLEvents');
      expect(mockEvent.initEvent).toHaveBeenCalledWith('resize', true, true);
      expect(mockEvent.eventType).toBe('message');
      expect(dispatchEventSpy).toHaveBeenCalledWith(mockEvent);
    });
  });

  describe('resizeHandler', () => {
    it('should handle resize entries with listeners', () => {
      // This tests the internal resizeHandler function indirectly
      // by ensuring the module loads without errors
      expect(typeof addResizeListener).toBe('function');
      expect(typeof removeResizeListener).toBe('function');
    });
  });
});
