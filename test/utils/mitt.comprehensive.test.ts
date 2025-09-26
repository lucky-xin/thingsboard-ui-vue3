import { describe, it, expect, beforeEach } from 'vitest';
import mitt from '/@/utils/mitt';

describe.skip('mitt comprehensive tests', () => {
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
});
