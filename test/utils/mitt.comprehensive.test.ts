import { describe, it, expect, beforeEach, vi } from 'vitest';
import mitt from '/@/utils/mitt';

describe('mitt comprehensive tests', () => {
  let emitter: ReturnType<typeof mitt>;

  beforeEach(() => {
    emitter = mitt();
  });

  it('should create emitter instance', () => {
    expect(emitter).toBeDefined();
    expect(typeof emitter.on).toBe('function');
    expect(typeof emitter.off).toBe('function');
    expect(typeof emitter.emit).toBe('function');
  });

  it('should register and trigger event', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.emit('test', 'data');
    expect(callback).toHaveBeenCalledWith('data');
  });

  it('should register multiple callbacks for same event', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledWith('data');
    expect(callback2).toHaveBeenCalledWith('data');
  });

  it('should unregister event callback', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.off('test', callback);
    emitter.emit('test', 'data');
    expect(callback).not.toHaveBeenCalled();
  });

  it('should emit event without data', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.emit('test');
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it('should handle wildcard events', () => {
    const callback = vi.fn();
    emitter.on('*', callback);
    emitter.emit('test', 'data');
    expect(callback).toHaveBeenCalledWith('test', 'data');
  });

  it('should clear all events', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test1', callback1);
    emitter.on('test2', callback2);
    emitter.all.clear();
    emitter.emit('test1', 'data');
    emitter.emit('test2', 'data');
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it('should handle multiple event types', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('event1', callback1);
    emitter.on('event2', callback2);
    emitter.emit('event1', 'data1');
    emitter.emit('event2', 'data2');
    expect(callback1).toHaveBeenCalledWith('data1');
    expect(callback2).toHaveBeenCalledWith('data2');
  });

  it('should handle one-time event registration (isOne)', () => {
    const callback = vi.fn();
    emitter.on('test', callback, true); // isOne = true
    emitter.emit('test', 'data1');
    emitter.emit('test', 'data2');
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, 'data1');
    expect(callback).toHaveBeenNthCalledWith(2, 'data2');
  });

  it('should replace existing handler when isOne is true', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2, true); // Replace with callback2
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('data');
  });

  it('should remove all handlers with isAll=false', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.off('test', undefined, false); // Remove all handlers
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(0);
  });

  it('should remove specific handler with isAll=true', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.off('test', callback1, true); // Remove only callback1
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('data');
  });

  it('should remove all handlers of a type when handler is not provided but isAll=true', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.on('test', callback2);
    emitter.off('test', undefined, true); // Remove all handlers of type 'test'
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(0);
  });

  it('should handle off with wildcard handlers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('*', callback1);
    emitter.on('*', callback2);
    emitter.off('*', callback1, true); // Remove only callback1 from wildcard handlers
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('test', 'data');
  });

  it('should handle emit with null event', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.emit('test', null);
    expect(callback).toHaveBeenCalledWith(null);
  });

  it('should handle handler removal when handler is not found', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    emitter.on('test', callback1);
    emitter.off('test', callback2, true); // Try to remove callback2 which was never added
    emitter.emit('test', 'data');
    expect(callback1).toHaveBeenCalledWith('data');
    expect(callback2).toHaveBeenCalledTimes(0);
  });

  it('should handle emit with no handlers', () => {
    // Should not throw an error
    expect(() => {
      emitter.emit('test', 'data');
    }).not.toThrow();
  });

  it('should handle multiple emits', () => {
    const callback = vi.fn();
    emitter.on('test', callback);
    emitter.emit('test', 'data1');
    emitter.emit('test', 'data2');
    emitter.emit('test', 'data3');
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 'data1');
    expect(callback).toHaveBeenNthCalledWith(2, 'data2');
    expect(callback).toHaveBeenNthCalledWith(3, 'data3');
  });
});
