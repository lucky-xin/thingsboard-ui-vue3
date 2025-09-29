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

  it('should remove all handlers when isAll=false', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on('e' as any, fn1);
    bus.on('e' as any, fn2);

    // remove all handlers using isAll=false branch
    bus.off('e' as any, undefined, false);

    bus.emit('e' as any, 1 as any);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(0);
  });

  it('should remove specific handler when isAll=true and handler provided', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on('e' as any, fn1);
    bus.on('e' as any, fn2);

    // remove only fn1
    bus.off('e' as any, fn1 as any, true);

    bus.emit('e' as any, 1 as any);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  it('should remove all handlers of a type when handler is not provided but isAll=true', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on('e' as any, fn1);
    bus.on('e' as any, fn2);

    // remove all handlers of type 'e'
    bus.off('e' as any, undefined, true);

    bus.emit('e' as any, 1 as any);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(0);
  });

  it('should handle off with wildcard handlers', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    bus.on('*' as any, fn1);
    bus.on('*' as any, fn2);

    // remove only fn1 from wildcard handlers
    bus.off('*' as any, fn1 as any, true);

    bus.emit('e' as any, 1 as any);
    expect(fn1).toHaveBeenCalledTimes(0);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});