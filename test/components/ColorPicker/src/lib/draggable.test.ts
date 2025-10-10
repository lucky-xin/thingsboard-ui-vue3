import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import draggable from '/@/components/ColorPicker/src/lib/draggable';

describe('draggable', () => {
  let mockElement: HTMLElement;
  let mockOptions: any;
  let originalDocument: any;

  beforeEach(() => {
    // Save original document
    originalDocument = global.document;
    
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

  afterEach(() => {
    // Restore original document
    global.document = originalDocument;
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
});
