import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('MenuItem', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(MenuItem);
    expect(wrapper.exists()).toBe(true);
  });
});
