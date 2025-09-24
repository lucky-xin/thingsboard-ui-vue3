import { describe, it, expect, vi } from 'vitest';
import { useTimeoutFn, useTimeoutRef } from '/@/hooks/core/useTimeout';

describe('hooks/useTimeout', () => {
  describe('useTimeoutFn', () => {
    it('should throw error for non-function handle', () => {
      expect(() => useTimeoutFn('not a function' as any, 100)).toThrow('handle is not Function!');
    });

    it('should execute handle after timeout with native option', () => {
      vi.useFakeTimers();
      const handle = vi.fn();

      useTimeoutFn(handle, 100, true);

      // With native=true, the function should be called immediately
      expect(handle).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('should execute handle after timeout without native option', async () => {
      vi.useFakeTimers();
      const handle = vi.fn();

      const { readyRef } = useTimeoutFn(handle, 100, false);

      // Initially not ready
      expect(readyRef.value).toBe(false);
      expect(handle).not.toHaveBeenCalled();

      // Fast-forward until timer is executed
      vi.advanceTimersByTime(100);
      // 等待 Vue watcher 调度
      await Promise.resolve();

      // Should be ready and handle called
      expect(readyRef.value).toBe(true);
      expect(handle).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });
  });

  describe('useTimeoutRef', () => {
    it('should set readyRef to true after timeout', () => {
      vi.useFakeTimers();

      const { readyRef } = useTimeoutRef(100);

      // Initially not ready
      expect(readyRef.value).toBe(false);

      // Fast-forward until timer is executed
      vi.advanceTimersByTime(100);

      // Should be ready
      expect(readyRef.value).toBe(true);

      vi.useRealTimers();
    });

    it('should stop timeout', () => {
      vi.useFakeTimers();

      const { readyRef, stop } = useTimeoutRef(100);

      // Stop the timeout
      stop();

      // Fast-forward past the timeout
      vi.advanceTimersByTime(100);

      // Should still not be ready
      expect(readyRef.value).toBe(false);

      vi.useRealTimers();
    });

    it('should restart timeout', () => {
      vi.useFakeTimers();

      const { readyRef, start } = useTimeoutRef(100);

      // Fast-forward past the timeout
      vi.advanceTimersByTime(100);
      expect(readyRef.value).toBe(true);

      // Reset and restart
      start();

      // Should not be ready immediately after restart
      expect(readyRef.value).toBe(false);

      // Fast-forward past the timeout again
      vi.advanceTimersByTime(100);
      expect(readyRef.value).toBe(true);

      vi.useRealTimers();
    });
  });
});
