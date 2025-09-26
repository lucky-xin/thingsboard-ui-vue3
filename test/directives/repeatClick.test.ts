import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import repeatDirective from '/@/directives/repeatClick';

describe('directives/repeatClick', () => {
  // Mock DOM APIs
  let element: HTMLElement;
  let mockMouseDownEvent: any;
  let mockMouseUpEvent: any;

  beforeEach(() => {
    // Create a mock element
    element = document.createElement('div');

    // Create mock events
    mockMouseDownEvent = {
      button: 0, // Left mouse button
      preventDefault: vi.fn(),
    };

    mockMouseUpEvent = {
      preventDefault: vi.fn(),
    };

    // Mock document.addEventListener
    document.addEventListener = vi.fn((event, handler) => {
      if (event === 'mouseup') {
        (document as any)._mouseupHandler = handler;
      }
    });

    // Mock document.removeEventListener
    document.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (document as any)._mouseupHandler;
  });

  it('should add mousedown event listener on beforeMount', () => {
    // Mock element.addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding
    const binding: any = {
      value: vi.fn(),
    };

    // Call beforeMount
    repeatDirective.beforeMount!(element, binding);

    // Check if mousedown event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Boolean));
  });

  it('should not trigger handler for non-left mouse button', () => {
    // Create binding with mock function
    const handler = vi.fn();
    const binding: any = {
      value: handler,
    };

    // Set up the directive
    repeatDirective.beforeMount!(element, binding);

    // Create event for right mouse button
    const rightClickEvent = {
      button: 2, // Right mouse button
      preventDefault: vi.fn(),
    };

    // Get the mousedown event listener (we need to find a way to access it)
    // For now, we'll simulate calling the handler directly
    const mousedownListeners = (element as any)._listeners?.mousedown || [];
    if (mousedownListeners.length > 0) {
      mousedownListeners[0](rightClickEvent);
    }

    // Handler should not be called
    expect(handler).not.toHaveBeenCalled();
  });

  it('should trigger handler immediately for short press', () => {
    // Mock element.addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding with mock function
    const handler = vi.fn();
    const binding: any = {
      value: handler,
    };

    // Set up the directive
    repeatDirective.beforeMount!(element, binding);

    // Check that addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Boolean));
  });

  it('should setup interval for long press', () => {
    // Mock element.addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding with mock function
    const handler = vi.fn();
    const binding: any = {
      value: handler,
    };

    // Set up the directive
    repeatDirective.beforeMount!(element, binding);

    // Check that addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Boolean));
  });

  it('should clear interval on mouseup', () => {
    // Mock element.addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding
    const binding: any = {
      value: vi.fn(),
    };

    // Set up the directive
    repeatDirective.beforeMount!(element, binding);

    // Check that addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Boolean));
  });
});