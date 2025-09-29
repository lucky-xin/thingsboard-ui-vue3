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

  it('should handle emit with wildcard handlers', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('*' as any, fn2);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledWith('data');
    expect(fn2).toHaveBeenCalledWith('test', 'data');
  });

  it('should handle emit without wildcard handlers', () => {
    const bus = mitt();
    const fn1 = vi.fn();

    bus.on('test' as any, fn1);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledWith('data');
  });

  it('should handle emit with no handlers', () => {
    const bus = mitt();

    // Should not throw an error
    expect(() => {
      bus.emit('test' as any, 'data' as any);
    }).not.toThrow();
  });

  it('should handle emit with only wildcard handlers', () => {
    const bus = mitt();
    const fn1 = vi.fn();

    bus.on('*' as any, fn1);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledWith('test', 'data');
  });

  it('should replace existing handler when isOne is true', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('test' as any, fn2, true); // Replace with fn2

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledTimes(0); // fn1 should not be called
    expect(fn2).toHaveBeenCalledTimes(1); // fn2 should be called once
  });

  it('should handle multiple emits with isOne handler', () => {
    const bus = mitt();
    const fn = vi.fn();

    bus.on('test' as any, fn, true);

    bus.emit('test' as any, 'data1' as any);
    bus.emit('test' as any, 'data2' as any);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 'data1');
    expect(fn).toHaveBeenNthCalledWith(2, 'data2');
  });

  it('should remove specific handler with isAll=true', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('test' as any, fn2);

    // Remove only fn1
    bus.off('test' as any, fn1, true);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledTimes(0); // fn1 should not be called
    expect(fn2).toHaveBeenCalledTimes(1); // fn2 should be called
  });

  it('should remove all handlers with isAll=false', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('test' as any, fn2);

    // Remove all handlers
    bus.off('test' as any, undefined, false);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledTimes(0); // fn1 should not be called
    expect(fn2).toHaveBeenCalledTimes(0); // fn2 should not be called
  });

  it('should remove all handlers of a type when handler is not provided but isAll=true', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('test' as any, fn2);

    // Remove all handlers of type 'test'
    bus.off('test' as any, undefined, true);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledTimes(0); // fn1 should not be called
    expect(fn2).toHaveBeenCalledTimes(0); // fn2 should not be called
  });

  it('should handle off with wildcard handlers', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('*' as any, fn1);
    bus.on('*' as any, fn2);

    // Remove only fn1 from wildcard handlers
    bus.off('*' as any, fn1, true);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledTimes(0); // fn1 should not be called
    expect(fn2).toHaveBeenCalledTimes(1); // fn2 should be called
  });

  it('should handle emit with undefined event', () => {
    const bus = mitt();
    const fn = vi.fn();

    bus.on('test' as any, fn);
    bus.emit('test' as any, undefined);

    expect(fn).toHaveBeenCalledWith(undefined);
  });

  it('should handle emit with null event', () => {
    const bus = mitt();
    const fn = vi.fn();

    bus.on('test' as any, fn);
    bus.emit('test' as any, null);

    expect(fn).toHaveBeenCalledWith(null);
  });

  it('should handle multiple handlers for the same event', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);
    bus.on('test' as any, fn2);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledWith('data');
    expect(fn2).toHaveBeenCalledWith('data');
  });

  it('should handle handler removal when handler is not found', () => {
    const bus = mitt();
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    bus.on('test' as any, fn1);

    // Try to remove fn2 which was never added
    bus.off('test' as any, fn2, true);

    bus.emit('test' as any, 'data' as any);

    expect(fn1).toHaveBeenCalledWith('data');
    expect(fn2).toHaveBeenCalledTimes(0);
  });
});