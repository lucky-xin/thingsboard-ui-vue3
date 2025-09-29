import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import repeatClick from '/@/directives/repeatClick';

// Create a test component that uses the repeatClick directive
const TestComponent = defineComponent({
  template: `
    <button v-repeat-click="handleClick" id="test-button">
      Click me
    </button>
  `,
  directives: {
    repeatClick
  },
  setup() {
    const handleClick = vi.fn();
    return {
      handleClick
    };
  }
});

describe('directives/repeatClick', () => {
  it('should export repeat click directive', async () => {
    const module = await import('/@/directives/repeatClick');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have directive implementation', async () => {
    const module = await import('/@/directives/repeatClick');

    expect(module.default).toBeDefined();
  });

  it('should be a valid Vue directive', async () => {
    const module = await import('/@/directives/repeatClick');
    const directive = module.default;

    // Vue directives can be functions or objects
    expect(['object', 'function']).toContain(typeof directive);
  });

  it('should export directive properly', async () => {
    const module = await import('/@/directives/repeatClick');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
  });

  it('should trigger handler on mousedown and mouseup', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    // Simulate mousedown event
    await button.trigger('mousedown');

    // Wait a bit for the interval to trigger
    await new Promise(resolve => setTimeout(resolve, 150));

    // Simulate mouseup event
    await button.trigger('mouseup');

    // Expect the handler to have been called
    expect(handleClick).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle non-left mouse button correctly', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    // Simulate right mouse button (button = 2)
    const mousedownEvent = new MouseEvent('mousedown', { button: 2 });
    button.element.dispatchEvent(mousedownEvent);

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 150));

    // Simulate mouseup
    await button.trigger('mouseup');

    // Handler should not be called for non-left mouse button
    expect(handleClick).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should stop calling handler after mouseup', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    // Reset the mock to start fresh
    handleClick.mockClear();

    // Simulate mousedown event
    await button.trigger('mousedown');

    // Wait for multiple intervals (should trigger multiple times)
    await new Promise(resolve => setTimeout(resolve, 250));

    // Record calls before mouseup
    const callsBeforeMouseup = handleClick.mock.calls.length;

    // Simulate mouseup event
    await button.trigger('mouseup');

    // Small delay to let the clear function execute
    await new Promise(resolve => setTimeout(resolve, 10));

    // Wait longer and verify calls don't increase dramatically
    await new Promise(resolve => setTimeout(resolve, 300));
    const callsAfterWaiting = handleClick.mock.calls.length;

    // Should have some calls from the interval
    expect(callsBeforeMouseup).toBeGreaterThan(0);

    // After waiting, should not have dramatically more calls
    // (allowing for the clear function call and some timing variations)
    expect(callsAfterWaiting - callsBeforeMouseup).toBeLessThan(5);

    wrapper.unmount();
  });
});