import { describe, it, expect, vi } from 'vitest';
import { useLockFn } from '/@/hooks/core/useLockFn';

describe('hooks/useLockFn', () => {
  describe('useLockFn', () => {
    it('should lock function execution', async () => {
      const mockFn = vi.fn().mockResolvedValue('result');
      const lockedFn = useLockFn(mockFn);

      // Call the function twice in quick succession
      const promise1 = lockedFn();
      const promise2 = lockedFn();

      const result1 = await promise1;
      const result2 = await promise2;

      // Only the first call should execute the function
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(result1).toBe('result');
      expect(result2).toBeUndefined();
    });

    it('should unlock function after execution', async () => {
      const mockFn = vi.fn().mockResolvedValue('result');
      const lockedFn = useLockFn(mockFn);

      await lockedFn();
      await lockedFn();

      // Both calls should execute the function since the first one completed
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should handle function errors and unlock', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('test error'));
      const lockedFn = useLockFn(mockFn);

      await expect(lockedFn()).rejects.toThrow('test error');
      await expect(lockedFn()).rejects.toThrow('test error');

      // Both calls should execute the function since the lock is released after errors
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});
