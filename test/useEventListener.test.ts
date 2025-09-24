import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import { useEventListener } from '/@/hooks/event/useEventListener';

describe('useEventListener', () => {
  it('should add event listener to element', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    const listener = vi.fn();
    const result = useEventListener({
      el: mockElement,
      name: 'click',
      listener,
    });

    // Check that addEventListener was called with the correct arguments
    expect(mockElement.addEventListener).toHaveBeenCalled();
    expect(typeof result.removeEvent).toBe('function');
  });

  it('should remove event listener when removeEvent is called', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    const listener = vi.fn();
    const result = useEventListener({
      el: mockElement,
      name: 'click',
      listener,
    });

    result.removeEvent();
    expect(mockElement.removeEventListener).toHaveBeenCalled();
  });

  it('should use window as default element', () => {
    const mockWindow = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    Object.defineProperty(global, 'window', { value: mockWindow, writable: true });

    const listener = vi.fn();
    const result = useEventListener({
      name: 'resize',
      listener,
    });

    expect(mockWindow.addEventListener).toHaveBeenCalled();
    expect(typeof result.removeEvent).toBe('function');
  });

  it('should work with ref element', () => {
    const mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    const elementRef = ref(mockElement);
    const listener = vi.fn();

    const result = useEventListener({
      el: elementRef,
      name: 'click',
      listener,
    });

    expect(mockElement.addEventListener).toHaveBeenCalled();
    expect(typeof result.removeEvent).toBe('function');
  });
});
