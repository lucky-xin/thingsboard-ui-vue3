import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';
import { useTimeoutFn, useTimeoutRef } from '/@/hooks/core/useTimeout';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn((fn) => fn),
}));

// Mock isFunction
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

describe('hooks/core/useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useTimeoutRef', () => {
    it('should start timer immediately', () => {
      const { readyRef, stop, start } = useTimeoutRef(1000);
      
      expect(readyRef.value).toBe(false);
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      expect(readyRef.value).toBe(true);
    });

    it('should stop timer', () => {
      const { readyRef, stop } = useTimeoutRef(1000);
      
      expect(readyRef.value).toBe(false);
      
      stop();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      expect(readyRef.value).toBe(false);
    });

    it('should restart timer when start is called', () => {
      const { readyRef, stop, start } = useTimeoutRef(1000);
      
      expect(readyRef.value).toBe(false);
      
      // Stop and restart
      stop();
      start();
      
      expect(readyRef.value).toBe(false);
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      expect(readyRef.value).toBe(true);
    });

    it('should handle multiple start calls', () => {
      const { readyRef, stop, start } = useTimeoutRef(1000);
      
      expect(readyRef.value).toBe(false);
      
      // Call start multiple times
      start();
      start();
      
      expect(readyRef.value).toBe(false);
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      
      expect(readyRef.value).toBe(true);
    });
  });

  describe('useTimeoutFn', () => {
    it('should call function after timeout', async () => {
      const mockFn = vi.fn();
      
      useTimeoutFn(mockFn, 1000);
      
      expect(mockFn).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      await nextTick();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should call function immediately when native is true', () => {
      const mockFn = vi.fn();
      
      useTimeoutFn(mockFn, 1000, true);
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should throw error when handle is not a function', () => {
      expect(() => {
        useTimeoutFn('not a function' as any, 1000);
      }).toThrow('handle is not Function!');
    });

    it('should provide stop and start methods', () => {
      const mockFn = vi.fn();
      const { readyRef, stop, start } = useTimeoutFn(mockFn, 1000);
      
      expect(typeof stop).toBe('function');
      expect(typeof start).toBe('function');
      expect(readyRef.value).toBe(false);
    });

    it('should stop timer when stop is called', async () => {
      const mockFn = vi.fn();
      const { stop } = useTimeoutFn(mockFn, 1000);
      
      stop();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      await nextTick();
      
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should restart timer when start is called', async () => {
      const mockFn = vi.fn();
      const { stop, start } = useTimeoutFn(mockFn, 1000);
      
      stop();
      start();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      await nextTick();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple start calls', async () => {
      const mockFn = vi.fn();
      const { start } = useTimeoutFn(mockFn, 1000);
      
      start();
      start();
      
      // Fast-forward time
      vi.advanceTimersByTime(1000);
      await nextTick();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should work with different wait times', async () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      
      useTimeoutFn(mockFn1, 500);
      useTimeoutFn(mockFn2, 1000);
      
      // Fast-forward 500ms
      vi.advanceTimersByTime(500);
      await nextTick();
      
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();
      
      // Fast-forward another 500ms
      vi.advanceTimersByTime(500);
      await nextTick();
      
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
  });
});