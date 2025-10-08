import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

describe('Description', () => {
  it('should render correctly', () => {
    // TODO: Add your tests here
    const wrapper = mount(Description);
    expect(wrapper.exists()).toBe(true);
  });
});
