import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTimeoutFn, useTimeoutRef } from '/@/hooks/core/useTimeout';

// Mock Vue functions
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  watch: vi.fn(),
}));

// Mock VueUse
vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn(),
}));

// Mock utils
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

import { ref, watch } from 'vue';
import { tryOnUnmounted } from '@vueuse/core';
import { isFunction } from '/@/utils/is';

describe('hooks/core/useTimeout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useTimeoutRef', () => {
    it('should return readyRef, stop, and start functions', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);

      const result = useTimeoutRef(1000);

      expect(result).toHaveProperty('readyRef');
      expect(result).toHaveProperty('stop');
      expect(result).toHaveProperty('start');
      expect(typeof result.stop).toBe('function');
      expect(typeof result.start).toBe('function');
    });

    it('should initialize with false readyRef', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);

      const { readyRef } = useTimeoutRef(1000);

      expect(ref).toHaveBeenCalledWith(false);
      expect(readyRef.value).toBe(false);
    });

    it('should set readyRef to false when stop is called', () => {
      const mockRef = { value: true };
      (ref as any).mockReturnValue(mockRef);

      const { stop } = useTimeoutRef(1000);

      stop();

      expect(mockRef.value).toBe(false);
    });

    it('should register cleanup on unmount', () => {
      useTimeoutRef(1000);

      expect(tryOnUnmounted).toHaveBeenCalledTimes(1);
      expect(typeof (tryOnUnmounted as any).mock.calls[0][0]).toBe('function');
    });

    it('should handle different timeout values', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);

      const result1 = useTimeoutRef(500);
      const result2 = useTimeoutRef(2000);

      expect(result1.readyRef).toBe(mockRef);
      expect(result2.readyRef).toBe(mockRef);
      expect(typeof result1.start).toBe('function');
      expect(typeof result2.start).toBe('function');
    });

    it('should provide working stop and start functions', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);

      const { stop, start } = useTimeoutRef(1000);

      expect(() => stop()).not.toThrow();
      expect(() => start()).not.toThrow();
    });
  });

  describe('useTimeoutFn', () => {
    it('should throw error if handle is not a function', () => {
      (isFunction as any).mockReturnValue(false);

      expect(() => useTimeoutFn('not a function' as any, 1000)).toThrow('handle is not Function!');
    });

    it('should return readyRef, stop, and start functions', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle = vi.fn();
      const result = useTimeoutFn(handle, 1000);

      expect(result).toHaveProperty('readyRef');
      expect(result).toHaveProperty('stop');
      expect(result).toHaveProperty('start');
    });

    it('should call handle immediately when native is true', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle = vi.fn();
      useTimeoutFn(handle, 1000, true);

      expect(handle).toHaveBeenCalledTimes(1);
    });

    it('should setup watcher when native is false', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle = vi.fn();
      useTimeoutFn(handle, 1000, false);

      expect(watch).toHaveBeenCalledTimes(1);
      expect(watch).toHaveBeenCalledWith(
        mockRef,
        expect.any(Function),
        { immediate: false }
      );
    });

    it('should call handle when readyRef becomes true (via watcher)', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle = vi.fn();
      useTimeoutFn(handle, 1000);

      // Get the watcher callback
      const watcherCallback = (watch as any).mock.calls[0][1];
      
      // Simulate readyRef becoming true
      watcherCallback(true);

      expect(handle).toHaveBeenCalledTimes(1);
    });

    it('should not call handle when readyRef becomes false (via watcher)', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle = vi.fn();
      useTimeoutFn(handle, 1000);

      // Get the watcher callback
      const watcherCallback = (watch as any).mock.calls[0][1];
      
      // Simulate readyRef becoming false
      watcherCallback(false);

      expect(handle).not.toHaveBeenCalled();
    });

    it('should work with different timeout values', () => {
      const mockRef = { value: false };
      (ref as any).mockReturnValue(mockRef);
      (isFunction as any).mockReturnValue(true);

      const handle1 = vi.fn();
      const handle2 = vi.fn();
      
      const result1 = useTimeoutFn(handle1, 500);
      const result2 = useTimeoutFn(handle2, 2000);

      expect(result1.readyRef).toBe(mockRef);
      expect(result2.readyRef).toBe(mockRef);
    });

    it('should validate function parameter', () => {
      (isFunction as any).mockReturnValue(true);
      
      const handle = vi.fn();
      expect(() => useTimeoutFn(handle, 1000)).not.toThrow();
      
      expect(isFunction).toHaveBeenCalledWith(handle);
    });
  });
});