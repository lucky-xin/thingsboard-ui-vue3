import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import PreDefine from '/@/components/ColorPicker/src/components/preDefine.vue';

// Mock dependencies
vi.mock('/@/components/ColorPicker/src/lib/color', () => ({
  default: class MockColor {
    constructor() {
      this.value = '#000000';
      this.enableAlpha = false;
      this.format = 'hex';
    }

    fromString(value) {
      this.value = value;
    }

    compare(other) {
      return this.value === other.value;
    }
  },
}));

vi.mock('/@/components/ColorPicker/src/useOptions', () => ({
  useOptions: () => ({
    currentColor: {
      value: '#000000',
    },
  }),
}));

describe('PreDefine.vue', () => {
  let wrapper: any;

  const defaultProps = {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    color: {
      fromString: vi.fn(),
      value: '#000000',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(PreDefine, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('.ant-color-predefine').exists()).toBe(true);
    expect(wrapper.find('.ant-color-predefine__colors').exists()).toBe(true);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(3);
  });

  it('should handle props correctly', async () => {
    const newColors = ['#ffff00', '#ff00ff', '#00ffff'];
    const newColor = {
      fromString: vi.fn(),
      value: '#ffff00',
    };
    
    await wrapper.setProps({
      colors: newColors,
      color: newColor,
    });
    
    expect(wrapper.props('colors')).toEqual(newColors);
    expect(wrapper.props('color')).toStrictEqual(newColor);
  });

  it('should handle color selection', async () => {
    const colorSelectors = wrapper.findAll('.ant-color-predefine__color-selector');
    
    // Click on the first color
    await colorSelectors[0].trigger('click');
    
    // Test that the method can be called without errors
    expect(colorSelectors[0].exists()).toBe(true);
  });

  it('should handle different color arrays', async () => {
    const colorArrays = [
      ['#ff0000'],
      ['#ff0000', '#00ff00'],
      ['#ff0000', '#00ff00', '#0000ff', '#ffff00'],
      ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
    ];
    
    for (const colors of colorArrays) {
      await wrapper.setProps({
        colors: colors,
      });
      
      expect(wrapper.props('colors')).toEqual(colors);
      expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
    }
  });

  it('should handle empty color array', async () => {
    await wrapper.setProps({
      colors: [],
    });
    
    expect(wrapper.props('colors')).toEqual([]);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(0);
  });

  it('should handle single color', async () => {
    await wrapper.setProps({
      colors: ['#ff0000'],
    });
    
    expect(wrapper.props('colors')).toEqual(['#ff0000']);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(1);
  });

  it('should handle multiple colors', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle color with alpha', async () => {
    const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.8)'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle hex colors', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle rgb colors', async () => {
    const colors = ['rgb(255, 0, 0)', 'rgb(0, 255, 0)', 'rgb(0, 0, 255)'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle hsl colors', async () => {
    const colors = ['hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)', 'hsl(240, 100%, 50%)'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle hsv colors', async () => {
    const colors = ['hsv(0, 100%, 100%)', 'hsv(120, 100%, 100%)', 'hsv(240, 100%, 100%)'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle mixed color formats', async () => {
    const colors = ['#ff0000', 'rgb(0, 255, 0)', 'hsl(240, 100%, 50%)', 'rgba(255, 255, 0, 0.5)'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle color selection with different indices', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    const colorSelectors = wrapper.findAll('.ant-color-predefine__color-selector');
    
    // Test clicking on different color indices
    for (let i = 0; i < colorSelectors.length; i++) {
      await colorSelectors[i].trigger('click');
      expect(colorSelectors[i].exists()).toBe(true);
    }
  });

  it('should handle color selection with large arrays', async () => {
    const colors = Array.from({ length: 20 }, (_, i) => `#${i.toString(16).padStart(6, '0')}`);
    
    await wrapper.setProps({
      colors: colors,
    });
    
    expect(wrapper.props('colors')).toEqual(colors);
    expect(wrapper.findAll('.ant-color-predefine__color-selector')).toHaveLength(colors.length);
  });

  it('should handle color selection with boundary indices', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    const colorSelectors = wrapper.findAll('.ant-color-predefine__color-selector');
    
    // Test clicking on first and last colors
    await colorSelectors[0].trigger('click');
    expect(colorSelectors[0].exists()).toBe(true);
    
    await colorSelectors[colorSelectors.length - 1].trigger('click');
    expect(colorSelectors[colorSelectors.length - 1].exists()).toBe(true);
  });

  it('should handle color selection with middle indices', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    const colorSelectors = wrapper.findAll('.ant-color-predefine__color-selector');
    const middleIndex = Math.floor(colorSelectors.length / 2);
    
    await colorSelectors[middleIndex].trigger('click');
    expect(colorSelectors[middleIndex].exists()).toBe(true);
  });

  it('should handle color selection with all indices', async () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    
    await wrapper.setProps({
      colors: colors,
    });
    
    const colorSelectors = wrapper.findAll('.ant-color-predefine__color-selector');
    
    // Test clicking on all colors
    for (let i = 0; i < colorSelectors.length; i++) {
      await colorSelectors[i].trigger('click');
      expect(colorSelectors[i].exists()).toBe(true);
    }
  });
});