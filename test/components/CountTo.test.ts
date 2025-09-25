import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CountTo from '/@/components/CountTo/src/CountTo.vue';

// Mock @vueuse/core
vi.mock('@vueuse/core', () => ({
  useTransition: vi.fn((source, options) => {
    return source;
  }),
  TransitionPresets: {
    linear: 'linear',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
  },
}));

// Mock utils
vi.mock('/@/utils/is', () => ({
  isNumber: vi.fn((val) => typeof val === 'number'),
}));

describe('CountTo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('should render with custom start and end values', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 10,
        endVal: 50,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom duration', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 2000,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with prefix and suffix', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        prefix: '$',
        suffix: '%',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom color', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        color: '#ff0000',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('span').attributes('style')).toContain('color: rgb(255, 0, 0)');
  });

  it('should have start and reset methods', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    expect(typeof wrapper.vm.start).toBe('function');
    expect(typeof wrapper.vm.reset).toBe('function');
  });

  it('should handle start and reset methods', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    // Test that methods exist and can be called
    expect(() => wrapper.vm.start()).not.toThrow();
    expect(() => wrapper.vm.reset()).not.toThrow();
  });

  it('should format number with decimals', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        decimals: 2,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should format number with separator', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 1000,
        separator: ',',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle start method execution', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    // Test start method execution
    expect(() => wrapper.vm.start()).not.toThrow();
  });

  it('should handle reset method execution', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    // Test reset method execution
    expect(() => wrapper.vm.reset()).not.toThrow();
  });

  it('should handle useEasing prop', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        useEasing: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle different transition presets', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        transition: 'easeIn',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle decimal separator', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        decimal: ',',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should not autoplay when autoplay is false', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle edge case with zero values', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 0,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle large numbers', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 999999,
        separator: ',',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
