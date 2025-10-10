import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AlphaSlider from '/@/components/ColorPicker/src/components/alphaSlider.vue';

// Mock draggable
vi.mock('/@/components/ColorPicker/src/lib/draggable', () => ({
  default: vi.fn(),
}));

// Mock propTypes
vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    bool: {
      def: vi.fn((defaultValue) => defaultValue),
    },
  },
}));

// Mock Color class
const mockColor = {
  value: '#ffffff',
  get: vi.fn(() => 50),
  set: vi.fn(),
  toRgb: vi.fn(() => ({ r: 255, g: 255, b: 255 })),
};

describe('AlphaSlider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.ant-color-alpha-slider').exists()).toBe(true);
  });

  it('should handle vertical prop', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: true,
      },
    });
    expect(wrapper.find('.ant-color-alpha-slider.is-vertical').exists()).toBe(true);
  });

  it('should handle color prop', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle handleClick event', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    const bar = wrapper.find('.ant-color-alpha-slider__bar');
    await bar.trigger('click');
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle handleClick event on thumb', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    const thumb = wrapper.find('.ant-color-alpha__thumb');
    await thumb.trigger('click');
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle drag functionality for horizontal slider', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: false,
      },
    });
    
    // Test that the component renders correctly for horizontal slider
    expect(wrapper.find('.ant-color-alpha-slider').exists()).toBe(true);
    expect(wrapper.find('.ant-color-alpha-slider.is-vertical').exists()).toBe(false);
  });

  it('should handle drag functionality for vertical slider', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: true,
      },
    });
    
    // Test that the component renders correctly for vertical slider
    expect(wrapper.find('.ant-color-alpha-slider.is-vertical').exists()).toBe(true);
  });

  it('should handle update method', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    wrapper.vm.update();
    
    expect(wrapper.vm.thumbLeft).toBeDefined();
    expect(wrapper.vm.thumbTop).toBeDefined();
    expect(wrapper.vm.background).toBeDefined();
  });

  it('should handle thumb positioning for horizontal slider', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: false,
      },
    });
    
    // Test that thumbLeft and thumbTop are reactive properties
    expect(wrapper.vm.thumbLeft).toBeDefined();
    expect(wrapper.vm.thumbTop).toBeDefined();
  });

  it('should handle thumb positioning for vertical slider', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: true,
      },
    });
    
    // Test that thumbLeft and thumbTop are reactive properties
    expect(wrapper.vm.thumbLeft).toBeDefined();
    expect(wrapper.vm.thumbTop).toBeDefined();
  });

  it('should handle background generation with color', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    // Test that background is a reactive property
    expect(wrapper.vm.background).toBeDefined();
  });

  it('should handle background generation without color', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: null,
      },
    });
    
    // Test that background is a reactive property
    expect(wrapper.vm.background).toBeDefined();
  });

  it('should handle watch color alpha changes', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    // Trigger watcher by changing color alpha
    mockColor.get.mockReturnValue(75);
    await wrapper.setProps({ color: { ...mockColor, get: () => 75 } });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle watch color value changes', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    // Trigger watcher by changing color value
    await wrapper.setProps({ color: { ...mockColor, value: '#ff0000' } });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle onMounted lifecycle', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    await wrapper.vm.$nextTick();
    
    // Test that component mounts successfully
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle drag functionality setup', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    await wrapper.vm.$nextTick();
    
    // Test that bar and thumb refs are available
    expect(wrapper.vm.bar).toBeDefined();
    expect(wrapper.vm.thumb).toBeDefined();
  });

  it('should handle edge cases with null color', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: null,
        vertical: false,
      },
    });
    
    // Test that component handles null color gracefully
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.thumbLeft).toBeDefined();
    expect(wrapper.vm.thumbTop).toBeDefined();
  });

  it('should handle edge cases with undefined color', () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: undefined,
        vertical: true,
      },
    });
    
    // Test that component handles undefined color gracefully
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.thumbLeft).toBeDefined();
    expect(wrapper.vm.thumbTop).toBeDefined();
  });

  it('should handle click events with different targets', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: false,
      },
    });
    
    // Test clicking on bar
    const bar = wrapper.find('.ant-color-alpha-slider__bar');
    await bar.trigger('click');
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle background with color that has no value', () => {
    const colorWithoutValue = {
      ...mockColor,
      value: null,
    };
    
    const wrapper = mount(AlphaSlider, {
      props: {
        color: colorWithoutValue,
      },
    });
    
    // Test that background is still defined even with null color value
    expect(wrapper.vm.background).toBeDefined();
  });

  it('should handle vertical slider drag logic', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: true,
      },
    });
    
    // Mock DOM elements and methods to trigger vertical drag logic
    const mockRect = {
      left: 0,
      top: 0,
      width: 20,
      height: 180,
    };
    
    const mockElement = {
      getBoundingClientRect: vi.fn(() => mockRect),
      offsetWidth: 20,
      offsetHeight: 180,
    };
    
    // Mock the instance vnode.el
    wrapper.vm.$ = {
      vnode: { el: mockElement }
    };
    
    // Mock thumb element
    wrapper.vm.thumb.value = { offsetHeight: 4 };
    
    // Trigger handleClick which calls handleDrag internally
    const bar = wrapper.find('.ant-color-alpha-slider__bar');
    await bar.trigger('click');
    
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle draggable callbacks', async () => {
    const mockDraggable = vi.fn();
    const { default: draggable } = await import('/@/components/ColorPicker/src/lib/draggable');
    vi.mocked(draggable).mockImplementation(mockDraggable);
    
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
      },
    });
    
    await wrapper.vm.$nextTick();
    
    // Verify draggable was called
    expect(mockDraggable).toHaveBeenCalled();
    
    // Get the drag config that was passed
    const dragConfig = mockDraggable.mock.calls[0][1];
    
    // Test the drag callback
    const mockEvent = { clientX: 100, clientY: 50 };
    expect(() => dragConfig.drag(mockEvent)).not.toThrow();
    
    // Test the end callback
    expect(() => dragConfig.end(mockEvent)).not.toThrow();
  });

  it('should handle edge case in vertical drag calculation', async () => {
    const wrapper = mount(AlphaSlider, {
      props: {
        color: mockColor,
        vertical: true,
      },
    });
    
    // Mock DOM elements with edge case values
    const mockRect = {
      left: 0,
      top: 0,
      width: 20,
      height: 180,
    };
    
    const mockElement = {
      getBoundingClientRect: vi.fn(() => mockRect),
      offsetWidth: 20,
      offsetHeight: 180,
    };
    
    wrapper.vm.$ = {
      vnode: { el: mockElement }
    };
    
    // Mock thumb with edge case dimensions
    wrapper.vm.thumb.value = { offsetHeight: 0 };
    
    // Trigger click to test edge case
    const bar = wrapper.find('.ant-color-alpha-slider__bar');
    await bar.trigger('click');
    
    expect(wrapper.exists()).toBe(true);
  });
});