import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Memory } from '/@/utils/cache/memory';

describe('utils/cache/memory', () => {
  let memory: Memory<any, any>;

  beforeEach(() => {
    vi.useFakeTimers();
    memory = new Memory(0.05); // 50ms 默认过期
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should set and get cache item with default alive', () => {
    memory.set('a' as any, 1);
    const item = memory.get('a' as any);
    expect(item?.value).toBe(1);
    expect(typeof item?.time).toBe('number');
    expect(item?.alive).toBeGreaterThan(0);
  });

  it('should expire item by timer', () => {
    memory.set('b' as any, 2); // uses default alive 50ms
    expect(memory.get('b' as any)?.value).toBe(2);
    vi.advanceTimersByTime(60);
    expect(memory.get('b' as any)).toBeUndefined();
  });

  it('should support explicit expires timestamp (absolute)', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    // 绝对过期时间：now + 100ms
    memory.set('c' as any, 3, now + 100);
    expect(memory.get('c' as any)?.value).toBe(3);
    vi.advanceTimersByTime(90);
    expect(memory.get('c' as any)?.value).toBe(3);
    vi.advanceTimersByTime(15);
    expect(memory.get('c' as any)).toBeUndefined();
  });

  it('should clear previous timeout when resetting same key', () => {
    const clearSpy = vi.spyOn(global, 'clearTimeout');
    memory.set('d' as any, 4, 100);
    const firstTimeout = memory.get('d' as any)?.timeoutId as any;
    memory.set('d' as any, 5, 100);
    expect(clearSpy).toHaveBeenCalledWith(firstTimeout);
    expect(memory.get('d' as any)?.value).toBe(5);
  });

  it('should remove item and return previous value', () => {
    memory.set('e' as any, 6, 1000);
    const v = memory.remove('e' as any);
    expect(v).toBe(6);
    expect(memory.get('e' as any)).toBeUndefined();
  });

  it('should reset cache respecting remaining time', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    const future = now + 80;
    const expired = now - 10;
    memory.resetCache({
      x: { value: 10, time: future } as any,
      y: { value: 20, time: expired } as any,
    } as any);
    expect(memory.get('x' as any)?.value).toBe(10);
    expect(memory.get('y' as any)).toBeUndefined();
    vi.advanceTimersByTime(85);
    expect(memory.get('x' as any)).toBeUndefined();
  });

  it('should clear all items and timers', () => {
    const ct = vi.spyOn(global, 'clearTimeout');
    memory.set('m1' as any, 1, 1000);
    memory.set('m2' as any, 2, 1000);
    memory.clear();
    expect(ct).toHaveBeenCalledTimes(2);
    expect(Object.keys(memory.getCache).length).toBe(0);
  });
});


