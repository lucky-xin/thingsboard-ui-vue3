import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CountTo from '/@/components/CountTo/src/CountTo.vue';

describe('CountTo formatting branches', () => {
  it('formats with decimals and no thousands separator', async () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 1,
        endVal: 2,
        duration: 0,
        autoplay: false,
        useEasing: false,
        decimals: 2,
        separator: '',
        decimal: '.',
        prefix: 'P',
        suffix: 'S',
      },
    });

    (wrapper.vm as any).start();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('span').text()).toMatch(/^P\d+(\.\d{2})?S$/);
  });

  it('formats large numbers with thousands separator', async () => {
    const wrapper = mount(CountTo, {
      props: {
        startVal: 1000,
        endVal: 1000000,
        duration: 0,
        autoplay: false,
        useEasing: false,
        decimals: 0,
        separator: ',',
        decimal: '.',
      },
    });
    (wrapper.vm as any).start();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('span').text()).toMatch(/[,]/);
  });
});

