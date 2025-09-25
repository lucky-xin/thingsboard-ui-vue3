import { describe, it, expect, vi } from 'vitest';
import { mitt } from '/@/utils/mitt';

describe('utils/mitt off specific handler', () => {
  it('should remove only the specified handler when isAll=true and handler provided', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on('e' as any, fn1);
    bus.on('e' as any, fn2);

    // remove only fn1 using isAll=true branch
    bus.off('e' as any, fn1 as any, true);

    bus.emit('e' as any, 1 as any);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});


