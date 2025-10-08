import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('BasicMenu', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(BasicMenu);
    expect(wrapper.exists()).toBe(true);
  });
});
