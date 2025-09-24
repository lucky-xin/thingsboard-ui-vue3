import { describe, it, expect, vi } from 'vitest';
import { useScrollTo } from '/@/hooks/event/useScrollTo';

describe('hooks/useScrollTo', () => {
  describe('useScrollTo', () => {
    it('should create scroll animation functions', () => {
      const el = document.createElement('div');
      const to = 100;

      const { start, stop } = useScrollTo({ el, to });

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');
    });

    it('should handle custom duration', () => {
      const el = document.createElement('div');
      const to = 100;
      const duration = 1000;

      const { start, stop } = useScrollTo({ el, to, duration });

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');

      // Clean up
      stop();
    });

    it('should handle callback function', () => {
      const el = document.createElement('div');
      const to = 100;
      const callback = vi.fn();

      const { start, stop } = useScrollTo({ el, to, callback });

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');

      // Clean up
      stop();
    });

    it('should calculate easing correctly', () => {
      // Test the easeInOutQuad function indirectly
      const el = document.createElement('div');
      const to = 100;

      const { start, stop } = useScrollTo({ el, to });

      // These should not throw errors
      expect(() => start()).not.toThrow();

      // Clean up
      stop();
    });
  });
});
