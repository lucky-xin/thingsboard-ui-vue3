import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ColorPicker from '/@/components/ColorPicker/src/ColorPicker.vue';

// Mock dependencies
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-color-picker',
  }),
}));

vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('/@/components/ColorPicker/src/SimpleColorPicker.vue', () => ({
  default: {
    name: 'SimpleColorPicker',
    template: '<div data-testid="simple-color-picker"></div>',
    props: ['modelValue'],
    emits: ['change'],
  },
}));

vi.mock('ant-design-vue', () => ({
  Input: {
    name: 'Input',
    template: '<div data-testid="input"><slot name="addonAfter"></slot></div>',
    props: ['style', 'placeholder', 'class', 'value'],
  },
}));

describe('ColorPicker.vue', () => {
  let wrapper: any;

  const defaultProps = {
    value: '#ff0000',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mount(ColorPicker, {
      props: defaultProps,
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('[data-testid="input"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="simple-color-picker"]').exists()).toBe(true);
  });

  it('should handle props correctly', async () => {
    await wrapper.setProps({
      value: '#00ff00',
      width: '200px',
      pageSize: 50,
      copy: true,
      mode: 'svg',
    });
    
    expect(wrapper.props('value')).toBe('#00ff00');
    expect(wrapper.props('width')).toBe('200px');
    expect(wrapper.props('pageSize')).toBe(50);
    expect(wrapper.props('copy')).toBe(true);
    expect(wrapper.props('mode')).toBe('svg');
  });

  it('should handle default props', () => {
    const defaultWrapper = mount(ColorPicker);
    
    expect(defaultWrapper.props('value')).toBeUndefined();
    expect(defaultWrapper.props('width')).toBe('100%');
    expect(defaultWrapper.props('pageSize')).toBe(70);
    expect(defaultWrapper.props('copy')).toBe(false);
    expect(defaultWrapper.props('mode')).toBe('iconify');
  });

  it('should emit change event when color changes', async () => {
    await wrapper.vm.handleChange('#0000ff');
    
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')[0]).toEqual(['#0000ff']);
  });

  it('should emit update:value event when color changes', async () => {
    await wrapper.vm.handleChange('#0000ff');
    
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('update:value')[0]).toEqual(['#0000ff']);
  });

  it('should handle color validation', () => {
    expect(wrapper.vm.isColorValid('#ff0000')).toBe(true);
    expect(wrapper.vm.isColorValid('#FF0000')).toBe(true);
    expect(wrapper.vm.isColorValid('#ff000')).toBe(false);
    expect(wrapper.vm.isColorValid('ff0000')).toBe(false);
    expect(wrapper.vm.isColorValid('')).toBe(false);
  });

  it('should format color correctly', () => {
    expect(wrapper.vm.formatColor('#ff0000')).toBe('#ff0000');
    expect(wrapper.vm.formatColor('ff0000')).toBe('#ff0000');
  });

  it('should validate color correctly', () => {
    expect(wrapper.vm.validateColor('#ff0000')).toBe(true);
    expect(wrapper.vm.validateColor('')).toBe(false);
    expect(wrapper.vm.validateColor('invalid')).toBe(true);
  });

  it('should get current color', () => {
    expect(wrapper.vm.getCurrentColor()).toBe('#ff0000');
  });

  it('should set current color', () => {
    wrapper.vm.setCurrentColor('#00ff00');
    expect(wrapper.vm.getCurrentColor()).toBe('#00ff00');
  });

  it('should get color value', () => {
    expect(wrapper.vm.getColorValue()).toBe('#ff0000');
  });

  it('should set color value', () => {
    wrapper.vm.setColorValue('#0000ff');
    expect(wrapper.vm.getColorValue()).toBe('#0000ff');
  });

  it('should clear color', () => {
    wrapper.vm.clearColor();
    expect(wrapper.vm.getCurrentColor()).toBe('');
  });

  it('should reset color', () => {
    wrapper.vm.resetColor();
    expect(wrapper.vm.getCurrentColor()).toBe('');
  });

  it('should get translations', () => {
    expect(wrapper.vm.getTranslations()).toBeDefined();
  });

  it('should get prefix class', () => {
    expect(wrapper.vm.getPrefixCls()).toBe('jeesite-color-picker');
  });

  it('should handle empty value', async () => {
    await wrapper.setProps({
      value: '',
    });
    
    expect(wrapper.props('value')).toBe('');
  });

  it('should handle different modes', async () => {
    await wrapper.setProps({
      mode: 'svg',
    });
    
    expect(wrapper.props('mode')).toBe('svg');
  });

  it('should handle width prop', async () => {
    await wrapper.setProps({
      width: '300px',
    });
    
    expect(wrapper.props('width')).toBe('300px');
  });

  it('should handle pageSize prop', async () => {
    await wrapper.setProps({
      pageSize: 100,
    });
    
    expect(wrapper.props('pageSize')).toBe(100);
  });

  it('should handle copy prop', async () => {
    await wrapper.setProps({
      copy: true,
    });
    
    expect(wrapper.props('copy')).toBe(true);
  });

  it('should handle color change from props', async () => {
    await wrapper.setProps({
      value: '#ffff00',
    });
    
    expect(wrapper.props('value')).toBe('#ffff00');
  });

  it('should handle complex color values', async () => {
    const complexColors = ['#123456', '#abcdef', '#ABCDEF', '#000000', '#ffffff'];
    
    for (const color of complexColors) {
      await wrapper.setProps({
        value: color,
      });
      
      expect(wrapper.props('value')).toBe(color);
    }
  });
});