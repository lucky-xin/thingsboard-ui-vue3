import { describe, it, expect } from 'vitest';
import { ref, reactive, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { createContext, useContext } from '/@/hooks/core/useContext';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css', writable: true
});

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

describe('useContext', () => {
  it('should create context object', () => {
    const testContext = {
      name: 'test',
      value: ref(42),
    };

    const key = Symbol('test');

    // Create a test component to provide context
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key);
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
  });

  it('should create readonly context when readonly option is true', () => {
    const testContext = {
      name: 'test',
      value: ref(42),
    };

    const key = Symbol('test');

    // Create a test component to provide readonly context
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key, { readonly: true });
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
  });

  it('should create mutable context when readonly option is false', () => {
    const testContext = reactive({
      name: 'test',
      value: 42,
    });

    const key = Symbol('test');

    // Create a test component to provide mutable context
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key, { readonly: false });
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
    expect(wrapper.vm.state.value).toBe(42);

    // Should be able to modify
    wrapper.vm.state.name = 'modified';
    wrapper.vm.state.value = 100;

    expect(wrapper.vm.state.name).toBe('modified');
    expect(wrapper.vm.state.value).toBe(100);
  });

  it('should handle native context option', () => {
    const testContext = {
      name: 'test',
    };

    const key = Symbol('test');

    // Create a test component to provide context with native option
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key, { native: true });
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
  });

  // 增加测试用例以提高覆盖率
  it('should handle useContext with default value', () => {
    const key = Symbol('test');
    const defaultValue = { name: 'default' };

    // Create a test component to use context
    const TestComponent = defineComponent({
      setup() {
        const state = useContext(key, defaultValue);
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);
    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('default');
  });

  it('should handle createContext with createProvider option', () => {
    const testContext = {
      name: 'test',
    };

    const key = Symbol('test');

    // Create a test component to provide context with createProvider option
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key, { createProvider: true });
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);
    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
  });

  it('should handle createContext with all options', () => {
    const testContext = reactive({
      name: 'test',
      value: 42,
    });

    const key = Symbol('test');

    // Create a test component to provide context with all options
    const TestComponent = defineComponent({
      setup() {
        const { state } = createContext(testContext, key, {
          readonly: false,
          createProvider: true,
          native: false
        });
        return { state };
      },
      template: '<div></div>',
    });

    const wrapper = mount(TestComponent);
    expect(wrapper.vm.state).toBeDefined();
    expect(wrapper.vm.state.name).toBe('test');
    expect(wrapper.vm.state.value).toBe(42);
  });
});