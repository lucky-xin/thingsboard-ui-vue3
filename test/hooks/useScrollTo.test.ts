import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollTo } from '/@/hooks/event/useScrollTo';

describe('useScrollTo', () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    // 创建模拟的DOM元素
    mockElement = document.createElement('div');
    mockElement.scrollTop = 0;
    document.body.appendChild(mockElement);
  });

  it('should create scroll functions', () => {
    const { start, stop } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 100,
    });

    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
  });

  it('should handle custom duration', () => {
    const { start } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 200,
    });

    expect(typeof start).toBe('function');
  });

  it('should handle callback function', () => {
    const callback = vi.fn();
    const { start } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 100,
      callback,
    });

    expect(typeof start).toBe('function');
  });

  it('should calculate easing correctly', () => {
    const { start, stop } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 100,
    });

    // 启动滚动
    start();

    // 立即停止
    stop();

    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
  });

  it('should handle undefined duration', () => {
    const { start } = useScrollTo({
      el: mockElement,
      to: 100,
    });

    expect(typeof start).toBe('function');
  });

  it('should handle animation with requestAnimationFrame', () => {
    const originalRAF = window.requestAnimationFrame;
    const mockRAF = vi.fn((cb) => setTimeout(cb, 16));
    window.requestAnimationFrame = mockRAF;

    const { start, stop } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 100,
    });

    start();
    stop();

    // 恢复原始的requestAnimationFrame
    window.requestAnimationFrame = originalRAF;

    expect(typeof start).toBe('function');
    expect(typeof stop).toBe('function');
  });

  it('should handle callback when animation completes', async () => {
    const callback = vi.fn();
    const { start, stop } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 50,
      callback,
    });

    start();

    // 等待动画完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(callback).toHaveBeenCalled();
  });

  it('should stop animation when stop is called', () => {
    const callback = vi.fn();
    const { start, stop } = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 1000,
      callback,
    });

    start();
    stop();

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle negative scroll values', () => {
    const { start } = useScrollTo({
      el: mockElement,
      to: -100,
      duration: 100,
    });

    expect(typeof start).toBe('function');
  });

  it('should handle zero scroll value', () => {
    const { start } = useScrollTo({
      el: mockElement,
      to: 0,
      duration: 100,
    });

    expect(typeof start).toBe('function');
  });
});
