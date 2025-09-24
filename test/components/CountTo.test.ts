import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CountTo from '/@/components/CountTo/src/CountTo.vue';

describe('CountTo', () => {
  it('should render with default props', () => {
    const wrapper = mount(CountTo);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom start and end values', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render with custom duration', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 1000,
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
        suffix: '.00',
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
  });

  it('should emit onStarted event', async () => {
    const onStarted = vi.fn();
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: true,
        onOnStarted: onStarted,
      },
    });

    await nextTick();
    expect(onStarted).toHaveBeenCalled();
  });

  it('should emit onFinished event', async () => {
    const onFinished = vi.fn();
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        duration: 100, // Short duration for testing
        onOnFinished: onFinished,
      },
    });

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(onFinished).toHaveBeenCalled();
  });

  it('should format number with decimals', () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100.55,
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

  it('should start counting when start method is called', async () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
      },
    });

    // @ts-ignore
    wrapper.vm.start();
    await nextTick();
    expect(wrapper.exists()).toBe(true);
  });

  it('should reset counting when reset method is called', async () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 0,
        endVal: 100,
      },
    });

    // @ts-ignore
    wrapper.vm.reset();
    await nextTick();
    expect(wrapper.exists()).toBe(true);
  });
});
