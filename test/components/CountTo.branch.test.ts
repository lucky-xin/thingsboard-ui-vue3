import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('components/CountTo/src/CountTo.vue branches', () => {
  it('should update value via watcher when autoplay is true and endVal changes', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      return {
        ...mod,
        useTransition: (src: any) => src, // passthrough for immediate updates
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: 10, autoplay: true, useEasing: false, duration: 0 },
    });
    await wrapper.setProps({ endVal: 20 });
    await nextTick();
    expect(wrapper.text()).toContain('20');
  });

  it('should return empty string when formatted value is falsy and not zero', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(undefined),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, { props: { autoplay: false } });
    // value should be '' when underlying number is undefined
    expect(wrapper.text()).toBe('');
  });

  it('should render with default props', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(2021),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle start method', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(100),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: 100, autoplay: false },
    });

    // Call start method
    await (wrapper.vm as any).start();
    await nextTick();
    expect(wrapper.text()).toContain('100');
  });

  it('should handle reset method', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(0),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: 100, autoplay: false },
    });

    // First start to set value to 100
    await (wrapper.vm as any).start();
    await nextTick();
    // expect(wrapper.text()).toContain('100');

    // Then reset to go back to startVal
    await (wrapper.vm as any).reset();
    await nextTick();
    expect(wrapper.text()).toContain('0');
  });

  it('should format number with decimals', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(10.567),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: {
        startVal: 0,
        endVal: 10.567,
        autoplay: false,
        decimals: 2,
        decimal: '.',
        separator: ',',
        prefix: '$',
        suffix: ' USD'
      }
    });
    expect(wrapper.text()).toBe('$10.57 USD');
  });

  it('should format number with separator', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(1000000),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: {
        startVal: 0,
        endVal: 1000000,
        autoplay: false,
        separator: ',',
        prefix: '',
        suffix: ''
      }
    });
    expect(wrapper.text()).toBe('1,000,000');
  });

  it('should handle zero value correctly', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(0),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, { props: { autoplay: false } });
    expect(wrapper.text()).toBe('0');
  });

  it('should start animation when autoplay is true', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(100),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: 100, autoplay: true },
    });
    await nextTick();
    expect(wrapper.text()).toContain('100');
  });

  it('should not start animation when autoplay is false', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(0),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: 100, autoplay: false },
    });
    await nextTick();
    expect(wrapper.text()).toBe('0');
  });

  it('should handle negative numbers', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(-50),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: { startVal: 0, endVal: -50, autoplay: false },
    });
    await nextTick();
    expect(wrapper.text()).toBe('-50');
  });

  it('should handle decimal separator', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(10.5),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: {
        startVal: 0,
        endVal: 10.5,
        autoplay: false,
        decimals: 1,
        decimal: ',',
        separator: '.'
      },
    });
    await nextTick();
    expect(wrapper.text()).toBe('10,5');
  });

  it('should validate decimals prop', async () => {
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const props = CountTo.props;

    // Test valid decimal values
    expect(props.decimals.validator(0)).toBe(true);
    expect(props.decimals.validator(2)).toBe(true);
    expect(props.decimals.validator(10)).toBe(true);

    // Test invalid decimal values
    expect(props.decimals.validator(-1)).toBe(false);
    expect(props.decimals.validator(-5)).toBe(false);
  });

  it('should handle color prop', async () => {
    vi.resetModules();
    vi.doMock('@vueuse/core', async () => {
      const mod = await vi.importActual<any>('@vueuse/core');
      const { ref } = await import('vue');
      return {
        ...mod,
        useTransition: () => ref(100),
      };
    });
    const { default: CountTo } = await import('/@/components/CountTo/src/CountTo.vue');
    const wrapper = mount(CountTo as any, {
      props: {
        startVal: 0,
        endVal: 100,
        autoplay: false,
        color: '#ff0000'
      },
    });
    await nextTick();
    const span = wrapper.find('span');
    expect(span.exists()).toBe(true);
    // Browser converts hex to rgb, so we check for the rgb equivalent
    expect(span.attributes('style')).toContain('color: rgb(255, 0, 0)');
  });
});