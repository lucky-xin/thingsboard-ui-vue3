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
    const wrapper = mount(CountTo as any, { props: { startVal: 0, endVal: 10, autoplay: true, useEasing: false, duration: 0 } });
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
});


