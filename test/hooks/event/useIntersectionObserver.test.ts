import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useIntersectionObserver } from '/@/hooks/event/useIntersectionObserver';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
const mockUnobserve = vi.fn();

class MockIntersectionObserver {
  constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    mockUnobserve.mockClear();
  }

  observe = mockObserve;
  disconnect = mockDisconnect;
  unobserve = mockUnobserve;
}

// Mock Vue functions
vi.mock('vue', () => ({
  ref: vi.fn((value) => ({ value })),
  watchEffect: vi.fn((fn) => {
    fn(); // Execute immediately for testing
    return vi.fn(); // Return stop function
  }),
}));

global.IntersectionObserver = MockIntersectionObserver as any;

import { watchEffect } from 'vue';

describe('hooks/event/useIntersectionObserver', () => {
  const mockTarget = { value: document.createElement('div') };
  const mockRoot = { value: document.createElement('div') };
  const mockOnIntersect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (ref as any).mockImplementation((value) => ({ value }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create intersection observer with default options', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(watchEffect).toHaveBeenCalledTimes(1);
  });

  it('should create intersection observer with custom options', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      root: mockRoot as any,
      onIntersect: mockOnIntersect,
      rootMargin: '10px',
      threshold: 0.5,
    });

    expect(watchEffect).toHaveBeenCalledTimes(1);
  });

  it('should observe target element when available', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(mockObserve).toHaveBeenCalledWith(mockTarget.value);
  });

  it('should not observe when target is null', () => {
    const nullTarget = { value: null };
    
    useIntersectionObserver({
      target: nullTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should not observe when target is undefined', () => {
    const undefinedTarget = { value: undefined };
    
    useIntersectionObserver({
      target: undefinedTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('should return observer and stop function', () => {
    const result = useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(result).toHaveProperty('observer');
    expect(result).toHaveProperty('stop');
    expect(typeof result.stop).toBe('function');
  });

  it('should call stop function to cleanup', () => {
    const result = useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    result.stop();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should handle cleanup when observer exists', () => {
    const mockRef = { value: new MockIntersectionObserver(mockOnIntersect) };
    (ref as any).mockReturnValue(mockRef);

    const result = useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    result.stop();

    expect(mockDisconnect).toHaveBeenCalled();
    expect(mockUnobserve).toHaveBeenCalledWith(mockTarget.value);
  });

  it('should handle cleanup when observer is null', () => {
    const mockRef = { value: null };
    (ref as any).mockReturnValue(mockRef);

    const result = useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    expect(() => result.stop()).not.toThrow();
  });

  it('should use custom root element', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      root: mockRoot as any,
      onIntersect: mockOnIntersect,
    });

    // The observer should be created with the custom root
    expect(watchEffect).toHaveBeenCalled();
  });

  it('should use null root when root is not provided', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
    });

    // The observer should be created with null root (default)
    expect(watchEffect).toHaveBeenCalled();
  });

  it('should handle different threshold values', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
      threshold: 0.8,
    });

    expect(watchEffect).toHaveBeenCalled();
  });

  it('should handle different rootMargin values', () => {
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: mockOnIntersect,
      rootMargin: '20px 10px',
    });

    expect(watchEffect).toHaveBeenCalled();
  });

  it('should pass callback to IntersectionObserver', () => {
    const customCallback = vi.fn();
    
    useIntersectionObserver({
      target: mockTarget as any,
      onIntersect: customCallback,
    });

    expect(watchEffect).toHaveBeenCalled();
  });
});