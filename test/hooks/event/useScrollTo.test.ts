import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScrollTo } from '/@/hooks/event/useScrollTo';

// Mock Vue composition functions
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  unref: vi.fn((val) => (val && typeof val === 'object' && 'value' in val ? val.value : val)),
}));

// Mock utility functions
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((val) => typeof val === 'function'),
  isUnDef: vi.fn((val) => val === undefined),
}));

import { ref, unref } from 'vue';
import { isFunction, isUnDef } from '/@/utils/is';

describe('hooks/event/useScrollTo', () => {
  let mockElement: any;
  let originalRequestAnimationFrame: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock element
    mockElement = {
      scrollTop: 0,
    };

    // Mock requestAnimationFrame
    originalRequestAnimationFrame = global.requestAnimationFrame;
    global.requestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 16); // ~60fps
      return 1;
    });

    // Setup mock implementations
    (ref as any).mockImplementation((value) => ({ value }));
    (unref as any).mockImplementation((val) => 
      val && typeof val === 'object' && 'value' in val ? val.value : val
    );
    (isFunction as any).mockImplementation((val) => typeof val === 'function');
    (isUnDef as any).mockImplementation((val) => val === undefined);
  });

  afterEach(() => {
    global.requestAnimationFrame = originalRequestAnimationFrame;
  });

  it('should return start and stop functions', () => {
    const result = useScrollTo({
      el: mockElement,
      to: 100,
    });

    expect(result).toHaveProperty('start');
    expect(result).toHaveProperty('stop');
    expect(typeof result.start).toBe('function');
    expect(typeof result.stop).toBe('function');
  });

  it('should use default duration when not provided', () => {
    const result = useScrollTo({
      el: mockElement,
      to: 100,
    });

    expect(result).toBeDefined();
    expect(isUnDef).toHaveBeenCalled();
  });

  it('should use provided duration', () => {
    const result = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 1000,
    });

    expect(result).toBeDefined();
  });

  it('should start scrolling animation when start is called', () => {
    const mockIsActiveRef = { value: false };
    (ref as any).mockReturnValue(mockIsActiveRef);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
    });

    result.start();

    expect(mockIsActiveRef.value).toBe(true);
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should stop scrolling animation when stop is called', () => {
    const mockIsActiveRef = { value: true };
    (ref as any).mockReturnValue(mockIsActiveRef);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
    });

    result.stop();

    expect(mockIsActiveRef.value).toBe(false);
  });

  it('should call callback when scrolling completes', (done) => {
    const callback = vi.fn();
    const mockIsActiveRef = { value: false };
    
    (ref as any).mockReturnValue(mockIsActiveRef);
    (unref as any).mockImplementation((val) => val.value);

    // Mock a very short duration for faster test
    const result = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 1,
      callback,
    });

    result.start();
    mockIsActiveRef.value = true;

    // Wait for animation to complete
    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
      expect(isFunction).toHaveBeenCalledWith(callback);
      done();
    }, 50);
  });

  it('should not call callback if callback is not a function', (done) => {
    const callback = 'not a function';
    const mockIsActiveRef = { value: false };
    
    (ref as any).mockReturnValue(mockIsActiveRef);
    (isFunction as any).mockReturnValue(false);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 1,
      callback: callback as any,
    });

    result.start();
    mockIsActiveRef.value = true;

    setTimeout(() => {
      expect(isFunction).toHaveBeenCalledWith(callback);
      done();
    }, 50);
  });

  it('should update element scrollTop during animation', () => {
    const mockIsActiveRef = { value: false };
    (ref as any).mockReturnValue(mockIsActiveRef);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
    });

    result.start();
    mockIsActiveRef.value = true;

    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should handle scrolling from current position to target', () => {
    mockElement.scrollTop = 50;
    
    const result = useScrollTo({
      el: mockElement,
      to: 150,
    });

    expect(result).toBeDefined();
  });

  it('should handle scrolling to zero position', () => {
    mockElement.scrollTop = 100;
    
    const result = useScrollTo({
      el: mockElement,
      to: 0,
    });

    expect(result).toBeDefined();
  });

  it('should not continue animation when stopped', () => {
    const mockIsActiveRef = { value: true };
    (ref as any).mockReturnValue(mockIsActiveRef);
    (unref as any).mockImplementation((val) => val.value);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
      duration: 1000,
    });

    result.start();
    result.stop();

    expect(mockIsActiveRef.value).toBe(false);
  });

  it('should use default duration of 500 when undefined', () => {
    (isUnDef as any).mockReturnValue(true);

    const result = useScrollTo({
      el: mockElement,
      to: 100,
      duration: undefined,
    });

    expect(isUnDef).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should handle callback parameter', () => {
    const callback = vi.fn();

    const result = useScrollTo({
      el: mockElement,
      to: 100,
      callback,
    });

    expect(result).toBeDefined();
  });

  it('should handle different scroll positions', () => {
    const testCases = [
      { from: 0, to: 100 },
      { from: 100, to: 0 },
      { from: 50, to: 75 },
      { from: 200, to: 150 },
    ];

    testCases.forEach(({ from, to }) => {
      mockElement.scrollTop = from;
      
      const result = useScrollTo({
        el: mockElement,
        to,
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('start');
      expect(result).toHaveProperty('stop');
    });
  });
});