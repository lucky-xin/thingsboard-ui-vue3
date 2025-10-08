import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Tree from '/@/components/Tree/src/Tree.vue';

describe('Tree', () => {
  it('should render correctly', () => {
    const wrapper = mount(Tree);
    expect(wrapper.exists()).toBe(true);
  });
});
