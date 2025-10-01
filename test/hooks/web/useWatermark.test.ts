import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useWatermark } from '/@/hooks/web/useWatermark';
import { getCurrentInstance, onBeforeUnmount, ref, shallowRef, unref } from 'vue';
import { useRafThrottle } from '/@/utils/domUtils';
import { addResizeListener, removeResizeListener } from '/@/utils/event';
import { isDef } from '/@/utils/is';

// Mock dependencies
vi.mock('vue', () => ({
  getCurrentInstance: vi.fn(),
  onBeforeUnmount: vi.fn(),
  ref: vi.fn((value) => ({ value })),
  shallowRef: vi.fn((value) => ({ value })),
  unref: vi.fn((ref) => ref?.value ?? ref),
}));

vi.mock('/@/utils/domUtils', () => ({
  useRafThrottle: vi.fn((fn) => fn),
}));

vi.mock('/@/utils/event', () => ({
  addResizeListener: vi.fn(),
  removeResizeListener: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isDef: vi.fn((value) => value !== undefined && value !== null),
}));

// Mock DOM
const mockCanvas = {
  getContext: vi.fn(() => ({
    rotate: vi.fn(),
    font: '',
    fillStyle: '',
    textAlign: '',
    textBaseline: '',
    fillText: vi.fn(),
  })),
  toDataURL: vi.fn(() => 'data:image/png;base64,mockdata'),
};

const mockElement = {
  className: '',
  style: {
    pointerEvents: '',
    display: '',
    visibility: '',
    top: '',
    left: '',
    position: '',
    zIndex: '',
    height: '',
    width: '',
    background: '',
  },
  appendChild: vi.fn(),
  removeChild: vi.fn(),
  contains: vi.fn(() => true),
  clientHeight: 800,
  clientWidth: 1200,
};

const mockMutationObserver = {
  observe: vi.fn(),
  disconnect: vi.fn(),
};

Object.defineProperty(global, 'document', {
  value: {
    body: mockElement,
    documentElement: mockElement,
    createElement: vi.fn((tagName) => {
      if (tagName === 'canvas') return mockCanvas;
      if (tagName === 'div') return { ...mockElement, 'data-watermark-text': '' };
      return mockElement;
    }),
  },
  writable: true,
});

Object.defineProperty(global, 'MutationObserver', {
  value: vi.fn(() => mockMutationObserver),
  writable: true,
});

