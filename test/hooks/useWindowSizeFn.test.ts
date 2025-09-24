import { describe, it, expect, vi } from 'vitest';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';

describe('hooks/useWindowSizeFn', () => {
  describe('useWindowSizeFn', () => {
    it('should create start and stop functions', () => {
      const fn = vi.fn();

      const [start, stop] = useWindowSizeFn(fn);

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');
    });

    it('should handle custom wait time', () => {
      const fn = vi.fn();
      const wait = 100;

      const [start, stop] = useWindowSizeFn(fn, wait);

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');

      // Clean up
      stop();
    });

    it('should handle options', () => {
      const fn = vi.fn();
      const options = { immediate: true };

      const [start, stop] = useWindowSizeFn(fn, 150, options);

      expect(typeof start).toBe('function');
      expect(typeof stop).toBe('function');

      // Clean up
      stop();
    });

    it('should add and remove event listener', () => {
      const fn = vi.fn();
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const [start, stop] = useWindowSizeFn(fn);

      start();
      expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      stop();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
  });
});
