import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VirtualScroll from '/@/components/VirtualScroll/src/VirtualScroll.vue';

describe('VirtualScroll', () => {
  it('should render correctly', () => {
    const wrapper = mount(VirtualScroll, {
      props: {
        itemHeight: 30
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
