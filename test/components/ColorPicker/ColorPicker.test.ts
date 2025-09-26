import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ColorPicker from '/@/components/ColorPicker/src/ColorPicker.vue';

// Mock ant-design-vue Input component
vi.mock('ant-design-vue', () => ({
  Input: {
    name: 'AInput',
    template: '<input data-testid="a-input" />',
    props: ['style', 'placeholder', 'class', 'value'],
  },
}));

// Mock the SimpleColorPicker component
vi.mock('/@/components/ColorPicker/src/SimpleColorPicker.vue', () => ({
  default: {
    name: 'SimpleColorPicker',
    template: '<div data-testid="simple-color-picker"><slot></slot></div>',
    props: ['modelValue'],
    emits: ['change'],
  },
}));

// Mock useDesign hook
vi.mock('/@/hooks/web/useDesign', () => ({
  useDesign: () => ({
    prefixCls: 'jeesite-color-picker',
  }),
}));

// Mock useI18n hook
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: () => ({
    t: vi.fn().mockImplementation((key) => {
      const translations: Record<string, string> = {
        'component.icon.placeholder': 'Select color',
      };
      return translations[key] || key;
    }),
  }),
}));

describe('ColorPicker.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('displays the correct initial color value', () => {
    const testColor = '#00FF00';
    const wrapper = mount(ColorPicker, {
      props: {
        value: testColor,
      },
    });

    expect(wrapper.props('value')).toBe(testColor);
  });

  it('uses default width when none provided', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    expect(wrapper.props('width')).toBe('100%');
  });

  it('respects custom width prop', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
        width: '200px',
      },
    });

    expect(wrapper.props('width')).toBe('200px');
  });

  it('uses default pageSize when none provided', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    expect(wrapper.props('pageSize')).toBe(70);
  });

  it('respects custom pageSize prop', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
        pageSize: 100,
      },
    });

    expect(wrapper.props('pageSize')).toBe(100);
  });

  it('respects copy prop', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
        copy: true,
      },
    });

    expect(wrapper.props('copy')).toBe(true);
  });

  it('uses default mode when none provided', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    expect(wrapper.props('mode')).toBe('iconify');
  });

  it('respects custom mode prop', () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
        mode: 'svg',
      },
    });

    expect(wrapper.props('mode')).toBe('svg');
  });

  it('emits update:value event when color changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    // Simulate a color change
    await wrapper.setProps({ value: '#00FF00' });

    expect(wrapper.emitted('update:value')).toBeTruthy();
  });

  it('emits change event when color changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    // Simulate a color change
    await wrapper.setProps({ value: '#00FF00' });

    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('updates currentColor when value prop changes', async () => {
    const wrapper = mount(ColorPicker, {
      props: {
        value: '#FF0000',
      },
    });

    await wrapper.setProps({ value: '#00FF00' });

    // We can't directly test the ref value, but we can check that the events are emitted
    expect(wrapper.emitted('update:value')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

});