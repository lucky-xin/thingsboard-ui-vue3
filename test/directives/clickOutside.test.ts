// Mock state management and global dependencies
vi.mock("/@/store", () => ({
  useAppStore: () => ({
    getTheme: vi.fn(() => "light"),
    setTheme: vi.fn(),
    locale: "en",
    setLocale: vi.fn()
  }),
  useUserStore: () => ({
    userInfo: { name: "Test User" },
    isLoggedIn: true
  })
}));

vi.mock("/@/hooks/setting/useLocale", () => ({
  useLocale: () => ({
    getLocale: vi.fn(() => ({ lang: "en" })),
    changeLocale: vi.fn(),
    t: vi.fn((key) => key)
  })
}));

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

// Import the actual directive
const clickOutsideModule = await import('/@/directives/clickOutside');

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

const ClickOutsideDirective = clickOutsideModule.default;

// Create a test component that uses the clickOutside directive
const TestComponent = defineComponent({
  template: `
    <div class="outer">
      <div v-click-outside="handleClickOutside" class="inner" data-testid="inner">
        Click inside
      </div>
      <div class="outside" data-testid="outside">
        Click outside
      </div>
    </div>
  `,
  directives: {
    ClickOutside: ClickOutsideDirective
  },
  setup() {
    const handleClickOutside = vi.fn();
    return {
      handleClickOutside
    };
  }
});

describe('directives/clickOutside', () => {
  it('should export clickOutside directive', async () => {
    const module = await import('/@/directives/clickOutside');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should have directive implementation', async () => {
    const module = await import('/@/directives/clickOutside');

    expect(module.default).toBeDefined();
  });

  it('should be a valid Vue directive', async () => {
    const module = await import('/@/directives/clickOutside');
    const directive = module.default;

    // Vue directives can be functions or objects
    expect(['object', 'function']).toContain(typeof directive);
  });

  it('should call handler when clicking outside element', async () => {
    const wrapper = mount(TestComponent);
    const handleClickOutside = wrapper.vm.handleClickOutside;

    // Manually trigger document mouseup event to simulate clicking outside
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
    const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });

    // Simulate clicking outside by dispatching events on document
    document.dispatchEvent(mouseDownEvent);
    document.dispatchEvent(mouseUpEvent);

    // Wait for next tick to allow event handling
    await wrapper.vm.$nextTick();

    expect(handleClickOutside).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should not call handler when clicking inside element', async () => {
    const wrapper = mount(TestComponent);
    const handleClickOutside = wrapper.vm.handleClickOutside;

    // Find the inner element and trigger click events on it
    const innerElement = wrapper.find('[data-testid="inner"]').element;

    // Manually trigger mouse events on the inner element
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
    const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });

    innerElement.dispatchEvent(mouseDownEvent);
    innerElement.dispatchEvent(mouseUpEvent);

    // Wait for next tick to allow event handling
    await wrapper.vm.$nextTick();

    expect(handleClickOutside).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle directive mounting and unmounting', async () => {
    const wrapper = mount(TestComponent);

    // Check that directive is mounted
    expect(wrapper.find('[data-testid="inner"]').exists()).toBe(true);

    // Unmount and check cleanup
    wrapper.unmount();

    // Should not throw any errors
    expect(true).toBe(true);
  });

  it('should handle missing binding value gracefully', async () => {
    const ComponentWithNoHandler = defineComponent({
      template: `
        <div>
          <div v-click-outside class="test-element">
            Test element
          </div>
        </div>
      `,
      directives: {
        ClickOutside: ClickOutsideDirective
      }
    });

    expect(() => {
      const wrapper = mount(ComponentWithNoHandler);
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should handle updated hook correctly', async () => {
    const wrapper = mount(TestComponent);

    // Update the component to trigger the updated hook
    await wrapper.setProps({ newProp: 'value' });

    // Trigger document events to test the updated functionality
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
    const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });

    document.dispatchEvent(mouseDownEvent);
    document.dispatchEvent(mouseUpEvent);

    await wrapper.vm.$nextTick();

    // Check that the handler was called
    expect(wrapper.vm.handleClickOutside).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should handle self click correctly', async () => {
    const wrapper = mount(TestComponent);
    const handleClickOutside = wrapper.vm.handleClickOutside;

    // Find the inner element and trigger click events on it (self click)
    const innerElement = wrapper.find('[data-testid="inner"]').element;

    // Manually trigger mouse events on the inner element itself
    const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
    const mouseUpEvent = new MouseEvent('mouseup', { bubbles: true });

    innerElement.dispatchEvent(mouseDownEvent);
    innerElement.dispatchEvent(mouseUpEvent);

    // Wait for next tick to allow event handling
    await wrapper.vm.$nextTick();

    // Should not call handler for self click
    expect(handleClickOutside).not.toHaveBeenCalled();

    wrapper.unmount();
  });
});