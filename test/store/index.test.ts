import { describe, it, expect, vi } from 'vitest';
import { setupStore, store } from '/@/store/index';

describe('store/index', () => {
  describe('setupStore', () => {
    it('should setup store correctly', () => {
      const mockApp = {
        use: vi.fn(),
      } as any;

      setupStore(mockApp);
      // 由于 store 是同一个实例，直接断言被调用即可
      expect(mockApp.use).toHaveBeenCalled();
    });
  });

  describe('store', () => {
    it('should create pinia store', () => {
      expect(store).toBeDefined();
      expect(typeof store).toBe('object');
    });
  });
});
