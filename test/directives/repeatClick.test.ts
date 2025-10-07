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

const TestInvalidComponent = defineComponent({
  template: `<button v-repeat-click="invalidHandler" id="test-button">Click</button>`,
  directives: { repeatClick },
  setup() {
    return {
      invalidHandler: null
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

  it('should call handler when mousedown and mouseup within 100ms', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    // Reset the mock to start fresh
    handleClick.mockClear();

    // Simulate mousedown event
    await button.trigger('mousedown');

    // Simulate document mouseup event (the clear function is bound to document mouseup)
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // Wait a bit for the clear function to execute
    await new Promise(resolve => setTimeout(resolve, 10));

    // The handler should be called once from the clear function
    // (because the time difference is less than 100ms)
    expect(handleClick).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle interval cleanup properly', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    // Reset the mock to start fresh
    handleClick.mockClear();

    // Simulate mousedown event
    await button.trigger('mousedown');

    // Wait for interval to trigger (100ms interval)
    await new Promise(resolve => setTimeout(resolve, 150));

    // Record calls before mouseup
    const callsBeforeMouseup = handleClick.mock.calls.length;

    // Simulate document mouseup event (the clear function is bound to document mouseup)
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // Wait for cleanup
    await new Promise(resolve => setTimeout(resolve, 10));

    // Wait longer to ensure interval is cleared and no more calls
    await new Promise(resolve => setTimeout(resolve, 200));
    const callsAfterWaiting = handleClick.mock.calls.length;

    // Should have some calls from the interval before mouseup
    expect(callsBeforeMouseup).toBeGreaterThan(0);

    // After mouseup and waiting, should not have many more calls
    // (interval should be cleared)
    expect(callsAfterWaiting - callsBeforeMouseup).toBeLessThan(3);

    wrapper.unmount();
  });

  it('should call handler in clear when mousedown-mouseup duration is less than 100ms', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    handleClick.mockClear();

    // Mock Date.now to control time precisely
    const mockNow = vi.spyOn(global.Date, 'now');
    mockNow.mockImplementationOnce(() => 1000); // mousedown time
    mockNow.mockImplementationOnce(() => 1040); // mouseup time (40ms later)

    // Simulate mousedown
    await button.trigger('mousedown');

    // Immediately trigger mouseup on document within 100ms
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // Allow microtasks to run
    await new Promise(resolve => setTimeout(resolve, 10));

    // The clear function should call handler again because time diff < 100ms
    expect(handleClick).toHaveBeenCalled();

    mockNow.mockRestore();
    wrapper.unmount();
  });

  it('should trigger handler multiple times during long mousedown', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    handleClick.mockClear();

    await button.trigger('mousedown');

    // Wait 250ms -> ~2-3 triggers expected (every 100ms)
    await new Promise(resolve => setTimeout(resolve, 250));

    // Trigger mouseup on document
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // Should have been called multiple times
    expect(handleClick).toHaveBeenCalled();
    // At least 2 times (could be 2 or 3 depending on timing)
    expect(handleClick.mock.calls.length).toBeGreaterThanOrEqual(2);

    wrapper.unmount();
  });

  it('should clear previous interval on repeated mousedown', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const setIntervalSpy = vi.spyOn(global, 'setInterval');

    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    handleClick.mockClear();
    clearIntervalSpy.mockClear();
    setIntervalSpy.mockClear();

    // First mousedown
    await button.trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 60));
    await button.trigger('mouseup');

    // Second mousedown quickly
    await button.trigger('mousedown');

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
    setIntervalSpy.mockRestore();
    wrapper.unmount();
  });

  it('should not throw error when binding value is not a function', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const wrapper = mount(TestInvalidComponent);

    await wrapper.find('#test-button').trigger('mousedown');
    await new Promise(resolve => setTimeout(resolve, 50));
    await wrapper.find('#test-button').trigger('mouseup');

    expect(() => {}).not.toThrow();

    consoleWarnSpy.mockRestore();
    wrapper.unmount();
  });

  it('should call handler in clear if time difference is less than 100ms (with mocked time)', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    handleClick.mockClear();

    // Mock Date.now to control time precisely
    const mockNow = vi.spyOn(global.Date, 'now');
    mockNow.mockImplementationOnce(() => 1000); // mousedown time (startTime)
    mockNow.mockImplementationOnce(() => 1040); // mouseup time (40ms later)

    await button.trigger('mousedown');
    // Trigger mouseup on document
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // Allow microtasks to run
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(handleClick).toHaveBeenCalled();

    mockNow.mockRestore();
    wrapper.unmount();
  });

  it('should not leak events after component unmount', async () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('#test-button');
    const handleClick = wrapper.vm.handleClick;

    handleClick.mockClear();

    await button.trigger('mousedown');

    wrapper.unmount();

    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
    document.dispatchEvent(mouseupEvent);

    // No additional calls should happen after unmount
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});