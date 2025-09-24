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

    // Create context
    const { state } = createContext(testContext, key);

    expect(state).toBeDefined();
    expect(state.name).toBe('test');
  });

  it('should create readonly context when readonly option is true', () => {
    const testContext = {
      name: 'test',
      value: ref(42),
    };

    const key = Symbol('test');

    // Create readonly context
    const { state } = createContext(testContext, key, { readonly: true });

    expect(state).toBeDefined();
    expect(state.name).toBe('test');
  });

  it('should create mutable context when readonly option is false', () => {
    const testContext = reactive({
      name: 'test',
      value: 42,
    });

    const key = Symbol('test');

    // Create mutable context
    const { state } = createContext(testContext, key, { readonly: false });

    expect(state).toBeDefined();
    expect(state.name).toBe('test');
    expect(state.value).toBe(42);

    // Should be able to modify
    state.name = 'modified';
    state.value = 100;

    expect(state.name).toBe('modified');
    expect(state.value).toBe(100);
  });

  it('should handle native context option', () => {
    const testContext = {
      name: 'test',
    };

    const key = Symbol('test');

    // Create context with native option
    const { state } = createContext(testContext, key, { native: true });

    expect(state).toBeDefined();
    expect(state.name).toBe('test');
  });
});
