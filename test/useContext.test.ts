import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';

// 先声明，再进行模块 mock，避免 hoist 导致的 TDZ 问题
const { mockProvide, mockInject } = vi.hoisted(() => ({
  mockProvide: vi.fn(),
  mockInject: vi.fn(),
}));

vi.mock('vue', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    provide: mockProvide,
    inject: mockInject,
  };
});

import { createContext, useContext } from '/@/hooks/core/useContext';

describe('useContext', () => {
  beforeEach(() => {
    mockProvide.mockClear();
    mockInject.mockClear();
  });

  it('creates context and provides it correctly', () => {
    // Create a unique symbol for this test
    const testSymbol = Symbol('test');

    const contextData = {
      prefixCls: ref('test-prefix'),
      isMobile: ref(false),
    };

    const context = createContext(contextData, testSymbol);

    expect(context.state).toBeDefined();
    // We can't directly test the reactive values outside of a component context
    // but we can test that the state object has the correct structure
    expect(context.state.prefixCls).toBeDefined();
    expect(context.state.isMobile).toBeDefined();
    expect(mockProvide).toHaveBeenCalledWith(testSymbol, expect.any(Object));
  });

  it('creates context with readonly option', () => {
    // Create a unique symbol for this test
    const testSymbol = Symbol('test-readonly');

    const contextData = {
      prefixCls: ref('test-prefix'),
      isMobile: ref(true),
    };

    const context = createContext(contextData, testSymbol, { readonly: true });

    expect(context.state).toBeDefined();
    // We can't directly test the reactive values outside of a component context
    // but we can test that the state object has the correct structure
    expect(context.state.prefixCls).toBeDefined();
    expect(context.state.isMobile).toBeDefined();
    expect(mockProvide).toHaveBeenCalledWith(testSymbol, expect.any(Object));
  });

  it('useContext function calls inject with correct parameters', () => {
    const testSymbol = Symbol('test-inject');
    const defaultValue = { test: 'default' };

    // Test useContext with key and defaultValue
    useContext(testSymbol, defaultValue);

    expect(mockInject).toHaveBeenCalledWith(testSymbol, defaultValue);
  });

  it('useContext function calls inject with empty object when no defaultValue', () => {
    const testSymbol = Symbol('test-inject-no-default');

    // Test useContext with key only
    useContext(testSymbol);

    expect(mockInject).toHaveBeenCalledWith(testSymbol, {});
  });

  it('useContext function with default Symbol key', () => {
    // Test useContext without any parameters (uses default Symbol)
    useContext();

    expect(mockInject).toHaveBeenCalledWith(expect.any(Symbol), {});
  });
});
