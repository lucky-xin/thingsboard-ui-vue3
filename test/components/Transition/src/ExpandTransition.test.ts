import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExpandTransition, { upperFirst } from '/@/components/Transition/src/ExpandTransition';

describe('components/Transition/src/ExpandTransition', () => {
  let mockElement: any;

  beforeEach(() => {
    mockElement = {
      style: {
        transition: 'all 0.3s ease',
        overflow: 'visible',
        height: 'auto',
        width: 'auto',
        setProperty: vi.fn(),
      },
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
      parentNode: {
        classList: {
          add: vi.fn(),
          remove: vi.fn(),
        },
      },
      offsetHeight: 100,
      offsetWidth: 200,
    };

    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((callback) => {
      callback(0);
      return 1;
    });
  });

  describe('upperFirst utility function', () => {
    it('should make first character uppercase', () => {
      expect(upperFirst('hello')).toBe('Hello');
      expect(upperFirst('world')).toBe('World');
      expect(upperFirst('test')).toBe('Test');
    });

    it('should handle single character strings', () => {
      expect(upperFirst('a')).toBe('A');
      expect(upperFirst('z')).toBe('Z');
    });

    it('should handle empty strings', () => {
      expect(upperFirst('')).toBe('');
    });

    it('should handle already uppercase strings', () => {
      expect(upperFirst('Hello')).toBe('Hello');
      expect(upperFirst('WORLD')).toBe('WORLD');
    });

    it('should handle strings with numbers and special characters', () => {
      expect(upperFirst('1test')).toBe('1test');
      expect(upperFirst('!hello')).toBe('!hello');
      expect(upperFirst('@world')).toBe('@world');
    });
  });

  describe('ExpandTransition default export', () => {
    it('should create transition object with height by default', () => {
      const transition = ExpandTransition();

      expect(transition).toHaveProperty('beforeEnter');
      expect(transition).toHaveProperty('enter');
      expect(transition).toHaveProperty('afterEnter');
      expect(transition).toHaveProperty('enterCancelled');
      expect(transition).toHaveProperty('leave');
      expect(transition).toHaveProperty('afterLeave');
      expect(transition).toHaveProperty('leaveCancelled');
    });

    it('should create transition object with width when x is true', () => {
      const transition = ExpandTransition('', true);

      expect(transition).toHaveProperty('beforeEnter');
      expect(transition).toHaveProperty('enter');
      expect(transition).toHaveProperty('afterEnter');
      expect(transition).toHaveProperty('enterCancelled');
      expect(transition).toHaveProperty('leave');
      expect(transition).toHaveProperty('afterLeave');
      expect(transition).toHaveProperty('leaveCancelled');
    });

    it('should handle beforeEnter phase', () => {
      const transition = ExpandTransition();

      transition.beforeEnter(mockElement);

      expect(mockElement._parent).toBe(mockElement.parentNode);
      expect(mockElement._initialStyle).toEqual({
        transition: 'all 0.3s ease',
        overflow: 'visible',
        height: 'auto',
      });
    });

    it('should handle enter phase', () => {
      const transition = ExpandTransition('expanded-class');
      mockElement._initialStyle = {
        transition: 'all 0.3s ease',
        overflow: 'visible',
        height: 'auto',
      };
      // Set up _parent to point to parentNode
      mockElement._parent = mockElement.parentNode;

      transition.enter(mockElement);

      expect(mockElement.style.setProperty).toHaveBeenCalledWith('transition', 'none', 'important');
      expect(mockElement.style.overflow).toBe('hidden');
      expect(mockElement._parent.classList.add).toHaveBeenCalledWith('expanded-class');
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('should handle enter phase without expanded parent class', () => {
      const transition = ExpandTransition();
      mockElement._initialStyle = {
        transition: 'all 0.3s ease',
        overflow: 'visible',
        height: 'auto',
      };
      // Set up _parent to point to parentNode
      mockElement._parent = mockElement.parentNode;

      transition.enter(mockElement);

      expect(mockElement.style.setProperty).toHaveBeenCalledWith('transition', 'none', 'important');
      expect(mockElement.style.overflow).toBe('hidden');
      // When no expandedParentClass is provided, parent classList.add should not be called
      expect(mockElement._parent.classList.add).not.toHaveBeenCalled();
    });

    it('should handle leave phase', () => {
      const transition = ExpandTransition();

      transition.leave(mockElement);

      expect(mockElement._initialStyle).toEqual({
        transition: '',
        overflow: 'visible',
        height: 'auto',
      });
      expect(mockElement.style.overflow).toBe('hidden');
      expect(mockElement.style.height).toBe('0');
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('should handle afterLeave with parent class removal', () => {
      const transition = ExpandTransition('expanded-class');
      mockElement._initialStyle = {
        transition: '',
        overflow: 'visible',
        height: 'auto',
      };
      // Set up _parent to point to parentNode
      mockElement._parent = mockElement.parentNode;

      transition.afterLeave(mockElement);

      expect(mockElement._parent.classList.remove).toHaveBeenCalledWith('expanded-class');
      expect(mockElement.style.overflow).toBe('visible');
    });

    it('should handle width-based transitions', () => {
      const transition = ExpandTransition('', true);

      transition.beforeEnter(mockElement);

      expect(mockElement._initialStyle).toEqual({
        transition: 'all 0.3s ease',
        overflow: 'visible',
        width: 'auto',
      });
    });

    it('should handle width-based leave transition', () => {
      const transition = ExpandTransition('', true);

      transition.leave(mockElement);

      expect(mockElement.style.width).toBe('0');
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });

    it('should handle resetStyles with null size', () => {
      const transition = ExpandTransition();
      mockElement._initialStyle = {
        transition: '',
        overflow: 'hidden',
        height: null,
      };

      transition.afterEnter(mockElement);

      expect(mockElement.style.overflow).toBe('hidden');
      expect(mockElement._initialStyle).toBeUndefined();
    });

    it('should handle resetStyles with defined size', () => {
      const transition = ExpandTransition();
      mockElement._initialStyle = {
        transition: '',
        overflow: 'visible',
        height: '200px',
      };

      transition.afterEnter(mockElement);

      expect(mockElement.style.overflow).toBe('visible');
      expect(mockElement.style.height).toBe('200px');
      expect(mockElement._initialStyle).toBeUndefined();
    });

    it('should handle enterCancelled the same as afterEnter', () => {
      const transition = ExpandTransition();
      mockElement._initialStyle = {
        transition: '',
        overflow: 'visible',
        height: 'auto',
      };

      expect(() => transition.enterCancelled(mockElement)).not.toThrow();
      expect(mockElement._initialStyle).toBeUndefined();
    });

    it('should handle leaveCancelled the same as afterLeave', () => {
      const transition = ExpandTransition('test-class');
      mockElement._initialStyle = {
        transition: '',
        overflow: 'visible',
        height: 'auto',
      };
      // Set up _parent to point to parentNode
      mockElement._parent = mockElement.parentNode;

      transition.leaveCancelled(mockElement);

      expect(mockElement._parent.classList.remove).toHaveBeenCalledWith('test-class');
      expect(mockElement._initialStyle).toBeUndefined();
    });

    it('should handle missing parent node gracefully', () => {
      const transition = ExpandTransition('test-class');
      mockElement.parentNode = null;
      mockElement._parent = null;

      transition.beforeEnter(mockElement);
      transition.enter(mockElement);
      transition.afterLeave(mockElement);

      expect(transition).toBeDefined();
    });
  });
});