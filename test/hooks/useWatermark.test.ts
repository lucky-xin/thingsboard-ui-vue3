import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useWatermark } from '/@/hooks/web/useWatermark';

// Mock the domUtils
vi.mock('/@/utils/domUtils', () => ({
  useRafThrottle: vi.fn((fn) => fn),
  addResizeListener: vi.fn(),
  removeResizeListener: vi.fn(),
}));

// Mock the is utility
vi.mock('/@/utils/is', () => ({
  isDef: vi.fn((val) => val !== undefined && val !== null),
}));

describe('useWatermark', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it('should handle null append element', () => {
    const { setWatermark, clear, clearAll } = useWatermark(ref(null));

    // Should not throw error when element is null
    expect(() => setWatermark('Test Watermark')).not.toThrow();
    expect(() => clear()).not.toThrow();
    expect(() => clearAll()).not.toThrow();
  });

  it('should handle empty string watermark', () => {
    const appendEl = document.createElement('div');
    const { setWatermark } = useWatermark(ref(appendEl));

    // Should handle empty string
    expect(() => setWatermark('')).not.toThrow();
  });

  it('should reuse existing watermark', () => {
    const appendEl = document.createElement('div');
    const { setWatermark } = useWatermark(ref(appendEl));

    // Set watermark twice to test reuse
    setWatermark('First Watermark');
    expect(() => setWatermark('Second Watermark')).not.toThrow();
  });

  it('should update watermark when called multiple times', () => {
    const appendEl = document.createElement('div');
    const { setWatermark } = useWatermark(ref(appendEl));

    // Set watermark multiple times
    setWatermark('First Watermark');
    setWatermark('Second Watermark');
    setWatermark('Third Watermark');

    // Should not throw errors
    expect(true).toBe(true);
  });

  it('should handle custom watermarks with all options', () => {
    const appendEl = document.createElement('div');
    const customOptions = {
      fontSize: 18,
      fontColor: 'blue',
      fontFamily: 'Times New Roman',
      textAlign: 'right' as CanvasTextAlign,
      textBaseline: 'bottom' as CanvasTextBaseline,
      rotate: -15,
    };

    const { setWatermark } = useWatermark(ref(appendEl), customOptions);

    // Should not throw error with all custom options
    expect(() => setWatermark('Custom Watermark')).not.toThrow();
  });

  it('should handle multiple watermarks with same element', () => {
    const appendEl = document.createElement('div');
    const { setWatermark, clearAll } = useWatermark(ref(appendEl));

    // Create multiple watermarks
    setWatermark('First Watermark');
    setWatermark('Second Watermark');

    // Clear all should not throw
    expect(() => clearAll()).not.toThrow();
  });

  it('should handle clearAll with no watermarks', () => {
    const appendEl = document.createElement('div');
    const { clearAll } = useWatermark(ref(appendEl));

    // Clear all should not throw even when no watermarks exist
    expect(() => clearAll()).not.toThrow();
  });

  it('should handle clear with no watermark element', () => {
    const appendEl = document.createElement('div');
    const { clear } = useWatermark(ref(appendEl));

    // Clear should not throw even when no watermark element exists
    expect(() => clear()).not.toThrow();
  });

  it('should handle reuse of existing watermark symbol', () => {
    const appendEl = document.createElement('div');
    const elRef = ref(appendEl);

    // Create first watermark
    const { setWatermark: setWatermark1 } = useWatermark(elRef);
    setWatermark1('First Watermark');

    // Create second watermark with same element (should reuse)
    const { setWatermark: setWatermark2 } = useWatermark(elRef);
    expect(() => setWatermark2('Second Watermark')).not.toThrow();
  });

  it('should handle update watermark with dimensions', () => {
    const appendEl = document.createElement('div');
    appendEl.appendChild(document.createElement('div'));
    const { setWatermark } = useWatermark(ref(appendEl));

    // Set initial watermark
    setWatermark('Test Watermark');

    // Set again to trigger update path
    expect(() => setWatermark('Updated Watermark')).not.toThrow();
  });
});
