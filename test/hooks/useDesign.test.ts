import { describe, it, expect, vi } from 'vitest';
import { useDesign } from '/@/hooks/web/useDesign';

describe('hooks/useDesign', () => {
  describe('useDesign', () => {
    it('should return design properties', () => {
      // Mock the useAppProviderContext function
      vi.mock('/@/components/Application', () => ({
        useAppProviderContext: () => ({
          prefixCls: 'jeesite',
        }),
      }));

      // Mock the theme.useToken function
      vi.mock('ant-design-vue', () => ({
        theme: {
          useToken: () => ({
            hashId: { value: 'hash123' },
          }),
        },
      }));

      const scope = 'test';
      const result = useDesign(scope);

      expect(result).toBeDefined();
      expect(result.prefixCls).toBe('jeesite-test');
      expect(result.prefixVar).toBe('jeesite');
      expect(result.hashId).toBe('hash123');
    });
  });
});
