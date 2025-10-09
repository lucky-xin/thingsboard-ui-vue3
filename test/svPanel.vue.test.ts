import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import svPanel from '/@/components/ColorPicker/src/components/svPanel.vue';

describe('svPanel', () => {
  it('should render correctly', () => {
    const wrapper = mount(svPanel);
    expect(wrapper.exists()).toBe(true);
  });
});
