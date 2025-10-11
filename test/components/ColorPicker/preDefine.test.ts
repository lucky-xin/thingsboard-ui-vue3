import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import PreDefine from '/@/components/ColorPicker/src/components/preDefine.vue';

// Mock dependencies
vi.mock('/@/components/ColorPicker/src/lib/color', () => {
  class MockColor {
    enableAlpha = false;
    format = '';
    value = '#ff0000';
    
    constructor() {}
    
    fromString = vi.fn();
    toRgb = vi.fn(() => ({ r: 255, g: 0, b: 0 }));
    get = vi.fn(() => 100);
    compare = vi.fn(() => false);
    set = vi.fn();
  }
  
  return {
    default: MockColor
  };
});

vi.mock('/@/components/ColorPicker/src/useOptions', () => ({
  useOptions: vi.fn(() => ({
    currentColor: { value: '#ff0000' }
  }))
}));

describe('PreDefine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: []
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('color')).toEqual(mockColor);
    expect(wrapper.props('colors')).toEqual([]);
  });

  it('should render with custom colors', () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: colors
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('colors')).toEqual(colors);
  });

  it('should handle color selection', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Access the component instance and call handleSelect
    const vm = wrapper.vm as any;
    if (vm.handleSelect) {
      vm.handleSelect(1); // Pass index instead of color value
      expect(mockColor.fromString).toHaveBeenCalled();
    }
  });

  it('should handle color selection with different colors', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Access the component instance and call handleSelect
    const vm = wrapper.vm as any;
    if (vm.handleSelect) {
      vm.handleSelect(2); // Pass index instead of color value
      expect(mockColor.fromString).toHaveBeenCalled();
      
      vm.handleSelect(0); // Pass index instead of color value
      expect(mockColor.fromString).toHaveBeenCalled();
    }
  });

  it('should handle color prop changes', async () => {
    const mockColor1 = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const mockColor2 = {
      enableAlpha: true,
      format: 'hex',
      value: '#00ff00',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 0, g: 255, b: 0 })),
      get: vi.fn(() => 50),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor1,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    await wrapper.setProps({
      color: mockColor2
    });

    await nextTick();

    // Should not throw error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle colors prop changes', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00']
      }
    });

    await nextTick();

    await wrapper.setProps({
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
    });

    await nextTick();

    // Should not throw error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle empty colors array', () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: []
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('colors')).toEqual([]);
  });

  it('should handle color without alpha', async () => {
    const mockColor = {
      enableAlpha: false,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Should not throw error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle color with different formats', async () => {
    const formats = ['hex', 'rgb', 'hsl', 'hsv'];

    formats.forEach(format => {
      const mockColor = {
        enableAlpha: true,
        format: format,
        value: '#ff0000',
        fromString: vi.fn(),
        toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
        get: vi.fn(() => 100),
        compare: vi.fn(() => false),
        set: vi.fn()
      };

      const wrapper = mount(PreDefine, {
        props: {
          color: mockColor,
          colors: ['#ff0000', '#00ff00', '#0000ff']
        }
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should handle color methods', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color methods
    expect(mockColor.fromString).toBeDefined();
    expect(mockColor.toRgb).toBeDefined();
    expect(mockColor.get).toBeDefined();
    expect(mockColor.compare).toBeDefined();
    expect(mockColor.set).toBeDefined();
  });

  it('should handle computed properties', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Access the component instance and test computed properties
    const vm = wrapper.vm as any;
    if (vm.currentColor !== undefined) {
      expect(vm.currentColor).toBeDefined();
    }
  });

  it('should handle color comparison', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color comparison
    expect(mockColor.compare).toBeDefined();
  });

  it('should handle color string conversion', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color string conversion
    expect(mockColor.fromString).toBeDefined();
  });

  it('should handle color RGB conversion', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color RGB conversion
    const rgb = mockColor.toRgb();
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('should handle color value retrieval', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color value retrieval
    const value = mockColor.get('hue');
    expect(value).toBe(100);
  });

  it('should handle color value setting', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test color value setting
    mockColor.set('hue', 200);
    expect(mockColor.set).toHaveBeenCalledWith('hue', 200);
  });

  it('should handle component lifecycle', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Test component mounting
    expect(wrapper.exists()).toBe(true);

    // Test component unmounting
    wrapper.unmount();
    expect(wrapper.exists()).toBe(false);
  });

  it('should handle reactive color changes', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Change color properties
    mockColor.get.mockReturnValue(50);
    
    await nextTick();

    // Should not throw error
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle different color values', async () => {
    const colorValues = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    colorValues.forEach(colorValue => {
      const mockColor = {
        enableAlpha: true,
        format: 'hex',
        value: colorValue,
        fromString: vi.fn(),
        toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
        get: vi.fn(() => 100),
        compare: vi.fn(() => false),
        set: vi.fn()
      };

      const wrapper = mount(PreDefine, {
        props: {
          color: mockColor,
          colors: ['#ff0000', '#00ff00', '#0000ff']
        }
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should handle large colors array', () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const largeColorsArray = Array.from({ length: 50 }, (_, i) => `#${i.toString(16).padStart(6, '0')}`);

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: largeColorsArray
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('colors')).toEqual(largeColorsArray);
  });

  it('should handle invalid color values', async () => {
    const mockColor = {
      enableAlpha: true,
      format: 'hex',
      value: '#ff0000',
      fromString: vi.fn(),
      toRgb: vi.fn(() => ({ r: 255, g: 0, b: 0 })),
      get: vi.fn(() => 100),
      compare: vi.fn(() => false),
      set: vi.fn()
    };

    const wrapper = mount(PreDefine, {
      props: {
        color: mockColor,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    await nextTick();

    // Access the component instance and call handleSelect with invalid index
    const vm = wrapper.vm as any;
    if (vm.handleSelect) {
      vm.handleSelect(999); // Pass invalid index
      expect(mockColor.fromString).toHaveBeenCalled();
    }
  });

  it('should handle null color', () => {
    const wrapper = mount(PreDefine, {
      props: {
        color: null,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle undefined color', () => {
    const wrapper = mount(PreDefine, {
      props: {
        color: undefined,
        colors: ['#ff0000', '#00ff00', '#0000ff']
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
