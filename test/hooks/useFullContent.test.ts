import { describe, it, expect, vi } from 'vitest';

describe('hooks/useFullContent', () => {
  describe('useFullContent', () => {
    it('should return full content computed property', async () => {
      vi.resetModules();
      vi.doMock('/@/store/modules/app', () => ({
        useAppStore: () => ({
          getProjectConfig: { fullContent: false },
        }),
      }));
      vi.doMock('vue-router', () => ({
        useRouter: () => ({
          currentRoute: { value: { query: {} } },
        }),
      }));

      const { useFullContent } = await import('/@/hooks/web/useFullContent');
      const { getFullContent } = useFullContent();

      expect(getFullContent).toBeDefined();
      expect(typeof getFullContent.value).toBe('boolean');
    });

    it('should return true when project config fullContent is true', async () => {
      vi.resetModules();
      vi.doMock('/@/store/modules/app', () => ({
        useAppStore: () => ({
          getProjectConfig: { fullContent: true },
        }),
      }));
      vi.doMock('vue-router', () => ({
        useRouter: () => ({
          currentRoute: { value: { query: {} } },
        }),
      }));

      const { useFullContent } = await import('/@/hooks/web/useFullContent');
      const { getFullContent } = useFullContent();
      expect(getFullContent.value).toBe(true);
    });
  });
});
