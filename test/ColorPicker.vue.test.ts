import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import ColorPicker from '/@/components/ColorPicker/src/ColorPicker';

// Mock ant-design-vue components
vi.mock('ant-design-vue', () => ({
  Input: {
    name: 'AInput',
    props: {
      style: Object,
      placeholder: String,
      class: String,
      'v-model:value': String,
    },
    template: '<div class="a-input"><slot name="addonAfter" /></div>',
  },
  Popover: {
    name: 'APopover',
    template: '<div class="a-popover"><slot /></div>',
  },
}));

// Mock ColorPicker sub-components
vi.mock('/@/components/ColorPicker/src/SimpleColorPicker.vue', () => ({
  default: {
    name: 'SimpleColorPicker',
    props: { modelValue: String },
    emits: ['change', 'update:modelValue'],
    template: '<div class="simple-color-picker" @click="$emit(\'change\', \'#ff0000\')" />',
  },
}));

// Mock useDesign hook
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: vi.fn(() => ({
    prefixCls: 'jeesite-color-picker',
  })),
}));

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key: string) => {
      const translations = {
        'component.icon.placeholder': 'Select color',
      };
      return translations[key] || key;
    }),
  })),
}));

// Mock propTypes
vi.mock('/@/utils/propTypes', () => ({
  propTypes: {
    string: {
      def: (defaultValue: any) => ({ type: String, default: defaultValue }),
    },
    number: {
      def: (defaultValue: any) => ({ type: Number, default: defaultValue }),
    },
    bool: {
      def: (defaultValue: any) => ({ type: Boolean, default: defaultValue }),
    },
    oneOf: (values: any[]) => ({
      def: (defaultValue: any) => ({ type: String, default: defaultValue, validator: (val: any) => values.includes(val) }),
    }),
  },
}));

