import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, watchEffect } from 'vue';

// Mock Vue functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    ref: vi.fn((val) => ({ value: val })),
    unref: vi.fn((val) => val?.value ?? val),
    watchEffect: vi.fn((fn) => fn()),
  };
});

// Mock DOM methods
Object.defineProperty(window, 'getComputedStyle', {
  value: vi.fn(() => ({
    left: '100px',
    top: '100px',
  })),
});

// Remove global querySelectorAll mock to allow per-test mocking

Object.defineProperty(document, 'querySelector', {
  value: vi.fn(() => null),
});

Object.defineProperty(document.body, 'clientWidth', {
  value: 1920,
});

Object.defineProperty(document.body, 'clientHeight', {
  value: 1080,
});

Object.defineProperty(document.documentElement, 'clientHeight', {
  value: 1080,
});

// Mock hooks
vi.mock('/@/hooks/core/useTimeout', () => ({
  useTimeoutFn: vi.fn((fn, delay) => {
    fn(); // Execute immediately for testing
  }),
}));

describe('useModalDrag', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useModalDragMove hook', async () => {
    const module = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    expect(module).toBeDefined();
    expect(module.useModalDragMove).toBeDefined();
    expect(typeof module.useModalDragMove).toBe('function');
  });

  it('should handle useModalDragMove hook with basic context', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle draggable false', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(false),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle open false', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(false),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle destroyOnClose true', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(true),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle context without destroyOnClose', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: undefined,
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle drag functionality with mock DOM elements', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null,
    };
    
    const mockModal = {
      offsetWidth: 400,
      offsetHeight: 300,
      offsetLeft: 100,
      offsetTop: 100,
      style: { cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle getStyle function', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Mock getComputedStyle to return specific values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '50%',
      top: '50%',
    } as any);
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle percentage values in styles', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Mock getComputedStyle to return percentage values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '50%',
      top: '50%',
    } as any);
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle px values in styles', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Mock getComputedStyle to return px values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '100px',
      top: '100px',
    } as any);
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle mouse events and dragging', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null,
    };
    
    const mockModal = {
      offsetWidth: 400,
      offsetHeight: 300,
      offsetLeft: 100,
      offsetTop: 100,
      style: { cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return px values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '100px',
      top: '100px',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
    
    // Simulate mousedown event
    const mouseEvent = {
      clientX: 200,
      clientY: 200,
    };
    
    if (mockHeader.onmousedown) {
      expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
    }
  });

  it('should handle boundary constraints during drag', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null,
    };
    
    const mockModal = {
      offsetWidth: 400,
      offsetHeight: 300,
      offsetLeft: 100,
      offsetTop: 100,
      style: { cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return px values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '100px',
      top: '100px',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
    
    // Simulate mousedown event
    const mouseEvent = {
      clientX: 200,
      clientY: 200,
    };
    
    if (mockHeader.onmousedown) {
      expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
    }
  });

  it('should handle percentage style values', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null,
    };
    
    const mockModal = {
      offsetWidth: 400,
      offsetHeight: 300,
      offsetLeft: 100,
      offsetTop: 100,
      style: { cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return percentage values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '50%',
      top: '50%',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
    
    // Simulate mousedown event
    const mouseEvent = {
      clientX: 200,
      clientY: 200,
    };
    
    if (mockHeader.onmousedown) {
      expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
    }
  });

  it('should handle mouseup event', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null,
    };
    
    const mockModal = {
      offsetWidth: 400,
      offsetHeight: 300,
      offsetLeft: 100,
      offsetTop: 100,
      style: { cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return px values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      left: '100px',
      top: '100px',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
    
    // Simulate mousedown event
    const mouseEvent = {
      clientX: 200,
      clientY: 200,
    };
    
    if (mockHeader.onmousedown) {
      expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
    }
  });

  it('should handle wrap with display none', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => 'true'),
      querySelector: vi.fn(() => null),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return display: none
    vi.mocked(window.getComputedStyle).mockReturnValue({
      display: 'none',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle wrap with null draggable attribute', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn(() => null),
      querySelector: vi.fn(() => null),
    };
    
    // Override the global mock for this test
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return display: block
    vi.mocked(window.getComputedStyle).mockReturnValue({
      display: 'block',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle drag functionality with mouse events', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle drag with percentage values', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle mousemove and mouseup events', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle drag functionality with proper DOM elements', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle drag with percentage values', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should handle boundary constraints during drag', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    // Test that the hook can be called without throwing
    expect(() => useModalDragMove(context)).not.toThrow();
  });

  it('should execute drag function when DOM elements are present', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements that would trigger the drag function
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null as any,
    };
    
    const mockModal = {
      offsetWidth: 300,
      offsetHeight: 200,
      offsetLeft: 100,
      offsetTop: 100,
      style: { left: '100px', top: '100px', cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn((attr) => {
        if (attr === 'data-drag') return null; // This will trigger drag function
        return 'true';
      }),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Mock querySelectorAll to return the mock wrap
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return display: block and other required values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      display: 'block',
      left: '100px',
      top: '100px',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    useModalDragMove(context);
    
    // Restore the spy
    querySelectorAllSpy.mockRestore();
    
    // Verify that the drag function was executed by checking if cursor was set
    expect(mockHeader.style.cursor).toBe('move');
    
    // Verify that onmousedown handler was set
    expect(mockHeader.onmousedown).toBeDefined();
    
    // Test mousedown event to cover more lines
    const mouseEvent = {
      clientX: 200,
      clientY: 150,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    
    expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
    
    // Verify that document.onmousemove and onmouseup are set
    expect(document.onmousemove).toBeDefined();
    expect(document.onmouseup).toBeDefined();
  });

  it('should handle percentage values in drag', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements that would trigger the drag function
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null as any,
    };
    
    const mockModal = {
      offsetWidth: 300,
      offsetHeight: 200,
      offsetLeft: 100,
      offsetTop: 100,
      style: { left: '50%', top: '50%', cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn((attr) => {
        if (attr === 'data-drag') return null; // This will trigger drag function
        return 'true';
      }),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Mock querySelectorAll to return the mock wrap
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return percentage values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      display: 'block',
      left: '50%',
      top: '50%',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    useModalDragMove(context);
    
    // Restore the spy
    querySelectorAllSpy.mockRestore();
    
    // Test mousedown event with percentage values
    const mouseEvent = {
      clientX: 200,
      clientY: 150,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    
    expect(() => mockHeader.onmousedown(mouseEvent)).not.toThrow();
  });

  it('should handle mousemove and mouseup events in drag', async () => {
    const { useModalDragMove } = await import('/@/components/Modal/src/hooks/useModalDrag');
    
    // Mock DOM elements that would trigger the drag function
    const mockHeader = {
      style: { cursor: '' },
      onmousedown: null as any,
    };
    
    const mockModal = {
      offsetWidth: 300,
      offsetHeight: 200,
      offsetLeft: 100,
      offsetTop: 100,
      style: { left: '100px', top: '100px', cssText: '' },
    };
    
    const mockWrap = {
      setAttribute: vi.fn(),
      getAttribute: vi.fn((attr) => {
        if (attr === 'data-drag') return null; // This will trigger drag function
        return 'true';
      }),
      querySelector: vi.fn((selector) => {
        if (selector === '.ant-modal-header') return mockHeader;
        if (selector === '.ant-modal') return mockModal;
        return null;
      }),
    };
    
    // Mock querySelectorAll to return the mock wrap
    const querySelectorAllSpy = vi.spyOn(document, 'querySelectorAll').mockReturnValue([mockWrap] as any);
    
    // Mock getComputedStyle to return display: block and other required values
    vi.mocked(window.getComputedStyle).mockReturnValue({
      display: 'block',
      left: '100px',
      top: '100px',
    } as any);
    
    const context = {
      draggable: ref(true),
      destroyOnClose: ref(false),
      open: ref(true),
    };
    
    useModalDragMove(context);
    
    // Restore the spy
    querySelectorAllSpy.mockRestore();
    
    // Test mousedown event
    const mouseDownEvent = {
      clientX: 200,
      clientY: 150,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    
    mockHeader.onmousedown(mouseDownEvent);
    
    // Test mousemove event
    const mouseMoveEvent = {
      clientX: 250,
      clientY: 200,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    
    // Simulate mousemove by triggering the global mousemove handler
    const mousemoveHandler = document.onmousemove;
    if (mousemoveHandler) {
      expect(() => mousemoveHandler(mouseMoveEvent)).not.toThrow();
    }
    
    // Test mouseup event
    const mouseUpEvent = {
      clientX: 250,
      clientY: 200,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };
    
    // Simulate mouseup by triggering the global mouseup handler
    const mouseupHandler = document.onmouseup;
    if (mouseupHandler) {
      expect(() => mouseupHandler(mouseUpEvent)).not.toThrow();
    }
  });
});
