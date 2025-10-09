import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Menu from '/@/components/SimpleMenu/src/components/Menu.vue';

describe('Menu', () => {
  it('should render correctly', () => {
    const wrapper = mount(Menu);
    expect(wrapper.exists()).toBe(true);
  });
});