describe('ColorPicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    const wrapper = mount(ColorPicker);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.a-input').exists()).toBe(true);
  });

  it('should render with default props', () => {
    const wrapper = mount(ColorPicker);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.width).toBe('100%');
    expect(wrapper.vm.pageSize).toBe(70);
    expect(wrapper.vm.copy).toBe(false);
    expect(wrapper.vm.mode).toBe('iconify');
  });

  it('should handle props correctly', () => {
    const props = {
      value: '#123456',
      width: '200px',
      pageSize: 50,
      copy: true,
      mode: 'svg' as const,
    };
    const wrapper = mount(ColorPicker, {
      props,
    });
    expect(wrapper.props('value')).toBe('#123456');
    expect(wrapper.props('width')).toBe('200px');
    expect(wrapper.props('pageSize')).toBe(50);
    expect(wrapper.props('copy')).toBe(true);
    expect(wrapper.props('mode')).toBe('svg');
  });

  it('should emit events when expected', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#000000' },
    });
    
    // Test change event
    const colorPicker = wrapper.findComponent({ name: 'SimpleColorPicker' });
    await colorPicker.trigger('click');
    
    await nextTick();
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('update:value')).toBeTruthy();
  });

  it('should handle user interactions', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#ffffff' },
    });
    
    // Test that the component responds to prop changes
    await wrapper.setProps({ value: '#000000' });
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#000000');
  });

  it('should initialize currentColor from value prop', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#abcdef' },
    });
    
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#abcdef');
  });

  it('should update currentColor when value prop changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#111111' },
    });
    
    await wrapper.setProps({ value: '#222222' });
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#222222');
  });

  it('should call handleChange correctly', async () => {
    const wrapper = mount(ColorPicker);
    
    // Call handleChange method directly
    wrapper.vm.handleChange('#ff00ff');
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#ff00ff');
  });

  it('should handle change event from SimpleColorPicker', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#000000' },
    });
    
    // Simulate change event from SimpleColorPicker
    const colorPicker = wrapper.findComponent({ name: 'SimpleColorPicker' });
    await colorPicker.vm.$emit('change', '#ff0000');
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#ff0000');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('update:value')).toBeTruthy();
  });

  it('should handle multiple color changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#000000' },
    });
    
    // Test multiple changes
    wrapper.vm.handleChange('#ff0000');
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#ff0000');
    
    wrapper.vm.handleChange('#00ff00');
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#00ff00');
    
    wrapper.vm.handleChange('#0000ff');
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#0000ff');
  });

  it('should call handleColorChange when currentColor changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#000000' },
    });
    
    // Change currentColor to trigger handleColorChange
    wrapper.vm.currentColor = '#ff0000';
    await nextTick();
    
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('update:value')[0]).toEqual(['#ff0000']);
    expect(wrapper.emitted('change')[0]).toEqual(['#ff0000']);
  });

  it('should initialize with watchEffect', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#123456');
  });

  it('should update currentColor when value prop changes via watchEffect', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#111111' },
    });
    
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#111111');
    
    await wrapper.setProps({ value: '#222222' });
    await nextTick();
    expect(wrapper.vm.currentColor).toBe('#222222');
  });

  it('should call initializeColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#abcdef' },
    });
    
    // Call initializeColor directly
    wrapper.vm.initializeColor();
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#abcdef');
  });

  it('should call setupWatchers function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#000000' },
    });
    
    // Call setupWatchers directly
    wrapper.vm.setupWatchers();
    await nextTick();
    
    // Verify that watchers are working by changing currentColor
    wrapper.vm.currentColor = '#ff0000';
    await nextTick();
    
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should call setupWatchEffect function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call setupWatchEffect directly
    wrapper.vm.setupWatchEffect();
    await nextTick();
    
    // Verify that watchEffect is working by changing props
    await wrapper.setProps({ value: '#789abc' });
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#789abc');
  });

  it('should call setupComponent function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call setupComponent directly
    const result = wrapper.vm.setupComponent();
    expect(result).toBeDefined();
    expect(result.currentColor).toBeDefined();
    expect(result.t).toBeDefined();
    expect(result.prefixCls).toBeDefined();
  });

  it('should call initializeComponent function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call initializeComponent directly
    wrapper.vm.initializeComponent();
    await nextTick();
    
    // Verify that component is properly initialized
    expect(wrapper.vm.currentColor).toBe('#123456');
  });

  it('should call getCurrentColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call getCurrentColor directly
    const color = wrapper.vm.getCurrentColor();
    expect(color).toBe('#123456');
  });

  it('should call setCurrentColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call setCurrentColor directly
    wrapper.vm.setCurrentColor('#ff0000');
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#ff0000');
  });

  it('should call getTranslations function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call getTranslations directly
    const translations = wrapper.vm.getTranslations();
    expect(translations).toBeDefined();
  });

  it('should call getPrefixCls function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call getPrefixCls directly
    const prefixCls = wrapper.vm.getPrefixCls();
    expect(prefixCls).toBeDefined();
  });

  it('should call validateColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call validateColor directly
    expect(wrapper.vm.validateColor('#123456')).toBe(true);
    expect(wrapper.vm.validateColor('')).toBe(false);
    expect(wrapper.vm.validateColor('invalid')).toBe(true);
  });

  it('should call formatColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call formatColor directly
    expect(wrapper.vm.formatColor('#123456')).toBe('#123456');
    expect(wrapper.vm.formatColor('123456')).toBe('#123456');
  });

  it('should call resetColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call resetColor directly
    wrapper.vm.resetColor();
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('');
  });

  it('should call updateColorFromProps function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call updateColorFromProps directly
    wrapper.vm.updateColorFromProps();
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#123456');
  });

  it('should call getColorValue function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call getColorValue directly
    const colorValue = wrapper.vm.getColorValue();
    expect(colorValue).toBe('#123456');
  });

  it('should call setColorValue function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call setColorValue directly
    wrapper.vm.setColorValue('#ff0000');
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('#ff0000');
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should call clearColor function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call clearColor directly
    wrapper.vm.clearColor();
    await nextTick();
    
    expect(wrapper.vm.currentColor).toBe('');
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should call isColorValid function', async () => {
    const wrapper = mount(ColorPicker, {
      props: { value: '#123456' },
    });
    
    // Call isColorValid directly
    expect(wrapper.vm.isColorValid('#123456')).toBe(true);
    expect(wrapper.vm.isColorValid('#12345')).toBe(false);
    expect(wrapper.vm.isColorValid('123456')).toBe(false);
    expect(wrapper.vm.isColorValid('#GGGGGG')).toBe(false);
  });


  it('should use correct design prefix and translation', () => {
    const wrapper = mount(ColorPicker);
    
    // Check that component renders with expected structure
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.a-input').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SimpleColorPicker' }).exists()).toBe(true);
  });
});
