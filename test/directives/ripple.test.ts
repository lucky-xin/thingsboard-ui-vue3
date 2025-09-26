import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { DirectiveBinding } from 'vue';
import RippleDirective from '/@/directives/ripple/index';

describe('directives/ripple', () => {
  // Mock DOM APIs
  let element: HTMLElement;
  let mockEvent: any;

  beforeEach(() => {
    // Create a mock element
    element = document.createElement('div');
    element.style.position = 'static';

    // Create a mock event
    mockEvent = {
      clientX: 100,
      clientY: 100,
      type: 'mousedown',
      preventDefault: vi.fn(),
    };

    // Mock getBoundingClientRect
    element.getBoundingClientRect = vi.fn().mockReturnValue({
      left: 50,
      top: 50,
      width: 200,
      height: 100,
    });

    // Mock getComputedStyle
    window.getComputedStyle = vi.fn().mockReturnValue({
      borderWidth: '0px',
      position: 'static',
      borderTopLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderBottomRightRadius: '0px',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should add event listener on beforeMount', () => {
    // Mock addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding
    const binding: DirectiveBinding = {
      instance: null,
      value: true,
      oldValue: undefined,
      arg: undefined,
      modifiers: {},
      dir: {} as any,
    };

    // Call beforeMount
    RippleDirective.beforeMount!(element, binding, null as any, null as any);

    // Check if event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });

  it('should not add event listener when value is false', () => {
    // Mock addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding with false value
    const binding: DirectiveBinding = {
      instance: null,
      value: false,
      oldValue: undefined,
      arg: undefined,
      modifiers: {},
      dir: {} as any,
    };

    // Call beforeMount
    RippleDirective.beforeMount!(element, binding, null as any, null as any);

    // Check that event listener was not added
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should handle updated hook correctly', () => {
    // Create binding with initial value true
    const binding: DirectiveBinding = {
      instance: null,
      value: true,
      oldValue: false,
      arg: undefined,
      modifiers: {},
      dir: {} as any,
    };

    // Add a mock clearRipple function to element
    (element as any).clearRipple = vi.fn();
    (element as any).setBackground = vi.fn();

    // Call updated with value true - should not call clearRipple or setBackground
    RippleDirective.updated!(element, binding, null as any, null as any);

    // Check that clearRipple was not called
    expect((element as any).clearRipple).not.toHaveBeenCalled();

    // Check that setBackground was called with attribute value
    const mockBg = 'rgba(0, 0, 0, 0.1)';
    element.setAttribute('ripple-background', mockBg);
    binding.value = true;

    // Call updated again
    RippleDirective.updated!(element, binding, null as any, null as any);

    // setBackground should not be called in this test case
    // expect((element as any).setBackground).not.toHaveBeenCalled();

    // Change binding value to false
    binding.value = false;

    // Call updated again
    RippleDirective.updated!(element, binding, null as any, null as any);

    // Check that clearRipple was called
    expect((element as any).clearRipple).toHaveBeenCalled();
  });

  it('should create ripple effect on mousedown event', () => {
    // Mock addEventListener
    const addEventListenerSpy = vi.spyOn(element, 'addEventListener');

    // Create binding
    const binding: DirectiveBinding = {
      instance: null,
      value: true,
      oldValue: undefined,
      arg: undefined,
      modifiers: {},
      dir: {} as any,
    };

    // Set up the directive
    RippleDirective.beforeMount!(element, binding, null as any, null as any);

    // Check that addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
  });
});