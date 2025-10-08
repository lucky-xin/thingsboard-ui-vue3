import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('VirtualScroll', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(VirtualScroll);
    expect(wrapper.exists()).toBe(true);
  });
});
