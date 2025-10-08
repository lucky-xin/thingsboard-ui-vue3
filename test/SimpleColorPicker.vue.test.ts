import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SimpleColorPicker from '/@/components/ColorPicker/src/SimpleColorPicker.vue';

// Mock Ant Design Vue components
vi.mock('ant-design-vue', () => ({
  Popover: {
    name: 'Popover',
    template: '<div class="mock-popover"><slot /><slot name="content" /></div>',
    props: ['open', 'placement', 'trigger', 'class'],
  },
  Input: {
    name: 'Input',
    template: '<input class="mock-input" />',
    props: ['value', 'size'],
  },
  Button: {
    name: 'Button',
    template: '<button class="mock-button"><slot /></button>',
    props: ['size', 'type'],
  },
}));

// Mock internal components
vi.mock('/@/components/ColorPicker/src/components/svPanel.vue', () => ({
  default: {
    name: 'SvPanel',
    template: '<div class="mock-sv-panel"></div>',
    props: ['color'],
  },
}));

vi.mock('/@/components/ColorPicker/src/components/hueSlider.vue', () => ({
  default: {
    name: 'HueSlider',
    template: '<div class="mock-hue-slider"></div>',
    props: ['color', 'vertical'],
  },
}));

vi.mock('/@/components/ColorPicker/src/components/alphaSlider.vue', () => ({
  default: {
    name: 'AlphaSlider',
    template: '<div class="mock-alpha-slider"></div>',
    props: ['color'],
  },
}));

vi.mock('/@/components/ColorPicker/src/components/preDefine.vue', () => ({
  default: {
    name: 'PreDefine',
    template: '<div class="mock-predefine"></div>',
    props: ['color', 'colors'],
  },
}));

describe('SimpleColorPicker', () => {
  it('should render correctly', () => {
    const wrapper = mount(SimpleColorPicker);
    expect(wrapper.exists()).toBe(true);
  });
});
