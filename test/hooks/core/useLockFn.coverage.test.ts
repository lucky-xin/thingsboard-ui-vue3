import { describe, it, expect, vi } from 'vitest';
import { useLockFn } from '/@/hooks/core/useLockFn';

describe('useLockFn coverage', () => {
  it('should return a function', () => {
    const mockFn = vi.fn();
    const lockedFn = useLockFn(mockFn);

    expect(typeof lockedFn).toBe('function');
  });

  it('should execute function when not locked', async () => {
    const mockFn = vi.fn().mockResolvedValue('result');
    const lockedFn = useLockFn(mockFn);

    const result = await lockedFn('arg1', 'arg2');

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
    expect(result).toBe('result');
  });

  it('should not execute function when locked', async () => {
    const mockFn = vi.fn().mockResolvedValue('result');
    const lockedFn = useLockFn(mockFn);

    // Start first call
    const promise1 = lockedFn('arg1');
    // Try second call while first is running
    const promise2 = lockedFn('arg2');

    await Promise.all([promise1, promise2]);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('arg1');
  });

  it('should handle function errors', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('test error'));
    const lockedFn = useLockFn(mockFn);

    await expect(lockedFn('arg1')).rejects.toThrow('test error');
    expect(mockFn).toHaveBeenCalledWith('arg1');
  });

  it('should unlock after function completes', async () => {
    const mockFn = vi.fn().mockResolvedValue('result');
    const lockedFn = useLockFn(mockFn);

    // First call
    await lockedFn('arg1');
    // Second call should work after first completes
    await lockedFn('arg2');

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenNthCalledWith(1, 'arg1');
    expect(mockFn).toHaveBeenNthCalledWith(2, 'arg2');
  });

  it('should unlock after function throws error', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('test error'));
    const lockedFn = useLockFn(mockFn);

    // First call should throw
    await expect(lockedFn('arg1')).rejects.toThrow('test error');
    // Second call should work after first throws
    mockFn.mockResolvedValue('result');
    const result = await lockedFn('arg2');

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(result).toBe('result');
  });

  it('should work with different parameter types', async () => {
    const mockFn = vi.fn().mockResolvedValue(42);
    const lockedFn = useLockFn<[number, string], number>(mockFn);

    const result = await lockedFn(123, 'test');

    expect(mockFn).toHaveBeenCalledWith(123, 'test');
    expect(result).toBe(42);
  });
});

