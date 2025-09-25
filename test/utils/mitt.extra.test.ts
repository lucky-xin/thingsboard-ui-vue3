import { describe, it, expect, vi } from 'vitest';
import { mitt } from '/@/utils/mitt';

describe('utils/mitt extra', () => {
  it('should support one-off registration (isOne)', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    bus.on('a' as any, fn1, true);
    bus.emit('a' as any, 1 as any);
    bus.emit('a' as any, 2 as any);
    expect(fn1).toHaveBeenCalledTimes(2); // both calls go to the single stored handler
  });

  it('should clear all', () => {
    const bus = mitt();
    const fn = vi.fn();
    bus.on('b' as any, fn);
    bus.clear();
    bus.emit('b' as any, 1 as any);
    expect(fn).not.toHaveBeenCalled();
  });
});


