import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCountdown } from '/@/components/CountDown/src/useCountdown';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn((callback) => callback()),
}));

describe('components/CountDown/useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { currentCount, isStart } = useCountdown(10);

    expect(currentCount.value).toBe(10);
    expect(isStart.value).toBe(false);
  });

  it('should return all required functions', () => {
    const result = useCountdown(5);

    expect(result.start).toBeInstanceOf(Function);
    expect(result.reset).toBeInstanceOf(Function);
    expect(result.restart).toBeInstanceOf(Function);
    expect(result.clear).toBeInstanceOf(Function);
    expect(result.stop).toBeInstanceOf(Function);
    expect(result.currentCount).toBeDefined();
    expect(result.isStart).toBeDefined();
  });

  it('should start countdown correctly', () => {
    const { start, currentCount, isStart } = useCountdown(3);

    start();

    expect(isStart.value).toBe(true);

    // Fast-forward time
    vi.advanceTimersByTime(1000);
    expect(currentCount.value).toBe(2);

    vi.advanceTimersByTime(1000);
    expect(currentCount.value).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(currentCount.value).toBe(3); // Reset to original count
    expect(isStart.value).toBe(false);
  });

  it('should stop countdown correctly', () => {
    const { start, stop, currentCount, isStart } = useCountdown(5);

    start();
    expect(isStart.value).toBe(true);

    stop();
    expect(isStart.value).toBe(false);
    expect(currentCount.value).toBe(5); // Should not change when stopped
  });

  it('should reset countdown correctly', () => {
    const { start, reset, currentCount, isStart } = useCountdown(3);

    start();
    vi.advanceTimersByTime(2000); // Count down to 1
    expect(currentCount.value).toBe(1);

    reset();
    expect(currentCount.value).toBe(3);
    expect(isStart.value).toBe(false);
  });

  it('should restart countdown correctly', () => {
    const { start, restart, currentCount, isStart } = useCountdown(3);

    start();
    vi.advanceTimersByTime(1000);
    expect(currentCount.value).toBe(2);

    restart();
    expect(currentCount.value).toBe(3);
    expect(isStart.value).toBe(true);
  });

  it('should not start if already started', () => {
    const { start, currentCount } = useCountdown(3);

    start();
    const initialValue = currentCount.value;

    start(); // Try to start again
    vi.advanceTimersByTime(1000);

    // Should only advance once
    expect(currentCount.value).toBe(initialValue - 1);
  });

  it('should clear timer correctly', () => {
    const { start, clear, currentCount } = useCountdown(3);

    start();
    clear();

    // Timer should be cleared, count should not change
    const valueAfterClear = currentCount.value;
    vi.advanceTimersByTime(2000);
    expect(currentCount.value).toBe(valueAfterClear);
  });

  it('should handle unmount cleanup', () => {
    // Just verify the function can be called without errors
    const result = useCountdown(5);

    expect(result).toBeDefined();
    expect(result.start).toBeInstanceOf(Function);
  });
});
