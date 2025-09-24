import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useScroll } from '/@/hooks/event/useScroll';

// Mock the Vue lifecycle hooks to avoid errors
vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    onMounted: vi.fn((fn) => fn()),
    onUnmounted: vi.fn(),
    watch: vi.fn((refEl, callback) => {
      callback(refEl.value, null, () => {});
      return vi.fn();
    }),
    ref: actual.ref,
  };
});

describe('hooks/useScroll', () => {
  describe('useScroll', () => {
    it('should create scroll refs and handler', () => {
      const refEl = ref(document.createElement('div'));

      const { refX, refY, stop } = useScroll(refEl);

      expect(refX.value).toBe(0);
      expect(refY.value).toBe(0);
      expect(typeof stop).toBe('function');
    });

    it('should handle window element', () => {
      const refEl = ref(window);

      const { refX, refY, stop } = useScroll(refEl);

      expect(refX.value).toBe(0);
      expect(refY.value).toBe(0);

      // Clean up
      stop();
    });

    it('should handle null element', () => {
      const refEl = ref(null);

      const { refX, refY, stop } = useScroll(refEl);

      expect(refX.value).toBe(0);
      expect(refY.value).toBe(0);

      // Clean up
      stop();
    });

    it('should use throttle function with options', () => {
      const refEl = ref(document.createElement('div'));

      const { refX, refY, stop } = useScroll(refEl, {
        wait: 100,
        leading: true,
        trailing: true,
      });

      expect(refX.value).toBe(0);
      expect(refY.value).toBe(0);

      // Clean up
      stop();
    });
  });
});
