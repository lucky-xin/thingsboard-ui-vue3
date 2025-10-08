import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CollapseContainer from '/@/components/Container/src/collapse/CollapseContainer.vue';

describe('CollapseContainer', () => {
  it('should render correctly', () => {
    const wrapper = mount(CollapseContainer);
    expect(wrapper.exists()).toBe(true);
  });
});
