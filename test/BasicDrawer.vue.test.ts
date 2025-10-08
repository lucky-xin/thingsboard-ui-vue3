import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BasicDrawer from '/@/components/Drawer/src/BasicDrawer.vue';

describe('BasicDrawer', () => {
  it('should render correctly', () => {
    const wrapper = mount(BasicDrawer);
    expect(wrapper.exists()).toBe(true);
  });
});
