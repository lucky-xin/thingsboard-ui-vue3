import { describe, it, expect, vi } from 'vitest';

// Mock echarts to avoid complex dependencies
vi.mock('echarts/core', () => ({
  default: {
    use: vi.fn(),
    init: vi.fn(),
    dispose: vi.fn(),
    registerMap: vi.fn(),
    getInstanceByDom: vi.fn(),
    registerTheme: vi.fn(),
    graphic: {},
  },
  use: vi.fn(),
  init: vi.fn(),
  dispose: vi.fn(),
  registerMap: vi.fn(),
  getInstanceByDom: vi.fn(),
  registerTheme: vi.fn(),
  graphic: {},
}));

vi.mock('echarts/charts', () => ({
  BarChart: 'BarChart',
  LineChart: 'LineChart',
  PieChart: 'PieChart',
  MapChart: 'MapChart',
  PictorialBarChart: 'PictorialBarChart',
  RadarChart: 'RadarChart',
}));

vi.mock('echarts/components', () => ({
  TitleComponent: 'TitleComponent',
  TooltipComponent: 'TooltipComponent',
  GridComponent: 'GridComponent',
  PolarComponent: 'PolarComponent',
  AriaComponent: 'AriaComponent',
  ParallelComponent: 'ParallelComponent',
  LegendComponent: 'LegendComponent',
  RadarComponent: 'RadarComponent',
  ToolboxComponent: 'ToolboxComponent',
  DataZoomComponent: 'DataZoomComponent',
  VisualMapComponent: 'VisualMapComponent',
  TimelineComponent: 'TimelineComponent',
  CalendarComponent: 'CalendarComponent',
  GraphicComponent: 'GraphicComponent',
}));

vi.mock('echarts/renderers', () => ({
  SVGRenderer: 'SVGRenderer',
}));

describe('utils/lib/echarts', () => {
  it('should export ECharts utilities', async () => {
    const module = await import('/@/utils/lib/echarts');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
  });

  it('should export echarts as default', async () => {
    const module = await import('/@/utils/lib/echarts');

    expect(module.default).toBeDefined();
    expect(typeof module.default).toBe('object');
  });

  it('should have echarts core methods', async () => {
    const module = await import('/@/utils/lib/echarts');
    const echarts = module.default;

    expect(echarts.use).toBeDefined();
    expect(echarts.init).toBeDefined();
    expect(echarts.dispose).toBeDefined();
    expect(echarts.registerMap).toBeDefined();
    expect(echarts.getInstanceByDom).toBeDefined();
    expect(echarts.registerTheme).toBeDefined();
  });

  it('should have initialized with required components', async () => {
    const { use } = await import('echarts/core');

    // Verify that echarts.use was called during module initialization
    // This tests that the module properly sets up the required components
    expect(use).toHaveBeenCalled();
  });

  it('should be a valid echarts module', async () => {
    const module = await import('/@/utils/lib/echarts');

    expect(module).toBeDefined();
    expect(typeof module).toBe('object');
    expect(module.default).toBeDefined();
  });

  it('should have graphic utilities', async () => {
    const module = await import('/@/utils/lib/echarts');
    const echarts = module.default;

    expect(echarts.graphic).toBeDefined();
    expect(typeof echarts.graphic).toBe('object');
  });
});
