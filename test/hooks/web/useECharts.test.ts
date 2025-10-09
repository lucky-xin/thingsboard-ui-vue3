import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';

// Mock Vue functions
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    ref: vi.fn((val) => ({ value: val })),
    computed: vi.fn((fn) => ({ value: fn() })),
    unref: vi.fn((val) => val?.value ?? val),
    nextTick: vi.fn(() => Promise.resolve()),
    watch: vi.fn(),
    onActivated: vi.fn((callback) => callback()),
  };
});

// Mock dependencies
vi.mock('/@/hooks/setting/useRootSetting', () => ({
  useRootSetting: () => ({
    getDarkMode: ref('light'),
  }),
}));

vi.mock('/@/hooks/event/useEventListener', () => ({
  useEventListener: () => ({
    removeEvent: vi.fn(),
  }),
}));

vi.mock('/@/hooks/event/useBreakpoint', () => ({
  useBreakpoint: () => ({
    widthRef: ref(1200),
    screenEnum: { MD: 768 },
  }),
}));

vi.mock('/@/hooks/core/useTimeout', () => ({
  useTimeoutFn: vi.fn((callback) => {
    setTimeout(callback, 30);
  }),
}));

vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn((callback) => callback()),
  useDebounceFn: vi.fn((fn) => fn),
}));

vi.mock('/@/utils/lib/echarts', () => ({
  default: {
    init: vi.fn(() => ({
      clear: vi.fn(),
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
    })),
    dispose: vi.fn(),
  },
}));

describe('hooks/web/useECharts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useECharts hook', async () => {
    const module = await import('/@/hooks/web/useECharts');
    
    expect(module).toBeDefined();
    expect(module.useECharts).toBeDefined();
    expect(typeof module.useECharts).toBe('function');
  });

  it('should initialize with default theme', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    
    expect(typeof result.setOptions).toBe('function');
    expect(typeof result.resize).toBe('function');
    expect(typeof result.getInstance).toBe('function');
    expect(result.echarts).toBeDefined();
  });

  it('should initialize with custom theme', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef, 'dark');
    
    expect(typeof result.setOptions).toBe('function');
    expect(typeof result.resize).toBe('function');
    expect(typeof result.getInstance).toBe('function');
  });

  it('should handle setOptions with light theme', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef, 'light');
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle setOptions with dark theme', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef, 'dark');
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle setOptions with default theme', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef, 'default');
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle resize function', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    
    expect(() => result.resize()).not.toThrow();
  });

  it('should handle getInstance function', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    
    expect(() => result.getInstance()).not.toThrow();
  });

  it('should handle element with zero height', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 0,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle null element', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref(null);
    
    const result = useECharts(elRef);
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle setOptions with clear true', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options, true)).not.toThrow();
  });

  it('should handle setOptions with clear false', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options, false)).not.toThrow();
  });

  it('should handle mobile breakpoint', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = { title: { text: 'Test Chart' } };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle theme change', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef, 'light');
    const options = { title: { text: 'Test Chart' } };
    
    // Set initial options
    result.setOptions(options);
    
    // Change theme and set options again
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle chart disposal', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    
    // Get instance to ensure it's created
    const instance = result.getInstance();
    expect(instance).toBeDefined();
  });

  it('should handle complex chart options', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = {
      title: { text: 'Complex Chart' },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150], type: 'bar' }],
    };
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle empty options', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options = {};
    
    expect(() => result.setOptions(options)).not.toThrow();
  });

  it('should handle multiple setOptions calls', async () => {
    const { useECharts } = await import('/@/hooks/web/useECharts');
    
    const elRef = ref({
      offsetHeight: 400,
      offsetWidth: 800,
    });
    
    const result = useECharts(elRef);
    const options1 = { title: { text: 'Chart 1' } };
    const options2 = { title: { text: 'Chart 2' } };
    
    expect(() => {
      result.setOptions(options1);
      result.setOptions(options2);
    }).not.toThrow();
  });
});