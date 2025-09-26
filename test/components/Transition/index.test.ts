import { describe, it, expect, vi } from 'vitest';

// Mock transition creation functions
vi.mock('/@/components/Transition/src/CreateTransition', () => ({
  createSimpleTransition: vi.fn((name) => ({
    name,
    functional: true,
    render: vi.fn(),
  })),
  createJavascriptTransition: vi.fn((name, generator) => ({
    name,
    generator,
    functional: true,
    render: vi.fn(),
  })),
}));

// Mock expand transition generator
vi.mock('/@/components/Transition/src/ExpandTransition', () => {
  return {
    default: vi.fn((selector, horizontal) => ({
      selector,
      horizontal,
      enter: vi.fn(),
      leave: vi.fn(),
    })),
  };
});

// Test Transition component index exports
describe('Transition/index', () => {
  it('should export CollapseTransition component', async () => {
    const { CollapseTransition } = await import('/@/components/Transition');
    
    expect(CollapseTransition).toBeDefined();
    expect(typeof CollapseTransition).toBe('object');
  });

  it('should export simple transition components', async () => {
    const {
      FadeTransition,
      ScaleTransition,
      SlideYTransition,
      ScrollYTransition,
      SlideYReverseTransition,
      ScrollYReverseTransition,
      SlideXTransition,
      ScrollXTransition,
      SlideXReverseTransition,
      ScrollXReverseTransition,
      ScaleRotateTransition
    } = await import('/@/components/Transition');
    
    expect(FadeTransition).toBeDefined();
    expect(ScaleTransition).toBeDefined();
    expect(SlideYTransition).toBeDefined();
    expect(ScrollYTransition).toBeDefined();
    expect(SlideYReverseTransition).toBeDefined();
    expect(ScrollYReverseTransition).toBeDefined();
    expect(SlideXTransition).toBeDefined();
    expect(ScrollXTransition).toBeDefined();
    expect(SlideXReverseTransition).toBeDefined();
    expect(ScrollXReverseTransition).toBeDefined();
    expect(ScaleRotateTransition).toBeDefined();
  });

  it('should export javascript transition components', async () => {
    const { ExpandXTransition, ExpandTransition } = await import('/@/components/Transition');
    
    expect(ExpandXTransition).toBeDefined();
    expect(ExpandTransition).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Transition');
    const exportKeys = Object.keys(exports);
    
    // Should export all transition components
    expect(exportKeys).toContain('CollapseTransition');
    expect(exportKeys).toContain('FadeTransition');
    expect(exportKeys).toContain('ScaleTransition');
    expect(exportKeys).toContain('ExpandTransition');
    expect(exportKeys).toContain('ExpandXTransition');
    expect(exportKeys.length).toBe(15); // Total transitions defined
  });

  it('should create transitions with correct names', async () => {
    const { FadeTransition, ScaleTransition } = await import('/@/components/Transition');
    
    expect(FadeTransition.name).toBe('fade-transition');
    expect(ScaleTransition.name).toBe('scale-transition');
  });

  it('should export all slide transitions', async () => {
    const {
      SlideYTransition,
      SlideYReverseTransition,
      SlideXTransition,
      SlideXReverseTransition
    } = await import('/@/components/Transition');
    
    expect(SlideYTransition.name).toBe('slide-y-transition');
    expect(SlideYReverseTransition.name).toBe('slide-y-reverse-transition');
    expect(SlideXTransition.name).toBe('slide-x-transition');
    expect(SlideXReverseTransition.name).toBe('slide-x-reverse-transition');
  });

  it('should export all scroll transitions', async () => {
    const {
      ScrollYTransition,
      ScrollYReverseTransition,
      ScrollXTransition,
      ScrollXReverseTransition
    } = await import('/@/components/Transition');
    
    expect(ScrollYTransition.name).toBe('scroll-y-transition');
    expect(ScrollYReverseTransition.name).toBe('scroll-y-reverse-transition');
    expect(ScrollXTransition.name).toBe('scroll-x-transition');
    expect(ScrollXReverseTransition.name).toBe('scroll-x-reverse-transition');
  });
});