import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useWatermark } from '/@/hooks/web/useWatermark';

describe('useWatermark', () => {
  it('should create watermark functions', () => {
    const appendEl = document.createElement('div');
    const { setWatermark, clear, clearAll } = useWatermark(ref(appendEl));

    expect(setWatermark).toBeInstanceOf(Function);
    expect(clear).toBeInstanceOf(Function);
    expect(clearAll).toBeInstanceOf(Function);
  });

  it('should create watermark with default options', () => {
    const appendEl = document.createElement('div');
    const { setWatermark } = useWatermark(ref(appendEl));

    // Just test that the function can be called without errors
    expect(() => setWatermark('Test Watermark')).not.toThrow();
  });

  it('should create watermark with custom options', () => {
    const appendEl = document.createElement('div');
    const { setWatermark } = useWatermark(ref(appendEl), {
      fontSize: 20,
      fontColor: 'red',
      fontFamily: 'Arial',
      textAlign: 'center',
      textBaseline: 'top',
      rotate: 30,
    });

    // Just test that the function can be called without errors
    expect(() => setWatermark('Custom Watermark')).not.toThrow();
  });

  it('should clear watermark', () => {
    const appendEl = document.createElement('div');
    const { setWatermark, clear } = useWatermark(ref(appendEl));

    setWatermark('Test Watermark');
    expect(() => clear()).not.toThrow();
  });

  it('should clear all watermarks', () => {
    const appendEl = document.createElement('div');
    const { setWatermark, clearAll } = useWatermark(ref(appendEl));

    setWatermark('Test Watermark');
    expect(() => clearAll()).not.toThrow();
  });
});
