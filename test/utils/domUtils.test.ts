import { describe, it, expect, vi } from 'vitest';
import {
  getBoundingClientRect,
  hasClass,
  addClass,
  removeClass,
  getViewportOffset,
  hackCss,
  on,
  off,
  once,
  useRafThrottle,
} from '/@/utils/domUtils';

describe('utils/domUtils', () => {
  describe('getBoundingClientRect', () => {
    it('should return 0 for invalid element', () => {
      expect(getBoundingClientRect(null as any)).toBe(0);
    });

    it('should return bounding rect for valid element', () => {
      const mockElement = {
        getBoundingClientRect: vi.fn().mockReturnValue({ x: 10, y: 20, width: 100, height: 50 }),
      } as any;

      const result = getBoundingClientRect(mockElement);
      expect(result).toEqual({ x: 10, y: 20, width: 100, height: 50 });
    });
  });

  describe('hasClass', () => {
    it('should return false for invalid element or class', () => {
      expect(hasClass(null as any, 'test')).toBe(false);
      expect(hasClass({} as any, '')).toBe(false);
    });

    it('should throw error for class with space', () => {
      expect(() => hasClass({} as any, 'test class')).toThrow('className should not contain space');
    });

    it('should check class with classList', () => {
      const mockElement = {
        classList: {
          contains: vi.fn().mockReturnValue(true),
        },
      } as any;

      expect(hasClass(mockElement, 'test')).toBe(true);
      expect(mockElement.classList.contains).toHaveBeenCalledWith('test');
    });
  });

  describe('addClass', () => {
    it('should not add class for invalid element', () => {
      expect(() => addClass(null as any, 'test')).not.toThrow();
    });

    it('should add class with classList', () => {
      const mockElement = {
        classList: {
          add: vi.fn(),
        },
        className: '',
      } as any;

      addClass(mockElement, 'test');
      expect(mockElement.classList.add).toHaveBeenCalledWith('test');
    });
  });

  describe('removeClass', () => {
    it('should not remove class for invalid element or class', () => {
      expect(() => removeClass(null as any, 'test')).not.toThrow();
      expect(() => removeClass({} as any, '')).not.toThrow();
    });

    it('should remove class with classList', () => {
      const mockElement = {
        classList: {
          remove: vi.fn(),
        },
        className: 'test',
      } as any;

      removeClass(mockElement, 'test');
      expect(mockElement.classList.remove).toHaveBeenCalledWith('test');
    });
  });

  describe('hackCss', () => {
    it('should generate css with prefixes', () => {
      const result = hackCss('transform', 'rotate(45deg)');
      expect(result).toHaveProperty('transform', 'rotate(45deg)');
      expect(result).toHaveProperty('webkitTransform', 'rotate(45deg)');
      expect(result).toHaveProperty('MozTransform', 'rotate(45deg)');
      expect(result).toHaveProperty('msTransform', 'rotate(45deg)');
      expect(result).toHaveProperty('OTTransform', 'rotate(45deg)');
    });
  });

  describe('event handlers', () => {
    it('should add event listener', () => {
      const mockElement = {
        addEventListener: vi.fn(),
      } as any;
      const handler = vi.fn();

      on(mockElement, 'click', handler);
      expect(mockElement.addEventListener).toHaveBeenCalledWith('click', handler, false);
    });

    it('should remove event listener', () => {
      const mockElement = {
        removeEventListener: vi.fn(),
      } as any;
      const handler = vi.fn();

      off(mockElement, 'click', handler);
      expect(mockElement.removeEventListener).toHaveBeenCalledWith('click', handler, false);
    });

    it('should add and remove event listener once', () => {
      const mockElement = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      } as any;
      const handler = vi.fn();

      once(mockElement, 'click', handler);
      expect(mockElement.addEventListener).toHaveBeenCalled();
    });
  });

  describe('useRafThrottle', () => {
    it('should throttle function with requestAnimationFrame', () => {
      vi.useFakeTimers();
      let rafCallback: FrameRequestCallback | null = null;
      const mockRaf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        rafCallback = cb;
        return 1;
      });

      const fn = vi.fn();
      const throttledFn = useRafThrottle(fn);

      throttledFn();
      throttledFn(); // This should be ignored due to throttling

      // Execute the requestAnimationFrame callback
      if (rafCallback) {
        rafCallback(0);
      }

      expect(fn).toHaveBeenCalledTimes(1);

      mockRaf.mockRestore();
      vi.useRealTimers();
    });
  });
});
