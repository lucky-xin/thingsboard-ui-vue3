import { describe, it, expect } from 'vitest';
import { useDesign } from '/@/hooks/web/useDesign';

describe('hooks/useDesign', () => {
  describe('useDesign', () => {
    it('should return design properties', () => {
      const scope = 'test';
      const result = useDesign(scope);
      expect(result).toBeDefined();
      expect(result.prefixCls).toBe('jeesite-test');
      expect(result.prefixVar).toBe('jeesite');
      expect(result.hashId).toBe('hash123');
    });
  });
});
