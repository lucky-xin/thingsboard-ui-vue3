import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Description from '/@/components/Description/src/Description.vue';

describe('Description', () => {
  it('should render correctly', () => {
    const wrapper = mount(Description);
    expect(wrapper.exists()).toBe(true);
  });
});
