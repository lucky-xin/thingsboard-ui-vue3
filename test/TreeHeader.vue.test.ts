import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeHeader from '/@/components/Tree/src/TreeHeader.vue';

describe('TreeHeader', () => {
  it('should render correctly', () => {
    const wrapper = mount(TreeHeader);
    expect(wrapper.exists()).toBe(true);
  });
});
