import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ObjectDirective } from 'vue';
import RippleDirective from '/@/directives/ripple/index';
import type { RippleOptions, RippleProto } from '/@/directives/ripple/index';

// Mock CSS import
vi.mock('/@/directives/ripple/index.less', () => ({}));

describe('directives/ripple/index', () => {
  let mockElement: any;
  let mockBinding: any;
  let mockEvent: any;

  beforeEach(() => {
    // Mock DOM methods
    global.document.createElement = vi.fn((tag) => {
      const element = {
        className: '',
        style: {},
        appendChild: vi.fn(),
        removeChild: vi.fn(),
        parentNode: null,
      };
      if (tag === 'div') {
        return element;
      }
      return element;
    }) as any;

    global.window.getComputedStyle = vi.fn(() => ({
      borderWidth: '1px',
      position: 'static',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
    })) as any;

    mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      getAttribute: vi.fn(),
      appendChild: vi.fn(),
      getBoundingClientRect: vi.fn(() => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
      })),
      offsetWidth: 100,
      offsetHeight: 100,
      style: {
        position: '',
      },
      childNodes: [],
    };

    mockBinding = {
      value: true,
      modifiers: {},
    };

    mockEvent = {
      clientX: 50,
      clientY: 50,
      type: 'mousedown',
    };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should export RippleDirective', () => {
    expect(RippleDirective).toBeDefined();
    expect(typeof RippleDirective).toBe('object');
  });

  it('should have beforeMount hook', () => {
    expect((RippleDirective as ObjectDirective).beforeMount).toBeDefined();
    expect(typeof (RippleDirective as ObjectDirective).beforeMount).toBe('function');
  });

  it('should have updated hook', () => {
    expect((RippleDirective as ObjectDirective).updated).toBeDefined();
    expect(typeof (RippleDirective as ObjectDirective).updated).toBe('function');
  });

  describe('beforeMount hook', () => {
    it('should return early if binding value is false', () => {
      mockBinding.value = false;
      
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.addEventListener).not.toHaveBeenCalled();
    });

    it('should add event listener when binding value is true', () => {
      mockElement.getAttribute.mockReturnValue(null);
      
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.addEventListener).toHaveBeenCalledWith(
        'mousedown',
        expect.any(Function)
      );
    });

    it('should use custom background from attribute', () => {
      mockElement.getAttribute.mockReturnValue('#ff0000');
      
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.getAttribute).toHaveBeenCalledWith('ripple-background');
      expect(mockElement.addEventListener).toHaveBeenCalled();
    });

    it('should handle modifiers correctly', () => {
      mockBinding.modifiers = { click: true, '500': true };
      
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.addEventListener).toHaveBeenCalled();
    });
  });

  describe('updated hook', () => {
    beforeEach(() => {
      mockElement.clearRipple = vi.fn();
      mockElement.setBackground = vi.fn();
    });

    it('should call clearRipple when binding value is false', () => {
      mockBinding.value = false;
      
      (RippleDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.clearRipple).toHaveBeenCalled();
    });

    it('should not call clearRipple when binding value is true', () => {
      mockBinding.value = true;
      mockElement.getAttribute.mockReturnValue('#blue');
      
      (RippleDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.clearRipple).not.toHaveBeenCalled();
    });

    it('should call setBackground with attribute value', () => {
      mockBinding.value = true;
      mockElement.getAttribute.mockReturnValue('#green');
      
      (RippleDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      
      expect(mockElement.setBackground).toHaveBeenCalledWith('#green');
    });

    it('should handle missing clearRipple method gracefully', () => {
      mockElement.clearRipple = undefined;
      mockBinding.value = false;
      
      expect(() => {
        (RippleDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      }).not.toThrow();
    });

    it('should handle missing setBackground method gracefully', () => {
      mockElement.setBackground = undefined;
      mockBinding.value = true;
      mockElement.getAttribute.mockReturnValue('#red');
      
      expect(() => {
        (RippleDirective as ObjectDirective).updated!(mockElement, mockBinding, null as any, null as any);
      }).not.toThrow();
    });
  });

  describe('ripple effect functionality', () => {
    it('should create ripple elements when event is triggered', () => {
      vi.useFakeTimers();
      const createElementSpy = vi.spyOn(document, 'createElement');
      
      mockElement.getAttribute.mockReturnValue(null);
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      // Trigger the event listener
      const eventListener = mockElement.addEventListener.mock.calls[0][1];
      eventListener(mockEvent);
      
      expect(createElementSpy).toHaveBeenCalledTimes(2); // ripple and container
      
      vi.useRealTimers();
    });

    it('should handle touch events', () => {
      mockEvent.touches = [{ clientX: 30, clientY: 40 }];
      delete mockEvent.clientX;
      delete mockEvent.clientY;
      
      mockElement.getAttribute.mockReturnValue(null);
      (RippleDirective as ObjectDirective).beforeMount!(mockElement, mockBinding, null as any, null as any);
      
      const eventListener = mockElement.addEventListener.mock.calls[0][1];
      
      expect(() => {
        eventListener(mockEvent);
      }).not.toThrow();
    });
  });

  describe('directive properties', () => {
    it('should allow setting background property', () => {
      (RippleDirective as RippleProto).background = '#custom';
      expect(RippleDirective.background).toBe('#custom');
    });

    it('should allow setting zIndex property', () => {
      (RippleDirective as RippleProto).zIndex = '1000';
      expect(RippleDirective.zIndex).toBe('1000');
    });
  });

  describe('export types', () => {
    it('should have correct type structure', () => {
      // These are compile-time checks, but we can verify the directive structure
      expect(RippleDirective).toHaveProperty('beforeMount');
      expect(RippleDirective).toHaveProperty('updated');
      
      // Check that it's a valid Vue directive structure
      expect(typeof (RippleDirective as ObjectDirective).beforeMount).toBe('function');
      expect(typeof (RippleDirective as ObjectDirective).updated).toBe('function');
    });
  });
});