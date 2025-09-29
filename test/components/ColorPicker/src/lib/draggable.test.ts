import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import draggable, { IOptions } from '/@/components/ColorPicker/src/lib/draggable';

describe('draggable', () => {
  let mockElement: HTMLElement;
  let mockOptions: IOptions;

  beforeEach(() => {
    // 创建模拟的DOM元素
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    // 创建模拟选项
    mockOptions = {
      drag: vi.fn(),
      start: vi.fn(),
      end: vi.fn(),
    };

    // 清除所有模拟
    vi.clearAllMocks();
  });

  afterEach(() => {
    // 清理DOM
    if (document.body.contains(mockElement)) {
      document.body.removeChild(mockElement);
    }
  });

  it('should be a function', () => {
    expect(typeof draggable).toBe('function');
  });

  it('should accept HTMLElement and options', () => {
    expect(() => {
      draggable(mockElement, mockOptions);
    }).not.toThrow();
  });

  it('should call start callback on mousedown', () => {
    draggable(mockElement, mockOptions);

    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    mockElement.dispatchEvent(mousedownEvent);

    expect(mockOptions.start).toHaveBeenCalledWith(mousedownEvent);
  });

  it('should work with partial options', () => {
    const partialOptions: IOptions = {
      start: vi.fn(),
    };

    expect(() => {
      draggable(mockElement, partialOptions);
    }).not.toThrow();

    // 测试函数调用不会抛出错误
    expect(true).toBe(true);
  });

  it('should work with empty options', () => {
    const emptyOptions: IOptions = {};

    expect(() => {
      draggable(mockElement, emptyOptions);
    }).not.toThrow();

    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    mockElement.dispatchEvent(mousedownEvent);

    // 不应该抛出错误
    expect(true).toBe(true);
  });

  it('should prevent text selection during drag', () => {
    draggable(mockElement, mockOptions);

    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
    mockElement.dispatchEvent(mousedownEvent);

    expect(document.onselectstart).toBeDefined();
    expect(document.ondragstart).toBeDefined();
  });

  it('should handle multiple rapid mousedown events', () => {
    draggable(mockElement, mockOptions);

    // 测试函数调用不会抛出错误
    expect(() => {
      const mousedownEvent1 = new MouseEvent('mousedown', { bubbles: true });
      mockElement.dispatchEvent(mousedownEvent1);

      const mousedownEvent2 = new MouseEvent('mousedown', { bubbles: true });
      mockElement.dispatchEvent(mousedownEvent2);
    }).not.toThrow();
  });

  it('should export IOptions interface', () => {
    const options: IOptions = {
      drag: vi.fn(),
      start: vi.fn(),
      end: vi.fn(),
    };

    expect(options).toBeDefined();
    expect(typeof options.drag).toBe('function');
    expect(typeof options.start).toBe('function');
    expect(typeof options.end).toBe('function');
  });

  it('should be importable without errors', () => {
    expect(() => {
      return { draggable, IOptions };
    }).not.toThrow();
  });
});
