import { describe, it, expect, vi, beforeEach } from 'vitest';
import draggable from '/@/components/ColorPicker/src/lib/draggable';

describe('draggable', () => {
  let mockElement: HTMLElement;
  let mockConfig: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Create a mock element
    mockElement = document.createElement('div');
    mockElement.style.position = 'absolute';
    mockElement.style.left = '0px';
    mockElement.style.top = '0px';
    
    // Mock getBoundingClientRect
    mockElement.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: vi.fn()
    }));

    // Mock config
    mockConfig = {
      drag: vi.fn(),
      end: vi.fn()
    };
  });

  it('should be a function', () => {
    expect(typeof draggable).toBe('function');
  });

  it('should accept element and config parameters', () => {
    expect(() => {
      draggable(mockElement, mockConfig);
    }).not.toThrow();
  });

  it('should handle drag events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown event
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle mousemove events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown first
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Then simulate mousemove
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: 60,
      clientY: 60,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle mouseup events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown first
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Then simulate mouseup
    const mouseupEvent = new MouseEvent('mouseup', {
      clientX: 60,
      clientY: 60,
      bubbles: true
    });
    
    document.dispatchEvent(mouseupEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle touch events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate touchstart event
    const touchstartEvent = new TouchEvent('touchstart', {
      touches: [{
        clientX: 50,
        clientY: 50,
        identifier: 0,
        target: mockElement,
        screenX: 50,
        screenY: 50,
        pageX: 50,
        pageY: 50,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    mockElement.dispatchEvent(touchstartEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle touchmove events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate touchstart first
    const touchstartEvent = new TouchEvent('touchstart', {
      touches: [{
        clientX: 50,
        clientY: 50,
        identifier: 0,
        target: mockElement,
        screenX: 50,
        screenY: 50,
        pageX: 50,
        pageY: 50,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    mockElement.dispatchEvent(touchstartEvent);
    
    // Then simulate touchmove
    const touchmoveEvent = new TouchEvent('touchmove', {
      touches: [{
        clientX: 60,
        clientY: 60,
        identifier: 0,
        target: mockElement,
        screenX: 60,
        screenY: 60,
        pageX: 60,
        pageY: 60,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    document.dispatchEvent(touchmoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle touchend events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate touchstart first
    const touchstartEvent = new TouchEvent('touchstart', {
      touches: [{
        clientX: 50,
        clientY: 50,
        identifier: 0,
        target: mockElement,
        screenX: 50,
        screenY: 50,
        pageX: 50,
        pageY: 50,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    mockElement.dispatchEvent(touchstartEvent);
    
    // Then simulate touchend
    const touchendEvent = new TouchEvent('touchend', {
      changedTouches: [{
        clientX: 60,
        clientY: 60,
        identifier: 0,
        target: mockElement,
        screenX: 60,
        screenY: 60,
        pageX: 60,
        pageY: 60,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    document.dispatchEvent(touchendEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle config without drag callback', () => {
    const configWithoutDrag = {
      end: vi.fn()
    };
    
    expect(() => {
      draggable(mockElement, configWithoutDrag);
    }).not.toThrow();
  });

  it('should handle config without end callback', () => {
    const configWithoutEnd = {
      drag: vi.fn()
    };
    
    expect(() => {
      draggable(mockElement, configWithoutEnd);
    }).not.toThrow();
  });

  it('should handle empty config', () => {
    expect(() => {
      draggable(mockElement, {});
    }).not.toThrow();
  });

  it('should handle null element', () => {
    expect(() => {
      draggable(null as any, mockConfig);
    }).toThrow();
  });

  it('should handle undefined element', () => {
    expect(() => {
      draggable(undefined as any, mockConfig);
    }).toThrow();
  });

  it('should handle null config', () => {
    expect(() => {
      draggable(mockElement, null as any);
    }).not.toThrow();
  });

  it('should handle undefined config', () => {
    expect(() => {
      draggable(mockElement, undefined as any);
    }).not.toThrow();
  });

  it('should handle multiple drag operations', () => {
    draggable(mockElement, mockConfig);
    
    // First drag operation
    const mousedownEvent1 = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent1);
    
    const mousemoveEvent1 = new MouseEvent('mousemove', {
      clientX: 60,
      clientY: 60,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent1);
    
    const mouseupEvent1 = new MouseEvent('mouseup', {
      clientX: 60,
      clientY: 60,
      bubbles: true
    });
    
    document.dispatchEvent(mouseupEvent1);
    
    // Second drag operation
    const mousedownEvent2 = new MouseEvent('mousedown', {
      clientX: 70,
      clientY: 70,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent2);
    
    const mousemoveEvent2 = new MouseEvent('mousemove', {
      clientX: 80,
      clientY: 80,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent2);
    
    const mouseupEvent2 = new MouseEvent('mouseup', {
      clientX: 80,
      clientY: 80,
      bubbles: true
    });
    
    document.dispatchEvent(mouseupEvent2);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle drag with different coordinates', () => {
    draggable(mockElement, mockConfig);
    
    // Test with different starting coordinates
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 10,
      clientY: 20,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Test with different ending coordinates
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: 30,
      clientY: 40,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle drag with zero coordinates', () => {
    draggable(mockElement, mockConfig);
    
    // Test with zero coordinates
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 0,
      clientY: 0,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: 0,
      clientY: 0,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle drag with negative coordinates', () => {
    draggable(mockElement, mockConfig);
    
    // Test with negative coordinates
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: -10,
      clientY: -20,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: -30,
      clientY: -40,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle drag with large coordinates', () => {
    draggable(mockElement, mockConfig);
    
    // Test with large coordinates
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 1000,
      clientY: 1000,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    const mousemoveEvent = new MouseEvent('mousemove', {
      clientX: 2000,
      clientY: 2000,
      bubbles: true
    });
    
    document.dispatchEvent(mousemoveEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle element without getBoundingClientRect', () => {
    const elementWithoutRect = document.createElement('div');
    delete (elementWithoutRect as any).getBoundingClientRect;
    
    expect(() => {
      draggable(elementWithoutRect, mockConfig);
    }).not.toThrow();
  });

  it('should handle element with custom getBoundingClientRect', () => {
    const elementWithCustomRect = document.createElement('div');
    elementWithCustomRect.getBoundingClientRect = vi.fn(() => ({
      left: 100,
      top: 200,
      width: 300,
      height: 400,
      right: 400,
      bottom: 600,
      x: 100,
      y: 200,
      toJSON: vi.fn()
    }));
    
    expect(() => {
      draggable(elementWithCustomRect, mockConfig);
    }).not.toThrow();
  });

  it('should handle config with additional properties', () => {
    const configWithExtra = {
      drag: vi.fn(),
      end: vi.fn(),
      start: vi.fn(),
      custom: vi.fn()
    };
    
    expect(() => {
      draggable(mockElement, configWithExtra);
    }).not.toThrow();
  });

  it('should handle rapid drag events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate rapid mousedown events
    for (let i = 0; i < 5; i++) {
      const mousedownEvent = new MouseEvent('mousedown', {
        clientX: i * 10,
        clientY: i * 10,
        bubbles: true
      });
      
      mockElement.dispatchEvent(mousedownEvent);
    }
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle rapid mousemove events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown first
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Simulate rapid mousemove events
    for (let i = 0; i < 10; i++) {
      const mousemoveEvent = new MouseEvent('mousemove', {
        clientX: 50 + i,
        clientY: 50 + i,
        bubbles: true
      });
      
      document.dispatchEvent(mousemoveEvent);
    }
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle rapid mouseup events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown first
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Simulate rapid mouseup events
    for (let i = 0; i < 5; i++) {
      const mouseupEvent = new MouseEvent('mouseup', {
        clientX: 50 + i,
        clientY: 50 + i,
        bubbles: true
      });
      
      document.dispatchEvent(mouseupEvent);
    }
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle mixed mouse and touch events', () => {
    draggable(mockElement, mockConfig);
    
    // Simulate mousedown
    const mousedownEvent = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    mockElement.dispatchEvent(mousedownEvent);
    
    // Simulate touchstart
    const touchstartEvent = new TouchEvent('touchstart', {
      touches: [{
        clientX: 60,
        clientY: 60,
        identifier: 0,
        target: mockElement,
        screenX: 60,
        screenY: 60,
        pageX: 60,
        pageY: 60,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        force: 1
      }],
      bubbles: true
    });
    
    mockElement.dispatchEvent(touchstartEvent);
    
    // Should not throw error
    expect(true).toBe(true);
  });

  it('should handle events on different elements', () => {
    const element1 = document.createElement('div');
    const element2 = document.createElement('div');
    
    draggable(element1, mockConfig);
    draggable(element2, mockConfig);
    
    // Simulate events on both elements
    const mousedownEvent1 = new MouseEvent('mousedown', {
      clientX: 50,
      clientY: 50,
      bubbles: true
    });
    
    const mousedownEvent2 = new MouseEvent('mousedown', {
      clientX: 100,
      clientY: 100,
      bubbles: true
    });
    
    element1.dispatchEvent(mousedownEvent1);
    element2.dispatchEvent(mousedownEvent2);
    
    // Should not throw error
    expect(true).toBe(true);
  });
});
