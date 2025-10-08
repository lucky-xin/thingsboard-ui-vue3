import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import LazyContainer from '/@/components/Container/src/LazyContainer.vue';

describe('LazyContainer', () => {
  it('should render correctly', () => {
    const wrapper = mount(LazyContainer);
    expect(wrapper.exists()).toBe(true);
  });
});
