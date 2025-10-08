import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SubMenuItem from '/@/components/SimpleMenu/src/components/SubMenuItem.vue';

describe('SubMenuItem', () => {
  it('should render correctly', () => {
    const wrapper = mount(SubMenuItem);
    expect(wrapper.exists()).toBe(true);
  });
});
