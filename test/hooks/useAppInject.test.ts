import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useAppInject } from '/@/hooks/web/useAppInject';

describe('hooks/useAppInject', () => {
  describe('useAppInject', () => {
    it('should return isMobile computed property', () => {
      // Mock the useAppProviderContext function
      vi.mock('/@/components/Application', () => ({
        useAppProviderContext: () => ({
          isMobile: ref(false),
        }),
      }));

      const { getIsMobile } = useAppInject();

      expect(getIsMobile).toBeDefined();
      expect(typeof getIsMobile.value).toBe('boolean');
    });
  });
});
