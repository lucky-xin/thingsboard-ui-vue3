import { describe, it, expect } from 'vitest';
import { ref, reactive, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { createContext, useContext } from '/@/hooks/core/useContext';

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
});
