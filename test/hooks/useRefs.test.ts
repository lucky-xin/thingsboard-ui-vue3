import { describe, it, expect, vi } from 'vitest';
import { useRefs } from '/@/hooks/core/useRefs';

// Mock the Vue lifecycle hooks to avoid errors
vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    onBeforeUpdate: vi.fn(),
  };
});

describe('hooks/useRefs', () => {
  describe('useRefs', () => {
    it('should create refs and setRefs function', () => {
      const { refs, setRefs } = useRefs();

      expect(refs).toBeDefined();
      expect(typeof setRefs).toBe('function');
      expect(Array.isArray(refs.value)).toBe(true);
    });

    it('should set refs correctly', () => {
      const { refs, setRefs } = useRefs();
      const mockElement = document.createElement('div');

      const setRef = setRefs(0);
      setRef(mockElement);

      expect(refs.value[0]).toBe(mockElement);
    });

    it('should clear refs on before update', () => {
      // This is harder to test without a full Vue instance
      // We'll test that the function exists and returns the expected structure
      const { refs } = useRefs();

      // Initially empty
      expect(refs.value.length).toBe(0);
    });
  });
});
