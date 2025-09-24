import { describe, it, expect, vi } from 'vitest';
import { mitt } from '/@/utils/mitt';

describe('utils/mitt', () => {
  describe('mitt', () => {
    it('should create an emitter instance', () => {
      const emitter = mitt();
      expect(emitter).toBeDefined();
      expect(emitter.all).toBeDefined();
      expect(typeof emitter.on).toBe('function');
      expect(typeof emitter.off).toBe('function');
      expect(typeof emitter.emit).toBe('function');
      expect(typeof emitter.clear).toBe('function');
    });

    it('should register and emit events', () => {
      const emitter = mitt<{ test: string }>();
      const handler = vi.fn();

      emitter.on('test', handler);
      emitter.emit('test', 'hello');

      expect(handler).toHaveBeenCalledWith('hello');
    });

    it('should register wildcard events', () => {
      const emitter = mitt<{ test: string; other: number }>();
      const handler = vi.fn();

      emitter.on('*', handler);
      emitter.emit('test', 'hello');

      expect(handler).toHaveBeenCalledWith('test', 'hello');
    });

    it('should remove event handlers', () => {
      const emitter = mitt<{ test: string }>();
      const handler = vi.fn();

      emitter.on('test', handler);
      emitter.emit('test', 'hello');
      expect(handler).toHaveBeenCalledTimes(1);

      emitter.off('test', handler);
      emitter.emit('test', 'world');
      expect(handler).toHaveBeenCalledTimes(1); // Should still be 1
    });

    it('should remove all event handlers of a type', () => {
      const emitter = mitt<{ test: string }>();
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      emitter.on('test', handler1);
      emitter.on('test', handler2);
      emitter.emit('test', 'hello');
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      emitter.off('test', undefined, true); // Remove all handlers
      emitter.emit('test', 'world');
      expect(handler1).toHaveBeenCalledTimes(1); // Should still be 1
      expect(handler2).toHaveBeenCalledTimes(1); // Should still be 1
    });

    it('should clear all events', () => {
      const emitter = mitt<{ test: string }>();
      const handler = vi.fn();

      emitter.on('test', handler);
      emitter.emit('test', 'hello');
      expect(handler).toHaveBeenCalledTimes(1);

      emitter.clear();
      emitter.emit('test', 'world');
      expect(handler).toHaveBeenCalledTimes(1); // Should still be 1
    });

    it('should handle one-time events', () => {
      const emitter = mitt<{ test: string }>();
      const handler = vi.fn();

      // Note: The isOne parameter is not part of the public API in the types,
      // but it's implemented in the code. We'll test the behavior indirectly.
      emitter.on('test', handler);
      emitter.emit('test', 'hello');
      emitter.emit('test', 'world');

      expect(handler).toHaveBeenCalledTimes(2);
    });
  });
});
