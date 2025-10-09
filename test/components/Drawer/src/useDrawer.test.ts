import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, getCurrentInstance } from 'vue';

// Mock Vue functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: vi.fn(),
    ref: vi.fn((val) => ({ value: val })),
    reactive: vi.fn((obj) => obj),
    onUnmounted: vi.fn(),
    unref: vi.fn((val) => val?.value ?? val),
    nextTick: vi.fn(() => Promise.resolve()),
    toRaw: vi.fn((val) => val),
    computed: vi.fn((fn) => ({ value: fn() })),
    watchEffect: vi.fn(),
  };
});

// Mock utils
vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn(() => false),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((fn) => typeof fn === 'function'),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

vi.mock('lodash-es', () => ({
  isEqual: vi.fn((a, b) => JSON.stringify(a) === JSON.stringify(b)),
}));

vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn(),
}));

describe('components/Drawer/src/useDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useDrawer hook', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
    expect(module.useDrawer).toBeDefined();
    expect(typeof module.useDrawer).toBe('function');
    expect(module.useDrawerInner).toBeDefined();
    expect(typeof module.useDrawerInner).toBe('function');
  });

  it('should have drawer hook functions', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    // Check that module has exports
    const exportKeys = Object.keys(module);
    expect(exportKeys.length).toBeGreaterThan(0);
    expect(exportKeys).toContain('useDrawer');
    expect(exportKeys).toContain('useDrawerInner');
  });

  it('should be a valid hook module', async () => {
    const module = await import('/@/components/Drawer/src/useDrawer');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should handle useDrawer hook', async () => {
    const { useDrawer } = await import('/@/components/Drawer/src/useDrawer');
    
    // Mock getCurrentInstance
    vi.mocked(getCurrentInstance).mockReturnValue({} as any);
    
    const [register, methods] = useDrawer();
    
    expect(typeof register).toBe('function');
    expect(typeof methods).toBe('object');
    expect(methods.setDrawerProps).toBeDefined();
    expect(methods.openDrawer).toBeDefined();
    expect(methods.closeDrawer).toBeDefined();
    expect(methods.setDrawerData).toBeDefined();
  });

  it('should handle useDrawerInner hook', async () => {
    const { useDrawerInner } = await import('/@/components/Drawer/src/useDrawer');
    
    // Mock getCurrentInstance
    vi.mocked(getCurrentInstance).mockReturnValue({
      emit: vi.fn(),
    } as any);
    
    const [register, methods] = useDrawerInner();
    
    expect(typeof register).toBe('function');
    expect(typeof methods).toBe('object');
    expect(methods.changeLoading).toBeDefined();
    expect(methods.changeOkLoading).toBeDefined();
    expect(methods.closeDrawer).toBeDefined();
    expect(methods.setDrawerProps).toBeDefined();
  });

  it('should handle register function with mock instance', async () => {
    const { useDrawer } = await import('/@/components/Drawer/src/useDrawer');
    
    // Mock getCurrentInstance
    vi.mocked(getCurrentInstance).mockReturnValue({} as any);
    
    const [register] = useDrawer();
    
    const mockInstance = {
      emitOpen: vi.fn(),
      setDrawerProps: vi.fn(),
    };
    
    // Test register function
    expect(() => register(mockInstance, 1)).not.toThrow();
  });

  it('should handle register function with callback', async () => {
    const { useDrawerInner } = await import('/@/components/Drawer/src/useDrawer');
    
    // Mock getCurrentInstance
    vi.mocked(getCurrentInstance).mockReturnValue({
      emit: vi.fn(),
    } as any);
    
    const callbackFn = vi.fn();
    const [register] = useDrawerInner(callbackFn);
    
    const mockInstance = {
      setDrawerProps: vi.fn(),
    };
    
    // Test register function
    expect(() => register(mockInstance, 1)).not.toThrow();
  });
});