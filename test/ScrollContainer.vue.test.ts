import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ScrollContainer from '/@/components/Container/src/ScrollContainer.vue';

describe('ScrollContainer', () => {
  it('should render correctly', () => {
    const wrapper = mount(ScrollContainer);
    expect(wrapper.exists()).toBe(true);
  });
});
