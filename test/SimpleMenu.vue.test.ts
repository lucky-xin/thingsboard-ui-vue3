import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SimpleMenu from '/@/components/SimpleMenu/src/SimpleMenu.vue';

describe('SimpleMenu', () => {
  it('should render correctly', () => {
    const wrapper = mount(SimpleMenu);
    expect(wrapper.exists()).toBe(true);
  });
});