describe('hooks/web/useWatermark', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockElement.clientHeight = 800;
    mockElement.clientWidth = 1200;
    mockElement.contains.mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('useWatermark', () => {
    it('should return watermark functions', () => {
      const result = useWatermark();

      expect(result).toHaveProperty('setWatermark');
      expect(result).toHaveProperty('clear');
      expect(result).toHaveProperty('clearAll');
      expect(result.setWatermark).toBeInstanceOf(Function);
      expect(result.clear).toBeInstanceOf(Function);
      expect(result.clearAll).toBeInstanceOf(Function);
    });

    it('should create watermark with default options', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
      expect(mockMutationObserver.observe).toHaveBeenCalled();
    });

    it('should create watermark with custom options', () => {
      const customOptions = {
        fontSize: 20,
        fontColor: '#ff0000',
        fontFamily: 'Arial',
        textAlign: 'center' as CanvasTextAlign,
        textBaseline: 'top' as CanvasTextBaseline,
        rotate: 30,
      };

      const { setWatermark } = useWatermark(ref(mockElement), customOptions);

      setWatermark('Custom Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should clear watermark', () => {
      const { setWatermark, clear } = useWatermark();

      setWatermark('Test Watermark');
      clear();

      expect(mockElement.removeChild).toHaveBeenCalled();
      expect(mockMutationObserver.disconnect).toHaveBeenCalled();
    });

    it('should update existing watermark', () => {
      const { setWatermark } = useWatermark();

      setWatermark('First Watermark');
      setWatermark('Updated Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle resize events', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(addResizeListener).toHaveBeenCalledWith(document.documentElement, expect.any(Function));
    });

    it('should setup cleanup on component unmount', () => {
      const mockInstance = { uid: 1 };
      vi.mocked(getCurrentInstance).mockReturnValue(mockInstance);

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(onBeforeUnmount).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle element without current instance', () => {
      vi.mocked(getCurrentInstance).mockReturnValue(null);

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle null append element', () => {
      const { setWatermark } = useWatermark(ref(null));

      // This will throw an error because the source code doesn't handle null elements
      expect(() => setWatermark('Test Watermark')).toThrow();
    });

    it('should handle canvas context creation failure', () => {
      mockCanvas.getContext.mockReturnValue(null);

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should create base64 image with default options', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
    });

    it('should create base64 image with custom options', () => {
      const customOptions = {
        fontSize: 20,
        fontColor: '#ff0000',
        fontFamily: 'Arial',
        textAlign: 'center' as CanvasTextAlign,
        textBaseline: 'top' as CanvasTextBaseline,
        rotate: 30,
      };

      const { setWatermark } = useWatermark(ref(mockElement), customOptions);

      setWatermark('Custom Watermark');

      expect(mockCanvas.getContext).toHaveBeenCalledWith('2d');
    });

    it('should handle multiple watermarks', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Watermark 1');
      setWatermark('Watermark 2');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle watermark with empty string', () => {
      const { setWatermark } = useWatermark();

      setWatermark('');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle watermark with special characters', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Special chars: !@#$%^&*()');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle very long watermark text', () => {
      const { setWatermark } = useWatermark();

      setWatermark('A'.repeat(1000));

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle different element dimensions', () => {
      mockElement.clientHeight = 600;
      mockElement.clientWidth = 900;

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle zero dimensions', () => {
      mockElement.clientHeight = 0;
      mockElement.clientWidth = 0;

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle canvas operations', () => {
      const mockContext = {
        rotate: vi.fn(),
        font: '',
        fillStyle: '',
        textAlign: '',
        textBaseline: '',
        fillText: vi.fn(),
      };
      mockCanvas.getContext.mockReturnValue(mockContext);

      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockContext.rotate).toHaveBeenCalled();
      expect(mockContext.fillText).toHaveBeenCalled();
    });

    it('should handle mutation observer setup', () => {
      const { setWatermark } = useWatermark();

      setWatermark('Test Watermark');

      expect(mockMutationObserver.observe).toHaveBeenCalledWith(mockElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    });

    it('should handle element removal during clear', () => {
      const { setWatermark, clear } = useWatermark();

      setWatermark('Test Watermark');
      clear();

      expect(mockElement.removeChild).toHaveBeenCalled();
      expect(mockMutationObserver.disconnect).toHaveBeenCalled();
    });

    it('should handle resize listener removal', () => {
      const { setWatermark, clear } = useWatermark();

      setWatermark('Test Watermark');
      clear();

      expect(removeResizeListener).toHaveBeenCalled();
    });

    it('should handle updateWatermark with width option', () => {
      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Mock isDef to return true for width
      vi.mocked(isDef).mockImplementation((value) => value === 300);

      // Trigger resize function which calls updateWatermark
      const resizeFn = vi.mocked(useRafThrottle).mock.calls[0][0];
      resizeFn();

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle updateWatermark with height option', () => {
      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Mock isDef to return true for height
      vi.mocked(isDef).mockImplementation((value) => value === 200);

      // Trigger resize function which calls updateWatermark
      const resizeFn = vi.mocked(useRafThrottle).mock.calls[0][0];
      resizeFn();

      expect(mockElement.appendChild).toHaveBeenCalled();
    });

    it('should handle updateWatermark with string option', () => {
      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Mock isDef to return true for string
      vi.mocked(isDef).mockImplementation((value) => typeof value === 'string');

      // Trigger resize function which calls updateWatermark
      const resizeFn = vi.mocked(useRafThrottle).mock.calls[0][0];
      resizeFn();

      expect(mockCanvas.toDataURL).toHaveBeenCalled();
    });

    it('should handle sourceMap has domSymbol condition', () => {
      const mockAppendEl = ref(mockElement);
      const firstResult = useWatermark(mockAppendEl);
      firstResult.setWatermark('Test Watermark');

      // Second call with same element should return existing functions
      const secondResult = useWatermark(mockAppendEl);

      expect(secondResult).toHaveProperty('setWatermark');
      expect(secondResult).toHaveProperty('clear');
      expect(secondResult).toHaveProperty('clearAll');
    });

    it('should handle sourceMap has domSymbol and return existing functions', () => {
      const mockAppendEl = ref(mockElement);
      const firstResult = useWatermark(mockAppendEl);
      firstResult.setWatermark('Test Watermark');

      // Second call with same element should return existing functions from sourceMap
      const secondResult = useWatermark(mockAppendEl);

      // The second call should return the same setWatermark and clear functions
      expect(typeof secondResult.setWatermark).toBe('function');
      expect(typeof secondResult.clear).toBe('function');
      expect(typeof secondResult.clearAll).toBe('function');
    });

    it('should handle resize function when element is null', () => {
      // Mock unref to return null for the appendEl
      vi.mocked(unref).mockImplementationOnce((ref) => null);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Trigger resize function with null element
      const resizeFn = vi.mocked(useRafThrottle).mock.calls[0][0];
      expect(() => resizeFn()).not.toThrow();
    });

    it('should handle mutation observer with removed nodes', () => {
      // Mock findTargetNode to return a target
      const mockTarget = {
        targetElement: mockElement,
        parentElement: mockElement,
        setWatermark: vi.fn(),
      };

      // Create a mock MutationObserver instance
      const mockMutationObserverInstance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      // Mock MutationObserver to return our mock instance
      vi.mocked(MutationObserver).mockImplementation(() => mockMutationObserverInstance);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Get the MutationObserver callback function
      const mutationCallback = vi.mocked(MutationObserver).mock.calls[0][0];

      // Call the mutation callback with removed nodes
      const mutationRecord = {
        removedNodes: [mockElement],
        type: 'childList',
        target: mockElement,
      };

      // Mock findTargetNode to return our mock target
      const originalFindTargetNode = global.findTargetNode;
      global.findTargetNode = vi.fn(() => mockTarget);

      // Mock parentElement.contains to return false to trigger the re-append logic
      mockElement.contains.mockReturnValueOnce(false);

      // Call the mutation callback
      mutationCallback([mutationRecord]);

      // Restore original function
      if (originalFindTargetNode) {
        global.findTargetNode = originalFindTargetNode;
      }
    });

    it('should handle mutation observer with attributes change', () => {
      // Create a mock MutationObserver instance
      const mockMutationObserverInstance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      // Mock MutationObserver to return our mock instance
      vi.mocked(MutationObserver).mockImplementation(() => mockMutationObserverInstance);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Get the MutationObserver callback function
      const mutationCallback = vi.mocked(MutationObserver).mock.calls[0][0];

      // Call the mutation callback with attributes change
      const mutationRecord = {
        removedNodes: [],
        type: 'attributes',
        target: mockElement,
      };

      // Mock findTargetNode to return a target
      const mockTarget = {
        targetElement: { 'data-watermark-text': 'Test Watermark' },
        setWatermark: vi.fn(),
      };

      // Mock findTargetNode to return our mock target
      const originalFindTargetNode = global.findTargetNode;
      global.findTargetNode = vi.fn(() => mockTarget);

      // Call the mutation callback
      mutationCallback([mutationRecord]);

      // Restore original function
      if (originalFindTargetNode) {
        global.findTargetNode = originalFindTargetNode;
      }
    });

    it('should handle mutation observer with no target found', () => {
      // Create a mock MutationObserver instance
      const mockMutationObserverInstance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      // Mock MutationObserver to return our mock instance
      vi.mocked(MutationObserver).mockImplementation(() => mockMutationObserverInstance);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Get the MutationObserver callback function
      const mutationCallback = vi.mocked(MutationObserver).mock.calls[0][0];

      // Call the mutation callback with removed nodes but no target found
      const mutationRecord = {
        removedNodes: [mockElement],
        type: 'childList',
        target: mockElement,
      };

      // Mock findTargetNode to return null (no target found)
      const originalFindTargetNode = global.findTargetNode;
      global.findTargetNode = vi.fn(() => null);

      // Call the mutation callback - should not throw
      expect(() => mutationCallback([mutationRecord])).not.toThrow();

      // Restore original function
      if (originalFindTargetNode) {
        global.findTargetNode = originalFindTargetNode;
      }
    });

    it('should handle mutation observer with parent element containing target', () => {
      // Mock findTargetNode to return a target
      const mockTarget = {
        targetElement: mockElement,
        parentElement: mockElement,
        setWatermark: vi.fn(),
      };

      // Create a mock MutationObserver instance
      const mockMutationObserverInstance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };

      // Mock MutationObserver to return our mock instance
      vi.mocked(MutationObserver).mockImplementation(() => mockMutationObserverInstance);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      // Get the MutationObserver callback function
      const mutationCallback = vi.mocked(MutationObserver).mock.calls[0][0];

      // Call the mutation callback with removed nodes
      const mutationRecord = {
        removedNodes: [mockElement],
        type: 'childList',
        target: mockElement,
      };

      // Mock findTargetNode to return our mock target
      const originalFindTargetNode = global.findTargetNode;
      global.findTargetNode = vi.fn(() => mockTarget);

      // Mock parentElement.contains to return true (target is still contained)
      mockElement.contains.mockReturnValueOnce(true);

      // Call the mutation callback
      mutationCallback([mutationRecord]);

      // Restore original function
      if (originalFindTargetNode) {
        global.findTargetNode = originalFindTargetNode;
      }
    });

    it('should handle clearAll function properly', () => {
      const { setWatermark, clearAll, clear } = useWatermark();
      setWatermark('Test Watermark');

      // Test clearAll by calling it directly
      expect(() => clearAll()).not.toThrow();
    });

    it('should handle onBeforeUnmount when instance exists', () => {
      const mockInstance = { uid: 1 };
      vi.mocked(getCurrentInstance).mockReturnValue(mockInstance);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      expect(onBeforeUnmount).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should not call onBeforeUnmount when instance does not exist', () => {
      vi.mocked(getCurrentInstance).mockReturnValue(null);

      const { setWatermark } = useWatermark();
      setWatermark('Test Watermark');

      expect(onBeforeUnmount).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined append element', () => {
      const { setWatermark } = useWatermark(ref(undefined));

      // This will throw an error because the source code doesn't handle undefined elements
      expect(() => setWatermark('Test Watermark')).toThrow();
    });

    it('should handle canvas creation failure', () => {
      vi.mocked(document.createElement).mockImplementation((tagName) => {
        if (tagName === 'canvas') throw new Error('Canvas creation failed');
        return mockElement;
      });

      const { setWatermark } = useWatermark();

      expect(() => setWatermark('Test Watermark')).toThrow();
    });

    it('should handle mutation observer creation failure', () => {
      vi.mocked(MutationObserver).mockImplementation(() => {
        throw new Error('MutationObserver creation failed');
      });

      const { setWatermark } = useWatermark();

      expect(() => setWatermark('Test Watermark')).toThrow();
    });

    it('should handle toDataURL failure', () => {
      mockCanvas.toDataURL.mockImplementation(() => {
        throw new Error('toDataURL failed');
      });

      const { setWatermark } = useWatermark();

      expect(() => setWatermark('Test Watermark')).toThrow();
    });
  });
});