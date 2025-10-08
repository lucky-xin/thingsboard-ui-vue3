import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContextMenu from '/@/components/ContextMenu/src/ContextMenu.vue';

describe('ContextMenu', () => {
  it('should render correctly', () => {
    const wrapper = mount(ContextMenu);
    expect(wrapper.exists()).toBe(true);
  });
});
