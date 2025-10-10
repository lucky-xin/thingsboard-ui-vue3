import { describe, it, expect, vi, beforeEach } from 'vitest';
import draggable from '/@/components/ColorPicker/src/lib/draggable';

describe('draggable', () => {
  let mockElement: HTMLElement;
  let mockOptions: any;

  beforeEach(() => {
    // Mock DOM element
    mockElement = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    // Mock document
    global.document = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      onselectstart: null,
      ondragstart: null,
    } as any;

    // Mock options
    mockOptions = {
      drag: vi.fn(),
      start: vi.fn(),
      end: vi.fn(),
    };

    vi.clearAllMocks();
  });

  it('should add mousedown event listener to element', () => {
    draggable(mockElement, mockOptions);
    
    expect(mockElement.addEventListener).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });

  it('should call start callback on mousedown', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    expect(mockOptions.start).toHaveBeenCalledWith(mockEvent);
  });

  it('should add mousemove and mouseup listeners to document on mousedown', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    expect(global.document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(global.document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
  });

  it('should set document onselectstart and ondragstart to false on mousedown', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    expect(global.document.onselectstart).toBe(false);
    expect(global.document.ondragstart).toBe(false);
  });

  it('should call drag callback on mousemove', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    // Get the mousemove handler
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mockMoveEvent = { type: 'mousemove' };
    
    mousemoveHandler(mockMoveEvent);
    
    expect(mockOptions.drag).toHaveBeenCalledWith(mockMoveEvent);
  });

  it('should call end callback and cleanup on mouseup', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    // Get the mouseup handler
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    const mockUpEvent = { type: 'mouseup' };
    
    mouseupHandler(mockUpEvent);
    
    expect(mockOptions.end).toHaveBeenCalledWith(mockUpEvent);
    expect(global.document.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(global.document.removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(global.document.onselectstart).toBe(null);
    expect(global.document.ondragstart).toBe(null);
  });

  it('should not start drag if already dragging', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    // First mousedown
    mousedownHandler(mockEvent);
    
    // Clear mocks
    vi.clearAllMocks();
    
    // Second mousedown while dragging
    mousedownHandler(mockEvent);
    
    // Should not add new listeners
    expect(global.document.addEventListener).not.toHaveBeenCalled();
    expect(mockOptions.start).not.toHaveBeenCalled();
  });

  it('should handle missing options gracefully', () => {
    expect(() => {
      draggable(mockElement, {});
    }).not.toThrow();
  });

  it('should handle null options gracefully', () => {
    expect(() => {
      draggable(mockElement, null as any);
    }).not.toThrow();
  });

  it('should handle undefined options gracefully', () => {
    expect(() => {
      draggable(mockElement, undefined as any);
    }).not.toThrow();
  });

  it('should handle missing drag callback', () => {
    const optionsWithoutDrag = {
      start: vi.fn(),
      end: vi.fn(),
    };
    
    expect(() => {
      draggable(mockElement, optionsWithoutDrag);
    }).not.toThrow();
  });

  it('should handle missing start callback', () => {
    const optionsWithoutStart = {
      drag: vi.fn(),
      end: vi.fn(),
    };
    
    expect(() => {
      draggable(mockElement, optionsWithoutStart);
    }).not.toThrow();
  });

  it('should handle missing end callback', () => {
    const optionsWithoutEnd = {
      drag: vi.fn(),
      start: vi.fn(),
    };
    
    expect(() => {
      draggable(mockElement, optionsWithoutEnd);
    }).not.toThrow();
  });

  it('should handle basic drag functionality', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    // Test mousedown
    mousedownHandler(mockEvent);
    
    expect(mockOptions.start).toHaveBeenCalledWith(mockEvent);
    expect(global.document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(global.document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(global.document.onselectstart).toBe(false);
    expect(global.document.ondragstart).toBe(false);
  });

  it('should handle event handlers correctly', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    // Get the event handlers
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Test mousemove
    const mockMoveEvent = { type: 'mousemove' };
    mousemoveHandler(mockMoveEvent);
    expect(mockOptions.drag).toHaveBeenCalledWith(mockMoveEvent);
    
    // Test mouseup
    const mockUpEvent = { type: 'mouseup' };
    mouseupHandler(mockUpEvent);
    expect(mockOptions.end).toHaveBeenCalledWith(mockUpEvent);
    expect(global.document.removeEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(global.document.removeEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
    expect(global.document.onselectstart).toBe(null);
    expect(global.document.ondragstart).toBe(null);
  });

  it('should handle drag with different event properties', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown', clientX: 100, clientY: 100 };
    
    mousedownHandler(mockEvent);
    
    // Get the event handlers
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Test mousemove with different properties
    const mockMoveEvent = { type: 'mousemove', clientX: 150, clientY: 150 };
    mousemoveHandler(mockMoveEvent);
    expect(mockOptions.drag).toHaveBeenCalledWith(mockMoveEvent);
    
    // Test mouseup with different properties
    const mockUpEvent = { type: 'mouseup', clientX: 200, clientY: 200 };
    mouseupHandler(mockUpEvent);
    expect(mockOptions.end).toHaveBeenCalledWith(mockUpEvent);
  });

  it('should handle drag with keyboard modifiers', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown', ctrlKey: true, shiftKey: false, altKey: false };
    
    mousedownHandler(mockEvent);
    
    // Get the event handlers
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Test mousemove with keyboard modifiers
    const mockMoveEvent = { type: 'mousemove', ctrlKey: true, shiftKey: false, altKey: false };
    mousemoveHandler(mockMoveEvent);
    expect(mockOptions.drag).toHaveBeenCalledWith(mockMoveEvent);
    
    // Test mouseup with keyboard modifiers
    const mockUpEvent = { type: 'mouseup', ctrlKey: true, shiftKey: false, altKey: false };
    mouseupHandler(mockUpEvent);
    expect(mockOptions.end).toHaveBeenCalledWith(mockUpEvent);
  });

  it('should handle drag with custom event properties', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown', customProperty: 'test' };
    
    mousedownHandler(mockEvent);
    
    // Get the event handlers
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Test mousemove with custom properties
    const mockMoveEvent = { type: 'mousemove', customProperty: 'test' };
    mousemoveHandler(mockMoveEvent);
    expect(mockOptions.drag).toHaveBeenCalledWith(mockMoveEvent);
    
    // Test mouseup with custom properties
    const mockUpEvent = { type: 'mouseup', customProperty: 'test' };
    mouseupHandler(mockUpEvent);
    expect(mockOptions.end).toHaveBeenCalledWith(mockUpEvent);
  });

  it('should handle multiple drag operations', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    // First drag operation
    mousedownHandler(mockEvent);
    
    // Get handlers
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Simulate drag
    mousemoveHandler({ type: 'mousemove' });
    mouseupHandler({ type: 'mouseup' });
    
    // Clear mocks
    vi.clearAllMocks();
    
    // Second drag operation
    mousedownHandler(mockEvent);
    
    expect(mockOptions.start).toHaveBeenCalledWith(mockEvent);
    expect(global.document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    expect(global.document.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
  });

  it('should handle drag with multiple mousemove events', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown' };
    
    mousedownHandler(mockEvent);
    
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    
    // Simulate multiple mousemove events
    mousemoveHandler({ type: 'mousemove', clientX: 100, clientY: 100 });
    mousemoveHandler({ type: 'mousemove', clientX: 150, clientY: 150 });
    mousemoveHandler({ type: 'mousemove', clientX: 200, clientY: 200 });
    
    expect(mockOptions.drag).toHaveBeenCalledTimes(3);
  });

  it('should handle drag with different event types', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown', button: 0 };
    
    mousedownHandler(mockEvent);
    
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Simulate drag with different event properties
    mousemoveHandler({ type: 'mousemove', clientX: 100, clientY: 100, button: 0 });
    mouseupHandler({ type: 'mouseup', clientX: 100, clientY: 100, button: 0 });
    
    expect(mockOptions.drag).toHaveBeenCalledWith({ type: 'mousemove', clientX: 100, clientY: 100, button: 0 });
    expect(mockOptions.end).toHaveBeenCalledWith({ type: 'mouseup', clientX: 100, clientY: 100, button: 0 });
  });

  it('should handle drag with touch events', () => {
    draggable(mockElement, mockOptions);
    
    const mousedownHandler = mockElement.addEventListener.mock.calls[0][1];
    const mockEvent = { type: 'mousedown', touches: [{ clientX: 100, clientY: 100 }] };
    
    mousedownHandler(mockEvent);
    
    const mousemoveHandler = global.document.addEventListener.mock.calls[0][1];
    const mouseupHandler = global.document.addEventListener.mock.calls[1][1];
    
    // Simulate drag with touch events
    mousemoveHandler({ type: 'mousemove', touches: [{ clientX: 150, clientY: 150 }] });
    mouseupHandler({ type: 'mouseup', touches: [{ clientX: 150, clientY: 150 }] });
    
    expect(mockOptions.drag).toHaveBeenCalledWith({ type: 'mousemove', touches: [{ clientX: 150, clientY: 150 }] });
    expect(mockOptions.end).toHaveBeenCalledWith({ type: 'mouseup', touches: [{ clientX: 150, clientY: 150 }] });
  });
});