import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useIntersectionObserver } from '/@/hooks/event/useIntersectionObserver';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

global.IntersectionObserver = vi.fn(() => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
})) as any;

describe('hooks/useIntersectionObserver', () => {
  describe('useIntersectionObserver', () => {
    beforeEach(() => {
      mockObserve.mockClear();
      mockUnobserve.mockClear();
      mockDisconnect.mockClear();
    });

    it('should create intersection observer', () => {
      const target = ref(document.createElement('div'));
      const onIntersect = vi.fn();

      const { observer, stop } = useIntersectionObserver({
        target,
        onIntersect,
      });

      expect(observer.value).toBeDefined();
      expect(typeof stop).toBe('function');
      expect(mockObserve).toHaveBeenCalledWith(target.value);

      // Clean up
      stop();
    });

    it('should handle null target', () => {
      const target = ref(null);
      const onIntersect = vi.fn();

      const { observer, stop } = useIntersectionObserver({
        target,
        onIntersect,
      });

      expect(observer.value).toBeDefined();
      expect(mockObserve).not.toHaveBeenCalled();

      // Clean up
      stop();
    });

    it('should disconnect observer on stop', () => {
      const target = ref(document.createElement('div'));
      const onIntersect = vi.fn();

      const { observer, stop } = useIntersectionObserver({
        target,
        onIntersect,
      });

      stop();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
